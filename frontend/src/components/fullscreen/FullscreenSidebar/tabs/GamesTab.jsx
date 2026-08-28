const DEFAULT_GAMES_ARCHIVE = [
  {
    id: 'game-1',
    white: 'Opponent',
    whiteRating: 1144,
    black: 'metastab',
    blackRating: 1180,
    result: '0-1',
    timeControl: '10 min Rapid',
    date: '28/08/2026',
    opening: "Van't Kruijs Opening",
    accuracy: '88.4%',
    pgnKey: 'rapid_championship',
  },
  {
    id: 'game-2',
    white: 'Adolf Anderssen',
    whiteRating: 2600,
    black: 'Lionel Kieseritzky',
    blackRating: 2550,
    result: '1-0',
    timeControl: '15 min Classical',
    date: '21/06/1851',
    opening: "King's Gambit Accepted",
    accuracy: '94.2%',
    pgnKey: 'immortal_game',
  },
  {
    id: 'game-3',
    white: 'Magnus Carlsen',
    whiteRating: 2830,
    black: 'Hikaru Nakamura',
    blackRating: 2875,
    result: '1/2-1/2',
    timeControl: '3+1 Blitz',
    date: '20/08/2026',
    opening: 'Sicilian Defense: Najdorf',
    accuracy: '96.1%',
    pgnKey: 'speed_blitz',
  },
];

export default function GamesTab({
  games = DEFAULT_GAMES_ARCHIVE,
  onSelectGame,
}) {
  return (
    <div className="tab-pane games-pane">
      <div className="pane-header-row">
        <h3 className="pane-section-title">Past Games Archive</h3>
        <span className="games-count">{games.length} matches</span>
      </div>

      <div className="archive-games-list">
        {games.map((game) => {
          const isWin = game.result === '0-1' && game.black === 'metastab';
          const isLoss = game.result === '1-0' && game.black === 'metastab';
          const badgeClass = isWin ? 'win' : isLoss ? 'lose' : 'draw';

          return (
            <div key={game.id} className="game-archive-card">
              <div className="game-card-top">
                <div className="game-players-line">
                  <span className="player-vs">{game.white} ({game.whiteRating}) vs {game.black} ({game.blackRating})</span>
                </div>
                <span className={`game-result-badge ${badgeClass}`}>{game.result}</span>
              </div>

              <div className="game-card-meta">
                <span className="meta-tc">{game.timeControl}</span>
                <span className="meta-dot">•</span>
                <span className="meta-opening">{game.opening}</span>
                <span className="meta-dot">•</span>
                <span className="meta-date">{game.date}</span>
              </div>

              <div className="game-card-action">
                <span className="meta-acc">Accuracy: {game.accuracy}</span>
                <button
                  type="button"
                  className="load-analysis-btn"
                  onClick={() => onSelectGame && onSelectGame(game.pgnKey)}
                >
                  Analyze Game →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
