import React from "react";

import "./MovieCard.css";

const MovieCard = (props) => {
  return (
    <div className="movie-card" index={props.index}>
      {props.children}
    </div>
  );
};

export default MovieCard;
