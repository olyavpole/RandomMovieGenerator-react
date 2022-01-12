import './movieCard.scss';

const MovieCard = (props) => {
    return (
        <li key={props.id}>
            <h3>{props.title}</h3>
            <img className="img" src={props.imageSrc} alt={props.title} />
            <div>{props.description}</div>
        </li>
    )
}

export default MovieCard;