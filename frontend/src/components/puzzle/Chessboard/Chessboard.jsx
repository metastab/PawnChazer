import './Chessboard.css';

export default function Chessboard({
  placeholderText = 'a chessboard will be here.',
  className = '',
}) {
  return (
    <div className={`chessboard-placeholder ${className}`.trim()}>
      {placeholderText}
    </div>
  );
}
