import { useState } from 'react';
import './ChallengePlayer.css';

const TIME_CONTROLS = [
  { id: '10+0', label: '10 min Rapid' },
  { id: '15+10', label: '15 | 10 Rapid' },
  { id: '3+2', label: '3 | 2 Blitz' },
  { id: '5+0', label: '5 min Blitz' },
  { id: '1+0', label: '1 min Bullet' },
];

export default function ChallengePlayer({
  title = 'Challenge a Player',
  defaultOpponent = '',
  onSendChallenge,
  className = '',
}) {
  const [opponent, setOpponent] = useState(defaultOpponent);
  const [timeControl, setTimeControl] = useState('10+0');
  const [pieceColor, setPieceColor] = useState('random');
  const [isRated, setIsRated] = useState(true);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const challengeData = {
      opponent: opponent.trim() || 'Anonymous Player',
      timeControl,
      pieceColor,
      isRated,
    };

    if (onSendChallenge) {
      onSendChallenge(challengeData);
    }

    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 3500);
  };

  return (
    <div className={`challenge-container ${className}`.trim()}>
      <div className="challenge-header">
        <div className="challenge-title">{title}</div>
        <span className="challenge-badge">Direct Match</span>
      </div>

      <form className="challenge-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="opponent-input">
            Opponent Username
          </label>
          <input
            id="opponent-input"
            type="text"
            className="paper-input"
            placeholder="Enter username (e.g. Shivamcuj)..."
            value={opponent}
            onChange={(e) => setOpponent(e.target.value)}
          />
        </div>

        <div className="form-group">
          <span className="form-label">Time Control</span>
          <div className="time-options">
            {TIME_CONTROLS.map((tc) => (
              <button
                key={tc.id}
                type="button"
                className={`time-chip ${timeControl === tc.id ? 'active' : ''}`.trim()}
                onClick={() => setTimeControl(tc.id)}
              >
                {tc.label}
              </button>
            ))}
          </div>
        </div>

        <div className="options-row">
          <div className="form-group" style={{ margin: 0 }}>
            <span className="form-label">Play as</span>
            <div className="piece-picker">
              <button
                type="button"
                className={`piece-btn ${pieceColor === 'white' ? 'active' : ''}`.trim()}
                onClick={() => setPieceColor('white')}
                title="White"
              >
                ♙
              </button>
              <button
                type="button"
                className={`piece-btn ${pieceColor === 'random' ? 'active' : ''}`.trim()}
                onClick={() => setPieceColor('random')}
                title="Random Color"
              >
                ½
              </button>
              <button
                type="button"
                className={`piece-btn ${pieceColor === 'black' ? 'active' : ''}`.trim()}
                onClick={() => setPieceColor('black')}
                title="Black"
              >
                ♟
              </button>
            </div>
          </div>

          <label className="rated-toggle">
            <input
              type="checkbox"
              checked={isRated}
              onChange={(e) => setIsRated(e.target.checked)}
            />
            <span>Rated Game</span>
          </label>
        </div>

        {sentSuccess ? (
          <div className="challenge-sent-msg">
            ✓ Challenge sent to {opponent.trim() || 'Anonymous Player'}!
          </div>
        ) : (
          <button type="submit" className="challenge-submit-btn">
            Send Challenge
          </button>
        )}
      </form>
    </div>
  );
}
