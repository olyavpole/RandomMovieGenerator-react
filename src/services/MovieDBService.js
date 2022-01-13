// Genres helper
// Action          28
// Adventure       12
// Animation       16
// Comedy          35
// Crime           80
// Documentary     99
// Drama           18
// Family          10751
// Fantasy         14
// History         36
// Horror          27
// Music           10402
// Mystery         9648
// Romance         10749
// Science Fiction 878
// TV Movie        10770
// Thriller        53
// War             10752
// Western         37

const useMovieDBService = () => {

    const _apiBase = 'https://api.themoviedb.org/3/';
    const _apiKey = '4650c75309a270a22b99e6b3c3f35747';

    const getResourse = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error (`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json();
    }

    const getMovieById = async (id) => {
        let res = await getResourse(`${_apiBase}movie/${id}?api_key=${_apiKey}&language=en-US`);
        return transformMovie(res);
    }

    // const getCreditById = async (id) => {
    //     let res = await getResourse(`${_apiBase}credit/${id}?api_key=${_apiKey}`);
    //     return res;
    // }


    const discoverMoviesWithActor = async (id) => {
        let res = await getResourse(`${_apiBase}discover/movie?api_key=${_apiKey}&sort_by=vote_count.desc&with_cast=${id}`);
        let res2 = res.results.slice(0, 5);
        return res2.map(movie => transformMovie(movie));
    }

    const discoverMoviesOnGenre = async (genre) => {
        let res = await getResourse(`${_apiBase}discover/movie?api_key=${_apiKey}&sort_by=vote_count.desc&with_genres=${genre}`);
        return res.results.map(movie => transformMovie(movie));
    }

    const getCastById = async (id) => {
        let res = await getResourse(`${_apiBase}movie/${id}/credits?api_key=${_apiKey}&language=en-US`);
        return res.cast.map(person => {
            return {
                id: person.id,
                name: person.name,
                position: person.known_for_department
            }
        })
    }

    const getPersonById = async (id) => {
        let res = await getResourse(`${_apiBase}person/${id}?api_key=${_apiKey}&language=en-US`);
        return transformPerson(res);
    }

    const transformMovie = (movie) => {
        return {
            id: movie.id,
            title: movie.original_title,
            tagline: movie.tagline,
            description: movie.overview,
            imageSrc: 'https://image.tmdb.org/t/p/original/' + movie.backdrop_path,
        }
    }

    const transformPerson = (person) => {
        return {
            id: person.id,
            name: person.name,
            birthday: person.birthday,
            deathday: person.deathday,
            profession: person.known_for_department,
            birthplace: person.place_of_birth,
            biography: person.biography,
            imageSrc: 'https://image.tmdb.org/t/p/original/' + person.profile_path,
        }
    }

    return {getMovieById, getCastById, getPersonById, discoverMoviesWithActor, discoverMoviesOnGenre};
}

export default useMovieDBService;