import React from "react";

import HeroContent from "./HeroContent/HeroContent";

import "./Hero.css";

const Hero = (props) => {
  return (
    <section id="hero">
      {!props.isLoading ? (
        <>
          <div className="hero-movie-image-wrapper">
            <img
              className="hero-movie-image"
              src={`${props.heroImageUrl}${
                props.movies[props.movieIndex].backdrop_path
              }`}
              alt={`${props.movies[props.movieIndex].title}`}
            />
          </div>
          <HeroContent
            movie={props.movies[props.movieIndex]}
            trailerKey={props.trailerKey}
          />
        </>
      ) : (
        <></>
      )}
    </section>
  );
};

export default Hero;