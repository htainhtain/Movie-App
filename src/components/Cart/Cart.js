import React, { useEffect } from "react";
import SelectedMovieCard from "../Ui/SelectedMovieCard/SelectedMovieCard";
import Alert from "@mui/material/Alert";

import "./Cart.css";

const Cart = (props) => {
  const handleClearShoppingCart = () => {
    props.setSelectedMovie([]);
    localStorage.setItem("SelectedMovies", JSON.stringify([]));
  };

  const handleOrderProduct = () => {
    props.setCartOpen(false);
    props.setOrderOpen(true);
    props.setSelectedMovie([]);
    localStorage.setItem("SelectedMovies", JSON.stringify([]));
  };

  useEffect(() => {
    const cartContainer = document.querySelector(".cart-container");
    cartContainer.style.top = `${document.documentElement.scrollTop}px`;
  }, []);

  return (
    <div className="cart-container">
      <div className="cart">
        {props.totalSelectedMovieCount < 4 ? (
          <Alert severity="info">
            Buy {4 - props.totalSelectedMovieCount} items more to get 10%
            discount.
          </Alert>
        ) : (
          <>
            {props.totalSelectedMovieCount < 6 ? (
              <>
                <Alert severity="info">
                  Buy {6 - props.totalSelectedMovieCount} items more to get 20%
                  discount.
                </Alert>
              </>
            ) : (
              <>
                <Alert severity="info">You got 20% discount.</Alert>
              </>
            )}
          </>
        )}

        <div className="cart-title">
          <h3>Total Selected movies {props.totalSelectedMovieCount}</h3>
        </div>
        <div className="selected-movies-container">
          {props.selectedMovie.map((selectedMovie, index) => {
            return (
              <SelectedMovieCard
                key={index}
                selectedMovieIndex={index}
                selectedMovies={props.selectedMovie}
                currentMovie={selectedMovie}
                setSelectedMovie={props.setSelectedMovie}
                selectedMovie={selectedMovie}
              />
            );
          })}
        </div>
        {props.totalSelectedMovieCount !== 0 ? (
          <>
            <div className="total-price-container price-container">
              <p>Total price: ${props.totlaMoviePrice}</p>
            </div>
            {props.totalSelectedMovieCount > 3 ? (
              <div className="discount-price-container price-container">
                <p>
                  After discount: ${" "}
                  {props.totalSelectedMovieCount > 3
                    ? props.totalSelectedMovieCount > 5
                      ? props.totlaMoviePrice -
                        (props.totlaMoviePrice * 20) / 100
                      : props.totlaMoviePrice -
                        (props.totlaMoviePrice * 10) / 100
                    : props.totlaMoviePrice}
                </p>
              </div>
            ) : (
              <></>
            )}
            <div className="order-product-container">
              <button className="order-product" onClick={handleOrderProduct}>
                Order product
              </button>
            </div>
            <div
              className="clear-shopping-cart-container"
              onClick={handleClearShoppingCart}
            >
              <span>Clear shopping cart</span>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Cart;
