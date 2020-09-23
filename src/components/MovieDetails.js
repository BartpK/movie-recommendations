import React from "react";
import { allGenres } from "../utils/apiCalls";
import styled from "styled-components";
import { getCast } from "../utils/apiCalls";

const Wrapper = styled.div`
  width: ${(props) => (props.showMovieDetails ? "100%" : "0%")};
  overflow-x: hidden;
  overflow-y: scroll;
  position: absolute;
  top: 0;
  bottom: 0;
  min-height: 120vh;
  background-color: #0b132b;
`;

const Watchlistbutton = styled.button`
  margin-left: 1rem;
  padding: 0.4rem 0.4rem;
  font-weight: 600;
  color: white;
  border: none;
  border-radius: 1rem;
  background-color: ${(props) =>
    props.action === "add" ? "#86cd82" : "#9e2a2b"};
`;

const Trailerbutton = styled(Watchlistbutton)`
  background-color: #3a506b;
`;

const Genretag = styled.span`
  background-color: #3a506b;
  color: white;
  border-radius: 20px;
  padding: 0.4rem;
  margin-right: 0.4rem;
  display: inline;
  font-size: 0.8rem;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: url(https://image.tmdb.org/t/p/w500${(props) =>
    props.backdrop_path});
  height: 10rem;
  padding: 1rem;
  h1 {
    z-index: 1;
  }
`;

const Headeroverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Closebutton = styled(Watchlistbutton)`
  margin: 0;
  width: 4rem;
  background-color: #0b132b;
  z-index: 1;
`;

const Genrewrapper = styled.div`
  padding: 1rem;
`;

const Textwrapper = styled.div`
  p {
    padding: 1rem;
  }
`;

function MovieDetails(props) {
  console.log(props);
  if (!props.highlightedMovie) return null;

  const createCastList = () => {
    if (!props.selectedCast) return null;
    return <p>Starring: {props.selectedCast[0]}</p>;
  };

  const createWatchlistButtons = () => {
    if (!props.watchlist) {
      return (
        <Watchlistbutton
          action={"add"}
          onClick={() => props.saveToWatchlist(props.highlightedMovie)}
        >
          + Add to watchlist
        </Watchlistbutton>
      );
    } else if (
      props.watchlist.filter((movie) => {
        return movie.id === props.highlightedMovie.id;
      }) < 1
    ) {
      return (
        <Watchlistbutton
          action={"add"}
          onClick={() => props.saveToWatchlist(props.highlightedMovie)}
        >
          + Add to watchlist
        </Watchlistbutton>
      );
    } else {
      return (
        <Watchlistbutton
          action={"remove"}
          onClick={() => props.removeFromWatchlist(props.highlightedMovie)}
        >
          - Remove from watchlist
        </Watchlistbutton>
      );
    }
  };

  const {
    genre_ids,
    title,
    id,
    backdrop_path,
    overview,
    release_date,
    vote_average,
  } = props.highlightedMovie;

  const createGenreTags = (genre_ids) => {
    const genreNames = allGenres
      .filter((genreObj) => {
        return genre_ids.includes(genreObj.id);
      })
      .map((genreObj) => {
        return <Genretag key={genreObj.id}>{genreObj.name}</Genretag>;
      });
    return genreNames;
  };

  return (
    <Wrapper showMovieDetails={props.showMovieDetails}>
      <Header backdrop_path={backdrop_path}>
        <Closebutton onClick={props.toggleMovieDetails}>
          <i className="fas fa-chevron-left">
            <span> Back</span>
          </i>
        </Closebutton>

        <h1>{title}</h1>
        <Headeroverlay></Headeroverlay>
      </Header>
      <Genrewrapper>{createGenreTags(genre_ids)}</Genrewrapper>
      <Textwrapper>
        <p className="synopsis">{overview}</p>
        {createCastList()}
        <p className="releasedate">{release_date.substring(0, 4)}</p>
        <p className="averagerating">Average rating: {vote_average}</p>
      </Textwrapper>
      <Trailerbutton
        onClick={() =>
          window.open(
            `https://www.youtube.com/results?search_query=${title}+${release_date.substring(
              0,
              4
            )}+trailer`,
            "_blank"
          )
        }
      >
        <i className="fas fa-play"> </i> Watch trailer
      </Trailerbutton>
      {createWatchlistButtons()}
    </Wrapper>
  );
}

export default MovieDetails;
