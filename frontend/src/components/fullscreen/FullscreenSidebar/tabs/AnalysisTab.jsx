import { useState } from 'react';
import { SAMPLE_PGNS } from '../../../../utils/pgnParser';

export default function AnalysisTab({
  parsedGame,
  currentMoveIndex,
  onMoveSelect,
  isPlaying,
  onTogglePlayPause,
  onFirstMove,
  onPrevMove,
  onNextMove,
  onLastMove,
  onFlipBoard,
  onApplyPgn,
  onLoadPresetPgn,
}) {
  const [analysisSubTab, setAnalysisSubTab] = useState('moves'); // 'moves' | 'info' | 'openings'
  const [showPgnInput, setShowPgnInput] = useState(false);
  const [pgnInputText, setPgnInputText] = useState('');

  const totalHalfMoves = parsedGame.moves.length * 2;

  const handleApply = () => {
    if (pgnInputText.trim()) {
      onApplyPgn(pgnInputText);
      setShowPgnInput(false);
    }
  };

  const handlePreset = (presetKey) => {
    if (SAMPLE_PGNS[presetKey]) {
      setPgnInputText(SAMPLE_PGNS[presetKey]);
      onLoadPresetPgn(presetKey);
    }
  };

  return (
    <div className="tab-pane analysis-pane">
      {/* Subtabs: Moves, Info, Openings */}
      <div className="analysis-subtabs">
        <button
          type="button"
          className={`subtab-btn ${analysisSubTab === 'moves' ? 'active' : ''}`}
          onClick={() => setAnalysisSubTab('moves')}
        >
          Moves
        </button>
        <button
          type="button"
          className={`subtab-btn ${analysisSubTab === 'info' ? 'active' : ''}`}
          onClick={() => setAnalysisSubTab('info')}
        >
          Info
        </button>
        <button
          type="button"
          className={`subtab-btn ${analysisSubTab === 'openings' ? 'active' : ''}`}
          onClick={() => setAnalysisSubTab('openings')}
        >
          Openings
        </button>
      </div>

      {/* Engine & PGN toggle bar */}
      <div className="engine-status-bar">
        <div className="engine-title-group">
          <span className="engine-icon">⚙</span>
          <span className="engine-name">Stockfish 18 Lite</span>
          <span className="engine-dot" title="Evaluation active">●</span>
        </div>

        <button
          type="button"
          className={`pgn-toggle-action ${showPgnInput ? 'active' : ''}`}
          onClick={() => setShowPgnInput((prev) => !prev)}
          title="Input or change PGN"
        >
          {showPgnInput ? '✕ Close PGN' : '📋 Input PGN'}
        </button>
      </div>

      {/* Collapsible PGN Input Drawer */}
      {showPgnInput && (
        <div className="pgn-input-drawer">
          <div className="pgn-presets-row">
            <span className="preset-label">Presets:</span>
            <button
              type="button"
              className="preset-btn"
              onClick={() => handlePreset('rapid_championship')}
            >
              Rapid 10m
            </button>
            <button
              type="button"
              className="preset-btn"
              onClick={() => handlePreset('immortal_game')}
            >
              Immortal
            </button>
            <button
              type="button"
              className="preset-btn"
              onClick={() => handlePreset('speed_blitz')}
            >
              Blitz
            </button>
          </div>

          <textarea
            className="pgn-textarea"
            rows={5}
            value={pgnInputText}
            onChange={(e) => setPgnInputText(e.target.value)}
            placeholder="Paste PGN format text with clock comments here (e.g. 1. e4 {[%clk 0:09:58.4]} 1... e5...)"
          />

          <div className="pgn-action-buttons">
            <button
              type="button"
              className="pgn-apply-btn"
              onClick={handleApply}
            >
              Apply & Parse Moves
            </button>
          </div>
        </div>
      )}

      {/* Subtab Content: MOVES */}
      {analysisSubTab === 'moves' && (
        <div className="moves-ledger-container">
          <div className="starting-position-row">
            <span className="pos-label">Starting Position</span>
            <span className="pos-time-hint" title="Move timestamps & time spent shown">⏱ Time/Move</span>
          </div>

          <div className="moves-scroll-list">
            {parsedGame.moves.map((movePair, pairIdx) => {
              const whiteHalfMoveIdx = pairIdx * 2;
              const blackHalfMoveIdx = pairIdx * 2 + 1;
              const isWhiteActive = currentMoveIndex === whiteHalfMoveIdx;
              const isBlackActive = currentMoveIndex === blackHalfMoveIdx;

              const whiteTimePct = movePair.white?.timeSpent
                ? Math.min(100, Math.max(8, (movePair.white.timeSpent / parsedGame.maxMoveTime) * 100))
                : 0;

              const blackTimePct = movePair.black?.timeSpent
                ? Math.min(100, Math.max(8, (movePair.black.timeSpent / parsedGame.maxMoveTime) * 100))
                : 0;

              return (
                <div key={movePair.number || pairIdx} className="move-ledger-row">
                  {/* Move number */}
                  <span className="move-number-col">{movePair.number}.</span>

                  {/* White move */}
                  <div
                    className={`move-cell white-move ${isWhiteActive ? 'active-move' : ''}`}
                    onClick={() => onMoveSelect(whiteHalfMoveIdx)}
                    role="button"
                    tabIndex={0}
                  >
                    <span className="move-piece-san">
                      {movePair.white?.pieceSymbol && (
                        <span className="piece-icon white-piece">{movePair.white.pieceSymbol}</span>
                      )}
                      <span className="san-text">{movePair.white?.pieceMove || movePair.white?.san || '-'}</span>
                    </span>

                    {movePair.white?.timeSpent !== null && movePair.white?.timeSpent !== undefined && (
                      <span className="time-badge" title={`Clock: ${movePair.white.clock || 'N/A'}`}>
                        <span className="time-val">{movePair.white.timeSpent.toFixed(1)}s</span>
                        <span
                          className="time-bar"
                          style={{ width: `${whiteTimePct}%` }}
                        />
                      </span>
                    )}
                  </div>

                  {/* Black move */}
                  {movePair.black ? (
                    <div
                      className={`move-cell black-move ${isBlackActive ? 'active-move' : ''}`}
                      onClick={() => onMoveSelect(blackHalfMoveIdx)}
                      role="button"
                      tabIndex={0}
                    >
                      <span className="move-piece-san">
                        {movePair.black?.pieceSymbol && (
                          <span className="piece-icon black-piece">{movePair.black.pieceSymbol}</span>
                        )}
                        <span className="san-text">{movePair.black?.pieceMove || movePair.black?.san || '-'}</span>
                      </span>

                      {movePair.black?.timeSpent !== null && movePair.black?.timeSpent !== undefined && (
                        <span className="time-badge" title={`Clock: ${movePair.black.clock || 'N/A'}`}>
                          <span className="time-val">{movePair.black.timeSpent.toFixed(1)}s</span>
                          <span
                            className="time-bar black-bar"
                            style={{ width: `${blackTimePct}%` }}
                          />
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="move-cell empty-cell" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Move Quality Badges */}
          <div className="accuracy-badges-strip">
            <span className="badge-item great">! 2 Great</span>
            <span className="badge-item best">★ 10 Best</span>
            <span className="badge-item excellent">👍 4 Excellent</span>
          </div>
        </div>
      )}

      {/* Subtab Content: INFO */}
      {analysisSubTab === 'info' && (
        <div className="info-tab-content">
          <div className="info-card">
            <div className="info-row">
              <span className="info-label">Event:</span>
              <span className="info-val">{parsedGame.headers.Event || 'Casual Game'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">White:</span>
              <span className="info-val">{parsedGame.headers.White || 'White'} ({parsedGame.headers.WhiteElo || '?'})</span>
            </div>
            <div className="info-row">
              <span className="info-label">Black:</span>
              <span className="info-val">{parsedGame.headers.Black || 'Black'} ({parsedGame.headers.BlackElo || '?'})</span>
            </div>
            <div className="info-row">
              <span className="info-label">Result:</span>
              <span className="info-val result-badge">{parsedGame.headers.Result || '*'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Time Control:</span>
              <span className="info-val">{parsedGame.headers.TimeControl || '600'}s (Rapid)</span>
            </div>
            <div className="info-row">
              <span className="info-label">Total Moves:</span>
              <span className="info-val">{parsedGame.moves.length} moves</span>
            </div>
          </div>
        </div>
      )}

      {/* Subtab Content: OPENINGS */}
      {analysisSubTab === 'openings' && (
        <div className="openings-tab-content">
          <div className="opening-card">
            <h4>Van't Kruijs Opening</h4>
            <p className="opening-eco">ECO Code: A00 • 1. d3 d5</p>
            <p className="opening-desc">
              A subtle, flexible opening favored for avoiding heavily memorized theory and transitioning into King's Indian Attack setups.
            </p>
          </div>
        </div>
      )}

      {/* Game Review CTA Button */}
      <button type="button" className="game-review-cta-btn">
        <span className="review-icon">★</span>
        <span className="review-text">Game Review</span>
      </button>

      {/* Quick Action Buttons */}
      <div className="analysis-quick-actions">
        <button type="button" className="quick-act-btn">
          <span className="act-icon">➕</span>
          <span>New 10 min</span>
        </button>
        <button type="button" className="quick-act-btn">
          <span className="act-icon">↺</span>
          <span>Rematch</span>
        </button>
      </div>

      {/* Move Navigation Control Bar */}
      <div className="move-playback-controls">
        <button
          type="button"
          className="playback-btn"
          onClick={onFirstMove}
          title="First Move (Home)"
          disabled={currentMoveIndex === -1}
        >
          |◀
        </button>
        <button
          type="button"
          className="playback-btn"
          onClick={onPrevMove}
          title="Previous Move (←)"
          disabled={currentMoveIndex === -1}
        >
          ◀
        </button>
        <button
          type="button"
          className={`playback-btn play-btn ${isPlaying ? 'playing' : ''}`}
          onClick={onTogglePlayPause}
          title={isPlaying ? 'Pause Auto-Play' : 'Auto-Play Moves (Space)'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button
          type="button"
          className="playback-btn"
          onClick={onNextMove}
          title="Next Move (→)"
          disabled={currentMoveIndex >= totalHalfMoves - 1}
        >
          ▶
        </button>
        <button
          type="button"
          className="playback-btn"
          onClick={onLastMove}
          title="Last Move (End)"
          disabled={currentMoveIndex >= totalHalfMoves - 1}
        >
          ▶|
        </button>
        {onFlipBoard && (
          <button
            type="button"
            className="playback-btn flip-btn"
            onClick={onFlipBoard}
            title="Flip Board Orientation (F)"
          >
            ↺
          </button>
        )}
      </div>
    </div>
  );
}
