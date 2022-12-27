import React, { useContext, useEffect } from "react";

import Movie from "../Movie/Movie";

import axios from "axios";

import "./MovieGallery.css";
import { movieContext } from "../../context/movie-context";

const MovieGallery = (props) => {
  const movieCtx = useContext(movieContext);

  const { movies } = movieCtx;
  const { setMovies } = movieCtx;
  const { movieIndex } = movieCtx;
  const { isLoading } = movieCtx;
  const { handleLoading } = movieCtx;
  const { closeLoading } = movieCtx;
  const { selectedMoviesState } = movieCtx;
  const { selectedMoviedispatch } = movieCtx;
  const { getMovieTrailer } = movieCtx;

  const movieUrlProp = props.movieUrl;
  const searchKeyword = props.searchKeyword;

  const checkSelectedBefore = (movie) => {
    const prevSelectedItems = selectedMoviesState.selectedMovies;
    if (prevSelectedItems.filter((item) => item.id === movie.id).length > 0) {
      return true;
    }
    return false;
  };

  const handleSelectMovie = (index) => {
    const movieIndex = index;
    const movieId = movies[movieIndex].id;
    const movieName = movies[movieIndex].original_title;
    const moviePrice = movies[movieIndex].vote_average;
    const selectedMovie = {
      id: movieId,
      name: movieName,
      price: moviePrice,
    };
    const isSelectedBefore = checkSelectedBefore(selectedMovie);
    if (!isSelectedBefore) {
      selectedMoviedispatch({
        type: "SELECTED_MOVIE_CHANGE",
        selectedMovies: selectedMovie,
      });
    }
  };

  useEffect(() => {
    handleLoading();

    const fetchData = async () => {
      let movieUrl = searchKeyword
        ? movieUrlProp + searchKeyword
        : movieUrlProp;
      const data = await axios.get(movieUrl);
      setMovies(data.data.results);
      getMovieTrailer(data.data.results[movieIndex].id);
      closeLoading();
    };

    fetchData().catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <section id="movie-gallery-container">
      {!isLoading && (
        <div className="movie-gallery-wrapper">
          <header>
            <h2 className="movie-gallery-title">{props.title}</h2>
          </header>
          <div className="movie-gallery">
            {movies
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
