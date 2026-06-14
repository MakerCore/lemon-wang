import { ImageResponse } from 'next/og'

export const alt = 'Lemon Wang — Inside Chinese Hardware'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a0a0a',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', fontSize: 120 }}>🍋</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Inside Chinese Hardware
          </div>
          <div style={{ fontSize: 32, color: '#999999', marginTop: 24, lineHeight: 1.4 }}>
            First-hand signal. Decision frameworks. Sour truth, no padding.
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignSelf: 'flex-start',
            fontSize: 30,
            color: '#CCFF00',
            fontWeight: 700,
            borderTop: '3px solid #CCFF00',
            paddingTop: 16,
          }}
        >
          lemon.wang
        </div>
      </div>
    ),
    { ...size }
  )
}
