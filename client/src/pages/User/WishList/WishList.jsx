import React, { useState } from "react";
import "./WishList.css";

const initialWishlist = [
  {
    id: 1,
    name: "Oversized Cotton Shirt",
    brand: "Urban Vogue",
    price: 1499,
    oldPrice: 1999,
    discount: 25,
    image:
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Classic Denim Jacket",
    brand: "Street Mode",
    price: 2499,
    oldPrice: 3299,
    discount: 24,
    image:
      "https://images.unsplash.com/photo-1551537482-f2075a1ad2b9?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Slim Fit Black Trousers",
    brand: "Minimal",
    price: 1799,
    oldPrice: 2299,
    discount: 22,
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Leather Crossbody Bag",
    brand: "Luxe Line",
    price: 2999,
    oldPrice: 3999,
    discount: 25,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
  },
];

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(initialWishlist);

  const removeItem = (id) => {
    setWishlist((items) => items.filter((item) => item.id !== id));
  };

  const addToCart = (item) => {
    alert(`${item.name} added to cart`);
  };

  return (
    <div className="wishlist-page">
      {/* Header */}
      <header className="wishlist-header">
        <div>
          <p className="breadcrumb">Home / Wishlist</p>
          <h1>My Wishlist</h1>
          <p className="wishlist-count">
            {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
          </p>
        </div>
      </header>

      {/* Empty Wishlist */}
      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <div className="empty-icon">♡</div>
          <h2>Your wishlist is empty</h2>
          <p>
            Save your favorite fashion pieces here and come back when you're
            ready to shop.
          </p>
          <button className="shop-button">Continue Shopping</button>
        </div>
      ) : (
        <main className="wishlist-container">
          <div className="wishlist-grid">
            {wishlist.map((item) => (
              <article className="wishlist-card" key={item.id}>
                {/* Product Image */}
                <div className="product-image-wrapper">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="product-image"
                  />

                  <span className="discount-badge">
                    -{item.discount}%
                  </span>

                  <button
                    className="remove-button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name} from wishlist`}
                  >
                    ♥
                  </button>
                </div>

                {/* Product Details */}
                <div className="wishlist-product-details">
                  <p className="product-brand">{item.brand}</p>
                  <h3>{item.name}</h3>

                  <div className="price-row">
                    <span className="current-price">
                      ₹{item.price.toLocaleString("en-IN")}
                    </span>

                    <span className="old-price">
                      ₹{item.oldPrice.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <button
                    className="cart-button"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </main>
      )}
    </div>
  );
}

export default Wishlist;