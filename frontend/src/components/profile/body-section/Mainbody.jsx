import GameHistory from "./gamehistory"
import Others from "./others"

import "./bodysection.css"

export default function Mainbody() {
    return (
        <div className="body-section">
            <Others/>
            <GameHistory/>
        </div>
    )
}