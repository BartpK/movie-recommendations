import React, { useState } from "react";
import { allGenres } from "../utils/apiCalls";
import styled from "styled-components";

const Searchcontrolswrapper = styled.div`
  max-height: ${(props) => (props.showSearchBox ? "80vh" : "0vh")};
  transition: max-height 200ms;
`;

const Searchcontrols = styled.div`
  box-sizing: border-box;
  background-color: #1c2541;
  padding: 2rem 1.6rem;
  text-align: center;
  overflow: hidden;
`;

const Inputfield = styled.input`
  background-color: #0b132b;
  color: white;
  padding: 0.6rem 0.8rem;
  margin: 1rem 0.2rem;
  border: none;
  border-bottom: solid 1px white;
`;

const Genrebutton = styled.button`
  border-radius: 1rem;
  padding: 0.5rem;
  margin: 0.2rem;
  background-color: ${(props) => (props.activeButton ? "#6fffe9" : "#0b132b")};
  color: ${(props) => (props.activeButton ? "#0b132b" : "white")};
  border: none;
`;

const Searchbutton = styled.button`
  border-radius: 1rem;
  color: #0b132b;
  background-color: #6fffe9;
  border: none;
  padding: 0.5rem;
  display: block;
  margin: 0 auto;
`;

const Searchtoggle = styled.div`
  background-color: #1c2541;
  color: white;
  height: 3rem;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 1rem;
  text-align: center;
`;

const Caret = styled.i`
  font-size: 1.4rem;
  transform: rotate(${(props) => (props.showSearchBox ? "180deg" : "0deg")});
  transition: transform 300ms;
  position: relative;
`;

function SearchBox(props) {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedActor, setSelectedActor] = useState("");
  const [releasedBefore, setReleasedBefore] = useState("");
  const [releasedAfter, setReleasedAfter] = useState("");
  const [sortBy, setSortBy] = useState();

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

  const isButtonActive = (genre) => {
    return selectedGenres.includes(genre) ? true : false;
  };

  const genreButtons = allGenres.map((genre) => {
    return (
      <Genrebutton
        key={genre.id}
        activeButton={isButtonActive(genre.name)}
        onClick={toggleGenre}
      >
        {genre.name}
      </Genrebutton>
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
    <section>
      <Searchcontrolswrapper showSearchBox={props.showSearchBox}>
        <Searchcontrols showSearchBox={props.showSearchBox}>
          <Inputfield
            type="text"
            className="searchinput"
            placeholder="Search by actor"
            onChange={(e) => setSelectedActor(e.target.value)}
          />
          <div>
            <Genrebutton
              activeButton={selectedGenres.length === 0 ? true : false}
              onClick={clearGenres}
            >
              All
            </Genrebutton>
            {genreButtons}
          </div>
          <div className="releasedatecontainer">
            <Inputfield
              as="select"
              name="after"
              onChange={(e) => {
                setReleasedAfter(e.target.value);
              }}
            >
              <option value="">From</option>
              {getYears("from")}
            </Inputfield>

            <Inputfield
              as="select"
              name="before"
              onChange={(e) => {
                setReleasedBefore(e.target.value);
              }}
            >
              <option value="">Until</option>
              {getYears("until")}
            </Inputfield>
          </div>

          <Inputfield
            as="select"
            name="sort"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="popularity.desc">Most popular (default)</option>
            <option value="popularity.asc">Least popular</option>
            <option value="release_date.desc">Most recent</option>
            <option value="release_date.asc">Least recent</option>
            <option value="vote_average.desc">Best ratings</option>
            <option value="vote_average.asc">Lowest ratings</option>
          </Inputfield>

          <Searchbutton
            onClick={() => {
              handleSearch();
              props.toggleSearchBox();
            }}
          >
            Search
          </Searchbutton>
        </Searchcontrols>
      </Searchcontrolswrapper>
      <Searchtoggle>
        <Caret
          showSearchBox={props.showSearchBox}
          className={`fas fa-angle-down`}
          onClick={() => {
            props.toggleSearchBox();
          }}
        ></Caret>
      </Searchtoggle>
    </section>
  );
}

export default SearchBox;
