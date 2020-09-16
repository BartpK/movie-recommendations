import React, { useState, useEffect } from 'react';
import './App.css';
import { getMovies } from './utils/apiCalls'
import ResultsBox from './components/ResultsBox'
import SearchBox from './components/SearchBox'
import MovieDetails from './components/MovieDetails'

function App() {

  const [movies, setMovies] = useState()
  const [currentPage, setCurrentPage] = useState()
  const [prevSearch, setPrevSearch] = useState()
  const [highlightedMovie, setHighlightedMovie] = useState()

  const searchMovies = async (queryObj) => {
    const movieData = await getMovies(queryObj)
    setPrevSearch(queryObj)
    setMovies(movieData.results)
    setCurrentPage(movieData.page)
  }

  const toggleMovieDetails = () => {
    const detailsContainer = document.querySelector('#MovieDetails')
    if (detailsContainer.classList.contains('closed')) {
      detailsContainer.classList.remove('closed');
      detailsContainer.classList.add('open');
    } else {
      detailsContainer.classList.remove('open');
      detailsContainer.classList.add('closed');
    }
  }

  const toggleSearchBox = () => {
    const searchContainer = document.querySelector('#SearchBox')
    if (searchContainer.classList.contains("SearchBoxOpen")) {
      searchContainer.classList.remove("SearchBoxOpen")
      searchContainer.classList.add("SearchBoxClosed")
    } else {
      searchContainer.classList.remove("SearchBoxClosed")
      searchContainer.classList.add("SearchBoxOpen")
    }
  }

  const viewMovieDetails = (movieObj) => {
    toggleMovieDetails()
    setHighlightedMovie(movieObj)
  }

  const getNextPage = async () => {
    const queryObj = { ...prevSearch }
    queryObj.page = currentPage + 1
    const movieData = await getMovies(queryObj)
    setPrevSearch(queryObj)
    const newMoviesArray = movies.concat(movieData.results)

    setMovies(newMoviesArray)
    setCurrentPage(movieData.page)
    ////concat results
  }

  const init = async () => {
    const movieData = await getMovies(
      {
        genre: ['Action'],
        actor: '',
        releasedAfter: '2000-01-31',
        releasedBefore: '2020-01-31'
      }
    )
    setPrevSearch({
      genre: ['Action'],
      actor: '',
      releasedAfter: '2000-01-31',
      releasedBefore: '2020-01-31'
    })
    setCurrentPage(movieData.page)
    setMovies(movieData.results)
  }



  useEffect(() => {
    init();





  }, [])

  return (
    <div className="App">
      <SearchBox searchMovies={searchMovies} toggleSearchBox={toggleSearchBox} />
      <ResultsBox movies={movies} getNextPage={getNextPage} viewMovieDetails={viewMovieDetails} />
      <MovieDetails toggleMovieDetails={toggleMovieDetails} highlightedMovie={highlightedMovie} />
      {/* <Nav/> */}
    </div>
  );
}

export default App;
