import './Chessboard.css';

export default function Chessboard({
  placeholderText = 'a chessboard will be here.',
  className = '',
  isFullscreen = false,
}) {
  return (
    <div className={`chessboard-placeholder ${isFullscreen ? 'fullscreen' : ''} ${className}`.trim()}>
      <div className="chessboard-inner-content">
        {/* <div className="chessboard-grid-preview" aria-hidden="true">
          <div className="grid-cell dark"></div>
          <div className="grid-cell light"></div>
          <div className="grid-cell dark"></div>
          <div className="grid-cell light"></div>
          <div className="grid-cell light"></div>
          <div className="grid-cell dark"></div>
          <div className="grid-cell light"></div>
          <div className="grid-cell dark"></div>
        </div> */}
        <span className="chessboard-label">{placeholderText}</span>
        {isFullscreen && (
          <span className="chessboard-subtext">✦ Interactive Fullscreen Board Active ✦</span>
        )}
      </div>
    </div>
  );
}
