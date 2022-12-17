import React, { useContext, useEffect } from "react";

import { movieContext } from "../../context/movie-context";

import SelectedMovieCard from "../Ui/SelectedMovieCard/SelectedMovieCard";
import Alert from "@mui/material/Alert";

import "./Cart.css";

const Cart = (props) => {
  const context = useContext(movieContext);

  const { selectedMovies } = context.selectedMoviesState;
  const { totalMoviePrice } = context.selectedMoviesState;
  const { totalSelectedMovieCount } = context.selectedMoviesState;

  const handleClearShoppingCart = () => {
    context.selectedMoviedispatch({ type: "CLEAR_SELECTED_MOVIE" });
  };

  const handleOrderProduct = () => {
    props.setCartOpen(false);
    props.setOrderOpen(true);
    context.selectedMoviedispatch({ type: "CLEAR_SELECTED_MOVIE" });
  };

  useEffect(() => {
    const cartContainer = document.querySelector("#cart-container");
    cartContainer.style.top = `${document.documentElement.scrollTop}px`;
  }, []);

  return (
    <section id="cart-container">
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

        <header className="cart-title">
          <h3>Total Selected movies {totalSelectedMovieCount}</h3>
        </header>
        <div className="selected-movies-container">
          {selectedMovies.map((selectedMovie, index) => {
            return (
              <SelectedMovieCard
                key={index}
                currentMovie={selectedMovie}
                selectedMoviedispatch={context.selectedMoviedispatch}
              />
            );
          })}
        </div>
        {totalSelectedMovieCount !== 0 && (
          <>
            <div className="total-price-container price-container">
              <p>Total price: ${totalMoviePrice}</p>
            </div>
            {totalMoviePrice > 3 && (
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
        )}
      </div>
    </section>
  );
};

export default Cart;
