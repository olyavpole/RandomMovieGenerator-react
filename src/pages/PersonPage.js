import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useMovieDBService from '../services/MovieDBService';

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
        return (
            <li key={movie.id}>
                <h3>{movie.title}</h3>
                <img className="img" src={movie.imageSrc} alt={movie.title} />
                <div>{movie.description}</div>
            </li>
        )
    })

    return (
        <>
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
                            {movies}
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