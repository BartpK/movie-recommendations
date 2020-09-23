import { apiKey } from "../secrets/secret";

const endpoints = {
  discover: "https://api.themoviedb.org/3/discover/movie?",
  findCast: "https://api.themoviedb.org/3/movie/",
};

export const allGenres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

const queries = {
  actor: "with_cast",
  genres: "with_genres",
  releasedAfter: "primary_release_date.gte",
  releasedBefore: "primary_release_date.lte",
  page: "page",
  sortBy: "sort_by",
};

const getGenreIDs = (selectedGenres) => {
  const idArray = selectedGenres.map((selectedGenre) => {
    const id = allGenres.filter((genre) => {
      return genre.name === selectedGenre;
    })[0].id;
    return id;
  });
  return idArray.join("|");
};

const getActorID = async (actorName) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/person?query=${actorName}&api_key=${apiKey}`
    );
    const data = await res.json();
    return data.results[0].id;
  } catch (err) {
    console.log(err);
  }
};

//used to filter out movies without poster image or other missing data
const filterMovies = (results) => {
  return results.filter((movie) => {
    return movie.poster_path !== null;
  });
};

export const getCast = async (movieID) => {
  try {
    const res = await fetch(
      `${endpoints.findCast}${movieID}/credits?api_key=${apiKey}`
    );
    const data = await res.json();

    const mainCast = data.cast
      .slice(0, 4)
      .map((actor) => {
        return actor.name;
      })
      .join(", ");

    return [mainCast, movieID];
  } catch (err) {
    console.log(err);
  }
};

export const getMovies = async (queryObj) => {
  const actorQuery = queryObj.actor
    ? `${queries.actor}=${await getActorID(queryObj.actor)}&`
    : "";
  const genreQuery = queryObj.genres
    ? `${queries.genres}=${getGenreIDs(queryObj.genres)}&`
    : "";
  const beforeQuery = queryObj.releasedBefore
    ? `${queries.releasedBefore}=${queryObj.releasedBefore}&`
    : "";
  const afterQuery = queryObj.releasedAfter
    ? `${queries.releasedAfter}=${queryObj.releasedAfter}&`
    : "";
  const sortQuery = queryObj.sortBy
    ? `${queries.sortBy}=${queryObj.sortBy}&`
    : "";
  const pageQuery = queryObj.page ? `${queries.page}=${queryObj.page}&` : "";

  try {
    const res = await fetch(
      endpoints.discover +
        actorQuery +
        genreQuery +
        afterQuery +
        beforeQuery +
        sortQuery +
        pageQuery +
        "api_key=" +
        apiKey
    );
    const data = await res.json();
    data.results = filterMovies(data.results);
    return data;
  } catch (err) {
    console.log(err);
  }
};
