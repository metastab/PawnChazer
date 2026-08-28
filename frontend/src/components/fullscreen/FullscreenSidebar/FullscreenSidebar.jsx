import { useState, useEffect, useMemo, useRef } from 'react';
import { parsePgn, SAMPLE_PGNS } from '../../../utils/pgnParser';
import AnalysisTab from './tabs/AnalysisTab';
import NewGameTab from './tabs/NewGameTab';
import GamesTab from './tabs/GamesTab';
import PlayersTab from './tabs/PlayersTab';
import ChallengePlayer from '../../profile/ChallengePlayer/ChallengePlayer';
import './FullscreenSidebar.css';

export default function FullscreenSidebar({
  initialPgn = SAMPLE_PGNS.rapid_championship,
  initialShowAnalysisTab = false,
  onFlipBoard,
  onMoveSelect,
  onChallengePlayer,
  className = '',
}) {
  const [hasAnalysisTab, setHasAnalysisTab] = useState(initialShowAnalysisTab);
  const [activeTab, setActiveTab] = useState(initialShowAnalysisTab ? 'analysis' : 'new_game');
  const [challengedPlayer, setChallengedPlayer] = useState(null);
  
  const [currentPgn, setCurrentPgn] = useState(initialPgn);
  const parsedGame = useMemo(() => parsePgn(currentPgn), [currentPgn]);
  
  // Navigation / move pointer
  const [currentMoveIndex, setCurrentMoveIndex] = useState(() => {
    const initialParsed = parsePgn(initialPgn);
    return initialParsed.moves.length > 0 ? (initialParsed.moves.length * 2) - 1 : -1;
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const playIntervalRef = useRef(null);

  // Autoplay moves
  useEffect(() => {
    if (isPlaying) {
      const totalHalfMoves = parsedGame.moves.length * 2;
      playIntervalRef.current = setInterval(() => {
        setCurrentMoveIndex((prev) => {
          if (prev >= totalHalfMoves - 1) {
            setIsPlaying(false);
            return totalHalfMoves - 1;
          }
          const next = prev + 1;
          if (onMoveSelect) onMoveSelect(next);
          return next;
        });
      }, 1200);
    } else {
      clearInterval(playIntervalRef.current);
    }

    return () => clearInterval(playIntervalRef.current);
  }, [isPlaying, parsedGame, onMoveSelect]);

  const handleApplyCustomPgn = (newPgn) => {
    if (newPgn.trim()) {
      setCurrentPgn(newPgn);
      const parsed = parsePgn(newPgn);
      setCurrentMoveIndex(parsed.moves.length > 0 ? (parsed.moves.length * 2) - 1 : -1);
    }
  };

  const handleLoadSamplePgn = (sampleKey) => {
    if (SAMPLE_PGNS[sampleKey]) {
      const pgn = SAMPLE_PGNS[sampleKey];
      setCurrentPgn(pgn);
      const parsed = parsePgn(pgn);
      setCurrentMoveIndex(parsed.moves.length > 0 ? (parsed.moves.length * 2) - 1 : -1);
    }
  };

  const handleSelectGameFromArchive = (pgnKey) => {
    if (SAMPLE_PGNS[pgnKey]) {
      const pgn = SAMPLE_PGNS[pgnKey];
      setCurrentPgn(pgn);
      const parsed = parsePgn(pgn);
      setCurrentMoveIndex(parsed.moves.length > 0 ? (parsed.moves.length * 2) - 1 : -1);
      setHasAnalysisTab(true);
      setActiveTab('analysis');
    }
  };

  const handleCloseAnalysisTab = (e) => {
    e.stopPropagation();
    setHasAnalysisTab(false);
    if (activeTab === 'analysis') {
      setActiveTab('new_game');
    }
  };

  // Move playback triggers
  const totalHalfMoves = parsedGame.moves.length * 2;

  const goToFirstMove = () => {
    setIsPlaying(false);
    setCurrentMoveIndex(-1);
    if (onMoveSelect) onMoveSelect(-1);
  };

  const goToPrevMove = () => {
    setIsPlaying(false);
    setCurrentMoveIndex((prev) => {
      const next = Math.max(-1, prev - 1);
      if (onMoveSelect) onMoveSelect(next);
      return next;
    });
  };

  const togglePlayPause = () => {
    if (currentMoveIndex >= totalHalfMoves - 1) {
      setCurrentMoveIndex(-1);
    }
    setIsPlaying((prev) => !prev);
  };

  const goToNextMove = () => {
    setIsPlaying(false);
    setCurrentMoveIndex((prev) => {
      const next = Math.min(totalHalfMoves - 1, prev + 1);
      if (onMoveSelect) onMoveSelect(next);
      return next;
    });
  };

  const goToLastMove = () => {
    setIsPlaying(false);
    const last = totalHalfMoves - 1;
    setCurrentMoveIndex(last);
    if (onMoveSelect) onMoveSelect(last);
  };

  const handleMoveSelect = (halfMoveIdx) => {
    setIsPlaying(false);
    setCurrentMoveIndex(halfMoveIdx);
    if (onMoveSelect) onMoveSelect(halfMoveIdx);
  };

  const handleChallengePlayer = (player) => {
    setChallengedPlayer(player);
    if (onChallengePlayer) {
      onChallengePlayer(player);
    }
  };

  return (
    <aside className={`fullscreen-sidebar ${className}`.trim()}>
      {/* Main Tabs Header */}
      <nav
        className={`sidebar-main-tabs ${hasAnalysisTab ? 'tabs-count-4' : 'tabs-count-3'}`}
        aria-label="Fullscreen Sidebar Navigation"
      >
        {hasAnalysisTab && (
          <button
            type="button"
            className={`sidebar-tab-btn analysis-tab ${activeTab === 'analysis' ? 'active' : ''}`}
            onClick={() => setActiveTab('analysis')}
          >
            <span
              className="tab-close-cross"
              onClick={handleCloseAnalysisTab}
              title="Close Analysis Tab"
              aria-label="Close Analysis Tab"
            >
              ✕
            </span>
            <span className="tab-icon">⏱</span>
            <span className="tab-label">Analysis</span>
          </button>
        )}

        <button
          type="button"
          className={`sidebar-tab-btn ${activeTab === 'new_game' ? 'active' : ''}`}
          onClick={() => setActiveTab('new_game')}
        >
          <span className="tab-icon">➕</span>
          <span className="tab-label">New Game</span>
        </button>

        <button
          type="button"
          className={`sidebar-tab-btn ${activeTab === 'games' ? 'active' : ''}`}
          onClick={() => setActiveTab('games')}
        >
          <span className="tab-icon">▦</span>
          <span className="tab-label">Games</span>
        </button>

        <button
          type="button"
          className={`sidebar-tab-btn ${activeTab === 'players' ? 'active' : ''}`}
          onClick={() => setActiveTab('players')}
        >
          <span className="tab-icon">👥</span>
          <span className="tab-label">Players</span>
        </button>
      </nav>

      {/* TAB 1: ANALYSIS */}
      {hasAnalysisTab && activeTab === 'analysis' && (
        <AnalysisTab
          parsedGame={parsedGame}
          currentMoveIndex={currentMoveIndex}
          onMoveSelect={handleMoveSelect}
          isPlaying={isPlaying}
          onTogglePlayPause={togglePlayPause}
          onFirstMove={goToFirstMove}
          onPrevMove={goToPrevMove}
          onNextMove={goToNextMove}
          onLastMove={goToLastMove}
          onFlipBoard={onFlipBoard}
          onApplyPgn={handleApplyCustomPgn}
          onLoadPresetPgn={handleLoadSamplePgn}
        />
      )}

      {/* TAB 2: NEW GAME */}
      {activeTab === 'new_game' && (
        <NewGameTab />
      )}

      {/* TAB 3: GAMES */}
      {activeTab === 'games' && (
        <GamesTab onSelectGame={handleSelectGameFromArchive} />
      )}

      {/* TAB 4: PLAYERS */}
      {activeTab === 'players' && (
        <PlayersTab onChallengePlayer={handleChallengePlayer} />
      )}

      {/* Challenge Player Component Rendered Below the Sidebar Content */}
      {challengedPlayer && (
        <div className="sidebar-challenge-section">
          <div className="sidebar-challenge-header">
            <span className="sidebar-challenge-badge">✦ Direct Challenge: {challengedPlayer.name} ✦</span>
            <button
              type="button"
              className="sidebar-challenge-close-btn"
              onClick={() => setChallengedPlayer(null)}
              title="Close challenge form"
              aria-label="Close challenge"
            >
              ✕
            </button>
          </div>
          <ChallengePlayer
            defaultOpponent={challengedPlayer.name}
            key={challengedPlayer.name}
            className="sidebar-embedded-challenge"
          />
        </div>
      )}
    </aside>
  );
}
