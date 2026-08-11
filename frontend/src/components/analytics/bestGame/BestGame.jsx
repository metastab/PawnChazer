export default function BestGame(props) {

    const {
        whitePlayerName,
        blackPlayerName,
        whitePlayerRating,
        blackPlayerRating,
        winner,
        date,
        url
    } = props.data;

    return (
        <div onClick={() => window.location.href = url} className="bestgame-container">

            <div className="bestgame-title">Best Game</div>

            <div className="result-container">
                <div className="player-1">
                    <div className="piece-color" style={{ backgroundColor: "white" }}></div>
                    <h5>{whitePlayerName}</h5>
                    <h5>({whitePlayerRating})</h5>
                </div>
                <div className="result">
                    <h5>{winner === "White" ? "1 - 0" : "0 - 1"}</h5>
                    <h5>{date}</h5>
                </div>
                <div className="player-2">
                    <div className="piece-color" style={{ backgroundColor: "black" }}></div>
                    <h5>{blackPlayerName}</h5>
                    <h5>({blackPlayerRating})</h5>
                </div>
            </div>

        </div>
    )
}