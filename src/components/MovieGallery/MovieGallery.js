import React, { useEffect } from "react";

import Movie from "../Movie/Movie";

import axios from "axios";

import "./MovieGallery.css";

const MovieGallery = (props) => {
  const { selectedMovies } = props.selectedMoviesState;
  const searchKeyword = props.searchKeyword;

  const checkSelectedBefore = (movie) => {
    const prevSelectedItems = JSON.parse(
      localStorage.getItem("SelectedMovies") || "[]"
    );
    if (prevSelectedItems.filter((e) => e.id === movie.id).length > 0) {
      return true;
    }
    return false;
  };

  const handleSelectMovie = (e) => {
    const movieParent = e.currentTarget.parentElement.parentElement;
    const movieIndex = movieParent.getAttribute("index");
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
      localStorage.setItem("SelectedMovies", JSON.stringify(addedMovie));
      props.selectedMoviedispatch({
        type: "SELECTED_MOVIE_CHANGE",
        selectedMovies: addedMovie,
      });
    }
  };

  useEffect(() => {
    props.setIsLoading(true);

    const fetchData = async () => {
      let movieUrl = searchKeyword
        ? props.movieUrl + searchKeyword
        : props.movieUrl;
      const data = await axios.get(movieUrl);
      props.setMovies(data.data.results);
      props.getMovieTrailer(data.data.results[props.movieIndex].id);
      props.setIsLoading(false);
    };

    fetchData().catch((err) => {
      console.log(err);
    });
  }, [searchKeyword]);

  return (
    <section id="movie-gallery-container">
      {!props.isLoading ? (
        <div className="movie-gallery-wrapper">
          <h2 className="movie-gallery-title">{props.title}</h2>
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
                    handleSelectMovie={handleSelectMovie}
                  />
                );
              })}
          </div>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};

export default MovieGallery;
