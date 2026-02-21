import React from "react";

export default function EcommerceHome() {
  return (
    <div className="font-sans text-gray-800">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 shadow">
        <div className="text-2xl font-bold">ShopLogo</div>
        <nav className="space-x-6 hidden md:block">
          <a href="#" className="hover:text-black">Home</a>
          <a href="#" className="hover:text-black">Shop</a>
          <a href="#" className="hover:text-black">About</a>
          <a href="#" className="hover:text-black">Contact</a>
        </nav>
        <div className="space-x-4">
          <button>🔍</button>
          <button>🛒</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-8 bg-gray-100 p-8">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">New Season Arrivals</h1>
          <p className="mb-6 text-gray-600">Discover the latest trends and styles for everyone.</p>
          <button className="bg-black text-white px-6 py-3 rounded w-fit">Shop Now</button>
        </div>
        <div className="bg-gray-300 h-64 md:h-auto flex items-center justify-center">
          <span className="text-gray-500">Hero Image</span>
        </div>
      </section>

      {/* Collections */}
      <section className="grid md:grid-cols-3 gap-6 p-8">
        {[
          { title: "Women Collection" },
          { title: "Men Collection" },
          { title: "Kids Collection" },
        ].map((item, index) => (
          <div key={index} className="bg-gray-100 p-6 text-center rounded">
            <div className="bg-gray-300 h-32 mb-4 flex items-center justify-center">Image</div>
            <h3 className="font-semibold mb-2">{item.title}</h3>
            <button className="text-sm underline">Shop Now</button>
          </div>
        ))}
      </section>

      {/* Trending Products */}
      <section className="p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Our Trendy Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="border p-4 rounded">
              <div className="bg-gray-300 h-32 mb-3 flex items-center justify-center">Product</div>
              <h4 className="font-medium">Product Name</h4>
              <p className="text-sm text-gray-500">$25.00</p>
              <button className="mt-2 text-sm bg-black text-white px-3 py-1 rounded">Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* Promo Section */}
      <section className="grid md:grid-cols-2 gap-8 bg-gray-100 p-8">
        <div>
          <h2 className="text-3xl font-bold mb-4">Deal of the Week</h2>
          <p className="mb-6 text-gray-600">Up to 50% off selected items. Don’t miss out!</p>
          <button className="bg-black text-white px-6 py-3 rounded">Shop Deals</button>
        </div>
        <div className="bg-gray-300 h-48 flex items-center justify-center">Promo Image</div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 p-8">
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <h4 className="font-bold mb-3">ShopLogo</h4>
            <p className="text-sm">Your one-stop fashion store.</p>
          </div>
          <div>
            <h4 className="font-bold mb-3">Links</h4>
            <ul className="space-y-2 text-sm">
              <li>Home</li>
              <li>Shop</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Help</h4>
            <ul className="space-y-2 text-sm">
              <li>FAQs</li>
              <li>Shipping</li>
              <li>Returns</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Newsletter</h4>
            <input
              type="email"
              placeholder="Your email"
              className="w-full p-2 rounded text-black"
            />
          </div>
        </div>
        <p className="text-center text-sm mt-6">© 2026 ShopLogo. All rights reserved.</p>
      </footer>
    </div>
  );
}
