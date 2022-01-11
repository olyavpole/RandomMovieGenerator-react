

const useMovieDBService = () => {
    const _apikey = '4650c75309a270a22b99e6b3c3f35747';

    const getResourse = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error (`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json();
    }

    const getMovieById = async (id) => {
        let res = await getResourse(`https://api.themoviedb.org/3/movie/${id}?api_key=${_apikey}&language=en-US`);
        return transformMovie(res);
    }

    // const getPicturesById = async (id) => {
    //     let res = await getResourse(`
    //     https://api.themoviedb.org/3/movie/${id}/images?api_key=${_apikey}&language=en-US`);
    //     return res.
    // }

    const getCastById = async (id) => {
        let res = await getResourse(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${_apikey}&language=en-US`);
        return res.cast.map(person => {
            return {
                id: person.id,
                name: person.name,
                position: person.known_for_department
            }
        })
    }

    const transformMovie = (movie) => {
        return {
            id: movie.id,
            title: movie.original_title,
            tagline: movie.tagline,
            description: movie.overview,
        }
    }

    return {getMovieById, getCastById};
}

export default useMovieDBService;