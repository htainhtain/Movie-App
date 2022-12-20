import React, { useEffect, useState } from "react";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import axios from "axios";

import "./Movie.css";
import MovieCard from "../Ui/MovieCard/MovieCard";
import MovieImdb from "../MovieImdb/MovieImdb";
import GenreCard from "../Ui/GenreCard/GenreCard";

const Movie = (props) => {
  const [movie, setmovie] = useState({});
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      const data = await axios.get(
        `https://api.themoviedb.org/3/movie/${props.movie.id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
      );
      setmovie(data.data);
      setIsLoading(false);
    };
    fetchMovieDetail();
  }, []);

  return (
    <MovieCard index={props.index}>
      {!isloading && (
        <>
          <figure className="movie-poster-container">
            <img
              className="movie-poster"
              src={`${props.heroImageUrl}${movie.poster_path}`}
              alt={`${movie.title}`}
            />
            <button
              type="button"
              className="add-to-cart-icon-container"
              onClick={props.handleSelectMovie}
            >
              <AddShoppingCartIcon />
            </button>
          </figure>
          <div className="each-movie-description">
            <time dateTime={movie.release_date} className="movie-release-date">
              {movie.release_date}
            </time>
            <header>
              <h4 className="movie-original-title">{movie.original_title}</h4>
            </header>
            <div className="imdb-price-container">
              <MovieImdb
                voteAverage={movie.vote_average}
                voteCount={movie.vote_count}
              />
              <div className="movie-price">
                <span className="dollar-sign">$ </span>
                {Math.round(movie.vote_average)}
              </div>
            </div>
            <div className="genre-container">
              {movie.genres.map((genre, index) => {
                return <GenreCard key={index}>{genre.name}</GenreCard>;
              })}
            </div>
          </div>
        </>
      )}
    </MovieCard>
  );
};

export default Movie;
