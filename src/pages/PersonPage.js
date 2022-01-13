import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useMovieDBService from '../services/MovieDBService';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import './personPage.scss';

const PersonPage = () => {

    const [person, setPerson] = useState({});
    const [personMovies, setPersonMovies] = useState([]);

    const {getPersonById, discoverMoviesWithActor} = useMovieDBService();

    const {personId} = useParams();

    let date = new Date();
    let birthDate = new Date(person.birthday);
    let age = date.getFullYear() - birthDate.getFullYear() + ' years';

    useEffect(() => {
        getPersonById(personId)
            .then(res => setPerson(res));

        discoverMoviesWithActor(personId)
            .then(res => setPersonMovies(res))
    }, [])

    const movies = personMovies.map(movie => {

        const description = movie.description.slice(0, 100) + '...';

        return (
            <SwiperSlide 
                className="person-page__movies-item movie-card"
                key={movie.id}>
                <Link 
                    className="movie-card__title"
                    to={`/movies/${movie.id}`}
                    >{movie.title}</Link>
                <img 
                    className="movie-card__img" 
                    src={movie.imageSrc} 
                    alt={movie.title} />
                <div className="movie-card__description">{description}</div>
                <Link 
                    className="movie-card__button"
                    to={`/movies/${movie.id}`}
                    >Learn more</Link>
            </SwiperSlide>
        )
    })

    return (
        <>
            <div className="page">
                <div className="person-page__wrapper">
                    <div className="person-page__inner">
                        <div className="person-page__block">
                            <img 
                                className="person-page__image"
                                src={person.imageSrc} 
                                alt={person.name} />
                            <div className="person-page__info">
                                <h2 className="person-page__title">
                                    {person.name}
                                </h2>
                                <ul>
                                    <li>birthdate - {person.birthday}</li>
                                    <li>birthplace - {person.birthplace}</li>
                                    <li>death - {person.deathday}</li>
                                    <li>age - {age}</li>
                                    <li>profession - {person.profession}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="person-page__biography">
                            {person.biography}
                        </div>
                        <div className="person-page__movies">
                            <ul className="person-page__movies-list">
                                <Swiper
                                    spaceBetween={50}
                                    slidesPerView={2}
                                    onSlideChange={() => console.log('slide change')}
                                    onSwiper={(swiper) => console.log(swiper)}
                                    >
                                        {movies}
                                </Swiper>
                            </ul>
                        </div>
                        <Link 
                        className="person-page__link"
                        to="/">Go back</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PersonPage;