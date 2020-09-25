import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./App.css";
import { getMovies } from "./utils/apiCalls";
import ResultsBox from "./components/ResultsBox";
import SearchBox from "./components/SearchBox";
import MovieDetails from "./components/MovieDetails";
import Navbar from "./components/Navbar";
import { styled, createGlobalStyle } from "styled-components";
import { getCast } from "./utils/apiCalls";
import { getRecommendedMovies } from "./utils/apiCalls";

const GlobalStyle = createGlobalStyle`
* {
  font-family: Quicksand;
  padding: 0;
  margin: 0;
  color: white;
}

:focus {
  outline: none;
}


`;

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
  const [selectedCast, setSelectedCast] = useState();
  const [likesList, setLikesList] = useState();
  const [dislikesList, setDislikesList] = useState();
  const [recommendations, setRecommendations] = useState();
  const [currentPath, setCurrentPath] = useState();

  const toggleLikesList = (movieID) => {
    if (likesList) {
      if (likesList.includes(movieID)) {
        const newArray = likesList.filter((movie) => {
          return movie !== movieID;
        });
        localStorage.setItem("myLikes", JSON.stringify(newArray));
        setLikesList(newArray);
      } else {
        const newArray = likesList.concat(movieID);
        localStorage.setItem("myLikes", JSON.stringify(newArray));
        setLikesList(newArray);
      }
    } else {
      localStorage.setItem("myLikes", JSON.stringify([movieID]));
      setLikesList([movieID]);
    }
  };

  const toggleDislikesList = (movieID) => {
    if (dislikesList) {
      if (dislikesList.includes(movieID)) {
        const newArray = dislikesList.filter((movie) => {
          return movie !== movieID;
        });
        localStorage.setItem("myDislikes", JSON.stringify(newArray));
        setDislikesList(newArray);
      } else {
        const newArray = dislikesList.concat(movieID);
        localStorage.setItem("myDislikes", JSON.stringify(newArray));
        setDislikesList(newArray);
      }
    } else {
      localStorage.setItem("myDislikes", JSON.stringify([movieID]));
      setDislikesList([movieID]);
    }
  };

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

  // const toggleWatchlist = () => {
  //   if (showWatchlist) {
  //     setShowWatchlist(false);
  //     searchMovies(prevSearch);
  //   } else {
  //     setShowWatchlist(true);
  //     setMovies(watchlist);
  //   }
  // };

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

  const handleCastRequest = async (movieID) => {
    const cast = await getCast(movieID);
    setSelectedCast(cast);
  };

  const viewMovieDetails = (movieObj) => {
    setHighlightedMovie(movieObj);
    toggleMovieDetails();
    handleCastRequest(movieObj.id);
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

  const requestRecommendations = async () => {
    if (!likesList) return;
    const recommendations = await getRecommendedMovies(likesList, dislikesList);
    setRecommendations(recommendations);
  };

  const init = async () => {
    const movieData = await getMovies(prevSearch);
    setCurrentPage(movieData.page);
    setMovies(movieData.results);
    setWatchlist(JSON.parse(localStorage.getItem("myWatchlist")));
    setLikesList(JSON.parse(localStorage.getItem("myLikes")));
    setDislikesList(JSON.parse(localStorage.getItem("myDislikes")));
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    setShowMovieDetails(false);
  }, [currentPath]);

  useEffect(() => {
    requestRecommendations();
  }, [likesList, dislikesList]);

  return (
    <div className="App">
      <GlobalStyle />
      <Route
        exact
        path="/"
        render={() => {
          return (
            <div>
              <SearchBox
                searchMovies={searchMovies}
                toggleSearchBox={toggleSearchBox}
                showSearchBox={showSearchBox}
              />
              <ResultsBox
                nullMessage={"Loading movies.."}
                movies={movies}
                getNextPage={getNextPage}
                viewMovieDetails={viewMovieDetails}
              />
              <MovieDetails
                toggleMovieDetails={toggleMovieDetails}
                highlightedMovie={highlightedMovie}
                showMovieDetails={showMovieDetails}
                saveToWatchlist={saveToWatchlist}
                removeFromWatchlist={removeFromWatchlist}
                watchlist={watchlist}
                selectedCast={selectedCast}
                toggleLikesList={toggleLikesList}
                likesList={likesList}
                toggleDislikesList={toggleDislikesList}
                dislikesList={dislikesList}
              />
            </div>
          );
        }}
      />

      <Route
        exact
        path="/watchlist"
        render={() => {
          return (
            <div>
              <ResultsBox
                nullMessage={
                  "Movies that you add to your watchlist will show up here."
                }
                headline={"Your watchlist"}
                movies={watchlist}
                getNextPage={getNextPage}
                viewMovieDetails={viewMovieDetails}
              />
              <MovieDetails
                toggleMovieDetails={toggleMovieDetails}
                highlightedMovie={highlightedMovie}
                showMovieDetails={showMovieDetails}
                saveToWatchlist={saveToWatchlist}
                removeFromWatchlist={removeFromWatchlist}
                watchlist={watchlist}
                selectedCast={selectedCast}
                toggleLikesList={toggleLikesList}
                likesList={likesList}
                toggleDislikesList={toggleDislikesList}
                dislikesList={dislikesList}
              />
            </div>
          );
        }}
      />

      <Route
        exact
        path="/recommended"
        render={() => {
          return (
            <div>
              <ResultsBox
                nullMessage={
                  "Looks like we don't have any recommendations for you yet. Start 'liking' a few movies and your recommendations will show up here."
                }
                headline={"Recommended for you"}
                movies={recommendations}
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
                selectedCast={selectedCast}
                toggleLikesList={toggleLikesList}
                likesList={likesList}
                toggleDislikesList={toggleDislikesList}
                dislikesList={dislikesList}
              />
            </div>
          );
        }}
      />

      {/* <SearchBox
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
        /> */}
      {/* <div className="watchlistbutton" onClick={toggleWatchlist}>
        <i className="fas fa-bookmark"></i>
      </div> */}
      <Navbar />
    </div>
  );
}

export default App;
