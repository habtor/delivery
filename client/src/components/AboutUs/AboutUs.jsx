import React from "react";
import "./AboutUs.css";
const AboutUs = () => {
  return (
    <div id="about-us" className="about-us-container">
      <div className="about-us-heading">
        <p>Easy Steps</p>
        <h2>Delivering with us is simple</h2>
      </div>
      <div className="about-us-imgs">
        <div className="img img1">
          <div className="img-details">
            <h3>1</h3>
            <h2>Simple</h2>
            <p>A simple way to request a delvery and pay for it.</p>
          </div>
        </div>
        <div className="img img2">
          <div className="img-details">
            <h3>2</h3>
            <h2>Fast</h2>
            <p>Our drivers know their ways to you</p>
          </div>
        </div>
        <div className="img img3">
          <div className="img-details">
            <h3>3</h3>
            <h2>Guaranteed</h2>
            <p>Guaranteed delivery to your doorstep</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
