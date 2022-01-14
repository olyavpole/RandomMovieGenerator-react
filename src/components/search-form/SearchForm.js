import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import useMovieDBService from "../../services/MovieDBService";
import Spinner from "../spinner/Spinner";
import Skeleton from '../skeleton/Skeleton';

import './search-form.scss'

const SearchForm = () => {

    const [movie, setMovie] = useState(null);
    const [prevMovie, setPrevMovie] = useState({});
    const [cast, setCast] = useState([]);

    const {getCastById, discoverMoviesOnGenre} = useMovieDBService();

    const onCastLoaded = (cast) => {
        setCast(cast);
    }

    const may = (res) => {

        let num = Math.round(0 - 0.5 + Math.random() * (20 - 0 + 1));

        setPrevMovie(res[num]);
        getCastById(prevMovie.id)
            .then(onCastLoaded)
        setMovie(prevMovie);
        
    }

    const onMovieSearch = (genre, country, year) => {
        discoverMoviesOnGenre(genre, country, year)
            .then(res => may(res))
    }

    const content = movie ? <View movie={movie} cast={cast}/> : <Skeleton/>;
    
    return (
        <>
            <div className="search-form">
                <h1 className="search-form__title">
                    Random Movie Generator
                </h1>
                <Formik
                    initialValues={{
                        genre: '',
                        year: 0,
                        country: ''
                    }}
                    // validate={values => console.log(values)}
                    onSubmit={values => onMovieSearch(values.genre, values.country, values.year)}
                    >
                    <Form 
                        className="search-form__form" action="submit">
                        <label className="search-form__label" htmlFor="genre">
                            Choose genre
                        </label>
                        <Field 
                            as="select"
                            className="search-form__select" name="genre" 
                            id="genre">
                            <option value="">All genres</option>
                            <option value="28">Action</option>
                            <option value="12">Adventure</option>
                            <option value="16">Animation</option>
                            <option value="35">Comedy</option>
                            <option value="80">Crime</option>
                            <option value="99">Documentary</option>
                            <option value="18">Drama</option>
                            <option value="10751">Family</option>
                            <option value="14">Fantasy</option>
                            <option value="36">History</option>
                            <option value="27">Horror</option>
                            <option value="10402">Music</option>
                            <option value="9648">Mystery</option>
                            <option value="10749">Romance</option>
                            <option value="878">Science Fiction</option>
                            <option value="10770">TV Movie</option>
                            <option value="53">Thriller</option>
                            <option value="10752">War</option>
                            <option value="37">Western</option>
                        </Field>
                        <ErrorMessage name="genre" component="div" />

                        <label className="search-form__label" htmlFor="country">
                            Choose country
                        </label>
                        <Field 
                            as="select" className="search-form__select" name="country" 
                            id="country">
                            <option value="xx">All countries</option>
                            <option value="cn|zh">China</option>
                            <option value="cs">Chech Republic</option>
                            <option value="da">Denmark</option>
                            <option value="de">Germany</option>
                            <option value="et">Estonia</option>
                            <option value="fi">Finland</option>
                            <option value="fr">France</option>
                            <option value="hu">Hungary</option>
                            <option value="it">Italy</option>
                            <option value="ja">Japan</option>
                            <option value="ko">Korea</option>
                            <option value="nl">Netherlands</option>
                            <option value="nb|no">Norway</option>
                            <option value="pl">Poland</option>
                            <option value="pt">Portugal</option>
                            <option value="ru">Russia</option>
                            <option value="ca|es|eu|gl">Spain</option>
                            <option value="sv">Sweden</option>
                            <option value="tr">Turkey</option>
                            <option value="el">Greece</option>
                            <option value="en">USA</option>
                            <option value="hi|kn|ml|ta|te">India</option>
                        </Field>
                        <ErrorMessage name="country" component="div" />

                        <label className="search-form__label" htmlFor="year">
                            Choose year
                        </label>
                        <Field type="number" name="year" id="year"/>
                        <ErrorMessage name="year" component="div" />

                        <button 
                            className="search-form__button"
                            type="submit"
                            >Search movie</button>
                    </Form>
                </Formik>
            </div>
            {content}
        </>
    )
}

const View = ({movie, cast}) => {

    const {title, description, imageSrc} = movie;

    const actors = cast.filter(actor => {
        return actor.position === 'Acting'
    })

    let actorsList = actors.slice(0, 5).map(actor => {
        return (
            <Link 
                to={`/persons/${actor.id}`}
                className="movie-page__cast-list-item" 
                key={actor.id}
                >{actor.name}</Link>
        )
    })

    actorsList = actorsList.length > 10 ?  actorsList.slice(0, 10) : actorsList;

    const descriptionText = description ? description.slice(0, 200) + '...' : 'There is no description'

    return (
        <>
            <div className="movie-page">
                <div className="movie-page__inner">
                    <div className="movie-page__content">
                        <Link to={`/movies/${movie.id}`} className="movie-page__title">
                            {title}
                        </Link>
                        <div className="movie-page__description">
                            {descriptionText}
                        </div>
                        <div className="movie-page__cast">
                            <div className="">
                                Cast:
                            </div>
                            <ul className="movie-page__cast-list">
                                {actorsList}
                            </ul>
                        </div>
                    </div>
                    <img 
                        className="movie-page__img" 
                        src={imageSrc} 
                        alt={title} />
                </div>
            </div>
        </>
    )
}

export default SearchForm;