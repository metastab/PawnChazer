import './Chessboard.css';

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];

export default function Chessboard({
  className = '',
  isFullscreen = false,
  flipped = false,
}) {
  const displayRanks = flipped ? [...RANKS].reverse() : RANKS;
  const displayFiles = flipped ? [...FILES].reverse() : FILES;

  return (
    <div className={`chessboard-container ${isFullscreen ? 'fullscreen' : ''} ${className}`.trim()}>
      <div className="chessboard-frame">
        <div className="chessboard-grid">
          {displayRanks.map((rank, rIdx) => (
            <div key={rank} className="board-rank-row">
              {displayFiles.map((file, fIdx) => {
                const isLight = (rIdx + fIdx) % 2 === 0;
                const showRankCoord = fIdx === 0;
                const showFileCoord = rIdx === 7;

                return (
                  <div
                    key={`${rank}${file}`}
                    className={`board-square ${isLight ? 'square-light' : 'square-dark'}`}
                  >
                    {showRankCoord && (
                      <span className={`coord-rank ${isLight ? 'coord-on-light' : 'coord-on-dark'}`}>
                        {rank}
                      </span>
                    )}

                    {showFileCoord && (
                      <span className={`coord-file ${isLight ? 'coord-on-light' : 'coord-on-dark'}`}>
                        {file}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
