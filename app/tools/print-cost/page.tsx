'use client';

import { useState, useEffect, useCallback } from 'react';

// ── Types ──────────────────────────────────────────────────────────────────
interface CalcResult {
  Nx: number; Ny: number; N: number; layers: number;
  T_print_min: number; T_switch_min: number;
  T_total_min: number; T_total_h: number;
  Q_day: number;
  volume_cm3: number; weight_g: number;
  C_mat: number; C_dep: number | null; C_total: number;
  error: string | null;
}

// ── Default input values ───────────────────────────────────────────────────
const DEFAULTS = { Lx: 30, Ly: 30, Lz: 50, t: 0.03, fillRate: 100, dailyHours: 24 };

type InputKey = keyof typeof DEFAULTS;

const FIELDS: { key: InputKey; label: string; unit: string; step: string; min: string }[] = [
  { key: 'Lx',         label: 'Part Size X',       unit: 'mm', step: '1',    min: '0.1'  },
  { key: 'Ly',         label: 'Part Size Y',       unit: 'mm', step: '1',    min: '0.1'  },
  { key: 'Lz',         label: 'Part Size Z',       unit: 'mm', step: '1',    min: '0.1'  },
  { key: 't',          label: 'Layer Thickness',   unit: 'mm', step: '0.01', min: '0.01' },
  { key: 'fillRate',   label: 'Infill Rate',       unit: '%',  step: '1',    min: '1'    },
  { key: 'dailyHours', label: 'Daily Hours',       unit: 'h',  step: '1',    min: '1'    },
];

// ── Helpers ────────────────────────────────────────────────────────────────
const f = (n: number, d = 2) => n.toFixed(d);

// ── Skeleton row ───────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-[#1e1e1e] last:border-0">
      <div className="h-3 w-28 rounded bg-[#1e1e1e] animate-pulse" />
      <div className="h-3 w-16 rounded bg-[#1e1e1e] animate-pulse" />
    </div>
  );
}

function SkeletonCard({ title, rows }: { title: string; rows: number }) {
  return (
    <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-5">
      <p className="font-mono text-[10px] uppercase tracking-[2px] text-[#3a3a3a] mb-4">{title}</p>
      {Array.from({ length: rows }).map((_, i) => <SkeletonRow key={i} />)}
    </div>
  );
}

// ── Result row ─────────────────────────────────────────────────────────────
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-[#1e1e1e] last:border-0">
      <span className="font-mono text-xs text-[var(--text-muted)]">{label}</span>
      <span className="font-mono text-xs text-[var(--text-secondary)]">{value}</span>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function PrintCostPage() {
  const [inputs, setInputs] = useState(DEFAULTS);
  const [result, setResult] = useState<CalcResult | null>(null);
  const [loading, setLoading] = useState(true);

  const calculate = useCallback(async (vals: typeof DEFAULTS) => {
    setLoading(true);
    try {
      const res = await fetch('/api/print-cost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vals),
      });
      setResult(await res.json());
    } catch {
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced auto-calculate on input change
  useEffect(() => {
    const t = setTimeout(() => calculate(inputs), 300);
    return () => clearTimeout(t);
  }, [inputs, calculate]);

  function handleChange(key: InputKey, raw: string) {
    const num = parseFloat(raw);
    if (!isNaN(num) && num > 0) setInputs((p) => ({ ...p, [key]: num }));
  }

  const hasError  = !loading && result?.error;
  const hasResult = !loading && result && !result.error;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="max-w-5xl mx-auto px-4 pt-24 pb-20">
        {/* Page header */}
        <div className="mb-10">
          <p className="font-mono text-[10px] uppercase tracking-[2px] text-[var(--text-muted)] mb-3">
            Tools / ROI Calculator
          </p>
          <h1 className="font-mono text-2xl font-bold text-white mb-2">
            Print Cost Calculator
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            Real-time per-part cost estimation for multi-jet 3D printing.
          </p>
        </div>

        <div className="grid md:grid-cols-[320px_1fr] gap-10 items-start">

          {/* ── Input panel ─────────────────────────────────────────────── */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[2px] text-[var(--text-muted)] mb-5">
              Parameters
            </p>
            <div>
              {FIELDS.map(({ key, label, unit, step, min }) => (
                <div
                  key={key}
                  className="flex items-center justify-between gap-3 py-3 border-b border-[#1e1e1e] last:border-0"
                >
                  <label className="font-mono text-xs text-[var(--text-muted)] flex-1">
                    {label}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step={step}
                      min={min}
                      defaultValue={DEFAULTS[key]}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className="w-24 bg-[#141414] border border-[var(--border)] rounded px-3 py-1.5 text-xs text-white font-mono text-right focus:outline-none focus:border-[#CCFF00] transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="font-mono text-[10px] text-[#444] w-7">{unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Result cards ────────────────────────────────────────────── */}
          <div className="space-y-3">

            {/* Loading skeleton */}
            {loading && (
              <>
                <SkeletonCard title="Layout" rows={3} />
                <SkeletonCard title="Time"   rows={5} />
                <SkeletonCard title="Cost"   rows={4} />
              </>
            )}

            {/* Error state */}
            {hasError && (
              <div className="bg-[#130a0a] border border-[#3d1515] rounded-xl p-5">
                <p className="font-mono text-[10px] uppercase tracking-[2px] text-[#663030] mb-2">
                  Error
                </p>
                <p className="font-mono text-sm text-[var(--red)]">
                  ⚠ {result!.error}
                </p>
              </div>
            )}

            {/* Results */}
            {hasResult && (
              <>
                {/* Layout card */}
                <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[2px] text-[var(--text-muted)] mb-4">
                    Layout
                  </p>
                  <Row label="Parts per Row (X)"  value={`${result!.Nx}`} />
                  <Row label="Parts per Row (Y)"  value={`${result!.Ny}`} />
                  <Row label="Parts per Plate"    value={`${result!.N}`} />
                </div>

                {/* Time card */}
                <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[2px] text-[var(--text-muted)] mb-4">
                    Time
                  </p>
                  <Row label="Layers"          value={`${result!.layers}`} />
                  <Row label="Print Time"      value={`${f(result!.T_print_min)} min`} />
                  <Row label="Switch Overhead" value={`${f(result!.T_switch_min)} min`} />
                  <Row label="Total Time"      value={`${f(result!.T_total_h, 3)} h`} />
                  <Row label="Daily Output"    value={`${result!.Q_day} pcs`} />
                </div>

                {/* Cost card */}
                <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[2px] text-[var(--text-muted)] mb-4">
                    Cost
                  </p>
                  <Row label="Volume"          value={`${f(result!.volume_cm3, 3)} cm³`} />
                  <Row label="Weight"          value={`${f(result!.weight_g, 3)} g`} />
                  <Row label="Material Cost"   value={`¥ ${f(result!.C_mat)}`} />
                  <Row
                    label="Depreciation"
                    value={result!.C_dep !== null ? `¥ ${f(result!.C_dep)}` : '—'}
                  />
                  {/* Highlighted total */}
                  <div className="flex justify-between items-center pt-4 mt-2 border-t border-[#222]">
                    <span className="font-mono text-xs text-[var(--text-muted)]">Cost per Part</span>
                    <span className="font-mono text-2xl font-bold text-[#CCFF00]">
                      ¥ {f(result!.C_total)}
                    </span>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
