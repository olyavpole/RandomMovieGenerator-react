import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import useMovieDBService from '../services/MovieDBService';

const MoviePage = () => {

    const [movie, setMovie] = useState({});

    const {movieId} = useParams();

    const {getMovieById} = useMovieDBService();

    useEffect(() => {
        getMovieById(movieId)
            .then(res => setMovie(res))
    }, []);

    return (
        <>
            <div className="page">
                <h1>{movie.title}</h1>
                <div>{movie.description}</div>
                <Link to="/">Go back</Link>
            </div>
        </>
    )
}

export default MoviePage;