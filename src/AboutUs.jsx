import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1 className="about-title">About Paradise Nursery</h1>
        <p className="about-tagline">Where Every Leaf Tells a Story</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2018, Paradise Nursery began as a small greenhouse tucked
            in the hills of Northern California. What started as a personal
            passion for bringing the calming beauty of nature indoors has grown
            into a beloved destination for plant enthusiasts across the country.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            We believe every home deserves a touch of green. Our mission is to
            make it effortless to find, purchase, and care for the perfect
            houseplant — whether you're a seasoned botanist or a first-time
            plant parent. We hand-select every variety in our catalog for
            health, beauty, and ease of care.
          </p>
        </section>

        <section className="about-section">
          <h2>What We Offer</h2>
          <p>
            From fragrant aromatic herbs to healing medicinal plants, lush
            tropical foliage to sculptural succulents — our curated collection
            spans a wide range of species suited for any space and lifestyle.
            Each plant ships with personalized care instructions so you can help
            it thrive from day one.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Promise</h2>
          <p>
            Every plant we sell is sustainably sourced and nurtured with organic
            practices. We partner with local growers who share our commitment to
            the environment. If your plant doesn't arrive in perfect condition,
            we'll make it right — guaranteed.
          </p>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;
