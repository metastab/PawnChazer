import { useState, useEffect } from 'react';
import {
  Header,
  ProfileHeader,
  GamesSummary,
  ProfileBody,
  DailyPuzzle,
  AnalyticsSection,
  Empty,
  Footer,
  Chessboard,
  PlayerCard,
  FullscreenSidebar,
  ThemeToggle,
} from './components';
import './App.css';

function App() {
  const [viewMode, setViewMode] = useState('normal'); // 'normal' | 'puzzle_fullscreen' | 'game_panel'
  const [isBoardFlipped, setIsBoardFlipped] = useState(false);

  const closeFullscreen = () => {
    setViewMode('normal');
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && viewMode !== 'normal') {
        setViewMode('normal');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [viewMode]);

  // Mode 1: Simple Fullscreen Daily Puzzle Chessboard
  if (viewMode === 'puzzle_fullscreen') {
    return (
      <div className="app-fullscreen-view puzzle-fullscreen-view">
        <header className="fullscreen-header">
          <div className="fullscreen-brand">
            <span className="brand-title">Pawn Chazer</span>
            <span className="fullscreen-badge">✦ Puzzle Fullscreen ✦</span>
          </div>

          <div className="fullscreen-actions">
            <ThemeToggle />
            <button
              type="button"
              className="fullscreen-close-btn"
              onClick={closeFullscreen}
              aria-label="Exit fullscreen mode"
              title="Exit Fullscreen (Esc)"
            >
              <span className="close-icon">✕</span>
              <span className="close-text">Exit Fullscreen</span>
              <kbd className="esc-tag">Esc</kbd>
            </button>
          </div>
        </header>

        <main className="fullscreen-puzzle-content">
          <DailyPuzzle
            title="Puzzle of the Day"
            isFullscreen={true}
            onToggleFullscreen={closeFullscreen}
          />
        </main>
      </div>
    );
  }

  // Mode 2: Comprehensive Game Panel (Board + 4-Tab Right Sidebar)
  if (viewMode === 'game_panel') {
    return (
      <div className="app-fullscreen-view game-panel-fullscreen-view">
        <header className="fullscreen-header">
          <div className="fullscreen-brand">
            <span className="brand-title">Pawn Chazer</span>
            <span className="fullscreen-badge">✦ Live Match & Analysis ✦</span>
          </div>

          <div className="fullscreen-actions">
            <ThemeToggle />
            <button
              type="button"
              className="fullscreen-close-btn"
              onClick={closeFullscreen}
              aria-label="Exit game panel"
              title="Exit Game Panel (Esc)"
            >
              <span className="close-icon">✕</span>
              <span className="close-text">Exit Game Panel</span>
              <kbd className="esc-tag">Esc</kbd>
            </button>
          </div>
        </header>

        <main className="fullscreen-main-split">
          {/* Left Column: Board & Player Info */}
          <section className="fullscreen-board-stage">
            <PlayerCard
              username="ShmatokSala"
              rating={1144}
              countryFlag="🇺🇦"
              clock="10:00"
              isTop={true}
            />

            <Chessboard
              isFullscreen={true}
              flipped={isBoardFlipped}
            />

            <PlayerCard
              username="metastab"
              rating={1180}
              countryFlag="🇮🇳"
              clock="10:00"
              isTurn={true}
            />
          </section>

          {/* Right Column: Sidebar (New Game, Games, Players, and optional Analysis) */}
          <section className="fullscreen-sidebar-stage">
            <FullscreenSidebar
              initialShowAnalysisTab={false}
              onFlipBoard={() => setIsBoardFlipped((prev) => !prev)}
            />
          </section>
        </main>
      </div>
    );
  }

  // Default: Normal Profile Dashboard
  return (
    <div className="app-layout">
      <Header title="Pawn Chazer" />

      <ProfileHeader
        username="metastab"
        realName="original name"
        avatarSrc="/placeholder.jpg"
        rating={1211}
        peakRating={1444}
        gameType="Rapid"
      />

      <GamesSummary />
      <ProfileBody onPlayGame={() => setViewMode('game_panel')} />
      <DailyPuzzle
        isFullscreen={false}
        onToggleFullscreen={() => setViewMode('puzzle_fullscreen')}
      />
      <AnalyticsSection />
      <Empty />
      <Footer />
    </div>
  );
}

export default App;

