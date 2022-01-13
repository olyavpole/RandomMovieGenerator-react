import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import useMovieDBService from "../../services/MovieDBService";

import './search-form.scss'

const SearchForm = () => {

    const [movie, setMovie] = useState({});
    const [prevMovie, setPrevMovie] = useState({});
    const [cast, setCast] = useState([]);

    const {getCastById, discoverMoviesOnGenre} = useMovieDBService();

    const onCastLoaded = (cast) => {
        setCast(cast);
    }

    // useEffect(() => {

    //     let id = Math.round(2 - 0.5 + Math.random() * (700 - 2 + 1));

    //     getCastById(id)
    //         .then(onCastLoaded)

    // }, [])

    const may = (res) => {

        let num = Math.round(0 - 0.5 + Math.random() * (20 - 0 + 1));

        setPrevMovie(res[num]);
        getCastById(prevMovie.id)
            .then(onCastLoaded)
        setMovie(prevMovie);
        
    }

    const onMovieSearch = (genre) => {
        discoverMoviesOnGenre(genre)
            .then(res => may(res))
    }

    const content = movie ? <View movie={movie} cast={cast}/> : 'No movie'
    
    return (
        <>
            <div className="search-form">
                <h1 className="search-form__title">
                    Random Movie For Your Evening
                </h1>
                <Formik
                    initialValues={{
                        genre: '',
                        rate: 0,
                        country: ''
                    }}
                    // validate={values => console.log(values)}
                    onSubmit={values => onMovieSearch(values.genre, values.rate, values.country)}
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

                        {/* <label className="search-form__label" htmlFor="rate">
                            Choose genre
                        </label>
                        <Field 
                            as="select"
                            className="search-form__select"     name="rate" 
                            id="rate">
                            <option value="">All rates</option>
                            <option value="9">9+</option>
                            <option value="8">8+</option>
                            <option value="7">7+</option>
                            <option value="6">6+</option>
                            <option value="5">5+</option>
                        </Field>
                        <ErrorMessage name="rate" component="div" />
                        

                        <label className="search-form__label" htmlFor="country">
                            Choose country
                        </label>
                        <Field 
                            as="select" className="search-form__select" name="country" 
                            id="country">
                            <option value="">All countries</option>
                            <option value="USA">USA</option>
                            <option value="Great Britain">Great Britain</option>
                            <option value="Russia">Russia</option>
                            <option value="India">India</option>
                            <option value="France">France</option>
                        </Field>
                        <ErrorMessage name="country" component="div" /> */}

                        <button 
                            className="search-form__button" type="submit"
                            onClick={(e) => onMovieSearch(e)}
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