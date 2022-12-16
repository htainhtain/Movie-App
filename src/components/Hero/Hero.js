import React, { useContext } from "react";

import { movieContext } from "../../context/movie-context";

import HeroContent from "./HeroContent/HeroContent";

import "./Hero.css";


const Hero = () => {
  const context = useContext(movieContext);

  //image url
  const heroImageUrl = `https://image.tmdb.org/t/p/original`;

  return (
    <section id="hero">
      {!context.isLoading && (
        <figure className="hero-movie-image-wrapper">
          <img
            className="hero-movie-image"
            src={`${heroImageUrl}${
              context.movies[context.movieIndex].backdrop_path
            }`}
            alt={`${context.movies[context.movieIndex].title}`}
          />
          <HeroContent
            movie={context.movies[context.movieIndex]}
            trailerKey={context.trailerKey}
          />
        </figure>
      )}
    </section>
  );
};

export default Hero;
