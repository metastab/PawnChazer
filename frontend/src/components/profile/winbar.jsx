import './WinBar.css'

export default function WinBar({ winrate = 0, loserate = 0}) {
    const percentage = winrate;
    const lose = loserate;

    // unnecessary cases
    if (winrate > 100) winrate = 100;
    if (winrate < 0) winrate = 0;

    return (
        <div className="win-bar">
            <div
                className="green-fill"
                style={{ width: `${percentage}%` }}
            />
            <div
                className="red-fill"
                style={{ width: `${loserate}%` }}
            />
        </div>
    )
}