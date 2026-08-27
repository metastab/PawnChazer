import './Header.css';

export default function Header({
  title = 'Pawn Chazer',
  onMenuClick,
  className = '',
}) {
  return (
    <header className={`header ${className}`.trim()}>
      <h2>{title}</h2>
      <button
        className="hamburger"
        onClick={onMenuClick}
        aria-label="Menu"
        type="button"
      >
        ☰
      </button>
    </header>
  );
}
