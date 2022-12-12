import React from "react";

import ImdbImage from "../Ui/Imdb/ImdbImage";

import "./MovieImdb.css";

const MovieImdb = (props) => {
  return (
    <div className="movie-imdb">
      <ImdbImage />
      <span className="imdb-number">
        {props.voteAverage} / {props.voteCount}
      </span>
    </div>
  );
};

export default MovieImdb;
