import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useMovieDBService from '../services/MovieDBService';

import Logo from '../components/logo/Logo';
import noImage from '../images/no-image.png';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import "swiper/css/navigation";

import './personPage.scss';

const PersonPage = () => {

    const [person, setPerson] = useState({});
    const [personMovies, setPersonMovies] = useState([]);
    const {getPersonById, discoverMoviesWithActor} = useMovieDBService();
    const {personId} = useParams();

    useEffect(() => {
        getPersonById(personId)
            .then(res => setPerson(res));

        discoverMoviesWithActor(personId)
            .then(res => setPersonMovies(res))
    }, [])

    const movies = personMovies.map(movie => {

        const description = movie.description.slice(0, 100) + '...';

        const imagePic = movie.imageSrc === 'https://image.tmdb.org/t/p/original/null' ? noImage : movie.imageSrc;

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
                    src={imagePic} 
                    alt={movie.title} />
                <div className="movie-card__description">{description}</div>
                <Link 
                    className="movie-card__button"
                    to={`/movies/${movie.id}`}
                    >Learn more</Link>
            </SwiperSlide>
        )
    })

    const deathdate = person.deathday === false ? null : <li className="person-page__info-item"><span>death</span>{person.deathday}</li>

    //////////////////////

    let now = new Date(); //сегодня
    let birthDate = new Date(person.birthday); //дата рождения
    let deathDate = new Date(person.deathday); // дата смерти
    let thisYearBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate()); // если бы день рождения был в текущем году, то когда
    let deathYearBirthday = new Date(deathDate.getFullYear(), birthDate.getMonth(), birthDate.getDate()); // если бы день рождения был в год смерти, тог когда
    let age = now.getFullYear() - birthDate.getFullYear(); // получаем возраст
    age = now < thisYearBirthday ? (age - 1) + ' years' : age + ' years'; // если для рождения еще не было, вычитаем год
    let deathAge = deathDate.getFullYear() - birthDate.getFullYear(); // получаем возраст смерти
    deathAge = deathYearBirthday > deathDate ? (deathAge - 1) + ' years' : deathAge + ' years'; // если в году смерти еще не было др вычитаем год

    let finalAge = person.deathday === false ? <li className="person-page__info-item"><span>age</span>{age}</li> : <li className="person-page__info-item"><span>death age</span>{deathAge}</li>

    //////////////////////

    const imagePic = person.imageSrc === 'https://image.tmdb.org/t/p/original/null' ? noImage : person.imageSrc;

    const slidesPerVue = personMovies.length === 1 ? 1 : 3;

    return (
        <>
            <div className="page">
                <Logo/>
                <div className="person-page">
                    <div className="person-page__inner">
                        <img 
                            className="person-page__image"
                            src={imagePic} 
                            alt={person.name} />
                        <div className="person-page__content">
                            <h2 className="person-page__title">
                                {person.name}
                            </h2>
                            <ul className="person-page__info">
                                <li className="person-page__info-item"><span>profession</span>{person.profession}</li>
                                <li className="person-page__info-item"><span>birthdate</span>{person.birthday}</li>
                                <li className="person-page__info-item"><span>birthplace</span>{person.birthplace}</li>
                                {deathdate}
                                {finalAge}
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
                                modules={[Navigation]}
                                spaceBetween={50}
                                loop={true}
                                slidesPerView={slidesPerVue}
                                navigation={{ clickable: true }}
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