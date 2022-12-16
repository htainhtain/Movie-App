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

  const { totalSelectedMovieCount } = props.selectedMoviesState;

  return (
    <nav className="nav-bar-container">
      <ul className="nav-bar">
        <div className="nav-bar-group">
          <li className="nav-bar-logo-container circle-red-container">
            <Logo />
          </li>
          <li>
            <main>
              <header className="nav-bar-title-container">
                <h2 className="nav-bar-title">Movie</h2>
              </header>
            </main>
          </li>
        </div>
        <li>
          <Searchbar
            setSearchKeyword={props.setSearchKeyword}
            setTabVal={props.setTabVal}
          />
        </li>

        <div className="nav-bar-group">
          <li className="price-range-slider-container">
            <MuiSlider
              priceUpperBound={props.priceUpperBound}
              setPriceUpperBound={props.setPriceUpperBound}
            />
          </li>
          <li
            className="nav-bar-shopping-cart-container circle-red-container"
            onClick={handleShoppingCart}
          >
            <ShoppingCart />
            <div className="nav-bar-shopping-cart-count">
              {totalSelectedMovieCount}
            </div>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
