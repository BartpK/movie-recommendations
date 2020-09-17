import React from 'react';

function Movie({ movie, viewMovieDetails }) {
    return (
        <div
            className="Movie"
            onClick={() => viewMovieDetails(movie)}
        >
            <img
                src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} />
        </div>
    );

}

export default Movie;
