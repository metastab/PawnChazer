import WinBar from '../../common/WinBar/WinBar';
import './GamesSummary.css';

export default function GamesSummary({
  winRate = 55,
  loseRate = 40,
  totalGames = 123,
  wins = 62,
  draws = 13,
  losses = 58,
  className = '',
}) {
  return (
    <div className={`games-container ${className}`.trim()}>
      <div className="bar-section">
        <div className="win-rate" style={{ whiteSpace: 'nowrap' }}>
          {winRate}% Win
        </div>
        <WinBar winrate={winRate} loserate={loseRate} />
        <div className="total-games" style={{ whiteSpace: 'nowrap' }}>
          {totalGames} Games
        </div>
      </div>

      <div className="stats-section">
        <span className="stat-item stat-win">
          {wins} W
        </span>
        <span className="stat-item stat-draw">
          {draws} D
        </span>
        <span className="stat-item stat-lose">
          {losses} L
        </span>
      </div>
    </div>
  );
}
