import React, { useState } from "react";
import "./Cart.css";

const initialCart = [
  {
    id: 1,
    name: "Oversized Cotton Shirt",
    brand: "Urban Vogue",
    size: "M",
    color: "White",
    price: 1499,
    oldPrice: 1999,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    name: "Classic Denim Jacket",
    brand: "Street Mode",
    size: "L",
    color: "Blue",
    price: 2499,
    oldPrice: 3299,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1551537482-f2075a1ad2b9?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    name: "Leather Crossbody Bag",
    brand: "Luxe Line",
    size: "One Size",
    color: "Brown",
    price: 2999,
    oldPrice: 3999,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80",
  },
];

function Cart() {
  const [cart, setCart] = useState(initialCart);
  const [coupon, setCoupon] = useState("");

  const increaseQuantity = (id) => {
    setCart((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((items) =>
      items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        )
    );
  };

  const removeItem = (id) => {
    setCart((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const originalTotal = cart.reduce(
    (total, item) => total + item.oldPrice * item.quantity,
    0
  );

  const discount = originalTotal - subtotal;
  const deliveryCharge = subtotal >= 2999 || subtotal === 0 ? 0 : 99;
  const total = subtotal + deliveryCharge;

  return (
    <div className="cart-page">
      {/* Header */}
      <header className="cart-header">
        <p className="breadcrumb">Home / Shopping Cart</p>
        <h1>Shopping Cart</h1>
        <p className="cart-count">
          {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
        </p>
      </header>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛍️</div>
          <h2>Your cart is empty</h2>
          <p>
            Looks like you haven't added anything to your cart yet.
          </p>
          <button className="continue-shopping">
            Continue Shopping
          </button>
        </div>
      ) : (
        <main className="cart-container">
          {/* Left Side */}
          <section className="cart-items">
            <div className="cart-section-title">
              <h2>Your Items</h2>
              <span>{cart.length} products</span>
            </div>

            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                {/* Image */}
                <div className="cart-product-image">
                  <img src={item.image} alt={item.name} />
                </div>

                {/* Product Details */}
                <div className="cart-product-details">
                  <div>
                    <p className="cart-brand">{item.brand}</p>
                    <h3>{item.name}</h3>

                    <div className="product-meta">
                      <span>Size: {item.size}</span>
                      <span>Color: {item.color}</span>
                    </div>
                  </div>

                  <div className="cart-price">
                    <strong>
                      ₹{item.price.toLocaleString("en-IN")}
                    </strong>

                    <span>
                      ₹{item.oldPrice.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Quantity */}
                  <div className="cart-actions">
                    <div className="quantity-control">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="remove-item"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>

                    <button className="save-item">
                      ♡ Save for later
                    </button>
                  </div>
                </div>
              </article>
            ))}

            {/* Delivery Banner */}
            <div className="delivery-banner">
              <span className="delivery-icon">🚚</span>
              <div>
                <strong>Free delivery on orders above ₹2,999</strong>
                <p>Estimated delivery in 3–5 business days.</p>
              </div>
            </div>
          </section>

          {/* Right Side */}
          <aside className="order-summary">
            <h2>Order Summary</h2>

            {/* Coupon */}
            <div className="coupon-box">
              <p>Have a coupon?</p>

              <div className="coupon-input">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <button>Apply</button>
              </div>
            </div>

            <div className="summary-line">
              <span>MRP</span>
              <span>₹{originalTotal.toLocaleString("en-IN")}</span>
            </div>

            <div className="summary-line">
              <span>Discount</span>
              <span className="discount">
                - ₹{discount.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="summary-line">
              <span>Delivery</span>
              <span>
                {deliveryCharge === 0
                  ? "FREE"
                  : `₹${deliveryCharge}`}
              </span>
            </div>

            <div className="summary-divider" />

            <div className="summary-total">
              <span>Total</span>
              <strong>₹{total.toLocaleString("en-IN")}</strong>
            </div>

            <button className="checkout-button">
              Proceed to Checkout
              <span>→</span>
            </button>

            <div className="secure-checkout">
              🔒 Secure checkout
            </div>

            <div className="payment-methods">
              <span>UPI</span>
              <span>VISA</span>
              <span>Mastercard</span>
              <span>COD</span>
            </div>
          </aside>
        </main>
      )}
    </div>
  );
}

export default Cart;