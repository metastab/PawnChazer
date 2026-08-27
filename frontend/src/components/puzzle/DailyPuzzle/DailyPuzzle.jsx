import Chessboard from '../Chessboard/Chessboard';
import './DailyPuzzle.css';

export default function DailyPuzzle({
  title = 'Puzzle of the Day',
  children,
  className = '',
}) {
  return (
    <section className={`puzzle-container ${className}`.trim()}>
      <h2>{title}</h2>
      {children || <Chessboard />}
    </section>
  );
}
