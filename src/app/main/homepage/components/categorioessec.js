'use client';

const CATEGORIES = [
  {
    image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Women Collection',
    offer: '20% Off Selected Styles',
  },
  {
    image: 'https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Men Collection',
    offer: 'New Season Pieces',
  },
  {
    image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Sale',
    offer: 'Up to 50% Off',
  },
];

export default function CategoriesSection() {
  return (
    <>
      <style>{`
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .cat-img-wrapper {
          width: 100%;
          height: 220px;
          overflow: hidden;
          flex-shrink: 0;
        }
        @media (max-width: 768px) {
          .cat-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .cat-img-wrapper {
            height: 200px;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .cat-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }
          .cat-img-wrapper {
            height: 180px;
          }
        }
      `}</style>

      <section style={{
        padding: 'clamp(24px, 5vw, 60px) clamp(16px, 5vw, 60px)',
        background: '#faf7f4',
      }}>
        <div className="cat-grid">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={i} {...cat} />
          ))}
        </div>
      </section>
    </>
  );
}

function CategoryCard({ image, title, offer }) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 2px 16px rgba(90,55,20,0.10)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(90,55,20,0.16)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 16px rgba(90,55,20,0.10)';
      }}
    >
      <div className="cat-img-wrapper">
        <img
          src={image}
          alt={title}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 20%', display: 'block',
            transition: 'transform 0.5s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
      </div>

      <div style={{ padding: '18px 20px 22px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 20, fontWeight: 400,
          color: '#2d1f14', letterSpacing: '0.02em',
          margin: 0,
        }}>
          {title}
        </h3>
        <p style={{
          fontSize: 12, color: '#8a7060',
          fontFamily: "'Jost', sans-serif",
          fontWeight: 300, marginBottom: 8,
        }}>
          {offer}
        </p>
        <button
          style={{
            alignSelf: 'flex-start',
            background: 'transparent',
            border: '1.5px solid #9b7b5a',
            color: '#5c4033',
            fontFamily: "'Jost', sans-serif",
            fontSize: 11, fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '8px 20px',
            borderRadius: 40,
            cursor: 'pointer',
            transition: 'background 0.2s, color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#9b7b5a'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#5c4033'; }}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
}