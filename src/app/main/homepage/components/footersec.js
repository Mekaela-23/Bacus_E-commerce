'use client';

export default function FooterSection() {
  return (
    <>
      <style>{`
        .footer__link { display: block; color: #8a7060; text-decoration: none; font-size: 14px; margin-bottom: 10px; transition: color 0.2s; font-family: 'Jost', sans-serif; }
        .footer__link:hover { color: #c8a96e; }
        .social-btn { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; text-decoration: none; transition: transform 0.25s, opacity 0.25s; opacity: 0.85; }
        .social-btn:hover { transform: translateY(-3px); opacity: 1; }
        .social-btn svg { width: 18px; height: 18px; }
        .social-btn.instagram { background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%); }
        .social-btn.facebook  { background: #1877F2; }
        .social-btn.tiktok    { background: #010101; }
        .social-btn.pinterest { background: #E60023; }

        @media (max-width: 1024px) {
          .social-btn { width: 34px; height: 34px; }
          .social-btn svg { width: 15px; height: 15px; }
        }
        @media (max-width: 768px) {
          .social-btn { width: 30px; height: 30px; }
          .social-btn svg { width: 13px; height: 13px; }
        }
        @media (max-width: 480px) {
          .social-btn { width: 26px; height: 26px; }
          .social-btn svg { width: 11px; height: 11px; }
        }
      `}</style>

      <footer style={{
        background: '#faf7f4',
        padding: 'clamp(40px, 6vw, 60px) clamp(16px, 5vw, 80px) clamp(20px, 3vw, 30px)',
        fontFamily: "'Jost', sans-serif",
      }}>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))',
          gap: 'clamp(24px, 4vw, 40px)',
          marginBottom: 'clamp(28px, 5vw, 40px)',
        }}>
        
          <div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#c8a96e', letterSpacing: 2, marginBottom: 12 }}>
              Veloure
            </p>
            <p style={{ fontSize: 13, lineHeight: 1.8, color: '#8a7060', margin: 0 }}>
              Curated fashion for the modern individual. Quality pieces, timeless style.
            </p>
          </div>

        
          <div>
            <p style={{ color: '#2d1f14', fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Shop</p>
            {["Women's Collection", "Men's Collection", "New Arrivals", "Sale"].map(l => (
              <a key={l} className="footer__link" href={`/${l.toLowerCase().replace(/['\s]+/g, '-')}`}>{l}</a>
            ))}
          </div>

        
          <div>
            <p style={{ color: '#2d1f14', fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Help</p>
            {['FAQ', 'Shipping & Returns', 'Size Guide', 'Contact Us'].map(l => (
              <a key={l} className="footer__link" href={`/${l.toLowerCase().replace(/[&\s]+/g, '-')}`}>{l}</a>
            ))}
          </div>

       
          <div>
            <p style={{ color: '#2d1f14', fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Company</p>
            {['About Us', 'Careers', 'Privacy Policy', 'Terms of Service'].map(l => (
              <a key={l} className="footer__link" href={`/${l.toLowerCase().replace(/\s+/g, '-')}`}>{l}</a>
            ))}
          </div>
        </div>

       
        <div style={{
          borderTop: '1px solid #e8ddd4', paddingTop: 24,
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'space-between', alignItems: 'center', gap: 16,
        }}>
          <p style={{ margin: 0, fontSize: 13, color: '#8a7060' }}>© 2026 Veloure. All rights reserved.</p>

          <div style={{ display: 'flex', gap: 10 }}>
           
            <a className="social-btn instagram" href="https://instagram.com" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
           
            <a className="social-btn facebook" href="https://facebook.com" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="white"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
            </a>
           
            <a className="social-btn tiktok" href="https://tiktok.com" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="white"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/></svg>
            </a>
           
            <a className="social-btn pinterest" href="https://pinterest.com" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="white"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}