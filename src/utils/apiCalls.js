import { apiKey } from '../secrets/secret'

const endpoints = {
    discover: 'https://api.themoviedb.org/3/discover/movie?',
}

export const genres = [
    {
        id: 28,
        name: "Action"
    },
    {
        id: 12,
        name: "Adventure"
    },
    {
        id: 16,
        name: "Animation"
    },
    {
        id: 35,
        name: "Comedy"
    },
    {
        id: 80,
        name: "Crime"
    },
    {
        id: 99,
        name: "Documentary"
    },
    {
        id: 18,
        name: "Drama"
    },
    {
        id: 10751,
        name: "Family"
    },
    {
        id: 14,
        name: "Fantasy"
    },
    {
        id: 36,
        name: "History"
    },
    {
        id: 27,
        name: "Horror"
    },
    {
        id: 10402,
        name: "Music"
    },
    {
        id: 9648,
        name: "Mystery"
    },
    {
        id: 10749,
        name: "Romance"
    },
    {
        id: 878,
        name: "Science Fiction"
    },
    {
        id: 10770,
        name: "TV Movie"
    },
    {
        id: 53,
        name: "Thriller"
    },
    {
        id: 10752,
        name: "War"
    },
    {
        id: 37,
        name: "Western"
    }
]

const queries = {
    actor: 'with_cast',
    genres: 'with_genres',
    releasedAfter: 'primary_release_date.gte',
    releasedBefore: 'primary_release_date.lte',
    page: 'page',
    sortBy: 'sort_by'
}

const getGenreID = (genre) => {
    const idArray = genre.map(e => {
        const id = genres.filter(genre => {
            return genre.name === e
        })[0].id
        return id;
    })
    return idArray.join('|')
}

const getActorID = async (actorName) => {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/search/person?query=${actorName}&api_key=${apiKey}`)
        const data = await res.json()
        return data.results[0].id
    } catch (err) {
    }
}


let previousQuery;
let currentPage = 1;


export const getMovies = async (queryObj) => {


    const actorQuery = queryObj.actor ? `${queries.actor}=${await getActorID(queryObj.actor)}&` : "";
    const genreQuery = queryObj.genre ? `${queries.genres}=${getGenreID(queryObj.genre)}&` : "";

    const beforeQuery = queryObj.releasedBefore ? `${queries.releasedBefore}=${queryObj.releasedBefore}&` : "";
    const afterQuery = queryObj.releasedAfter ? `${queries.releasedAfter}=${queryObj.releasedAfter}&` : "";

    const sortQuery = queryObj.sortBy ? `${queries.sortBy}=${queryObj.sortBy}&` : "";

    const pageQuery = queryObj.page ? `${queries.page}=${queryObj.page}&` : ""



    try {
        const res = await fetch(endpoints.discover + actorQuery + genreQuery + afterQuery + beforeQuery + sortQuery + pageQuery + "api_key=" + apiKey)
        const data = await res.json()

        data.results = data.results.filter(movie => {
            return movie.poster_path !== null;
        })
        return data;
    } catch (err) {
    }
}