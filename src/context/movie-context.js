import React, { createContext, useState, useEffect, useReducer } from "react";

import axios from "axios";

export const movieContext = createContext({
  movies: {},
  setMovies: () => {},
  trailerKey: "",
  isLoading: true,
  setIsLoading: () => {},
  getMovieTrailer: (movieId) => {},
  movieIndex: 0,
  selectedMoviesState: {},
  selectedMoviedispatch: () => {},
});

const selectedMovieReducer = (prevState, action) => {
  if (action.type === "SELECTED_MOVIE_CHANGE") {
    const selectedMovies = action.selectedMovies;
    const totalSelectedMoviesCount = action.selectedMovies.length;
    let moviePrice = 0;
    selectedMovies.forEach((movie) => {
      moviePrice = moviePrice + Math.round(movie.price);
    });
    localStorage.setItem("SelectedMovies", JSON.stringify(selectedMovies));
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
    localStorage.setItem("SelectedMovies", JSON.stringify(newSelectedMovies));
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
        setIsLoading: setIsLoading,
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
