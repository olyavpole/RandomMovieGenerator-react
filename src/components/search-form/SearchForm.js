import useMovieDBService from "../../services/MovieDBService";
import { useState, useEffect } from 'react';

import './search-form.scss'

const SearchForm = () => {

    const [movie, setMovie] = useState('');
    const [cast, setCast] = useState([]);

    const {getMovieById, getCastById} = useMovieDBService();

    const onMovieLoaded = (movie) => {
        setMovie(movie);
    }

    const onCastLoaded = (cast) => {
        setCast(cast);
    }

    useEffect(() => {

        let id = Math.round(2 - 0.5 + Math.random() * (70000 - 2 + 1));

        getCastById(id)
        .then(onCastLoaded)

        getMovieById(id)
        .then(onMovieLoaded);
    }, [])

    return (
        <>
            <div className="search-form__wrapper">
                <div className="search-form__inner">
                    <h1 className="search-form__title">
                        Random Movie For Your Evening
                    </h1>
                    <form className="search-form__form" action="submit">
                        <label className="search-form__label" htmlFor="genre">
                            Choose genre
                        </label>
                        <select className="search-form__select" name="genre" id="genre" multiple>
                            <option value="">All genres</option>
                            <option value="Horror">Horror</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Drama">Drama</option>
                            <option value="Family">Family</option>
                            <option value="Sport">Sport</option>
                        </select>

                        <label className="search-form__label" htmlFor="rate">
                            Choose genre
                        </label>
                        <select className="search-form__select" name="rate" id="rate" multiple>
                            <option value="">All rates</option>
                            <option value="9+">9+</option>
                            <option value="8.5+">8.5+</option>
                            <option value="8+">8+</option>
                            <option value="7.5+">7.5+</option>
                            <option value="7+">7+</option>
                        </select>

                        <label className="search-form__label" htmlFor="country">
                            Choose country
                        </label>
                        <select className="search-form__select" name="country" id="country" multiple>
                            <option value="">All countries</option>
                            <option value="USA">USA</option>
                            <option value="Great Britain">Great Britain</option>
                            <option value="Russia">Russia</option>
                            <option value="India">India</option>
                            <option value="France">France</option>
                        </select>
                    </form>
                </div>
            </div>
            <View movie={movie} cast={cast}/>
        </>
    )
}

const View = ({movie, cast}) => {

    const {title, description} = movie;

    console.log(cast);

    const actors = cast.filter(actor => {
        return actor.position === 'Acting'
    })

    const directors = cast.filter(director => {
        return director.position === 'Directing'
    })


    console.log(actors);
    console.log(directors);

    return (
        <>
            <div className="movie-page__wrapper">
                <div className="movie-page__inner">
                    <div className="movie-page__title">
                        {title}
                    </div>
                    <div className="movie-page__description">
                        {description}
                    </div>
                    <div className="movie-page__cast">
                        <ul className="movie-page__cast-list">
                            
                        </ul>
                    </div>
                </div>


            </div>
        </>
    )
}

export default SearchForm;