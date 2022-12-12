import React, { useEffect } from "react";
import CountdownTimer from "./Countdown/CountdownTimer";

import "./Order.css";

const Order = (props) => {
  useEffect(() => {
    const orderContainer = document.querySelector(".order-container");
    orderContainer.style.top = `${document.documentElement.scrollTop}px`;
  }, []);

  return (
    <div className="order-container">
      <div className="order">
        <div className="order-description">
          <h3>Delivering to this location</h3>
        </div>
        <div className="order-location-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.452478728994!2d100.56172351532962!3d13.811846799619184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29c4e3f280e23%3A0x562ce7553058a71f!2sskuberg%20Co.%2CLtd.!5e0!3m2!1sen!2sth!4v1670850314856!5m2!1sen!2sth"
            width="600"
            height="450"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="skuberg"
            className="order-location"
          ></iframe>
        </div>
        <div className="countdown-timer">
          <CountdownTimer setOrderOpen={props.setOrderOpen} />
        </div>
      </div>
    </div>
  );
};

export default Order;
