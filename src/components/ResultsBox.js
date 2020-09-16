import React, { useState, useEffect } from 'react';
import Movie from './Movie'

function ResultsBox(props) {
    const handleScroll = (e) => {
        const bounding = document.querySelector('#scrolltarget').getBoundingClientRect()
        if (bounding.top < 1000) props.getNextPage();
    }

    if (props.movies) {
        const Movies = props.movies.map(movieElement => {
            return <Movie key={movieElement.id} movie={movieElement} viewMovieDetails={props.viewMovieDetails} />
        })
        return (
            <div className="ResultsBox"
                onScroll={(e) => handleScroll(e)}>
                {Movies}
                <div id="scrolltarget"></div>
            </div>
        );



    } else {
        return (
            <div className="App">
                <h1>Loading movies</h1>
            </div>
        );
    }
}


export default ResultsBox;
