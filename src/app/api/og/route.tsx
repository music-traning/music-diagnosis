export const runtime = 'edge';

import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

const INSTRUMENT_FULL_NAME: Record<string, string> = {
  Vo: 'Vocal',
  Gt: 'Guitar',
  Ba: 'Bass',
  Dr: 'Drums',
  DTM: 'DTM / TrackMaker',
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get('title') || '【名もなき音楽家】';
    const main = searchParams.get('main') || 'Gt';
    const mainPercent = searchParams.get('mainPercent') || '0';
    const sub = searchParams.get('sub') || 'DTM';
    const subPercent = searchParams.get('subPercent') || '0';

    const mainLabel = INSTRUMENT_FULL_NAME[main] || main;
    const subLabel = INSTRUMENT_FULL_NAME[sub] || sub;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#09090b',
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.28) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.24) 0%, transparent 50%)',
            padding: '56px 72px',
            color: '#fafafa',
            fontFamily: 'sans-serif',
          }}
        >
          {/* 上部ヘッダーバッジ */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 22px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(99, 102, 241, 0.16)',
                border: '1px solid rgba(99, 102, 241, 0.45)',
                color: '#a5b4fc',
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: '0.08em',
              }}
            >
              MUSICIAN APTITUDE &amp; INSTRUMENT EQ
            </div>

            <div
              style={{
                display: 'flex',
                color: '#a1a1aa',
                fontSize: 22,
                fontWeight: 600,
              }}
            >
              #音楽家適性診断
            </div>
          </div>

          {/* 中央：診断された称号（二つ名） */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              width: '100%',
              padding: '36px 40px',
              borderRadius: '32px',
              backgroundColor: 'rgba(24, 24, 27, 0.85)',
              border: '2px solid rgba(99, 102, 241, 0.4)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 22,
                fontWeight: 700,
                color: '#fbbf24',
                letterSpacing: '0.15em',
                marginBottom: '14px',
              }}
            >
              YOUR MUSICIAN TITLE
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 54,
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.25,
                textAlign: 'center',
              }}
            >
              {title}
            </div>
          </div>

          {/* 下部：メイン適性＆サブ適性パラメーター */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '32px',
              width: '100%',
            }}
          >
            {/* 1位 メイン適性 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flex: 1,
                padding: '24px 36px',
                borderRadius: '24px',
                backgroundColor: 'rgba(39, 39, 42, 0.75)',
                border: '2px solid rgba(56, 189, 248, 0.5)',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: '#38bdf8',
                    letterSpacing: '0.08em',
                  }}
                >
                  MAIN APTITUDE (1st)
                </span>
                <span
                  style={{
                    fontSize: 32,
                    fontWeight: 800,
                    color: '#ffffff',
                    marginTop: '4px',
                  }}
                >
                  {mainLabel}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  fontSize: 52,
                  fontWeight: 900,
                  color: '#38bdf8',
                }}
              >
                {mainPercent}
                <span style={{ fontSize: 28, marginLeft: '4px' }}>%</span>
              </div>
            </div>

            {/* 2位 サブ適性 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flex: 1,
                padding: '24px 36px',
                borderRadius: '24px',
                backgroundColor: 'rgba(39, 39, 42, 0.55)',
                border: '1px solid rgba(161, 161, 170, 0.3)',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: '#a1a1aa',
                    letterSpacing: '0.08em',
                  }}
                >
                  SUB APTITUDE (2nd)
                </span>
                <span
                  style={{
                    fontSize: 32,
                    fontWeight: 800,
                    color: '#e4e4e7',
                    marginTop: '4px',
                  }}
                >
                  {subLabel}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  fontSize: 48,
                  fontWeight: 800,
                  color: '#d4d4d8',
                }}
              >
                {subPercent}
                <span style={{ fontSize: 26, marginLeft: '4px' }}>%</span>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Failed to generate OG image:', error);
    return new Response('Failed to generate OG image', { status: 500 });
  }
}
