import { useState, useEffect, useRef } from 'react';
import ThemeToggle from '../../common/ThemeToggle/ThemeToggle';
import './Header.css';

const DEFAULT_MENU_ITEMS = [
  { id: 'tournaments', label: 'All Tournaments', icon: '', badge: 'Live' },
  { id: 'clubs', label: 'Clubs & Leagues', icon: '' },
  { id: 'analytics', label: 'Analytics & Insights', icon: '' },
  { id: 'puzzles', label: 'Puzzles & Drills', icon: '' },
  { id: 'leaderboards', label: 'Leaderboards', icon: '' },
  { id: 'settings', label: 'Settings & Archive', icon: '' },
];

export default function Header({
  title = 'Pawn Chazer',
  menuItems = DEFAULT_MENU_ITEMS,
  onMenuClick,
  onItemClick,
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    if (onMenuClick) {
      onMenuClick(!isOpen);
    }
  };

  const handleItemClick = (item) => {
    if (onItemClick) {
      onItemClick(item);
    }
    // For now clicking them does nothing, menu remains or closes gracefully
  };

  // Close menu on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className={`header ${className}`.trim()} ref={menuRef}>
      <h2>{title}</h2>

      <div className="header-actions">
        <ThemeToggle />
        <button
          className={`hamburger ${isOpen ? 'active' : ''}`.trim()}
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          type="button"
        >
          {isOpen ? '✕' : '☰'}
        </button>

        {isOpen && (
          <nav className="header-dropdown-menu" aria-label="Navigation Menu">
            <div className="menu-header">
              <span className="menu-header-title">Navigation Ledger</span>
              <span className="menu-header-dot">●</span>
            </div>

            <div className="menu-items-list">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="menu-item-button"
                  onClick={() => handleItemClick(item)}
                >
                  <span className="menu-item-icon">{item.icon}</span>
                  <span className="menu-item-label">{item.label}</span>
                  {item.badge && (
                    <span className="menu-item-badge">{item.badge}</span>
                  )}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
