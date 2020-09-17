import React, { useState, useEffect } from "react";
import "./App.css";
import { getMovies } from "./utils/apiCalls";
import ResultsBox from "./components/ResultsBox";
import SearchBox from "./components/SearchBox";
import MovieDetails from "./components/MovieDetails";

function App() {
  const [movies, setMovies] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [prevSearch, setPrevSearch] = useState({
    releasedAfter: "2020-01-31",
    sortBy: "popularity.desc",
  });
  const [highlightedMovie, setHighlightedMovie] = useState();
  const [showMovieDetails, setShowMovieDetails] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showWatchlist, setShowWatchlist] = useState(false);
  const [watchlist, setWatchlist] = useState([]);

  const saveToWatchlist = (movieObj) => {
    if (watchlist) {
      const newWatchlist = watchlist.concat(movieObj);
      setWatchlist(newWatchlist);
      localStorage.setItem("myWatchlist", JSON.stringify(newWatchlist));
    } else {
      const newWatchlist = [movieObj];
      setWatchlist(newWatchlist);
      localStorage.setItem("myWatchlist", JSON.stringify(newWatchlist));
    }
  };

  const removeFromWatchlist = (movieObj) => {
    const newWatchlist = watchlist.filter((movie) => {
      return movie.id !== movieObj.id;
    });
    setWatchlist(newWatchlist);
    localStorage.setItem("myWatchlist", JSON.stringify(newWatchlist));
    if (showWatchlist) setMovies(newWatchlist);
  };

  const toggleWatchlist = () => {
    if (showWatchlist) {
      setShowWatchlist(false);
      searchMovies(prevSearch);
    } else {
      setShowWatchlist(true);
      setMovies(watchlist);
    }
  };

  const searchMovies = async (queryObj) => {
    const movieData = await getMovies(queryObj);
    setPrevSearch(queryObj);
    setMovies(movieData.results);
    setCurrentPage(movieData.page);
    setShowWatchlist(false);
  };

  const toggleMovieDetails = () => {
    setShowMovieDetails((prevState) => {
      return !prevState;
    });
  };

  const toggleSearchBox = () => {
    setShowSearchBox((prevState) => {
      return !prevState;
    });
  };

  const viewMovieDetails = (movieObj) => {
    setHighlightedMovie(movieObj);
    toggleMovieDetails();
  };

  const getNextPage = async () => {
    const queryObj = { ...prevSearch };
    queryObj.page = currentPage + 1;
    const movieData = await getMovies(queryObj);
    const newMoviesArray = movies.concat(movieData.results);
    setPrevSearch(queryObj);
    if (showWatchlist) return;
    setMovies(newMoviesArray);
    setCurrentPage(movieData.page);
    ////concat results
  };

  const init = async () => {
    const movieData = await getMovies(prevSearch);
    setCurrentPage(movieData.page);
    setMovies(movieData.results);
    setWatchlist(JSON.parse(localStorage.getItem("myWatchlist")));
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="App">
      <SearchBox
        searchMovies={searchMovies}
        toggleSearchBox={toggleSearchBox}
        showSearchBox={showSearchBox}
      />
      <ResultsBox
        movies={movies}
        getNextPage={getNextPage}
        viewMovieDetails={viewMovieDetails}
        showWatchlist={showWatchlist}
      />
      <MovieDetails
        toggleMovieDetails={toggleMovieDetails}
        highlightedMovie={highlightedMovie}
        showMovieDetails={showMovieDetails}
        saveToWatchlist={saveToWatchlist}
        removeFromWatchlist={removeFromWatchlist}
        watchlist={watchlist}
      />
      <div className="watchlistbutton" onClick={toggleWatchlist}>
        <i className="fas fa-bookmark"></i>
      </div>
      {/* <Nav/> */}
    </div>
  );
}

export default App;
