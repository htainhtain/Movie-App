import React, { useContext } from "react";

import { movieContext } from "../../context/movie-context";

import HeroContent from "./HeroContent/HeroContent";

import "./Hero.css";

const Hero = () => {
  const movieCtx = useContext(movieContext);

  const { isLoading } = movieCtx;
  const { movies } = movieCtx;
  const { movieIndex } = movieCtx;
  const { trailerKey } = movieCtx;

  //image url
  const heroImageUrl = `https://image.tmdb.org/t/p/original`;

  return (
    <section id="hero">
      {!isLoading && (
        <figure className="hero-movie-image-wrapper">
          <img
            className="hero-movie-image"
            src={`${heroImageUrl}${movies[movieIndex].backdrop_path}`}
            alt={`${movies[movieIndex].title}`}
          />
          <HeroContent movie={movies[movieIndex]} trailerKey={trailerKey} />
        </figure>
      )}
    </section>
  );
};

export default Hero;
