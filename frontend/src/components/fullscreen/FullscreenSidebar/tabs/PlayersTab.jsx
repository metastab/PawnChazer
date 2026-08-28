import { useState } from 'react';

const DEFAULT_PLAYERS = [
  { id: 'p1', name: 'Opponent', rating: 1144, flag: '🇺🇦', status: 'Online', title: '' },
  { id: 'p2', name: 'magneton', rating: 1112, flag: '🇯🇵', status: 'In Game', title: '' },
  { id: 'p3', name: 'GrandMaster_Vibe', rating: 2410, flag: '🇮🇳', status: 'Online', title: 'GM' },
  { id: 'p4', name: 'KnightRider99', rating: 1350, flag: '🇺🇸', status: 'Online', title: '' },
  { id: 'p5', name: 'TacticalBishop', rating: 1520, flag: '🇩🇪', status: 'Idle', title: 'CM' },
];

export default function PlayersTab({
  players = DEFAULT_PLAYERS,
  onChallengePlayer,
}) {
  const [playerSearchQuery, setPlayerSearchQuery] = useState('');

  const filteredPlayers = players.filter((p) =>
    p.name.toLowerCase().includes(playerSearchQuery.toLowerCase())
  );

  return (
    <div className="tab-pane players-pane">
      <div className="players-search-box">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="player-search-input"
          placeholder="Search active players or friends..."
          value={playerSearchQuery}
          onChange={(e) => setPlayerSearchQuery(e.target.value)}
        />
      </div>

      <h3 className="pane-section-title">Active Players</h3>
      <div className="players-list">
        {filteredPlayers.map((player) => (
          <div key={player.id} className="player-row-item">
            <div className="player-item-info">
              <span className="player-flag">{player.flag}</span>
              <div className="player-name-col">
                <div className="player-headline">
                  {player.title && <span className="player-title-tag">{player.title}</span>}
                  <span className="player-nick">{player.name}</span>
                </div>
                <span className="player-sub">{player.rating} Elo • {player.status}</span>
              </div>
            </div>

            <div className="player-actions">
              <button
                type="button"
                className="player-challenge-btn"
                onClick={() => onChallengePlayer && onChallengePlayer(player)}
              >
                Challenge
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
