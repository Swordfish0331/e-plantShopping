import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addItem, selectCartCount } from './CartSlice';
import './App.css';

const plantCategories = [
  {
    id: 'aromatic',
    name: '🌿 Aromatic Plants',
    plants: [
      {
        id: 'lavender',
        name: 'Lavender',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1594228893280-7f6c4f8a7a6a?w=400&q=80',
        description: 'Calming fragrance, perfect for bedrooms and relaxation spaces.',
      },
      {
        id: 'rosemary',
        name: 'Rosemary',
        price: 9.99,
        image: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?w=400&q=80',
        description: 'Aromatic herb with a woodsy scent — great near a sunny window.',
      },
      {
        id: 'jasmine',
        name: 'Jasmine',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
        description: 'Sweet-scented white blooms that fill any room with fragrance.',
      },
      {
        id: 'mint',
        name: 'Peppermint',
        price: 7.99,
        image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=400&q=80',
        description: 'Refreshing and invigorating. Thrives in moist, well-lit spots.',
      },
      {
        id: 'basil',
        name: 'Sweet Basil',
        price: 6.99,
        image: 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=400&q=80',
        description: 'Beloved culinary herb with a sweet, clove-like fragrance.',
      },
      {
        id: 'lemon-thyme',
        name: 'Lemon Thyme',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=400&q=80',
        description: 'Citrus-scented herb ideal for cooking and indoor herb gardens.',
      },
    ],
  },
  {
    id: 'medicinal',
    name: '🌱 Medicinal Plants',
    plants: [
      {
        id: 'aloe-vera',
        name: 'Aloe Vera',
        price: 11.99,
        image: 'https://images.unsplash.com/photo-1572882620986-f6fbb6d90e59?w=400&q=80',
        description: 'Soothing gel for burns and skin care. Near-zero maintenance.',
      },
      {
        id: 'chamomile',
        name: 'Chamomile',
        price: 9.49,
        image: 'https://images.unsplash.com/photo-1590005354167-6da97870c757?w=400&q=80',
        description: 'Calming daisy-like flowers perfect for herbal teas.',
      },
      {
        id: 'echinacea',
        name: 'Echinacea',
        price: 13.99,
        image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400&q=80',
        description: 'Purple coneflower with well-known immune-supporting properties.',
      },
      {
        id: 'turmeric',
        name: 'Turmeric',
        price: 12.49,
        image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&q=80',
        description: 'Anti-inflammatory powerhouse with vibrant golden root.',
      },
      {
        id: 'calendula',
        name: 'Calendula',
        price: 8.49,
        image: 'https://images.unsplash.com/photo-1595547094038-da8ef63873bf?w=400&q=80',
        description: 'Cheerful orange blooms with skin-soothing properties.',
      },
      {
        id: 'ginger',
        name: 'Ginger',
        price: 10.99,
        image: 'https://images.unsplash.com/photo-1598524374912-7c66a624c4a5?w=400&q=80',
        description: 'Tropical plant with digestive benefits and bold flavour.',
      },
    ],
  },
  {
    id: 'tropical',
    name: '🌴 Tropical Plants',
    plants: [
      {
        id: 'monstera',
        name: 'Monstera Deliciosa',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&q=80',
        description: 'Iconic split leaves. A statement piece for any living space.',
      },
      {
        id: 'bird-of-paradise',
        name: 'Bird of Paradise',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=400&q=80',
        description: 'Dramatic, large leaves that evoke a lush tropical getaway.',
      },
      {
        id: 'pothos',
        name: 'Golden Pothos',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&q=80',
        description: 'Near-indestructible trailing vine perfect for beginners.',
      },
      {
        id: 'philodendron',
        name: 'Philodendron',
        price: 18.99,
        image: 'https://images.unsplash.com/photo-1604762524559-d0e8b8dd6f9e?w=400&q=80',
        description: 'Heart-shaped glossy leaves; effortlessly elegant indoors.',
      },
      {
        id: 'peace-lily',
        name: 'Peace Lily',
        price: 16.99,
        image: 'https://images.unsplash.com/photo-1591958911259-bee2173bdccc?w=400&q=80',
        description: 'White sail-shaped blooms and exceptional air-purifying ability.',
      },
      {
        id: 'snake-plant',
        name: 'Snake Plant',
        price: 19.99,
        image: 'https://images.unsplash.com/photo-1593691512429-23f7c3a6f4e5?w=400&q=80',
        description: 'Striking vertical leaves; thrives on neglect and low light.',
      },
    ],
  },
  {
    id: 'succulents',
    name: '🌵 Succulents & Cacti',
    plants: [
      {
        id: 'echeveria',
        name: 'Echeveria',
        price: 7.99,
        image: 'https://images.unsplash.com/photo-1446071103084-c257b5f70672?w=400&q=80',
        description: 'Rosette-shaped beauty in dusty pastels. Minimal water needed.',
      },
      {
        id: 'jade-plant',
        name: 'Jade Plant',
        price: 13.99,
        image: 'https://images.unsplash.com/photo-1616690248152-ef63f7a64462?w=400&q=80',
        description: 'Thick, glossy leaves and long lifespan — a true heirloom plant.',
      },
      {
        id: 'haworthia',
        name: 'Haworthia',
        price: 9.99,
        image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&q=80',
        description: 'Compact spiky rosettes that flourish in indirect light.',
      },
      {
        id: 'barrel-cactus',
        name: 'Barrel Cactus',
        price: 15.99,
        image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=400&q=80',
        description: 'Architectural statement piece. Watering once a month is plenty.',
      },
      {
        id: 'zebra-plant',
        name: 'Zebra Plant',
        price: 11.49,
        image: 'https://images.unsplash.com/photo-1566842600175-97dca489844f?w=400&q=80',
        description: 'Striking white-striped leaves; conversation-starting desk plant.',
      },
      {
        id: 'string-of-pearls',
        name: 'String of Pearls',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&q=80',
        description: 'Cascading bead-like foliage; stunning in hanging planters.',
      },
    ],
  },
];

function Navbar() {
  const cartCount = useSelector(selectCartCount);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <span className="leaf">🌿</span> Paradise Nursery
      </Link>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/plants" className="nav-link active">Plants</Link>
        <Link to="/cart" className="cart-nav-link">
          <span className="cart-icon">🛒</span>
          <span className="cart-badge">{cartCount}</span>
          Cart
        </Link>
      </div>
    </nav>
  );
}

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [addedIds, setAddedIds] = useState(
    () => new Set(cartItems.map(i => i.id))
  );

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedIds(prev => new Set([...prev, plant.id]));
  };

  return (
    <div className="products-page">
      <Navbar />
      <div className="products-header">
        <h1>Our Plant Collection</h1>
        <p>Hand-picked varieties for every space and skill level</p>
      </div>

      {plantCategories.map(category => (
        <div className="category-section" key={category.id}>
          <h2 className="category-title">{category.name}</h2>
          <hr className="category-divider" />
          <div className="plants-grid">
            {category.plants.map(plant => (
              <div className="plant-card" key={plant.id}>
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="plant-img"
                  onError={e => {
                    e.target.src = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80';
                  }}
                />
                <div className="plant-info">
                  <div className="plant-name">{plant.name}</div>
                  <p className="plant-desc">{plant.description}</p>
                  <div className="plant-footer">
                    <span className="plant-price">${plant.price.toFixed(2)}</span>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedIds.has(plant.id)}
                    >
                      {addedIds.has(plant.id) ? '✓ Added' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export { Navbar };
export default ProductList;
