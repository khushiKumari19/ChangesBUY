import React from 'react';
import './style.css';
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";


const Dashboard = () => {
  const location = window.location;
  const auth = useSelector((state)=>state.auth)
  const search = useLocation().search;
  const cars = new URLSearchParams(search).get("cars");
  const tokens = new URLSearchParams(location.search).get("tokens");
  const id = new URLSearchParams(useLocation().search).get('id');
  const prices = new URLSearchParams(search).get("prices");
  return (
    <div className="user-dashboard-container">
      <div className="user-dashboard-header">
        <h2>USER DASHBOARD</h2>
      </div>
      <div className="user-dashboard-content">
        <div className="user-details">
          <h2>My Profile</h2>
          <div className="user-details-item">
            <h4>First name:</h4>
            <p>{auth.user.firstName}</p>
          </div>
		<div className="user-details-item">
            <h4>Last name:</h4>
            <p>{auth.user.lastName}</p>
          </div>
          <div className="user-details-item">
            <h4>Email:</h4>
            <p>{auth.user.email}</p>
          </div>
        
        </div>
        <div className="user-orders">
          <h2>My Orders</h2>
          <div className="user-order">
            <div className="user-order-header">
              <p>Order ID: {id}</p>
            </div>
            <div className="user-order-items">
              <div className="user-order-item">
              {/* {images.map((image, index) => (
                  <img key={index} src={image} alt="car" />
                ))}                */}
                 <div>
                  <h4>{cars}</h4>
                  <p>No of tokens: {tokens}</p>
                  <p>Prices: {prices}</p>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
