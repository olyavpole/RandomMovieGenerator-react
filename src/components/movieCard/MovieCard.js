import { Link } from 'react-router-dom';

import noImage from '../../images/no-image.png';

import './movieCard.scss';

const MovieCard = ({movie, cast}) => {

    const {title, description, imageSrc} = movie;

    const imagePic = imageSrc === 'https://image.tmdb.org/t/p/original/null' ? noImage : imageSrc;

    const actors = cast.filter(actor => {
        return actor.position === 'Acting'
    })

    let actorsList = actors.slice(0, 5).map(actor => {
        return (
            <Link 
                to={`/persons/${actor.id}`}
                className="movie-card__cast-list-item" 
                key={actor.id}
                >{actor.name}</Link>
        )
    })

    const descriptionText = description ? description.slice(0, 200) + '...' : 'There is no description';

    return (
        <>
            <div className="movie-card" id="movie-card">
                <div className="movie-card__inner">
                    <div className="movie-card__content">
                        <Link to={`/movies/${movie.id}`} className="movie-card__title">
                            {title}
                        </Link>
                        <div className="movie-card__description">
                            {descriptionText}
                        </div>
                        <div className="movie-card__cast">
                            <div className="movie-card__subtitle">
                                Cast:
                            </div>
                            <ul className="movie-card__cast-list">
                                {actorsList}
                            </ul>
                        </div>
                    </div>
                    <img 
                        className="movie-card__img" 
                        src={imagePic} 
                        alt={title} />
                </div>
            </div>
        </>
    )
}

export default MovieCard;
