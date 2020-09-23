import React from "react";
import styled from "styled-components";

const Thumbnail = styled.img`
  max-width: 100%;
`;

function Movie({ movie, viewMovieDetails }) {
  return (
    <div className="Movie" onClick={() => viewMovieDetails(movie)}>
      <Thumbnail src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} />
    </div>
  );
}

export default Movie;
