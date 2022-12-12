import React from "react";

import "./Navbar.css";

import Logo from "../Ui/Icons/Logo";
import ShoppingCart from "../Ui/Icons/ShoppingCart";
import Searchbar from "./Searchbar/Searchbar";

import MuiSlider from "../Ui/Slider/MuiSlider";

const Navbar = (props) => {
  const handleShoppingCart = (e) => {
    props.setCartOpen(!props.cartOpen);
  };

  const valuetext = (value) => {
    return `${value}$`;
  };

  return (
    <header className="nav-bar-container">
      <div className="nav-bar">
        <div className="nav-bar-group">
          <div className="nav-bar-logo-container circle-red-container">
            <Logo />
          </div>
          <div className="nav-bar-title-container">
            <h2 className="nav-bar-title">Movie</h2>
          </div>
        </div>
        <Searchbar
          setSearchKeyword={props.setSearchKeyword}
          setTabVal={props.setTabVal}
        />
        <div className="nav-bar-group">
          <div className="price-range-slider-container">
            <MuiSlider
              priceUpperBound={props.priceUpperBound}
              setPriceUpperBound={props.setPriceUpperBound}
            />
          </div>
          <div
            className="nav-bar-shopping-cart-container circle-red-container"
            onClick={handleShoppingCart}
          >
            <ShoppingCart />
            <div className="nav-bar-shopping-cart-count">
              {props.totalSelectedMovieCount}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
