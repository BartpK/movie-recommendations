import React, { useState, useEffect } from 'react';

function Movie(props) {
    return (
        <div className="Movie" onClick={() => props.viewMovieDetails(props.movie)}>
            <img src={`https://image.tmdb.org/t/p/w185${props.movie.poster_path}`} />
        </div>
    );

}

export default Movie;
