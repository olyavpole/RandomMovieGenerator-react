import './skeleton.scss';

const Skeleton = () => {
    return (
        <div className="skeleton">
            <div className="skeleton__inner">
                <div className="skeleton__wrapper">
                    <div className="pulse skeleton__block skeleton__block--small"></div>
                    <div className="pulse skeleton__block skeleton__block--medium"></div>
                    <div className="pulse skeleton__block skeleton__block--big"></div>
                </div>
                <div className="pulse skeleton__block skeleton__block--right"></div>
            </div>
        </div>
    )
}

export default Skeleton;
