import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import useMovieDBService from '../services/MovieDBService';
import Logo from '../components/logo/Logo';
import noImage from '../images/no-image.png';

import './personPage.scss';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

const MoviePage = () => {

    const [movie, setMovie] = useState({});
    const [cast, setCast] = useState([]);

    const {movieId} = useParams();

    const {getMovieById, getCastById} = useMovieDBService();

    useEffect(() => {
        getMovieById(movieId)
            .then(res => setMovie(res))

        getCastById(movieId)
            .then(res => setCast(res))
    }, []);

    const actors = cast.filter(actor => {
        return actor.position === 'Acting'
    })

    const actorsList = actors.slice(0, 10).map(actor => {

        const imagePic = actor.imageSrc === 'https://image.tmdb.org/t/p/original/null' ? noImage : actor.imageSrc;

        return (
            <SwiperSlide 
                className="person-page__movies-item movie-card"
                key={actor.id}>
                <Link 
                    className="movie-card__title"
                    to={`/persons/${actor.id}`}
                    >{actor.name}</Link>
                <div className="movie-card__character">
                    as {actor.character}
                </div>
                <img 
                    className="movie-card__img" 
                    src={imagePic} 
                    alt={actor.name} />
                <Link 
                    className="movie-card__button"
                    to={`/persons/${actor.id}`}
                    >Learn more</Link>
            </SwiperSlide>
        )
    })

    const tagline = movie.tagline === '' ? null : <li className="person-page__info-item"><span>tagline</span>{movie.tagline}</li>

    const imagePic = movie.imageSrc === 'https://image.tmdb.org/t/p/original/null' ? noImage : movie.imageSrc;

    return (
        <>
            <div className="page">
                <Logo/>
                <div className="person-page">
                    <div className="person-page__inner">
                        <img 
                            className="person-page__image"
                            src={imagePic} 
                            alt={movie.title} />
                        <div className="person-page__content">
                            <h2 className="person-page__title">
                                {movie.title}
                            </h2>
                            <ul className="person-page__info">
                                {tagline}
                                <li className="person-page__info-item"><span>genre</span>{movie.genres}</li>
                                <li className="person-page__info-item"><span>country</span>{movie.countries}</li>
                                <li className="person-page__info-item"><span>release date</span>{movie.releaseDate}</li>
                                <li className="person-page__info-item"><span>budget</span>{movie.budget}</li>
                                <li className="person-page__info-item"><span>revenue</span>{movie.revenue}</li>
                                <li className="person-page__info-item"><span>language</span>{movie.languages}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="person-page__biography">
                        {movie.description}
                    </div>
                    <div className="person-page__movies">
                        <h2 className="person-page__subtitle">
                            cast of {movie.title}:
                        </h2>
                        <ul className="person-page__movies-list">
                            <Swiper
                                spaceBetween={50}
                                slidesPerView={2}
                                onSlideChange={() => console.log('slide change')}
                                onSwiper={(swiper) => console.log(swiper)}
                                >
                                    {actorsList}
                            </Swiper>
                        </ul>
                    </div>
                    <Link 
                    className="person-page__link"
                    to="/">Go back</Link>
                </div>
            </div>
        </>
    )
}

export default MoviePage;