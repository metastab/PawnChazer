import './WinBar.css'

function WinBar({ winrate = 0 }) {
    const percentage = winrate

    // unnecessary cases
    if (winrate > 100) winrate = 100;
    if (winrate < 0) winrate = 0;

    return (
        <div className="win-bar">
            <div
                className="progress-fill"
                style={{ width: `${percentage}%` }}
            />
        </div>
    )
}

export default WinBar