'use client';

import { ProductCard, CategoryCard } from '../../../../components/ui/card';

export function ProductCardList({ products = [], onAddToCart }) {
  return (
    <>
      <style>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        @media (max-width: 1024px) {
          .product-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 14px;
          }
        }

        @media (max-width: 768px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }

        @media (max-width: 480px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
        }

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

export function CategoryCardList({ categories = [] }) {
  return (
    <>
      <style>{`
        .category-section {
          padding: 0 clamp(16px, 4vw, 60px);
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        /* Laptop */
        @media (max-width: 1024px) {
          .category-grid {
            gap: 16px;
          }
        }

        /* iPad / Tablet */
        @media (max-width: 768px) {
          .category-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
          }
        }

        /* Mobile */
        @media (max-width: 480px) {
          .category-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
        }

        /* Small Mobile */
        @media (max-width: 360px) {
          .category-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }
      `}</style>

      <div className="category-section">
        <div className="category-grid">
          {categories.map((cat, i) => (
            <CategoryCard key={i} {...cat} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductCardList;