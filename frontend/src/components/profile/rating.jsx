export default function Rating({ rating = 1211, peak = 1211, type = "Rapid" }) {
    return (
        <div className="rating">
            <div className="rating-number">
                <h1>{rating}</h1>
            </div>

            <div className="rating-type">
                <span className="rating-icon">◉</span>
                {type}
            </div>

            <div className="rating-peak">
                Peak {peak}
            </div>
        </div>
    );
}
