import React, { useEffect, useState } from "react";

import axios from "axios";

import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import MuiTabs from "./components/Tabs/MuiTabs";
import Cart from "./components/Cart/Cart";
import Order from "./components/Order/Order";

// import './App.css'

function App() {
  const [movies, setMovies] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [trailerKey, setTrailerKey] = useState("");
  const [totalSelectedMovieCount, setTotalSelectedMovieCount] = useState(0);
  const [totlaMoviePrice, setTotalMoviePrice] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [priceUpperBound, setPriceUpperBound] = useState(5);

  const [tabVal, setTabVal] = useState(0);

  const selectedMovieInStorage = JSON.parse(
    localStorage.getItem("SelectedMovies") || "[]"
  );
  const [selectedMovie, setSelectedMovie] = useState(selectedMovieInStorage);

  const movieIndex = 3;
  const nowPlayingMovieUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_KEY}`;
  const heroImageUrl = `https://image.tmdb.org/t/p/original`;

  const getMovieTrailer = (moveId) => {
    if (moveId) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${moveId}/videos?api_key=${process.env.REACT_APP_TMDB_KEY}`
        )
        .then((response) => {
          setTrailerKey(response.data.results[0].key);
        });
    }
  };

  useEffect(() => {
    setTotalSelectedMovieCount(selectedMovie.length);
    let price = 0;
    selectedMovie.map((movie) => {
      console.log(Math.round(movie.price));
      price = price + Math.round(movie.price);
    });
    setTotalMoviePrice(price);
  }, [selectedMovie]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(nowPlayingMovieUrl);
      setMovies(data.data.results);
      getMovieTrailer(data.data.results[movieIndex].id);
      setIsLoading(false);
    };

    fetchData().catch((err) => {
      console.log(err);
    });
  }, [nowPlayingMovieUrl]);

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

  return (
    <div className="app">
      <Navbar
        totalSelectedMovieCount={totalSelectedMovieCount}
        setSearchKeyword={setSearchKeyword}
        setTabVal={setTabVal}
        setCartOpen={setCartOpen}
        cartOpen={cartOpen}
        priceUpperBound={priceUpperBound}
        setPriceUpperBound={setPriceUpperBound}
      />
      {cartOpen ? (
        <Cart
          totalSelectedMovieCount={totalSelectedMovieCount}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          totlaMoviePrice={totlaMoviePrice}
          setCartOpen={setCartOpen}
          setOrderOpen={setOrderOpen}
        />
      ) : (
        <></>
      )}
      {orderOpen ? <Order setOrderOpen={setOrderOpen} /> : <></>}
      <Hero
        movies={movies}
        isLoading={isLoading}
        heroImageUrl={heroImageUrl}
        movieIndex={movieIndex}
        trailerKey={trailerKey}
      />
      <MuiTabs
        movies={movies}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        heroImageUrl={heroImageUrl}
        setSelectedMovie={setSelectedMovie}
        selectedMovie={selectedMovie}
        nowPlayingMovieUrl={nowPlayingMovieUrl}
        setMovies={setMovies}
        getMovieTrailer={getMovieTrailer}
        movieIndex={movieIndex}
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
