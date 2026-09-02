import React, { useState } from "react";
import "./Orders.css";

const initialOrders = [
  {
    id: "ORD-20260901-001",
    date: "01 Sep 2026",
    status: "Delivered",
    statusType: "delivered",
    deliveryDate: "05 Sep 2026",
    total: 3998,
    payment: "Paid",
    items: [
      {
        id: 1,
        name: "Oversized Cotton Shirt",
        brand: "Urban Vogue",
        size: "M",
        color: "White",
        quantity: 1,
        price: 1499,
        image:
          "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=300&q=80",
      },
      {
        id: 2,
        name: "Classic Denim Jacket",
        brand: "Street Mode",
        size: "L",
        color: "Blue",
        quantity: 1,
        price: 2499,
        image:
          "https://images.unsplash.com/photo-1551537482-f2075a1ad2b9?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
  {
    id: "ORD-20260825-002",
    date: "25 Aug 2026",
    status: "Out for Delivery",
    statusType: "shipping",
    deliveryDate: "Today",
    total: 2999,
    payment: "Paid",
    items: [
      {
        id: 3,
        name: "Leather Crossbody Bag",
        brand: "Luxe Line",
        size: "One Size",
        color: "Brown",
        quantity: 1,
        price: 2999,
        image:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
  {
    id: "ORD-20260810-003",
    date: "10 Aug 2026",
    status: "Processing",
    statusType: "processing",
    deliveryDate: "13 Aug 2026",
    total: 1799,
    payment: "Paid",
    items: [
      {
        id: 4,
        name: "Slim Fit Black Trousers",
        brand: "Minimal",
        size: "32",
        color: "Black",
        quantity: 1,
        price: 1799,
        image:
          "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
  {
    id: "ORD-20260720-004",
    date: "20 Jul 2026",
    status: "Cancelled",
    statusType: "cancelled",
    deliveryDate: "-",
    total: 1499,
    payment: "Refunded",
    items: [
      {
        id: 5,
        name: "Premium Cotton T-Shirt",
        brand: "Essential",
        size: "M",
        color: "Black",
        quantity: 1,
        price: 1499,
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=300&q=80",
      },
    ],
  },
];

const Orders = () => {
  const [orders] = useState(initialOrders);
  const [activeTab, setActiveTab] = useState("All");
  const [expandedOrder, setExpandedOrder] = useState(null);

  const tabs = [
    "All",
    "Processing",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ];

  const filteredOrders =
    activeTab === "All"
      ? orders
      : orders.filter((order) => order.status === activeTab);

  const toggleOrder = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  const trackOrder = (order) => {
    alert(`Tracking order ${order.id}`);
  };

  const buyAgain = (order) => {
    alert(`Items from ${order.id} added to cart`);
  };

  return (
    <div className="orders-page">

      {/* Header */}
      <header className="orders-header">
        <div>
          <p className="breadcrumb">Home / My Account / Orders</p>
          <h1>My Orders</h1>
          <p className="orders-subtitle">
            Track and manage your recent purchases
          </p>
        </div>
      </header>

      <main className="orders-container">

        {/* Tabs */}
        <div className="orders-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}

              <span>
                {tab === "All"
                  ? orders.length
                  : orders.filter(
                      (order) => order.status === tab
                    ).length}
              </span>
            </button>
          ))}
        </div>

        {/* Orders */}
        {filteredOrders.length === 0 ? (
          <div className="empty-orders">
            <div className="empty-orders-icon">📦</div>
            <h2>No orders found</h2>
            <p>
              You don't have any orders in this category yet.
            </p>
            <button>Start Shopping</button>
          </div>
        ) : (
          <div className="orders-list">

            {filteredOrders.map((order) => (
              <article className="order-card" key={order.id}>

                {/* Order Header */}
                <div className="order-top">
                  <div className="order-info">
                    <div>
                      <span className="order-label">
                        ORDER ID
                      </span>
                      <strong>{order.id}</strong>
                    </div>

                    <div>
                      <span className="order-label">
                        ORDER DATE
                      </span>
                      <strong>{order.date}</strong>
                    </div>

                    <div>
                      <span className="order-label">
                        TOTAL
                      </span>
                      <strong>
                        ₹{order.total.toLocaleString("en-IN")}
                      </strong>
                    </div>
                  </div>

                  <span
                    className={`order-status ${order.statusType}`}
                  >
                    <i></i>
                    {order.status}
                  </span>
                </div>

                {/* Products */}
                <div className="order-products">

                  {order.items.map((item) => (
                    <div className="order-product" key={item.id}>

                      <div className="order-product-image">
                        <img
                          src={item.image}
                          alt={item.name}
                        />
                        <span>{item.quantity}</span>
                      </div>

                      <div className="order-product-details">
                        <p className="product-brand">
                          {item.brand}
                        </p>

                        <h3>{item.name}</h3>

                        <p className="product-variant">
                          Size: {item.size} &nbsp; | &nbsp;
                          Color: {item.color}
                        </p>

                        <strong>
                          ₹{item.price.toLocaleString("en-IN")}
                        </strong>
                      </div>

                    </div>
                  ))}

                </div>

                {/* Delivery Info */}
                {order.status !== "Cancelled" && (
                  <div className="delivery-info">

                    <div className="delivery-icon">
                      {order.status === "Delivered"
                        ? "✓"
                        : "🚚"}
                    </div>

                    <div>
                      <strong>
                        {order.status === "Delivered"
                          ? `Delivered on ${order.deliveryDate}`
                          : order.status === "Out for Delivery"
                          ? "Your order is arriving today"
                          : `Expected delivery: ${order.deliveryDate}`}
                      </strong>

                      <p>
                        {order.status === "Delivered"
                          ? "We hope you enjoy your purchase."
                          : "You can track your package for the latest updates."}
                      </p>
                    </div>

                  </div>
                )}

                {/* Expanded Details */}
                {expandedOrder === order.id && (
                  <div className="expanded-details">

                    <div>
                      <span>Payment</span>
                      <strong>{order.payment}</strong>
                    </div>

                    <div>
                      <span>Delivery Address</span>
                      <strong>
                        24 Fashion Street, Thrissur,
                        Kerala - 680001
                      </strong>
                    </div>

                    <div>
                      <span>Delivery Method</span>
                      <strong>Standard Delivery</strong>
                    </div>

                  </div>
                )}

                {/* Actions */}
                <div className="order-actions">

                  <button
                    className="view-button"
                    onClick={() => toggleOrder(order.id)}
                  >
                    {expandedOrder === order.id
                      ? "Hide Details"
                      : "View Details"}
                  </button>

                  {order.status !== "Cancelled" &&
                    order.status !== "Delivered" && (
                      <button
                        className="track-button"
                        onClick={() => trackOrder(order)}
                      >
                        Track Order
                        <span>→</span>
                      </button>
                    )}

                  {order.status === "Delivered" && (
                    <button
                      className="track-button"
                      onClick={() => buyAgain(order)}
                    >
                      Buy Again
                      <span>→</span>
                    </button>
                  )}

                </div>

              </article>
            ))}

          </div>
        )}

      </main>
    </div>
  );
}

export default Orders;