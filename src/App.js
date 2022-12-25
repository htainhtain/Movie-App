import React, { useContext, useEffect, useState } from "react";

import { movieContext } from "./context/movie-context";

import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import MuiTabs from "./components/Tabs/MuiTabs";
import Cart from "./components/Cart/Cart";
import Order from "./components/Order/Order";

function App() {
  //context
  const context = useContext(movieContext);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [priceUpperBound, setPriceUpperBound] = useState(10);
  const [tabVal, setTabVal] = useState(0);

  useEffect(() => {
    const selectedMovieInStorage = JSON.parse(
      localStorage.getItem("SelectedMovies") || "[]"
    );
    context.selectedMoviedispatch({
      type: "SELECTED_MOVIE_CHANGE",
      selectedMovies: selectedMovieInStorage,
    });
  }, []);

  useEffect(() => {
    if (cartOpen) {
      document.body.classList.add("scroll-stop");
    } else {
      document.body.classList.remove("scroll-stop");
    }
  }, [cartOpen]);

  useEffect(() => {
    if (orderOpen) {
      document.body.classList.add("scroll-stop");
    } else {
      document.body.classList.remove("scroll-stop");
    }
  }, [orderOpen]);

  const handleTabChange = (event, value) => {
    setTabVal(value);
  };

  const cartOpenHandler = () => {
    setCartOpen(true);
  };

  const cartCloseHandler = () => {
    setCartOpen(false);
  };

  const orderOpenHandler = () => {
    setOrderOpen(true);
  };

  const orderCloseHandler = () => {
    setOrderOpen(false);
  };

  return (
    <div className="app">
      <Navbar
        setSearchKeyword={setSearchKeyword}
        setTabVal={setTabVal}
        cartOpenHandler={cartOpenHandler}
        priceUpperBound={priceUpperBound}
        setPriceUpperBound={setPriceUpperBound}
      />
      {cartOpen && (
        <Cart
          cartCloseHandler={cartCloseHandler}
          orderOpenHandler={orderOpenHandler}
        />
      )}
      {orderOpen && <Order orderCloseHandler={orderCloseHandler} />}
      <Hero />
      <MuiTabs
        searchKeyword={searchKeyword}
        setTabVal={setTabVal}
        tabVal={tabVal}
        handleTabChange={handleTabChange}
        priceUpperBound={priceUpperBound}
      />
    </div>
  );
}

export default App;
