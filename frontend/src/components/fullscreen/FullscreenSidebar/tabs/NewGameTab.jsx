import { useState } from 'react';

const TIME_CONTROLS = [
  { id: '1m', icon: '⚡', time: '1 min', type: 'Bullet' },
  { id: '3m', icon: '🔥', time: '3 min', type: 'Blitz' },
  { id: '10m', icon: '⏱', time: '10 min', type: 'Rapid' },
  { id: '30m', icon: '⏳', time: '30 min', type: 'Classical' },
];

export default function NewGameTab({
  onSelectTimeControl,
  onSelectMode,
}) {
  const [selectedTc, setSelectedTc] = useState('10m');

  const handleTcClick = (tc) => {
    setSelectedTc(tc.id);
    if (onSelectTimeControl) onSelectTimeControl(tc);
  };

  return (
    <div className="tab-pane new-game-pane">
      <h3 className="pane-section-title">Time Controls</h3>
      <div className="time-controls-grid">
        {TIME_CONTROLS.map((tc) => (
          <button
            key={tc.id}
            type="button"
            className={`tc-card ${selectedTc === tc.id ? 'active' : ''}`}
            onClick={() => handleTcClick(tc)}
          >
            <span className="tc-icon">{tc.icon}</span>
            <span className="tc-time">{tc.time}</span>
            <span className="tc-type">{tc.type}</span>
          </button>
        ))}
      </div>

      <h3 className="pane-section-title">Play Modes</h3>
      <div className="play-modes-list">
        <button
          type="button"
          className="play-mode-card"
          onClick={() => onSelectMode && onSelectMode('online')}
        >
          <div className="mode-left">
            <span className="mode-icon">🌐</span>
            <div className="mode-text">
              <span className="mode-title">Play Online</span>
              <span className="mode-desc">Find a player of matching Elo</span>
            </div>
          </div>
          <span className="mode-arrow">→</span>
        </button>

        <button
          type="button"
          className="play-mode-card"
          onClick={() => onSelectMode && onSelectMode('bot')}
        >
          <div className="mode-left">
            <span className="mode-icon">🤖</span>
            <div className="mode-text">
              <span className="mode-title">Play vs Bot</span>
              <span className="mode-desc">Adaptive Stockfish engine levels</span>
            </div>
          </div>
          <span className="mode-arrow">→</span>
        </button>

        <button
          type="button"
          className="play-mode-card"
          onClick={() => onSelectMode && onSelectMode('friend')}
        >
          <div className="mode-left">
            <span className="mode-icon">🤝</span>
            <div className="mode-text">
              <span className="mode-title">Play a Friend</span>
              <span className="mode-desc">Send invite link or room challenge</span>
            </div>
          </div>
          <span className="mode-arrow">→</span>
        </button>
      </div>
    </div>
  );
}
