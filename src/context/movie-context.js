import React, { createContext, useState, useEffect, useReducer } from "react";

import axios from "axios";

export const movieContext = createContext({
  movies: {},
  setMovies: () => {},
  trailerKey: "",
  isLoading: () => {},
  handleLoading: () => {},
  closeLoading: () => {},
  getMovieTrailer: (movieId) => {},
  movieIndex: 0,
  selectedMoviesState: {},
  selectedMoviedispatch: () => {},
});

const selectedMovieReducer = (prevState, action) => {
  if (action.type === "SELECTED_MOVIE_CHANGE") {
    const prevSelectedMovies = prevState.selectedMovies;
    const selectedMovies = prevSelectedMovies.concat(action.selectedMovies);
    const totalSelectedMoviesCount = selectedMovies.length;
    const totalMoviePrice = selectedMovies.reduce(
      (prevTotalPrice, movie) => prevTotalPrice + Math.round(movie.price),
      0
    );
    localStorage.setItem("SelectedMovies", JSON.stringify(selectedMovies));
    return {
      selectedMovies: selectedMovies,
      totalSelectedMovieCount: totalSelectedMoviesCount,
      totalMoviePrice: totalMoviePrice,
    };
  }

  if (action.type === "SELECTED_MOVIE_DELETED") {
    const newSelectedMovies = prevState.selectedMovies.filter(
      (element) => !action.movieToDelete.includes(element)
    );
    const totalSelectedMoviesCount = newSelectedMovies.length;
    localStorage.setItem("SelectedMovies", JSON.stringify(newSelectedMovies));
    const totalMoviePrice = newSelectedMovies.reduce(
      (prevTotalPrice, movie) => prevTotalPrice + Math.round(movie.price),
      0
    );
    return {
      selectedMovies: newSelectedMovies,
      totalSelectedMovieCount: totalSelectedMoviesCount,
      totalMoviePrice: totalMoviePrice,
    };
  }
  if (action.type === "CLEAR_SELECTED_MOVIE") {
    const newSelectedMovies = [];
    const totalSelectedMoviesCount = 0;
    localStorage.setItem("SelectedMovies", JSON.stringify([]));
    let moviePrice = 0;
    return {
      selectedMovies: newSelectedMovies,
      totalSelectedMovieCount: totalSelectedMoviesCount,
      totalMoviePrice: moviePrice,
    };
  }
};

const MovieContextProvider = (props) => {
  const movieIndex = 3;

  //usestates
  const [movies, setMovies] = useState({});
  const [trailerKey, setTrailerKey] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  //loading states
  const handleLoading = () => {
    setIsLoading(true);
  };

  const closeLoading = () => {
    setIsLoading(false);
  };

  //useReducer states
  const [selectedMoviesState, selectedMoviedispatch] = useReducer(
    selectedMovieReducer,
    {
      selectedMovies: [],
      totalSelectedMovieCount: 0,
      totalMoviePrice: 0,
    }
  );

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

  return (
    <movieContext.Provider
      value={{
        movies: movies,
        setMovies: setMovies,
        trailerKey: trailerKey,
        isLoading: isLoading,
        handleLoading: handleLoading,
        closeLoading: closeLoading,
        getMovieTrailer: getMovieTrailer,
        movieIndex: movieIndex,
        selectedMoviesState: selectedMoviesState,
        selectedMoviedispatch: selectedMoviedispatch,
      }}
    >
      {props.children}
    </movieContext.Provider>
  );
};

export default MovieContextProvider;
