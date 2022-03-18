import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import useMovieDBService from "../../services/MovieDBService";
import MovieCard from '../movieCard/MovieCard';
import Spinner from "../spinner/Spinner";
import Skeleton from '../skeleton/Skeleton';

import './searchForm.scss'

const SearchForm = () => {

    const [movie, setMovie] = useState({});
    const [cast, setCast] = useState([]);

    const {getCastById, discoverMovieWithParams, process, setProcess} = useMovieDBService();

    const setContent = (process, movie, cast) => {
        switch (process) {
            case 'waiting':
                return <Skeleton/>;
            case 'loading':
                return <Spinner/>;
            case 'confirmed':
                return <MovieCard movie={movie} cast={cast}/>
            case 'error':
                return <ErrorMessage/>
            default:
                throw new Error ('Unexpected process state')
        }
    }

    const onCastLoaded = (cast) => {
        setCast(cast);
    }

    const onMovieLoaded = (movie) => {
        getCastById(movie.id)
            .then(onCastLoaded)
            .then(setProcess('confirmed'))
        setMovie(movie);

        window.scrollTo({
            top: 1000,
            behavior: "smooth"
        });
    }

    const onMovieSearch = (genre, country, fromYear, toYear) => {
        discoverMovieWithParams(genre, country, fromYear, toYear)
            .then(res => onMovieLoaded(res))
    }
    
    return (
        <>
            <div className="search-form">
                <h1 className="search-form__title">
                    Random Movie Generator
                </h1>
                <Formik
                    initialValues={{
                        genre: '',
                        fromYear: 1900,
                        toYear: 2022,
                        country: ''
                    }}
                    onSubmit={values => onMovieSearch(values.genre, values.country, values.fromYear, (values.toYear + 1))}
                    >
                    <Form 
                        className="search-form__form" action="submit">
                        <div className="search-form__inner">
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
                        </div>

                        <div className="search-form__inner">
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
                        </div>

                        <div className="search-form__inner">
                            <label className="search-form__label" htmlFor="fromYear">
                                From year
                            </label>
                            <Field className="search-form__select" type="number" name="fromYear" id="fromYear"/>
                            <ErrorMessage name="fromYear" component="div" />
                        </div>

                        <div className="search-form__inner">    
                            <label className="search-form__label" htmlFor="toYear">
                                To year
                            </label>
                            <Field className="search-form__select" type="number" name="toYear" id="toYear"/>
                            <ErrorMessage name="toYear" component="div" />
                        </div>

                        
                        <button 
                            className="search-form__button"
                            type="submit"
                            >
                                Search Movie
                            </button>
                    </Form>
                </Formik>
            </div>
            {setContent(process, movie, cast)}
        </>
    )
}

export default SearchForm;