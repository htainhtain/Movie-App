import React, { useEffect } from "react";

import Movie from "../Movie/Movie";

import axios from "axios";

import "./MovieGallery.css";

const MovieGallery = (props) => {
  const { selectedMovies } = props.selectedMoviesState;
  const movieIndex = props.movieIndex;
  const movieUrlProp = props.movieUrl;
  const setMovies = props.setMovies;
  const getMovieTrailer = props.getMovieTrailer;
  const setIsLoading = props.setIsLoading;

  const searchKeyword = props.searchKeyword;

  const checkSelectedBefore = (movie) => {
    const prevSelectedItems = props.selectedMoviesState.selectedMovies;
    if (prevSelectedItems.filter((item) => item.id === movie.id).length > 0) {
      return true;
    }
    return false;
  };

  const handleSelectMovie = (index) => {
    const movieIndex = index;
    const movieId = props.movies[movieIndex].id;
    const movieName = props.movies[movieIndex].original_title;
    const moviePrice = props.movies[movieIndex].vote_average;
    const selectedMovie = {
      id: movieId,
      name: movieName,
      price: moviePrice,
    };
    const isSelectedBefore = checkSelectedBefore(selectedMovie);
    if (!isSelectedBefore) {
      const addedMovie = [...selectedMovies, selectedMovie];
      props.selectedMoviedispatch({
        type: "SELECTED_MOVIE_CHANGE",
        selectedMovies: addedMovie,
      });
    }
  };

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      let movieUrl = searchKeyword
        ? movieUrlProp + searchKeyword
        : movieUrlProp;
      const data = await axios.get(movieUrl);
      setMovies(data.data.results);
      getMovieTrailer(data.data.results[movieIndex].id);
      setIsLoading(false);
    };

    fetchData().catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <section id="movie-gallery-container">
      {!props.isLoading && (
        <div className="movie-gallery-wrapper">
          <header>
            <h2 className="movie-gallery-title">{props.title}</h2>
          </header>
          <div className="movie-gallery">
            {props.movies
              .filter((movie) => movie.vote_average <= props.priceUpperBound)
              .map((movie, index) => {
                return (
                  <Movie
                    key={index}
                    index={index}
                    movie={movie}
                    heroImageUrl={props.heroImageUrl}
                    handleSelectMovie={() => {
                      handleSelectMovie(index);
                    }}
                  />
                );
              })}
          </div>
        </div>
      )}
    </section>
  );
};

export default MovieGallery;
