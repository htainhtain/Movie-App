import React from "react";

import imdbImg from "../../../content/hero/imdb.jpg";

import "./ImdbImage.css";
const ImdbImage = () => {
  return (
    <div className="move-imdb-img-container">
      <img src={imdbImg} alt="imdb" className="move-imdb-img" />
    </div>
  );
};

export default ImdbImage;
