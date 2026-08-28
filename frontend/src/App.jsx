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
} from './components';
import './App.css';

function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

  if (isFullscreen) {
    return (
      <div className="app-fullscreen-view">
        <header className="fullscreen-header">
          <div className="fullscreen-brand">
            <span className="brand-title">Pawn Chazer</span>
            <span className="fullscreen-badge">✦ Fullscreen View ✦</span>
          </div>

          <button
            type="button"
            className="fullscreen-close-btn"
            onClick={toggleFullscreen}
            aria-label="Exit fullscreen mode"
            title="Exit Fullscreen (Esc)"
          >
            <span className="close-icon">✕</span>
            <span className="close-text">Exit Fullscreen</span>
            <kbd className="esc-tag">Esc</kbd>
          </button>
        </header>

        <main className="fullscreen-content">
          <DailyPuzzle
            title="Puzzle of the Day"
            isFullscreen={true}
            onToggleFullscreen={toggleFullscreen}
          />
        </main>
      </div>
    );
  }

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
      <ProfileBody />
      <DailyPuzzle
        isFullscreen={false}
        onToggleFullscreen={toggleFullscreen}
      />
      <AnalyticsSection />
      <Empty />
      <Footer />
    </div>
  );
}

export default App;

