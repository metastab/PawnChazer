import WinBar from "./winbar.jsx"

export default function GamesPanel(){
    return (
        <div className="games-container">

            <div className="bar-section">
                <div className="win-rate" style={{ whiteSpace: 'nowrap' }}> 55% Win</div>
                <WinBar winrate={55} loserate={40}/>
                <div className="total-games" style={{ whiteSpace: 'nowrap' }}>123 Games</div>
            </div>

            <div className="stats-section">
                <h7 style={{ color: '#6ade7aff' }}>62 W</h7>
                <h7 style={{ color: '#f14747ff' }}>58 L</h7>
                <h7 style={{ color: '#f1ffeeb6' }}>13 D</h7>
            </div>
        </div>
    )
}