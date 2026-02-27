'use client';

import { ProductCard, CategoryCard } from '../../../../components/ui/card';

// ── Product Grid ──
export function ProductCardList({ products = [], onAddToCart }) {
  return (
    <>
      <style>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        /* Laptop (1024px) */
        @media (max-width: 1024px) {
          .product-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 14px;
          }
        }

        /* iPad / Tablet (768px) */
        @media (max-width: 768px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }

        /* Mobile (480px and below) */
        @media (max-width: 480px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
        }

        /* Small Mobile (360px and below) */
        @media (max-width: 360px) {
          .product-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
        }
      `}</style>

      <div className="product-grid">
        {products.map((product, i) => (
          <ProductCard key={i} {...product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </>
  );
}

// ── Category Grid ──
export function CategoryCardList({ categories = [] }) {
  return (
    <>
      <style>{`
        .category-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        @media (max-width: 768px) {
          .category-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
          }
        }

        @media (max-width: 480px) {
          .category-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }
      `}</style>

      <div className="category-grid">
        {categories.map((cat, i) => (
          <CategoryCard key={i} {...cat} />
        ))}
      </div>
    </>
  );
}

export default ProductCardList;