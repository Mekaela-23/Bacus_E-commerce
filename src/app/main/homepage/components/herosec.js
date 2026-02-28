'use client';

import { useState } from 'react';

export default function HeroSection() {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <section style={{
        position: 'relative',
        minHeight: '560px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url('https://i.ibb.co/tMS23kY6/athleisure-blog-banner.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(20,16,12,0.82) 0%, rgba(20,16,12,0.52) 55%, rgba(20,16,12,0.08) 100%)',
        }} />
        <div style={{ position: 'relative', zIndex: 2, padding: '60px 80px', maxWidth: '560px' }} className="hero-text">
          <p style={{
            fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase',
            color: '#c8a96e', fontWeight: 600, marginBottom: 18,
            fontFamily: "'Jost', sans-serif",
          }}>New Season 2026</p>
          <h1 style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: 50, lineHeight: 1.1, fontWeight: 700,
            color: '#fff', marginBottom: 16,
          }}>New Season<br />Arrivals</h1>
          <p style={{
            fontSize: 11, letterSpacing: '2.5px', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.75)', fontWeight: 500, marginBottom: 36,
            fontFamily: "'Jost', sans-serif", lineHeight: 1.9,
          }}>
            Discover the freshest styles for the season.<br />
            Elevate your wardrobe with curated pieces.
          </p>

          <button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              padding: '12px 30px',
              fontSize: 11,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontFamily: "'Jost', sans-serif",
              fontWeight: 600,
              border: 'none',
              background: hovered ? '#ffffff' : '#c8a96e',
              color: hovered ? '#1e1a16' : '#1e1a16',
              transition: 'background 0.3s ease, color 0.3s ease',
            }}
          >
            Shop Now
          </button>
        </div>
      </section>

      <style>{`
        /* Mobile */
        @media (max-width: 480px) {
          section {
            min-height: 480px !important;
          }
          .hero-text {
            padding: 36px 24px !important;
            max-width: 100% !important;
          }
          .hero-text h1 {
            font-size: 36px !important;
          }
          .hero-text p {
            font-size: 9px !important;
          }
        }

        /* iPad / Tablet */
        @media (min-width: 481px) and (max-width: 768px) {
          section {
            min-height: 520px !important;
          }
          .hero-text {
            padding: 48px 40px !important;
            max-width: 80% !important;
          }
          .hero-text h1 {
            font-size: 42px !important;
          }
        }

        /* Laptop */
        @media (min-width: 769px) and (max-width: 1024px) {
          section {
            min-height: 540px !important;
          }
          .hero-text {
            padding: 60px 60px !important;
          }
          .hero-text h1 {
            font-size: 46px !important;
          }
        }
      `}</style>
    </>
  );
}