import React from "react";
import Movie from "./Movie";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #0b132b;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;
  padding: 0.6rem;
  max-height: 100vh;
  overflow: scroll;
  max-width: 100vw;
`;

function ResultsBox(props) {
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
    <Wrapper onScroll={(e) => handleScroll(e)}>
      {watchlistHeader}
      {moviesToDisplay}
      <div id="scrolltarget"></div>
    </Wrapper>
  );
}

export default ResultsBox;
