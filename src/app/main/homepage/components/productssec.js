'use client';

import { useState } from 'react';
import { ProductCardList } from './cardlist';

const TABS = ['All', 'Apparel', 'Shoes', 'Sale Items'];

const ALL_PRODUCTS = [
  {
    name: 'Sweater',
    price: 149.00,
    category: 'Apparel',
    image: 'https://i.ibb.co/8D2szwxh/shopping-8.webp',
    link: '/products/sweater',
  },
  {
    name: 'White Sneakers',
    price: 3895.00,
    category: 'Shoes',
    image: 'https://i.ibb.co/QFnq6pC3/shopping-1.webp',
    link: '/products/white-sneakers',
  },
  {
    name: 'Jacket',
    price: 2490.00,
    category: 'Apparel',
    image: 'https://i.ibb.co/KR4Qq21/shopping-9.webp',
    link: '/products/jacket',
  },
  {
    name: 'Crossbody Bag',
    price: 6066.31,
    category: 'Apparel',
    image: 'https://i.ibb.co/DPxtR403/shopping-14.webp',
    link: '/products/crossbody-bag',
  },
  {
    name: 'Sunglasses',
    price: 848.52,
    category: 'Apparel',
    image: 'https://i.ibb.co/24C3XK0/shopping-11.webp',
    badge: 'New',
    link: '/products/sunglasses',
  },
  {
    name: 'Hat',
    price: 299.00,
    category: 'Sale Items',
    image: 'https://i.ibb.co/5XMkyHhg/shopping-12.webp',
    badge: 'Sale',
    link: '/products/hat',
  },
  {
    name: 'White Heels',
    price: 3299.00,
    category: 'Shoes',
    image: 'https://i.ibb.co/hFRZ4TcG/shopping-6.webp',
    link: '/products/white-heels',
  },
  {
    name: 'Gold Necklace',
    price: 1800.00,
    originalPrice: 2550,
    category: 'Sale Items',
    image: 'https://i.ibb.co/Ps8WcGXM/shopping-13.webp',
    badge: 'Sale',
    link: '/products/gold-necklace',
  },
];

export default function ProductsSection({ onAddToCart }) {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = activeTab === 'All'
    ? ALL_PRODUCTS
    : ALL_PRODUCTS.filter(p => p.category === activeTab);

  return (
    <section style={{
      padding: 'clamp(24px, 4vw, 20px) clamp(12px, 3vw, 60px) clamp(40px, 8vw, 80px)',
      background: '#f5ead8',
    }}>
      <h2 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(24px, 5vw, 36px)',
        fontWeight: 400,
        color: '#2d1f14',
        textAlign: 'center',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
      }}>
        Our Trendy Products
      </h2>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderBottom: '1px solid #e0d4c4',
        marginBottom: 40,
        scrollbarWidth: 'none',
        marginTop: 24,
      }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'Jost', sans-serif",
              fontSize: 13,
              fontWeight: activeTab === tab ? 500 : 400,
              color: activeTab === tab ? '#2d1f14' : '#8a7060',
              padding: '10px 20px',
              borderBottom: activeTab === tab ? '2px solid #2d1f14' : '2px solid transparent',
              letterSpacing: '0.06em',
              transition: 'all 0.2s',
              marginBottom: '-1px',
              whiteSpace: 'nowrap',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <ProductCardList products={filtered} onAddToCart={onAddToCart} />
    </section>
  );
}