import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  removeItem,
  updateQuantity,
  selectCartItems,
  selectCartCount,
  selectCartTotal,
} from './CartSlice';
import './App.css';

function CartNavbar() {
  const cartCount = useSelector(selectCartCount);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <span className="leaf">🌿</span> Paradise Nursery
      </Link>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/plants" className="nav-link">Plants</Link>
        <Link to="/cart" className="cart-nav-link">
          <span className="cart-icon">🛒</span>
          <span className="cart-badge">{cartCount}</span>
          Cart
        </Link>
      </div>
    </nav>
  );
}

function CartItem() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const cartCount = useSelector(selectCartCount);
  const cartTotal = useSelector(selectCartTotal);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleIncrease = (id, currentQty) => {
    dispatch(updateQuantity({ id, quantity: currentQty + 1 }));
  };

  const handleDecrease = (id, currentQty) => {
    if (currentQty > 1) {
      dispatch(updateQuantity({ id, quantity: currentQty - 1 }));
    } else {
      dispatch(removeItem(id));
    }
  };

  const handleDelete = (id) => {
    dispatch(removeItem(id));
  };

  return (
    <div className="cart-page">
      <CartNavbar />

      <div className="cart-header-section">
        <h1>Your Cart</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: 6 }}>
          {cartCount === 0
            ? 'Your cart is empty'
            : `${cartCount} plant${cartCount !== 1 ? 's' : ''} ready for a new home`}
        </p>
      </div>

      {items.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-icon">🪴</div>
          <h2>Your cart is empty</h2>
          <p style={{ marginBottom: 24 }}>Looks like you haven't added any plants yet.</p>
          <Link to="/plants" className="btn-continue" style={{ display: 'inline-flex' }}>
            ← Browse Plants
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-summary-bar">
            <div className="cart-totals">
              <div className="cart-total-item">
                <span className="cart-total-label">Total Plants</span>
                <span className="cart-total-value">{cartCount}</span>
              </div>
              <div className="cart-total-item">
                <span className="cart-total-label">Total Cost</span>
                <span className="cart-total-value">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <div className="cart-actions">
              <Link to="/plants" className="btn-continue">
                ← Continue Shopping
              </Link>
              <button
                className="btn-checkout"
                onClick={() => setShowCheckout(true)}
              >
                Checkout →
              </button>
            </div>
          </div>

          <hr className="cart-divider" />

          <div className="cart-items-list">
            {items.map(item => (
              <div className="cart-item-card" key={item.id}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-img"
                  onError={e => {
                    e.target.src = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80';
                  }}
                />
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-unit-price">
                    Unit price: ${item.price.toFixed(2)}
                  </div>
                  <div className="cart-item-quantity">
                    <button
                      className="qty-btn"
                      onClick={() => handleDecrease(item.id, item.quantity)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="qty-count">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => handleIncrease(item.id, item.quantity)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-item-right">
                  <span className="cart-item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {showCheckout && (
        <div
          className="checkout-modal-overlay"
          onClick={() => setShowCheckout(false)}
        >
          <div
            className="checkout-modal"
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-icon">🌿</div>
            <h2>Coming Soon!</h2>
            <p>
              Our checkout is being planted and will bloom shortly.
              Thank you for shopping with Paradise Nursery!
            </p>
            <button
              className="modal-close-btn"
              onClick={() => setShowCheckout(false)}
            >
              Keep Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItem;
