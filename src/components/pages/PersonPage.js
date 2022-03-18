import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
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

const PersonPage = () => {

    const [person, setPerson] = useState({});
    const [personMovies, setPersonMovies] = useState([]);

    const {getPersonById, discoverMoviesWithActor, process, setProcess} = useMovieDBService();

    const {personId} = useParams();

    useEffect(() => {

        window.scrollTo(0, 0);

        getPersonById(personId)
            .then(res => setPerson(res));

        discoverMoviesWithActor(personId)
            .then(res => setPersonMovies(res))
            .then(setProcess('confirmed'))
    }, [])

    const setContent = (process, personMovies, person) => {
        switch (process) {
            case 'waiting':
                return null;
            case 'loading':
                return <Spinner/>;
            case 'confirmed':
                return <View personMovies={personMovies} person={person}/>;
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
                    content={person.name}
                    />
                <title>{person.name}</title>
            </Helmet>
            <div className="page__wrapper">
                <Header/>
                {setContent(process, personMovies, person)}
            </div>
        </>
    )
}

export default PersonPage;

const View = ({person, personMovies}) => {

    const myRef = useRef(null);
    const buttonRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const bool = !person.biography || person.biography.length <= 200 ? true : false;

        const classes = buttonRef.current.classList;

        if (bool) {
            classes.add('hide');
        } else {
            classes.remove('hide');
        }

    }, [person])

    const movies = personMovies.map(movie => {

        const description = movie.description ? movie.description.slice(0, 100) + '...' : 'There is no description.';

        const imagePic = movie.imageSrc === 'https://image.tmdb.org/t/p/original/null' ? noImage : movie.imageSrc;

        return (
            <SwiperSlide 
                className="page__movies-item card"
                key={movie.id}>
                <Link 
                    className="card__title"
                    to={`/movies/${movie.id}`}
                    >{movie.title}</Link>
                <img 
                    className="card__img" 
                    src={imagePic} 
                    alt={movie.title} />
                <div className="card__description">{description}</div>
                <Link 
                    className="card__button"
                    to={`/movies/${movie.id}`}
                    >Learn more</Link>
            </SwiperSlide>
        )
    })

    const deathdate = person.deathday === false ? null : <li className="page__info-item"><span>death</span>{person.deathday}</li>

    const birthplace = person.birthplace ? person.birthplace : 'No information';
    const birthday = person.birthday ? person.birthday : 'No information';

    // расчет даты рождения и смерти

    let now = new Date(); // сегодня
    let birthDate = new Date(person.birthday); // дата рождения
    let deathDate = new Date(person.deathday); // дата смерти
    let thisYearBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate()); // если бы день рождения был в текущем году, то когда
    let deathYearBirthday = new Date(deathDate.getFullYear(), birthDate.getMonth(), birthDate.getDate()); // если бы день рождения был в год смерти, то когда
    let age = now.getFullYear() - birthDate.getFullYear(); // получаем возраст
    age = now < thisYearBirthday ? (age - 1) + ' years' : age + ' years'; // если для рождения еще не было, вычитаем год
    let deathAge = deathDate.getFullYear() - birthDate.getFullYear(); // получаем возраст смерти
    deathAge = deathYearBirthday > deathDate ? (deathAge - 1) + ' years' : deathAge + ' years'; // если в году смерти еще не было др вычитаем год

    let finalAge = person.deathday === false ? <li className="page__info-item"><span>age</span>{age}</li> : <li className="page__info-item"><span>death age</span>{deathAge}</li>

    const imagePic = person.imageSrc === 'https://image.tmdb.org/t/p/original/null' ? noImage : person.imageSrc;

    const slidesPerVue = personMovies.length === 1 ? 1 : 2;

    const showAllText = (e) => {

        const classes = myRef.current.classList;

        if (classes.contains('hide')) {
            classes.remove('hide');
            classes.add('show');
            e.target.textContent = 'Hide'
        } else {
            classes.remove('show');
            classes.add('hide');
            e.target.textContent = 'Show more'
        }
    }

    return (
        <div className="page">
            <div className="page__inner">
                <img 
                    className="page__image"
                    src={imagePic} 
                    alt={person.name} />
                <div className="page__content">
                    <h2 className="page__title">
                        {person.name}
                    </h2>
                    <ul className="page__info">
                        <li className="page__info-item"><span>profession</span>{person.profession}</li>
                        <li className="page__info-item"><span>birthdate</span>{birthday}</li>
                        <li className="page__info-item"><span>birthplace</span>{birthplace}</li>
                        {deathdate}
                        {finalAge}
                    </ul>
                </div>
            </div>
            <div className="page__biography">
                <div className="page__biography-text hide" ref={myRef}> 
                    {person.biography}
                </div>
                <button 
                    className="page__biography-btn" 
                    onClick={(e) => showAllText(e)}
                    ref={buttonRef}
                    >Show more</button>
            </div>

            <div className="page__movies">
                <h2 className="page__subtitle">
                    Most mopular movies with {person.name}:
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
                            {movies}
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