'use client';

import { useState } from 'react';



export default function Navbar({ cartCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        .nav-links a {
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #4a3a28;
          text-decoration: none;
          letter-spacing: 0.08em;
          padding: 4px 0;
          border-bottom: 2px solid transparent;
          transition: color 0.2s, border-color 0.2s;
        }
        .nav-links a:hover,
        .nav-links a.active {
          color: #1e1a16;
          border-bottom: 2px solid #c8a96e;
        }
        .hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 22px;
          color: #1e1a16;
        }
        .mobile-menu {
          display: none;
          flex-direction: column;
          gap: 0;
          background: #c8a96e;
          padding: 12px 24px 20px;
          border-top: 1px solid #b8935a;
        }
        .mobile-menu a {
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #1e1a16;
          text-decoration: none;
          padding: 10px 0;
          border-bottom: 1px solid rgba(0,0,0,0.08);
          letter-spacing: 0.05em;
        }
        .mobile-menu a:last-child { border-bottom: none; }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hamburger { display: block; }
          .mobile-menu.open { display: flex; }
        }
      `}</style>

      <nav style={{
        background: '#c8a96e',
        padding: '0 clamp(16px, 4vw, 60px)',
        borderBottom: '1px solid #b8935a',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
        }}>
          {/* Logo */}
          <a href="/" style={{ textDecoration: 'none' }}>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '22px',
              fontWeight: '700',
              color: '#1e1a16',
              letterSpacing: '2px',
            }}>Veloure</span>
          </a>

          {/* Desktop Nav Links */}
          <div className="nav-links" style={{ display: 'flex', gap: '32px' }}>
            <a href="/" className="active">Home</a>
            <a href="/women">Women</a>
            <a href="/men">Men</a>
            <a href="/sale">Sale</a>
            <a href="/about">About</a>
          </div>

          {/* Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Search */}
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
              <svg width="20" height="20" fill="none" stroke="#1e1a16" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>

            {/* Wishlist */}
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
              <svg width="20" height="20" fill="none" stroke="#1e1a16" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>

            {/* User icon — custom PNG */}
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
              <img src="https://i.ibb.co/VpHdsQ2z/user.png" alt="Account" width={22} height={22} style={{ objectFit: 'contain' }} />
            </button>

            {/* Cart icon — custom PNG with badge */}
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, position: 'relative', display: 'flex' }}>
              <img src="https://i.ibb.co/VPz8Bh4/shopping-cart.png" alt="Cart" width={22} height={22} style={{ objectFit: 'contain' }} />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: '#c0392b',
                  color: '#fff',
                  fontSize: '10px',
                  fontWeight: '700',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Jost', sans-serif",
                }}>
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            {/* Hamburger */}
            <button className="hamburger" onClick={() => setMenuOpen(o => !o)}>
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <a href="/" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="/women" onClick={() => setMenuOpen(false)}>Women</a>
        <a href="/men" onClick={() => setMenuOpen(false)}>Men</a>
        <a href="/sale" onClick={() => setMenuOpen(false)}>Sale</a>
        <a href="/about" onClick={() => setMenuOpen(false)}>About</a>
      </div>
    </>
  );
}