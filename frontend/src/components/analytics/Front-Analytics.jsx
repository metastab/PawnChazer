import Streak from './streak/Streak'
import BestGame from './bestGame/BestGame'

import "./streak/Streak.css"
import "./bestGame/bestGame.css"

export default function FrontAnalytics() {

    const bestGame = {
        whitePlayerName: "metastab",
        blackPlayerName: "magneton",
        whitePlayerRating: "1173",
        blackPlayerRating: "1112",
        winner: "White",
        date: "18/10/2025",
        url: "https://www.chess.com/game/live/172298833102"
    }

    return (
        <div className="analytics-container">
            <Streak />
            <BestGame data={bestGame} />
        </div>
    )
}