import React, { useState } from "react";
import "./CheckOut.css";

const cartItems = [
  {
    id: 1,
    name: "Oversized Cotton Shirt",
    brand: "Urban Vogue",
    size: "M",
    color: "White",
    price: 1499,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 2,
    name: "Classic Denim Jacket",
    brand: "Street Mode",
    size: "L",
    color: "Blue",
    price: 2499,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1551537482-f2075a1ad2b9?auto=format&fit=crop&w=300&q=80",
  },
];

const CheckOut = () => {
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [coupon, setCoupon] = useState("");

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryCharge =
    deliveryMethod === "express"
      ? 199
      : subtotal >= 2999
      ? 0
      : 99;

  const discount = coupon.toUpperCase() === "FASHION10"
    ? Math.round(subtotal * 0.1)
    : 0;

  const total = subtotal + deliveryCharge - discount;

  const placeOrder = (e) => {
    e.preventDefault();

    alert(
      `Order placed successfully!\nTotal: ₹${total.toLocaleString(
        "en-IN"
      )}`
    );
  };

  return (
    <div className="checkout-page">

      {/* Header */}
      <header className="checkout-header">
        <div className="checkout-logo">VOGUE<span>.</span></div>

        <div className="checkout-progress">
          <span className="active">Cart</span>
          <i>→</i>
          <span className="active">Checkout</span>
          <i>→</i>
          <span>Confirmation</span>
        </div>

        <div className="secure-text">
          🔒 Secure Checkout
        </div>
      </header>

      <form onSubmit={placeOrder} className="checkout-container">

        {/* LEFT COLUMN */}
        <div className="checkout-main">

          {/* Contact */}
          <section className="checkout-section">
            <div className="section-heading">
              <span>01</span>
              <div>
                <h2>Contact Information</h2>
                <p>We'll use this to send your order updates.</p>
              </div>
            </div>

            <div className="checkout-checkout-form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <label className="checkbox-label">
              <input type="checkbox" />
              <span>
                Email me with news and exclusive offers
              </span>
            </label>
          </section>

          {/* Shipping */}
          <section className="checkout-section">
            <div className="section-heading">
              <span>02</span>
              <div>
                <h2>Shipping Address</h2>
                <p>Where should we deliver your order?</p>
              </div>
            </div>

            <div className="checkout-checkout-form-grid">

              <div className="checkout-checkout-form-group">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="First name"
                  required
                />
              </div>

              <div className="checkout-checkout-form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Last name"
                  required
                />
              </div>

              <div className="checkout-checkout-form-group full">
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  required
                />
              </div>

              <div className="checkout-checkout-form-group full">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="House no., street, area"
                  required
                />
              </div>

              <div className="checkout-checkout-form-group">
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  required
                />
              </div>

              <div className="checkout-checkout-form-group">
                <label>State</label>
                <select required defaultValue="">
                  <option value="" disabled>
                    Select state
                  </option>
                  <option>Kerala</option>
                  <option>Karnataka</option>
                  <option>Tamil Nadu</option>
                  <option>Maharashtra</option>
                  <option>Delhi</option>
                  <option>Telangana</option>
                </select>
              </div>

              <div className="checkout-checkout-form-group">
                <label>PIN Code</label>
                <input
                  type="text"
                  placeholder="680001"
                  required
                />
              </div>

              <div className="checkout-checkout-form-group">
                <label>Country</label>
                <select defaultValue="India">
                  <option>India</option>
                </select>
              </div>
            </div>

            <label className="checkbox-label save-address">
              <input type="checkbox" />
              <span>Save this address for future orders</span>
            </label>
          </section>

          {/* Delivery */}
          <section className="checkout-section">
            <div className="section-heading">
              <span>03</span>
              <div>
                <h2>Delivery Method</h2>
                <p>Choose how you'd like to receive your order.</p>
              </div>
            </div>

            <div className="delivery-options">

              <label
                className={`delivery-option ${
                  deliveryMethod === "standard" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  value="standard"
                  checked={deliveryMethod === "standard"}
                  onChange={(e) =>
                    setDeliveryMethod(e.target.value)
                  }
                />

                <div className="delivery-content">
                  <strong>Standard Delivery</strong>
                  <span>3–5 business days</span>
                </div>

                <b>
                  {subtotal >= 2999 ? "FREE" : "₹99"}
                </b>
              </label>

              <label
                className={`delivery-option ${
                  deliveryMethod === "express" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  value="express"
                  checked={deliveryMethod === "express"}
                  onChange={(e) =>
                    setDeliveryMethod(e.target.value)
                  }
                />

                <div className="delivery-content">
                  <strong>Express Delivery</strong>
                  <span>1–2 business days</span>
                </div>

                <b>₹199</b>
              </label>
            </div>
          </section>

          {/* Payment */}
          <section className="checkout-section">
            <div className="section-heading">
              <span>04</span>
              <div>
                <h2>Payment Method</h2>
                <p>Your payment information is secure.</p>
              </div>
            </div>

            <div className="payment-tabs">

              <button
                type="button"
                className={paymentMethod === "upi" ? "active" : ""}
                onClick={() => setPaymentMethod("upi")}
              >
                UPI
              </button>

              <button
                type="button"
                className={paymentMethod === "card" ? "active" : ""}
                onClick={() => setPaymentMethod("card")}
              >
                Card
              </button>

              <button
                type="button"
                className={
                  paymentMethod === "cod" ? "active" : ""
                }
                onClick={() => setPaymentMethod("cod")}
              >
                Cash on Delivery
              </button>
            </div>

            {paymentMethod === "upi" && (
              <div className="payment-box">
                <div className="checkout-checkout-form-group">
                  <label>UPI ID</label>
                  <input
                    type="text"
                    placeholder="example@upi"
                    required
                  />
                </div>

                <p className="payment-note">
                  You will be redirected to your UPI app to
                  complete the payment.
                </p>
              </div>
            )}

            {paymentMethod === "card" && (
              <div className="payment-box">
                <div className="checkout-checkout-form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>

                <div className="checkout-checkout-form-grid">
                  <div className="checkout-checkout-form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      required
                    />
                  </div>

                  <div className="checkout-checkout-form-group">
                    <label>CVV</label>
                    <input
                      type="password"
                      placeholder="•••"
                      maxLength="3"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "cod" && (
              <div className="payment-box cod-box">
                <span>💵</span>
                <div>
                  <strong>Cash on Delivery</strong>
                  <p>
                    Pay when your order arrives at your doorstep.
                  </p>
                </div>
              </div>
            )}
          </section>

        </div>

        {/* RIGHT COLUMN */}
        <aside className="checkout-summary">

          <h2>Order Summary</h2>

          {/* Products */}
          <div className="checkout-products">
            {cartItems.map((item) => (
              <div className="checkout-product" key={item.id}>
                <div className="checkout-product-image">
                  <img src={item.image} alt={item.name} />
                  <span>{item.quantity}</span>
                </div>

                <div className="checkout-product-info">
                  <strong>{item.name}</strong>
                  <p>
                    {item.size} / {item.color}
                  </p>
                </div>

                <b>
                  ₹{(item.price * item.quantity).toLocaleString(
                    "en-IN"
                  )}
                </b>
              </div>
            ))}
          </div>

          {/* Coupon */}
          <div className="checkout-coupon">
            <div>
              <input
                type="text"
                placeholder="Coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />

              <button
                type="button"
                onClick={() => {
                  if (coupon.toUpperCase() === "FASHION10") {
                    alert("10% discount applied!");
                  } else {
                    alert("Try coupon: FASHION10");
                  }
                }}
              >
                Apply
              </button>
            </div>

            <small>
              Try <strong>FASHION10</strong> for 10% off
            </small>
          </div>

          {/* Price */}
          <div className="price-summary">

            <div>
              <span>Subtotal</span>
              <span>
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>

            <div>
              <span>Discount</span>
              <span className="green">
                - ₹{discount.toLocaleString("en-IN")}
              </span>
            </div>

            <div>
              <span>Delivery</span>
              <span>
                {deliveryCharge === 0
                  ? "FREE"
                  : `₹${deliveryCharge}`}
              </span>
            </div>

            <div className="summary-total">
              <strong>Total</strong>
              <strong>
                ₹{total.toLocaleString("en-IN")}
              </strong>
            </div>

            <small>Inclusive of all applicable taxes</small>
          </div>

          <button type="submit" className="place-order">
            Place Order
            <span>→</span>
          </button>

          <div className="checkout-trust">
            <div>🔒 Secure Payment</div>
            <div>↩ Easy Returns</div>
            <div>✓ Quality Assured</div>
          </div>

        </aside>
      </form>
    </div>
  );
}

export default CheckOut