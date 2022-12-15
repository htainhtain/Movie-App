import React from "react";

import DeleteIcon from "@mui/icons-material/Delete";

import "./SelectedMovieCard.css";

const SelectedMovieCard = (props) => {
  const { selectedMovies } = props.selectedMoviesState;

  const deleteMovie = () => {
    const movieToDelete = [props.currentMovie];
    const newSelectedMovies = selectedMovies.filter(
      (element) => !movieToDelete.includes(element)
    );
    props.selectedMoviedispatch({
      type: "SELECTED_MOVIE_DELETED",
      movieToDelete: movieToDelete,
    });
    // props.setSelectedMovie(newSelectedMovies);
    localStorage.setItem("SelectedMovies", JSON.stringify(newSelectedMovies));
  };

  return (
    <div className="selected-movie">
      <div className="selected-movie-title-container">
        <h4>{props.currentMovie.name}</h4>
      </div>
      <div className="selected-movie-price">
        $ {Math.round(props.currentMovie.price)}
      </div>
      <div className="selected-movie-delete-container" onClick={deleteMovie}>
        <DeleteIcon />
      </div>
    </div>
  );
};

export default SelectedMovieCard;
