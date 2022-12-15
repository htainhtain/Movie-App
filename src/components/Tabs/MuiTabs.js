import * as React from "react";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import MovieGallery from "../MovieGallery/MovieGallery";
import SearchPlaceholder from "./SearchPlacholder/SearchPlaceholder";

import "./MuiTabs.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function MuiTabs(props) {
  const playingNowUrl = `${process.env.REACT_APP_TMDB_URL}now_playing?api_key=${process.env.REACT_APP_TMDB_KEY}`;
  const popularUrl = `${process.env.REACT_APP_TMDB_URL}popular?api_key=${process.env.REACT_APP_TMDB_KEY}`;
  const upComingUrl = `${process.env.REACT_APP_TMDB_URL}upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}`;
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&query=`;

  const searchBar = document.querySelector(".search-bar-input");

  const handleSearchClick = () => {
    console.log(searchBar);
    searchBar.focus();
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "80%", borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={props.tabVal}
          onChange={props.handleTabChange}
          aria-label="basic tabs example"
        >
          <Tab label="Now Playing" {...a11yProps(0)} />
          <Tab label="Popular" {...a11yProps(1)} />
          <Tab label="Upcoming" {...a11yProps(2)} />
          <Tab
            label={`Search ${props.searchKeyword}`}
            {...a11yProps(3)}
            onClick={handleSearchClick}
          />
        </Tabs>
      </Box>
      <TabPanel value={props.tabVal} index={0}>
        <MovieGallery
          title="Now playing"
          movies={props.movies}
          setMovies={props.setMovies}
          isLoading={props.isLoading}
          setIsLoading={props.setIsLoading}
          heroImageUrl={props.heroImageUrl}
          selectedMoviesState={props.selectedMoviesState}
          selectedMoviedispatch={props.selectedMoviedispatch}
          movieUrl={playingNowUrl}
          movieIndex={props.movieIndex}
          getMovieTrailer={props.getMovieTrailer}
          tabVal={props.tabVal}
          priceUpperBound={props.priceUpperBound}
        />
      </TabPanel>
      <TabPanel value={props.tabVal} index={1}>
        <MovieGallery
          title="Popular"
          movies={props.movies}
          setMovies={props.setMovies}
          isLoading={props.isLoading}
          setIsLoading={props.setIsLoading}
          heroImageUrl={props.heroImageUrl}
          selectedMoviesState={props.selectedMoviesState}
          selectedMoviedispatch={props.selectedMoviedispatch}
          movieUrl={popularUrl}
          movieIndex={props.movieIndex}
          getMovieTrailer={props.getMovieTrailer}
          tabVal={props.tabVal}
          priceUpperBound={props.priceUpperBound}
        />
      </TabPanel>
      <TabPanel value={props.tabVal} index={2}>
        <MovieGallery
          title="Up coming.."
          movies={props.movies}
          setMovies={props.setMovies}
          isLoading={props.isLoading}
          setIsLoading={props.setIsLoading}
          heroImageUrl={props.heroImageUrl}
          selectedMoviesState={props.selectedMoviesState}
          selectedMoviedispatch={props.selectedMoviedispatch}
          movieUrl={upComingUrl}
          movieIndex={props.movieIndex}
          getMovieTrailer={props.getMovieTrailer}
          tabVal={props.tabVal}
          priceUpperBound={props.priceUpperBound}
        />
      </TabPanel>
      <TabPanel value={props.tabVal} index={3}>
        {props.searchKeyword ? (
          <MovieGallery
            title={`Results for ${props.searchKeyword}`}
            movies={props.movies}
            setMovies={props.setMovies}
            isLoading={props.isLoading}
            setIsLoading={props.setIsLoading}
            heroImageUrl={props.heroImageUrl}
            selectedMoviesState={props.selectedMoviesState}
            selectedMoviedispatch={props.selectedMoviedispatch}
            movieUrl={searchUrl}
            movieIndex={props.movieIndex}
            getMovieTrailer={props.getMovieTrailer}
            searchKeyword={props.searchKeyword}
            tabVal={props.tabVal}
            priceUpperBound={props.priceUpperBound}
          />
        ) : (
          <>
            <SearchPlaceholder />
          </>
        )}
      </TabPanel>
    </Box>
  );
}
