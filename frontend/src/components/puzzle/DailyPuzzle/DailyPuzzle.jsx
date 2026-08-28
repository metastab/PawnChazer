import Chessboard from '../Chessboard/Chessboard';
import './DailyPuzzle.css';

export default function DailyPuzzle({
  title = 'Puzzle of the Day',
  children,
  className = '',
  onToggleFullscreen,
  isFullscreen = false,
}) {
  return (
    <section className={`puzzle-container ${isFullscreen ? 'fullscreen-mode' : ''} ${className}`.trim()}>
      <div className="puzzle-header-row">
        <h2>{title}</h2>
      </div>

      <div className="chessboard-section-wrapper">
        <div className="chessboard-container-box">
          {children || <Chessboard isFullscreen={isFullscreen} />}
        </div>
      </div>

      {onToggleFullscreen && (
        <button
          type="button"
          className={`chessboard-fullscreen-btn ${isFullscreen ? 'active' : ''}`.trim()}
          onClick={onToggleFullscreen}
          aria-label={isFullscreen ? 'Exit Fullscreen Mode' : 'Enter Fullscreen Mode'}
          title={isFullscreen ? 'Exit Fullscreen (Esc)' : 'Expand Chessboard to Fullscreen'}
        >
          <span className="btn-icon">{isFullscreen ? '' : '⛶'}</span>
          <span className="btn-text">{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
        </button>
      )}
    </section>
  );
}

