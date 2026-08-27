import './GameHistory.css';

export default function GameHistory({
  title = 'Game History',
  games = [],
  children,
  className = '',
}) {
  return (
    <div className={`gamehistory-container ${className}`.trim()}>
      <div className="title">{title}</div>
      <div className="games-list">
        {children}
        {games.length === 0 && !children ? null : null}
      </div>
    </div>
  );
}
