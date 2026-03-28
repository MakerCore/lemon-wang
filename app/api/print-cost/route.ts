import { NextRequest, NextResponse } from 'next/server';

// Server-side hardcoded parameters — never exposed to client
const INK_PRICE_PER_L  = 400;   // CNY/L
const WASTE_RATE       = 0.30;
const DENSITY          = 1.15;  // g/cm³
const DEVICE_PRICE     = 28800; // CNY
const DEVICE_LIFE_YEARS = 3;
// const BUILD_X       = 200;   // mm  (reflected as 198 = 200 - 2×MARGIN)
// const BUILD_Y       = 175;   // mm  (reflected as 173 = 175 - 2×MARGIN)
// const BUILD_Z       = 100;   // mm
const PASS_WIDTH       = 25;    // mm
const PRINT_SPEED      = 8;     // mm/h  (Z-axis)
const SWITCH_TIME      = 5;     // s / pass transition
// const MARGIN        = 2;     // mm   (baked into 198 / 173)
// const PART_GAP      = 2;     // mm   (baked into Lx+2 / Ly+2)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { Lx, Ly, Lz, t, fillRate, dailyHours } = body as {
      Lx: number; Ly: number; Lz: number;
      t: number; fillRate: number; dailyHours: number;
    };

    if ([Lx, Ly, Lz, t, fillRate, dailyHours].some((v) => v == null || isNaN(v))) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // ── Layout ──────────────────────────────────────────────────────────────
    const Nx = Math.floor(198 / (Lx + 2));
    const Ny = Math.floor(173 / (Ly + 2));

    if (Nx === 0 || Ny === 0) {
      return NextResponse.json({
        Nx, Ny, N: 0, layers: 0,
        T_print_min: 0, T_switch_min: 0, T_total_min: 0, T_total_h: 0,
        Q_day: 0, volume_cm3: 0, weight_g: 0,
        C_mat: 0, C_dep: null, C_total: 0,
        error: 'Part size exceeds build volume',
      });
    }

    const N = Nx * Ny;

    // ── Time ────────────────────────────────────────────────────────────────
    const P            = Math.ceil(Ly / PASS_WIDTH) + 1;
    const S            = P - 1;
    const n            = Lz / t;                          // layer count
    const layers       = Math.round(n);

    const T_print_min  = (Lz / PRINT_SPEED) * 60;        // minutes
    const T_switch_min = (n * S * SWITCH_TIME) / 60;      // minutes
    const T_total_min  = T_print_min + T_switch_min;
    const T_total_h    = T_total_min / 60;

    // ── Material cost ────────────────────────────────────────────────────────
    const effective_ink_per_L = INK_PRICE_PER_L / (1 - WASTE_RATE);
    const cost_per_g          = effective_ink_per_L / 1150;

    const volume_cm3 = (Lx * Ly * Lz) / 1000;
    const weight_g   = volume_cm3 * (fillRate / 100) * DENSITY;
    const C_mat      = weight_g * cost_per_g;

    // ── Depreciation ────────────────────────────────────────────────────────
    const daily_dep = DEVICE_PRICE / (DEVICE_LIFE_YEARS * 365);
    const Q_day     = Math.floor((dailyHours * 60) / T_total_min) * N;

    const C_dep: number | null = Q_day > 0 ? daily_dep / Q_day : null;
    const C_total = C_dep !== null ? C_mat + C_dep : C_mat;

    const r = (v: number, d = 4) => parseFloat(v.toFixed(d));

    return NextResponse.json({
      Nx, Ny, N, layers,
      T_print_min:  r(T_print_min,  2),
      T_switch_min: r(T_switch_min, 2),
      T_total_min:  r(T_total_min,  2),
      T_total_h:    r(T_total_h,    3),
      Q_day,
      volume_cm3:   r(volume_cm3,   3),
      weight_g:     r(weight_g,     3),
      C_mat:        r(C_mat),
      C_dep:        C_dep !== null ? r(C_dep) : null,
      C_total:      r(C_total),
      error:        null,
    });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
