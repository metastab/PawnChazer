import QuickActions from '../QuickActions/QuickActions';
import GameHistory from '../GameHistory/GameHistory';
import './ProfileBody.css';

export default function ProfileBody({
  children,
  quickActionsProps,
  gameHistoryProps,
  className = '',
}) {
  return (
    <section className={`body-section ${className}`.trim()}>
      {children || (
        <>
          <QuickActions {...quickActionsProps} />
          <GameHistory {...gameHistoryProps} />
        </>
      )}
    </section>
  );
}
