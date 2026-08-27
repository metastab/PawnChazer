import StreakCard from '../StreakCard/StreakCard';
import BestGameCard from '../BestGameCard/BestGameCard';
import './AnalyticsSection.css';

const DEFAULT_BEST_GAME = {
  whitePlayerName: 'metastab',
  blackPlayerName: 'magneton',
  whitePlayerRating: '1173',
  blackPlayerRating: '1112',
  winner: 'White',
  date: '18/10/2025',
  url: 'https://www.chess.com/game/live/172298833102',
};

export default function AnalyticsSection({
  bestGame = DEFAULT_BEST_GAME,
  streakDays,
  children,
  className = '',
}) {
  return (
    <section className={`analytics-container ${className}`.trim()}>
      {children || (
        <>
          <StreakCard days={streakDays} />
          <BestGameCard data={bestGame} />
        </>
      )}
    </section>
  );
}
