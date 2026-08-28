import './PlayerCard.css';

export default function PlayerCard({
  username = 'Player',
  rating = 1200,
  avatarSrc = '',
  countryFlag = '🌐',
  clock = '10:00',
  isTurn = false,
  isTop = false,
  className = '',
}) {
  return (
    <div className={`player-card ${isTop ? 'top-player' : 'bottom-player'} ${isTurn ? 'active-turn' : ''} ${className}`.trim()}>
      <div className="player-meta-group">
        <div className="player-avatar-badge">
          {avatarSrc ? (
            <img src={avatarSrc} alt={username} className="avatar-img" />
          ) : (
            <span className="avatar-fallback">{isTop ? '♟' : '♞'}</span>
          )}
        </div>

        <div className="player-details">
          <div className="player-name-row">
            <span className="player-username">{username}</span>
            <span className="player-rating">({rating})</span>
            {countryFlag && <span className="player-flag" title="Country">{countryFlag}</span>}
          </div>
        </div>
      </div>

      <div className={`player-clock-box ${isTurn ? 'clock-active' : ''}`}>
        <span className="clock-icon">⏱</span>
        <span className="clock-time">{clock}</span>
      </div>
    </div>
  );
}
