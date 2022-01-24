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
        return transformMovie2(res);
    }

    const discoverMoviesWithActor = async (id) => {
        let res = await getResourse(`${_apiBase}discover/movie?api_key=${_apiKey}&sort_by=vote_count.desc&with_cast=${id}`);
        let res2 = res.results.slice(0, 10);
        return res2.map(movie => transformMovie(movie));
    }

    const discoverMoviesOnGenre = async (genre, language, fromYear, toYear) => {
        let res = await getResourse(`${_apiBase}discover/movie?api_key=${_apiKey}&sort_by=vote_count.desc&with_genres=${genre}&with_original_language=${language}&release_date.gte=${fromYear}&release_date.lte=${toYear}`);
        return res.results.map(movie => transformMovie(movie));
    }

    const getCastById = async (id) => {
        let res = await getResourse(`${_apiBase}movie/${id}/credits?api_key=${_apiKey}&language=en-US`);
        return res.cast.map(person => {
            return {
                id: person.id,
                name: person.name,
                position: person.known_for_department,
                imageSrc: 'https://image.tmdb.org/t/p/original/' + person.profile_path,
                character: person.character,
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
            title: movie.title,
            tagline: movie.tagline,
            description: movie.overview,
            imageSrc: 'https://image.tmdb.org/t/p/original/' + movie.backdrop_path
        }
    }

    const transformMovie2 = (movie) => {

        const genres = movie.genres.map((item, i) => {
            let symbol = i === (movie.genres.length - 1) ? ' ' : ' / ';

            return item.name + symbol;
        })

        const countries = movie.production_countries.map((item, i) => {
            let symbol = i === (movie.production_countries.length - 1) ? ' ' : ' / ';

            return item.name + symbol;
        })

        const languages = movie.spoken_languages.map((item, i) => {
            let symbol = i === (movie.spoken_languages.length - 1) ? ' ' : ' / ';

            return item.name + symbol;
        })

        const budget = movie.budget === 0 ? 'There is no information' : movie.budget;

        const revenue = movie.revenue === 0 ? 'There is no information' : movie.revenue;

        return {
            id: movie.id,
            title: movie.title,
            tagline: movie.tagline,
            description: movie.overview,
            imageSrc: 'https://image.tmdb.org/t/p/original/' + movie.backdrop_path,
            releaseDate: movie.release_date,
            countries,
            genres,
            budget,
            revenue,
            languages,
        }
    }

    const transformPerson = (person) => {

        const profession = person.known_for_department === 'Acting' ? 'actor' : '';

        const deathday = person.deathday === null ? false : person.deathday;

        const biography = person.biography === '' ? `There is no information about ${person.name} at the moment.` : person.biography;

        return {
            id: person.id,
            name: person.name,
            birthday: person.birthday,
            deathday,
            profession,
            birthplace: person.place_of_birth,
            biography,
            imageSrc: 'https://image.tmdb.org/t/p/original/' + person.profile_path,
        }
    }

    return {
            getMovieById, 
            getCastById, 
            getPersonById, 
            discoverMoviesWithActor, 
            discoverMoviesOnGenre
        };
}

export default useMovieDBService;