import React from "react";

import ImdbImage from "../Ui/Imdb/ImdbImage";

import "./MovieImdb.css";

const MovieImdb = (props) => {
  return (
    <div className="movie-imdb">
      <ImdbImage />
      <p className="imdb-number">
        {props.voteAverage} / {props.voteCount}
      </p>
    </div>
  );
};

export default MovieImdb;
