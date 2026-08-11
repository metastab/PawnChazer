import Chessboard from "./Chessboard"
import "./Chessboard.css"

export default function PuzzleoftheDay(){
    return(
        <div className="puzzle-container">
            <h2>Puzzle of the Day</h2>
            <Chessboard/>
        </div>
    )
}