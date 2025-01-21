import React from "react";
import "./offer.css";

const Offer = () => {
  return (
    <div className="offer-page">
      <h1 className="offer-heading">Special Offers Just for You!</h1>
      <div className="offer-cards">
        {/* Welcome Offer Card */}
        <div className="offer-card">
          <h2>Welcome New User!</h2>
          <p>Get 50% off on your first order!</p>
          <div className="coupon-code">
            <span>Coupon Code:</span>
            <strong>WELCOME50</strong>
          </div>
        </div>

        {/* Subsequent Order Offer Card */}
        <div className="offer-card">
          <h2>25% Off on Subsequent Orders</h2>
          <p>Enjoy 25% off on your next order!</p>
          <div className="coupon-code">
            <span>Coupon Code:</span>
            <strong>GET25</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
