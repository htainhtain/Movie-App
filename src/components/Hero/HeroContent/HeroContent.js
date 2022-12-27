import React from "react";

import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";

import "./HeroContent.css";

import MovieImdb from "../../MovieImdb/MovieImdb";

const HeroContent = (props) => {
  const trailerUrl = `https://www.youtube.com/watch?v=`;

  return (
    <figcaption className="hero-content-container">
      <div className="hero-content">
        <header>
          <h1 className="hero-title">{props.movie.title}</h1>
        </header>
        <div className="movie-status-container">
          <MovieImdb
            voteAverage={props.movie.vote_average}
            voteCount={props.movie.vote_count}
          />
        </div>
        <div className="movie-description-container">
          <p className="movie-description">{props.movie.overview}</p>
        </div>
        <a
          href={trailerUrl + props.trailerKey}
          className="movie-trailer-container"
        >
          <PlayCircleFilledWhiteIcon className="play-icon" />
          <span>WATCH TRAILER</span>
        </a>
      </div>
    </figcaption>
  );
};

export default HeroContent;
