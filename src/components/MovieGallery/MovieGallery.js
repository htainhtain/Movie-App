import React, { useEffect } from "react";

import Movie from "../Movie/Movie";

import axios from "axios";

import "./MovieGallery.css";

const MovieGallery = (props) => {
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
      const addedMovie = [...props.selectedMovie, selectedMovie];
      localStorage.setItem("SelectedMovies", JSON.stringify(addedMovie));
      props.setSelectedMovie((prevState) => {
        return [...prevState, selectedMovie];
      });
    }
  };

  useEffect(() => {
    props.setIsLoading(true);

    const fetchData = async () => {
      let movieUrl = props.searchKeyword
        ? props.movieUrl + props.searchKeyword
        : props.movieUrl;
      const data = await axios.get(movieUrl);
      props.setMovies(data.data.results);
      props.getMovieTrailer(data.data.results[props.movieIndex].id);
      props.setIsLoading(false);
    };

    fetchData().catch((err) => {
      console.log(err);
    });
  }, [props.movieUrl, props.searchKeyword]);

  return (
    <section id="movie-gallery-container">
      {!props.isLoading ? (
        <div className="movie-gallery-wrapper">
          <h2 className="movie-gallery-title">{props.title}</h2>
          <div className="movie-gallery">
            {props.movies.map((movie, index) => {
              if (Math.round(movie.vote_average) <= props.priceUpperBound) {
                return (
                  <Movie
                    key={index}
                    index={index}
                    movie={movie}
                    heroImageUrl={props.heroImageUrl}
                    handleSelectMovie={handleSelectMovie}
                  />
                );
              }
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
