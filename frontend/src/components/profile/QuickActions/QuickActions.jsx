import './QuickActions.css';

const DEFAULT_ACTIONS = [
  { id: 'challenge', label: 'Challange' },
  { id: 'tournament', label: 'Tournament' },
  { id: 'game-history', label: 'Game History' },
];

export default function QuickActions({
  title = 'Quick Actions',
  actions = DEFAULT_ACTIONS,
  activeActionId = 'tournament',
  onActionClick,
  className = '',
}) {
  return (
    <div className={`quick-actions-container ${className}`.trim()}>
      <h3>{title}</h3>
      {actions.map((action, index) => {
        const label = typeof action === 'string' ? action : action.label;
        const id = typeof action === 'string' ? action : (action.id || index);
        const isActive = activeActionId === id;

        return (
          <button
            key={id}
            type="button"
            className={`challange-button ${isActive ? 'active' : ''}`.trim()}
            onClick={() => onActionClick && onActionClick(typeof action === 'string' ? { id: action, label: action } : action)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
