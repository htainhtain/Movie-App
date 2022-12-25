import React, { useContext, useEffect, useState } from "react";

import { movieContext } from "../../context/movie-context";

import Logo from "../Ui/Icons/Logo";
import ShoppingCart from "../Ui/Icons/ShoppingCart";
import Searchbar from "./Searchbar/Searchbar";
import MuiSlider from "../Ui/Slider/MuiSlider";

import MenuIcon from "@mui/icons-material/Menu";

import "./Navbar.css";

const Navbar = (props) => {
  const context = useContext(movieContext);

  const navBar = document.querySelector(".nav-bar");

  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    function handleWindowResize() {
      console.log("resize");
      setWindowSize(window.innerWidth);
      if (windowSize < 968 && navBar.classList.contains("mobile")) {
        navBar.classList.remove("mobile");
      }
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
    // console.log(window.innerWidth)
  }, [windowSize]);

  const { totalSelectedMovieCount } = context.selectedMoviesState;

  const menuHandler = (e) => {
    navBar.classList.toggle("mobile");
  };

  return (
    <nav className="nav-bar-container">
      <ul className="nav-bar">
        <div className="nav-bar-group first-group">
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
        <li className="nav-bar-group second-group">
          <Searchbar
            setSearchKeyword={props.setSearchKeyword}
            setTabVal={props.setTabVal}
          />
        </li>
        <div className="nav-bar-group third-group">
          <li className="price-range-slider-container">
            <MuiSlider
              priceUpperBound={props.priceUpperBound}
              setPriceUpperBound={props.setPriceUpperBound}
            />
          </li>
          <li>
            <button
              type="button"
              className="nav-bar-shopping-cart-container circle-red-container"
              onClick={props.cartOpenHandler}
            >
              <ShoppingCart />
              <div className="nav-bar-shopping-cart-count">
                {totalSelectedMovieCount}
              </div>
            </button>
          </li>
        </div>
        <div className="nav-bar-group fourth-group">
          <li className="nav-bar-menu-container">
            <MenuIcon className="nav-bar-menu" onClick={menuHandler} />
          </li>
        </div>
        <div className="nav-bar-group fifth-group">
          <li className="price-range-slider-container">
            <MuiSlider
              priceUpperBound={props.priceUpperBound}
              setPriceUpperBound={props.setPriceUpperBound}
            />
          </li>
          <li>
            <button
              type="button"
              className="nav-bar-shopping-cart-container circle-red-container"
              onClick={props.cartOpenHandler}
            >
              <ShoppingCart />
              <div className="nav-bar-shopping-cart-count">
                {totalSelectedMovieCount}
              </div>
            </button>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
