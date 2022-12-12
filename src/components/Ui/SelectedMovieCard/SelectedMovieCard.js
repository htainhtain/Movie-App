import React from "react";

import DeleteIcon from "@mui/icons-material/Delete";

import "./SelectedMovieCard.css";

const SelectedMovieCard = (props) => {
  const deleteMovie = () => {
    const movieToDelete = [props.currentMovie];
    const newSelectedMovies = props.selectedMovies.filter(
      (element) => !movieToDelete.includes(element)
    );
    props.setSelectedMovie(newSelectedMovies);
    localStorage.setItem("SelectedMovies", JSON.stringify(newSelectedMovies));
  };

  return (
    <div className="selected-movie">
      <div className="selected-movie-title-container">
        <h4>{props.selectedMovie.name}</h4>
      </div>
      <div className="selected-movie-price">
        $ {Math.round(props.selectedMovie.price)}
      </div>
      <div className="selected-movie-delete-container" onClick={deleteMovie}>
        <DeleteIcon />
      </div>
    </div>
  );
};

export default SelectedMovieCard;
