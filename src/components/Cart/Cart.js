import React, { useEffect } from "react";
import SelectedMovieCard from "../Ui/SelectedMovieCard/SelectedMovieCard";
import Alert from "@mui/material/Alert";

import "./Cart.css";

const Cart = (props) => {
  const { selectedMovies } = props.selectedMoviesState;
  const { totalMoviePrice } = props.selectedMoviesState;
  const { totalSelectedMovieCount } = props.selectedMoviesState;

  const handleClearShoppingCart = () => {
    props.selectedMoviedispatch({ type: "CLEAR_SELECTED_MOVIE" });
    localStorage.setItem("SelectedMovies", JSON.stringify([]));
  };

  const handleOrderProduct = () => {
    props.setCartOpen(false);
    props.setOrderOpen(true);
    props.selectedMoviedispatch({ type: "CLEAR_SELECTED_MOVIE" });
    localStorage.setItem("SelectedMovies", JSON.stringify([]));
  };

  useEffect(() => {
    const cartContainer = document.querySelector(".cart-container");
    cartContainer.style.top = `${document.documentElement.scrollTop}px`;
  }, []);

  return (
    <div className="cart-container">
      <div className="cart">
        {totalSelectedMovieCount < 4 ? (
          <Alert severity="info">
            Buy {4 - totalSelectedMovieCount} items more to get 10% discount.
          </Alert>
        ) : (
          <>
            {totalSelectedMovieCount < 6 ? (
              <>
                <Alert severity="info">
                  Buy {6 - totalSelectedMovieCount} items more to get 20%
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
          <h3>Total Selected movies {totalSelectedMovieCount}</h3>
        </div>
        <div className="selected-movies-container">
          {selectedMovies.map((selectedMovie, index) => {
            return (
              <SelectedMovieCard
                key={index}
                selectedMovieIndex={index}
                currentMovie={selectedMovie}
                selectedMoviesState={props.selectedMoviesState}
                selectedMoviedispatch={props.selectedMoviedispatch}
              />
            );
          })}
        </div>
        {totalSelectedMovieCount !== 0 ? (
          <>
            <div className="total-price-container price-container">
              <p>Total price: ${totalMoviePrice}</p>
            </div>
            {totalMoviePrice > 3 ? (
              <div className="discount-price-container price-container">
                <p>
                  After discount: ${" "}
                  {totalSelectedMovieCount > 3
                    ? totalSelectedMovieCount > 5
                      ? totalMoviePrice - (totalMoviePrice * 20) / 100
                      : totalMoviePrice - (totalMoviePrice * 10) / 100
                    : totalMoviePrice}
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
