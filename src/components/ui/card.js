'use client';

import './card.css';

export function ProductCard({ image, name, price, originalPrice, badge, onAddToCart }) {
  const isOnSale = !!originalPrice;

  return (
    <div className="card">
      <div className="card__image-wrapper">
        {badge && (
          <span className={`card__badge ${isOnSale ? 'card__badge--sale' : ''}`}>{badge}</span>
        )}
        <button className="card__wishlist" aria-label="Add to wishlist">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
        <img src={image} alt={name} className="card__image"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center' }} />
      </div>
      <div className="card__body">
        <h3 className="card__name">{name}</h3>
        <div className="card__price-row">
          <span className={`card__price ${isOnSale ? 'card__price--sale' : ''}`}>
            ₱{Number(price).toLocaleString('en-PH')}
          </span>
          {isOnSale && (
            <span className="card__price card__price--original">₱{Number(originalPrice).toLocaleString('en-PH')}</span>
          )}
        </div>
        <button className="card__btn" onClick={() => onAddToCart?.({ name, price })}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export function CategoryCard({ image, title, href = '#' }) {
  return (
    <div className="category-card" style={{ height: '500px' }}>
      <img src={image} alt={title} className="category-card__image" />
      <div className="category-card__overlay" />
      <div className="category-card__content">
        <h3 className="category-card__title">{title}</h3>
        <button className="category-card__btn">Shop Now</button>
      </div>
    </div>
  );
}

export default ProductCard;