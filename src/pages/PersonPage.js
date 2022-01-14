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
                <div className="person-page">
                    <div className="person-page__inner">
                        <img 
                            className="person-page__image"
                            src={person.imageSrc} 
                            alt={person.name} />
                        <div className="person-page__content">
                            <h2 className="person-page__title">
                                {person.name}
                            </h2>
                            <ul className="person-page__info">
                                <li className="person-page__info-item"><span>profession</span>{person.profession}</li>
                                <li className="person-page__info-item"><span>birthdate</span>{person.birthday}</li>
                                <li className="person-page__info-item"><span>birthplace</span>{person.birthplace}</li>
                                <li className="person-page__info-item"><span>age</span>{age}</li>
                                <li className="person-page__info-item"><span>death</span>{person.deathday}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="person-page__biography">
                        {person.biography}
                    </div>
                    <div className="person-page__movies">
                        <h2 className="person-page__subtitle">
                            Most mopular movies with {person.name}:
                        </h2>
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
        </>
    )
}

export default PersonPage;