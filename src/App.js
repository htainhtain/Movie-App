import React, { useEffect, useReducer, useState } from "react";

import axios from "axios";

import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import MuiTabs from "./components/Tabs/MuiTabs";
import Cart from "./components/Cart/Cart";
import Order from "./components/Order/Order";

// import './App.css'

const selectedMovieReducer = (prevState, action) => {
  if (action.type === "SELECTED_MOVIE_CHANGE") {
    const selectedMovies = action.selectedMovies;
    const totalSelectedMoviesCount = action.selectedMovies.length;
    let moviePrice = 0;
    selectedMovies.forEach((movie) => {
      moviePrice = moviePrice + Math.round(movie.price);
    });
    return {
      selectedMovies: selectedMovies,
      totalSelectedMovieCount: totalSelectedMoviesCount,
      totalMoviePrice: moviePrice,
    };
  }
  if (action.type === "SELECTED_MOVIE_DELETED") {
    const newSelectedMovies = prevState.selectedMovies.filter(
      (element) => !action.movieToDelete.includes(element)
    );
    const totalSelectedMoviesCount = newSelectedMovies.length;
    let moviePrice = 0;
    newSelectedMovies.forEach((movie) => {
      moviePrice = moviePrice + Math.round(movie.price);
    });
    return {
      selectedMovies: newSelectedMovies,
      totalSelectedMovieCount: totalSelectedMoviesCount,
      totalMoviePrice: moviePrice,
    };
  }
  if (action.type === "CLEAR_SELECTED_MOVIE") {
    const newSelectedMovies = [];
    const totalSelectedMoviesCount = 0;
    let moviePrice = 0;
    return {
      selectedMovies: newSelectedMovies,
      totalSelectedMovieCount: totalSelectedMoviesCount,
      totalMoviePrice: moviePrice,
    };
  }
};

function App() {
  //usestate states
  const [movies, setMovies] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [trailerKey, setTrailerKey] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [priceUpperBound, setPriceUpperBound] = useState(10);
  const [tabVal, setTabVal] = useState(0);

  //useReducer states
  const [selectedMoviesState, selectedMoviedispatch] = useReducer(
    selectedMovieReducer,
    {
      selectedMovies: [],
      totalSelectedMovieCount: 0,
      totalMoviePrice: 0,
    }
  );

  useEffect(() => {
    const selectedMovieInStorage = JSON.parse(
      localStorage.getItem("SelectedMovies") || "[]"
    );
    selectedMoviedispatch({
      type: "SELECTED_MOVIE_CHANGE",
      selectedMovies: selectedMovieInStorage,
    });
  }, []);

  const movieIndex = 3;
  // const nowPlayingMovieUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_KEY}`;
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
    const fetchData = async () => {
      const data = await axios.get(
        `${process.env.REACT_APP_TMDB_URL}now_playing?api_key=${process.env.REACT_APP_TMDB_KEY}`
      );
      setMovies(data.data.results);
      getMovieTrailer(data.data.results[movieIndex].id);
      setIsLoading(false);
    };

    fetchData().catch((err) => {
      console.log(err);
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

  return (
    <div className="app">
      <Navbar
        selectedMoviesState={selectedMoviesState}
        setSearchKeyword={setSearchKeyword}
        setTabVal={setTabVal}
        setCartOpen={setCartOpen}
        cartOpen={cartOpen}
        priceUpperBound={priceUpperBound}
        setPriceUpperBound={setPriceUpperBound}
      />
      {cartOpen && (
        <Cart
          selectedMoviesState={selectedMoviesState}
          selectedMoviedispatch={selectedMoviedispatch}
          setCartOpen={setCartOpen}
          setOrderOpen={setOrderOpen}
        />
      )}
      {orderOpen && <Order setOrderOpen={setOrderOpen} />}
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
        selectedMoviesState={selectedMoviesState}
        selectedMoviedispatch={selectedMoviedispatch}
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
