'use client';

import { useState } from 'react';
import Navbar            from './components/navbar';
import HeroSection       from './components/herosec';
import CategoriesSection from './components/categorioessec';
import ProductsSection   from './components/productssec';
import NewsletterSection from './components/newslettersec';
import FooterSection     from './components/footersec';

export default function HomePage() {
  const [cartCount, setCartCount] = useState(0);

  function handleAddToCart(item) {
    setCartCount(prev => prev + 1);
  }

  return (
    <>
      <div style={{ fontFamily: "'Jost', sans-serif", background: '#faf7f4', minHeight: '100vh' }}>
        <Navbar cartCount={cartCount} />
        <HeroSection />
        <CategoriesSection />
        <ProductsSection onAddToCart={handleAddToCart} />
        <NewsletterSection />
        <FooterSection />
      </div>
    </>
  );
}