import React from "react";

import "./GenreCard.css";

const GenreCard = (props) => {
  return <span className="genre-card">{props.children}</span>;
};

export default GenreCard;
