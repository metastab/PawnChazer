import GameHistory from "./Gamehistory"
import QuickActions from "./QuickActions"


import "./bodysection.css"

export default function Mainbody() {
    return (
        <div className="body-section">
            <QuickActions/>
            <GameHistory/>
        </div>
    )
}