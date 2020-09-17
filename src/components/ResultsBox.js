import React from "react";
import Movie from "./Movie";

function ResultsBox(props) {
  console.log(props.movies);
  if (!props.movies) return null;
  const handleScroll = (e) => {
    const bounding = document
      .querySelector("#scrolltarget")
      .getBoundingClientRect();
    if (bounding.top < 1000) props.getNextPage();
  };

  const watchlistHeader = props.showWatchlist ? (
    <h1 className="watchlistheader">Your watchlist</h1>
  ) : null;

  const moviesToDisplay = props.movies.map((movieElement) => {
    return (
      <Movie
        key={movieElement.id}
        movie={movieElement}
        viewMovieDetails={props.viewMovieDetails}
      />
    );
  });
  return (
    <section className="ResultsBox" onScroll={(e) => handleScroll(e)}>
      {watchlistHeader}
      {moviesToDisplay}
      <div id="scrolltarget"></div>
    </section>
  );
}

export default ResultsBox;
