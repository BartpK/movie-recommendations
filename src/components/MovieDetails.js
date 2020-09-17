import React from "react";
import { allGenres } from "../utils/apiCalls";

function MovieDetails(props) {
  if (!props.highlightedMovie) return null;

  const className = props.showMovieDetails ? "open" : "closed";

  const createWatchlistButtons = () => {
    if (!props.watchlist) {
      return (
        <button
          className="addbutton"
          onClick={() => props.saveToWatchlist(props.highlightedMovie)}
        >
          + Add to watchlist
        </button>
      );
    } else if (
      props.watchlist.filter((movie) => {
        return movie.id === props.highlightedMovie.id;
      }) < 1
    ) {
      return (
        <button
          className="addbutton"
          onClick={() => props.saveToWatchlist(props.highlightedMovie)}
        >
          + Add to watchlist
        </button>
      );
    } else {
      return (
        <button
          className="removebutton"
          onClick={() => props.removeFromWatchlist(props.highlightedMovie)}
        >
          - Remove from watchlist
        </button>
      );
    }
  };

  const {
    genre_ids,
    title,
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
        return <span key={genreObj.id}>{genreObj.name}</span>;
      });
    return genreNames;
  };

  return (
    <section id="MovieDetails" className={`MovieDetails ${className}`}>
      <div
        className="moviedetailsheader"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/w500${backdrop_path}')`,
        }}
      >
        <div className="moviedetailsheaderoverlay">
          <i
            onClick={props.toggleMovieDetails}
            className="fas fa-times-circle"
          ></i>
          <h1>{title}</h1>
        </div>
      </div>

      <div className="genretags">{createGenreTags(genre_ids)}</div>
      <p className="synopsis">{overview}</p>
      <p className="releasedate">{release_date.substring(0, 4)}</p>
      <p className="averagerating">Average rating: {vote_average}</p>
      <a
        className="trailerlink"
        href={`https://www.youtube.com/results?search_query=${title}+${release_date.substring(
          0,
          4
        )}+trailer`}
        target="_blank"
      >
        Trailer
      </a>
      {createWatchlistButtons()}
    </section>
  );
}

export default MovieDetails;
