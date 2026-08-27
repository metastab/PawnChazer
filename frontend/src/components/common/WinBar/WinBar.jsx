import './WinBar.css';

export default function WinBar({ winrate = 0, loserate = 0, className = '' }) {
  const safeWinRate = Math.min(100, Math.max(0, winrate));
  const safeLoseRate = Math.min(100, Math.max(0, loserate));

  return (
    <div className={`win-bar ${className}`.trim()}>
      <div
        className="green-fill"
        style={{ width: `${safeWinRate}%` }}
      />
      <div
        className="red-fill"
        style={{ width: `${safeLoseRate}%` }}
      />
    </div>
  );
}
