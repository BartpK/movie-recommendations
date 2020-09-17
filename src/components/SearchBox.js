import React, { useState } from "react";
import { allGenres } from "../utils/apiCalls";

function SearchBox(props) {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedActor, setSelectedActor] = useState("");
  const [releasedBefore, setReleasedBefore] = useState("");
  const [releasedAfter, setReleasedAfter] = useState("");
  const [sortBy, setSortBy] = useState();

  const containerClassName = props.showSearchBox
    ? "SearchBoxOpen"
    : "SearchBoxClosed";

  const caretClassName = props.showSearchBox ? "caretclosed" : "caretopen";

  const toggleGenre = (e) => {
    if (selectedGenres.includes(e.target.textContent)) {
      const newArray = selectedGenres.filter((genre) => {
        return genre !== e.target.textContent;
      });
      setSelectedGenres(newArray);
      //remove from array
    } else {
      const newArray = selectedGenres.concat(e.target.textContent);
      setSelectedGenres(newArray);
      //add to array
    }
  };

  const clearGenres = () => {
    setSelectedGenres([]);
  };

  const getYears = (fromOrUntil) => {
    const options = [];
    const monthDay = fromOrUntil === "from" ? "01-01" : "12-31";
    for (let i = 2020; i > 1979; i--) {
      options.push(
        <option key={i} value={`${i}-${monthDay}`}>
          {i}
        </option>
      );
    }
    return options;
  };

  const getClassName = (genre) => {
    return selectedGenres.includes(genre)
      ? "genrebuttonselected"
      : "genrebutton";
  };

  const genreButtons = allGenres.map((genre) => {
    return (
      <button
        key={genre.id}
        className={getClassName(genre.name)}
        onClick={toggleGenre}
      >
        {genre.name}
      </button>
    );
  });

  const handleSearch = () => {
    const queryObj = {
      genres: selectedGenres,
      actor: selectedActor,
      releasedAfter: releasedAfter,
      releasedBefore: releasedBefore,
      sortBy: sortBy,
    };
    props.searchMovies(queryObj);
  };

  return (
    <section id="SearchBox" className={`SearchBox ${containerClassName}`}>
      <input
        type="text"
        className="searchinput"
        placeholder="Search by actor"
        onChange={(e) => setSelectedActor(e.target.value)}
      />
      <div className="genrecontainer">
        <button
          className={
            selectedGenres.length === 0 ? "genrebuttonselected" : "genrebutton"
          }
          onClick={clearGenres}
        >
          All
        </button>
        {genreButtons}
      </div>
      <div className="releasedatecontainer">
        <select
          name="after"
          onChange={(e) => {
            setReleasedAfter(e.target.value);
          }}
        >
          <option value="">From</option>
          {getYears("from")}
        </select>

        <select
          name="before"
          onChange={(e) => {
            setReleasedBefore(e.target.value);
          }}
        >
          <option value="">Until</option>
          {getYears("until")}
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
      </div>
      <div className="searchbuttoncontainer">
        <button
          onClick={() => {
            handleSearch();
            props.toggleSearchBox();
          }}
        >
          Search
        </button>
      </div>
      <i
        id="caret"
        className={`fas fa-angle-down togglesearch ${caretClassName}`}
        onClick={() => {
          props.toggleSearchBox();
        }}
      ></i>
    </section>
  );
}

export default SearchBox;
