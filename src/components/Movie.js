import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
from {
    transform: translateY(800px) scale(0.1);    
}
to {
    transform: translateY(0) scale(1);
}
`;

const Thumbnail = styled.img`
  max-width: 100%;
  animation: ${fadeIn} 400ms;
`;

function Movie({ movie, viewMovieDetails }) {
  return (
    <div className="Movie" onClick={() => viewMovieDetails(movie)}>
      <Thumbnail src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} />
    </div>
  );
}

export default Movie;
