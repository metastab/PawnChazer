import './BestGameCard.css';

const DEFAULT_GAME = {
  whitePlayerName: 'metastab',
  blackPlayerName: 'magneton',
  whitePlayerRating: '1173',
  blackPlayerRating: '1112',
  winner: 'White',
  date: '18/10/2025',
  url: 'https://www.chess.com/game/live/172298833102',
};

export default function BestGameCard({
  data = DEFAULT_GAME,
  title = 'Best Game',
  className = '',
}) {
  const {
    whitePlayerName,
    blackPlayerName,
    whitePlayerRating,
    blackPlayerRating,
    winner,
    date,
    url,
  } = data || DEFAULT_GAME;

  const handleClick = () => {
    if (url) {
      window.location.href = url;
    }
  };

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && url) {
      e.preventDefault();
      window.location.href = url;
    }
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={url ? 0 : undefined}
      role={url ? 'link' : undefined}
      className={`bestgame-container ${className}`.trim()}
    >
      <div className="bestgame-title">{title}</div>

      <div className="result-container">
        <div className="player-1">
          <div
            className="piece-color"
            style={{ backgroundColor: 'white' }}
          />
          <h5>{whitePlayerName}</h5>
          <h5>({whitePlayerRating})</h5>
        </div>
        <div className="result">
          <h5>{winner === 'White' ? '1 - 0' : '0 - 1'}</h5>
          <h5>{date}</h5>
        </div>
        <div className="player-2">
          <div
            className="piece-color"
            style={{ backgroundColor: 'black' }}
          />
          <h5>{blackPlayerName}</h5>
          <h5>({blackPlayerRating})</h5>
        </div>
      </div>
    </div>
  );
}
