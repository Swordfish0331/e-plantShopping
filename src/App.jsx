import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import ProductList from './ProductList';
import CartItem from './CartItem';
import AboutUs from './AboutUs';
import './App.css';

function LandingPage() {
  return (
    <div className="landing-container">
      <div className="landing-overlay" />
      <div className="landing-content">
        <div className="landing-badge">✦ Est. 2018 · Sustainably Grown</div>
        <h1 className="landing-title">
          Welcome to <span>Paradise</span> Nursery
        </h1>
        <p className="landing-description">
          Discover a curated collection of beautiful, health-promoting houseplants
          — hand-selected and sustainably sourced to bring nature's calm into
          your home, one leaf at a time.
        </p>
        <Link to="/plants" className="get-started-btn">
          Get Started <span className="arrow">→</span>
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/plants" element={<ProductList />} />
          <Route path="/cart" element={<CartItem />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
