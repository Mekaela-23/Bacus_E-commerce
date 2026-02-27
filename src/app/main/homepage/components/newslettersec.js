'use client';

export default function WhyVeloureSection() {
  const features = [
    { icon: '🚚', title: 'Free Shipping',    text: 'Free delivery on all orders over ₱1,500. Fast and reliable nationwide shipping.' },
    { icon: '↩️', title: 'Easy Returns',     text: 'Not happy? Return within 30 days — no questions asked, hassle-free.' },
    { icon: '✦',  title: 'Curated Quality',  text: 'Every piece is hand-selected for quality, fit, and timeless style.' },
    { icon: '🔒', title: 'Secure Payment',   text: 'Shop with confidence — 100% secure checkout with encrypted payments.' },
  ];

  return (
    <>
      <style>{`
        .why-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          max-width: 960px;
          margin: 0 auto;
        }
        .why-card {
          background: #f5ead8;
          border: 1px solid rgba(200,169,110,0.5);
          border-radius: 12px;
          padding: 24px 16px;
          text-align: center;
          transition: background 0.3s, transform 0.3s;
          cursor: default;
        }
        .why-card:hover {
          background: #eddfc4;
          transform: translateY(-4px);
        }
        @media (max-width: 768px) {
          .why-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .why-card { padding: 16px 12px; }
        }
        @media (max-width: 400px) {
          .why-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
          .why-card { padding: 12px 8px; }
        }
      `}</style>

      <section style={{
        background: '#fff',
        padding: 'clamp(32px, 6vw, 80px) clamp(16px, 5vw, 80px)',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: 10, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: '#c8a96e',
          marginBottom: 12, fontFamily: "'Jost', sans-serif",
        }}>
          The Veloure Promise
        </p>

        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(22px, 4vw, 44px)', fontWeight: 300,
          color: '#2d1f14', marginBottom: 'clamp(24px, 4vw, 48px)', lineHeight: 1.2,
        }}>
          Why Shop with <em style={{ fontStyle: 'italic', color: '#c8a96e' }}>Veloure?</em>
        </h2>

        <div className="why-grid">
          {features.map((f, i) => (
            <div key={i} className="why-card">
              <span style={{ fontSize: 'clamp(20px, 4vw, 32px)', marginBottom: 10, display: 'block' }}>{f.icon}</span>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(14px, 2.5vw, 20px)', fontWeight: 400,
                color: '#2d1f14', marginBottom: 8,
              }}>{f.title}</h3>
              <p style={{
                fontSize: 'clamp(11px, 1.5vw, 13px)', color: '#8a7060',
                lineHeight: 1.6, fontWeight: 300,
                fontFamily: "'Jost', sans-serif",
              }}>{f.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}