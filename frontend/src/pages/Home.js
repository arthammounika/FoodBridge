import React from "react";
import "./Home.css";

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <h1>Welcome to Food Saver</h1>
        <p>Join us in the mission to eliminate hunger and save food</p>
      </div>

      {/* Blog Section */}
      <div className="blog-section">
        <h2>Our Blogs</h2>
        <div className="blog-container">
          {/* Blog 1 */}
          <div className="blog-card">
            <img src="/images/fight.jpeg" alt="Food donation drive" />
            <h3>Community Food Drive</h3>
            <p>Our recent food drive helped hundreds of families in need.</p>
            <button className="read-btn">Read More</button>
          </div>

          {/* Blog 2 */}
          <div className="blog-card">
            <img src="/images/volunteer.webp" alt="Volunteers distributing food" />
            <h3>Volunteer Stories</h3>
            <p>Hear from our amazing volunteers who dedicate their time.</p>
            <button className="read-btn">Read More</button>
          </div>

          {/* Blog 3 */}
          <div className="blog-card">
            <img src="/images/community.jpeg" alt="Children receiving food" />
            <h3>Impact on Children</h3>
            <p>Learn how our initiative supports children and families.</p>
            <button className="read-btn">Read More</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
