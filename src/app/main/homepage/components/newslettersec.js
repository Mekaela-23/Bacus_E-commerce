'use client';

export default function WhyLuminaSection() {
  const features = [
    { icon: '✧', title: 'White Glove Delivery',    text: 'Free premium delivery on all orders over ₱50,000. Handled with extreme care.' },
    { icon: '☼', title: 'Expert Support',     text: 'Our lighting specialists are here to help you choose the perfect piece.' },
    { icon: '✦',  title: 'Hand-Picked Luxury',  text: 'Every chandelier is hand-selected for quality, brilliance, and timeless elegance.' },
    { icon: '💠', title: 'Secure Installation',   text: 'Professional installation guides and support for a safe setup in your home.' },
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
          background: #ffffff;
          border: 1px solid #e2ddd0;
          border-radius: 12px;
          padding: 24px 16px;
          text-align: center;
          transition: background 0.3s, transform 0.3s, border-color 0.3s;
          cursor: default;
        }
        .why-card:hover {
          background: #fafafa;
          transform: translateY(-4px);
          border-color: #dddddd;
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
        background: '#fcf8ee', // Slightly lighter ecru for contrast
        padding: 'clamp(32px, 6vw, 80px) clamp(16px, 5vw, 80px)',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: 10, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: '#888888',
          marginBottom: 12, fontFamily: "'Jost', sans-serif",
        }}>
          The Lumina Promise
        </p>

        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(22px, 4vw, 44px)', fontWeight: 300,
          color: '#111111', marginBottom: 'clamp(24px, 4vw, 48px)', lineHeight: 1.2,
        }}>
          Why Shop with <em style={{ fontStyle: 'italic', color: '#000000' }}>Lumina?</em>
        </h2>

        <div className="why-grid">
          {features.map((f, i) => (
            <div key={i} className="why-card">
              <span style={{ fontSize: 'clamp(20px, 4vw, 32px)', marginBottom: 10, display: 'block' }}>{f.icon}</span>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(14px, 2.5vw, 20px)', fontWeight: 400,
                color: '#111111', marginBottom: 8,
              }}>{f.title}</h3>
              <p style={{
                fontSize: 'clamp(11px, 1.5vw, 13px)', color: '#666666',
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