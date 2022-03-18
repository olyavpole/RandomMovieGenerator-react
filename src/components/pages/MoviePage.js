import { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import useMovieDBService from '../../services/MovieDBService';
import Header from "../header/Header";
import Spinner from '../spinner/Spinner'
import Error from "../error/Error"
import noImage from '../../images/no-image.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import 'swiper/css';
import "swiper/css/navigation";

import './page.scss';

const MoviePage = () => {

    const [movie, setMovie] = useState({});
    const [cast, setCast] = useState([]);

    const {movieId} = useParams();

    const {getMovieById, getCastById, process, setProcess} = useMovieDBService();

    useEffect(() => {

        window.scrollTo(0, 0);

        getMovieById(movieId)
            .then(res => setMovie(res))

        getCastById(movieId)
            .then(res => setCast(res))
            .then(setProcess('confirmed'))
    }, []);

    const setContent = (process, movie, cast) => {
        switch (process) {
            case 'waiting':
                return null;
            case 'loading':
                return <Spinner/>;
            case 'confirmed':
                return <View movie={movie} cast={cast}/>;
            case 'error':
                return <Error/>
            default:
                throw new Error ('Unexpected process state')
        }
    }

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={movie.title}
                    />
                <title>{movie.title}</title>
            </Helmet>
            <div className="page__wrapper">
                <Header/>
                {setContent(process, movie, cast)}
            </div>
        </>
    )
}

const View = ({movie, cast}) => {

    const myRef = useRef(null);
    const buttonRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const bool = !movie.description || movie.description.length <= 200 ? true : false;

        const classes = buttonRef.current.classList;

        if (bool) {
            classes.add('hide');
        } else {
            classes.remove('hide');
        }

    }, [movie])

    const actors = cast.filter(actor => {
        return actor.position === 'Acting'
    })

    const actorsList = actors.slice(0, 10).map(actor => {

        const imagePic = actor.imageSrc === 'https://image.tmdb.org/t/p/original/null' ? noImage : actor.imageSrc;

        const character = actor.character ? `as ${actor.character}` : null;

        return (
            <SwiperSlide 
                className="page__movies-item card"
                key={actor.id}>
                <Link 
                    className="card__title"
                    to={`/persons/${actor.id}`}
                    >{actor.name}</Link>
                <div className="card__character">
                    {character}
                </div>
                <img 
                    className="card__img" 
                    src={imagePic} 
                    alt={actor.name} />
                <Link 
                    className="card__button"
                    to={`/persons/${actor.id}`}
                    >Learn more</Link>
            </SwiperSlide>
        )
    })

    const tagline = movie.tagline === '' ? null : <li className="page__info-item"><span>tagline</span>{movie.tagline}</li>

    const imagePic = movie.imageSrc === 'https://image.tmdb.org/t/p/original/null' ? noImage : movie.imageSrc;

    const slidesPerVue = cast.length === 1 ? 1 : 2;

    const showAllText = (e) => {

        const clazz = myRef.current.classList;

        if (clazz.contains('hide')) {
            clazz.remove('hide');
            clazz.add('show');
            e.target.textContent = 'Hide'
        } else {
            clazz.remove('show');
            clazz.add('hide');
            e.target.textContent = 'Show more'
        }
    }

    return (
        <div className="page">
            <div className="page__inner">
                <img 
                    className="page__image"
                    src={imagePic} 
                    alt={movie.title} />
                <div className="page__content">
                    <h2 className="page__title">
                        {movie.title}
                    </h2>
                    <ul className="page__info">
                        {tagline}
                        <li className="page__info-item"><span>genre</span>{movie.genres}</li>
                        <li className="page__info-item"><span>country</span>{movie.countries}</li>
                        <li className="page__info-item"><span>release date</span>{movie.releaseDate}</li>
                        <li className="page__info-item"><span>budget</span>{movie.budget}</li>
                        <li className="page__info-item"><span>revenue</span>{movie.revenue}</li>
                        <li className="page__info-item"><span>language</span>{movie.languages}</li>
                    </ul>
                </div>
            </div>
            <div className="page__biography">
                <div className="page__biography-text hide" ref={myRef}> 
                    {movie.description}
                </div>
                <button 
                    className="page__biography-btn" 
                    onClick={(e) => showAllText(e)}
                    ref={buttonRef}>
                        Show more</button>
            </div>
            <div className="page__movies">
                <h2 className="page__subtitle">
                    cast of {movie.title}:
                </h2>
                <ul className="page__movies-list">
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={50}
                        slidesPerView={slidesPerVue}
                        navigation={{ 
                            clickable: true,
                            prevEl: ".my.swiper-button-prev",
                            nextEl: ".my.swiper-button-next"
                        }}
                        >
                            {actorsList}
                    </Swiper>
                    <div className="my swiper-button-next"></div>
                    <div className="my swiper-button-prev"></div>
                </ul>
            </div>
            <button 
            className="page__link"
            onClick={() => navigate(-1)}>Go back</button>
        </div>
    )
}


export default MoviePage;