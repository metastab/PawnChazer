import './TournamentInfo.css';

export default function TournamentInfo({
  title = 'Ongoing Tournament',
  tournamentName = 'Winters Rapid Open 2026',
  round = 'Round 10 of 11',
  timeControl = '10 min + 5 sec',
  format = '11-Round Swiss',
  status = 'Active (Live)',
  standing = '#4 of 12',
  score = '7.5 / 9.0',
  nextOpponent = 'Shivamcuj',
  nextBoard = 'Board 2',
  nextPiece = 'White',
  className = '',
}) {
  return (
    <div className={`tournament-container ${className}`.trim()}>
      <div className="tournament-header">
        <div className="tournament-title">
          {title}
        </div>
        <span className="tournament-status-badge">{status}</span>
      </div>

      <div className="tournament-main-card">
        <div className="tournament-name-heading">{tournamentName}</div>
        <div className="tournament-tagline">{format} • {round}</div>
      </div>

      <div className="tournament-details-grid">
        <div className="detail-item">
          <span className="detail-label">Time Control</span>
          <span className="detail-value">{timeControl}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Current Standing</span>
          <span className="detail-value">{standing}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Tournament Score</span>
          <span className="detail-value">{score}</span>
        </div>
      </div>

      <div className="next-match-card">
        <div className="next-match-header">
          <span>Next Pairing</span>
          <span className="board-badge">{nextBoard}</span>
        </div>
        <div className="next-match-body">
          <div className="player-matchup">
            <span className="piece-icon">{nextPiece === 'White' ? '♙' : '♟'}</span>
            <span className="player-name">metastab</span>
            <span className="vs-tag">vs</span>
            <span className="opponent-name">{nextOpponent}</span>
          </div>
          <span className="match-time-tag">Starts in ~4 mins</span>
        </div>
      </div>
    </div>
  );
}
