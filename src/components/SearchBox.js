import React, { useState, useEffect } from 'react';
import { genres } from '../utils/apiCalls'

function SearchBox(props) {
    const [selectedGenres, setSelectedGenres] = useState([])
    const [selectedActor, setSelectedActor] = useState('')
    const [releasedBefore, setReleasedBefore] = useState('')
    const [releasedAfter, setReleasedAfter] = useState('')
    const [sortBy, setSortBy] = useState()



    const toggleGenre = (e) => {
        if (selectedGenres.includes(e.target.textContent)) {
            const newArray = selectedGenres.filter(genre => {
                return genre !== e.target.textContent;
            })

            setSelectedGenres(newArray)
            //remove from array
        } else {
            const newArray = selectedGenres.concat(e.target.textContent);
            setSelectedGenres(newArray)
            //add to array
        }
    }

    const clearGenres = () => {
        setSelectedGenres([])
    }

    const getYears = (selectedYear) => {
        const options = [];
        for (let i = 2020; i > 1979; i--) {
            options.push(
                <option key={i} value={`${i}-01-01`}>{i}</option>
            )
        }
        return options;
    }

    const getClassName = (genre) => {
        return selectedGenres.includes(genre) ? "genrebuttonselected" : "genrebutton"
    }

    const toggleCaretClass = () => {
        const caret = document.querySelector('#caret')
        if (caret.classList.contains('caretopen')) {
            caret.classList.remove('caretopen');
            caret.classList.add('caretclosed');
        } else {
            caret.classList.add('caretopen');
            caret.classList.remove('caretclosed');
        }
    }

    const genreButtons = genres.map(genre => {
        return <button key={genre.id} className={getClassName(genre.name)} onClick={toggleGenre}>{genre.name}</button>
    })

    const handleSearch = () => {
        const queryObj = {
            genre: selectedGenres,
            actor: selectedActor,
            releasedAfter: releasedAfter,
            releasedBefore: releasedBefore,
            sortBy: sortBy
        }
        props.searchMovies(queryObj)
    }

    return (
        <div id="SearchBox" className="SearchBox SearchBoxClosed">
            <input type="text" className="searchinput" placeholder="Search by actor" onChange={(e) => setSelectedActor(e.target.value)} />
            <div className="genrecontainer">
                <button className={selectedGenres.length === 0 ? "genrebuttonselected" : "genrebutton"} onClick={clearGenres}>All</button>
                {genreButtons}
            </div>
            <div className="releasedatecontainer">

                <select name="after" onChange={(e) => { setReleasedAfter(e.target.value) }}>
                    <option value="" selected>After</option>
                    {getYears('1980')}
                </select>

                <select name="before" onChange={(e) => { setReleasedBefore(e.target.value) }}>
                    <option value="" selected>Before</option>
                    {getYears('2020')}
                </select>
            </div>
            <div className="sortcontainer">
                <select name="sort" onChange={(e) => setSortBy(e.target.value)}>
                    <option value="popularity.desc">Most popular (default)</option>
                    <option value="popularity.asc">Least popular</option>
                    <option value="release_date.desc">Most recent</option>
                    <option value="release_date.asc">Least recent</option>
                    <option value="vote_average.desc">Best ratings</option>
                    <option value="vote_average.asc">Lowest ratings</option>
                </select>
            </div >
            <div className="searchbuttoncontainer">
                <button onClick={() => { handleSearch(); props.toggleSearchBox() }}>Search</button>
            </div>
            <i id="caret" className="fas fa-angle-down togglesearch caretopen" onClick={() => { props.toggleSearchBox(); toggleCaretClass() }}></i>


        </div >
    );

}

export default SearchBox;
