import { useState } from 'react';
import QuickActions from '../QuickActions/QuickActions';
import GameHistory from '../GameHistory/GameHistory';
import TournamentInfo from '../TournamentInfo/TournamentInfo';
import ChallengePlayer from '../ChallengePlayer/ChallengePlayer';
import './ProfileBody.css';

export default function ProfileBody({
  children,
  quickActionsProps,
  gameHistoryProps,
  tournamentInfoProps,
  challengePlayerProps,
  initialView = 'tournament',
  className = '',
}) {
  const [activeView, setActiveView] = useState(initialView);

  const handleActionClick = (action) => {
    if (action.id === 'tournament') {
      setActiveView('tournament');
    } else if (action.id === 'game-history') {
      setActiveView('game-history');
    } else if (action.id === 'challenge') {
      setActiveView('challenge');
    }

    if (quickActionsProps?.onActionClick) {
      quickActionsProps.onActionClick(action);
    }
  };

  return (
    <section className={`body-section ${className}`.trim()}>
      {children || (
        <>
          <QuickActions
            activeActionId={activeView}
            onActionClick={handleActionClick}
            {...quickActionsProps}
          />
          <div className="profile-main-panel" key={activeView}>
            {activeView === 'tournament' && (
              <TournamentInfo {...tournamentInfoProps} />
            )}
            {activeView === 'challenge' && (
              <ChallengePlayer {...challengePlayerProps} />
            )}
            {activeView === 'game-history' && (
              <GameHistory {...gameHistoryProps} />
            )}
          </div>
        </>
      )}
    </section>
  );
}
