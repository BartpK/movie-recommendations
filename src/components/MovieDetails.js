import React, { useState, useEffect } from 'react';
import { genres } from '../utils/apiCalls'

function MovieDetails(props) {
    console.log('moviedetails', props)
    if (props.highlightedMovie) {
        const { genre_ids, title, poster_path, backdrop_path, overview, release_date, vote_average } = props.highlightedMovie;

        const getGenreTags = (genre_ids) => {
            const genreNames = genres.filter(gObj => {
                return genre_ids.includes(gObj.id)
            }).map(gObj => {
                return (
                    <span>{gObj.name}</span>
                )
            })
            return genreNames;
        }

        console.log(genre_ids, title, poster_path, overview)


        return (
            <div id="MovieDetails" className="MovieDetails closed">

                <div className="moviedetailsheader"
                    style={{
                        backgroundImage: `url('https://image.tmdb.org/t/p/w500${backdrop_path}')`
                    }}>
                    <div className="moviedetailsheaderoverlay">
                        <i onClick={props.toggleMovieDetails} class="fas fa-times-circle"></i>
                        <h1>{title}</h1>
                    </div>
                </div>

                <div className="genretags">{getGenreTags(genre_ids)}</div>
                <p className="synopsis">{overview}</p>
                <p className="releasedate">{release_date.substring(0, 4)}</p>
                <p className="averagerating">Average rating: {vote_average}</p>
                <a className="trailerlink" href={`https://www.youtube.com/results?search_query=${title}+${release_date.substring(0, 4)}+trailer`} target="_blank">Trailer</a>
            </div >
        );
    } else {
        return (
            <div id="MovieDetails" className="MovieDetails closed">
                <h1>No movie selected</h1>
            </div>
        )
    }
}

export default MovieDetails;
