import './QuickActions.css';

const DEFAULT_ACTIONS = [
  { id: 'challenge', label: 'Challange' },
  { id: 'random', label: 'Random 01' },
  { id: 'something', label: 'Something' },
];

export default function QuickActions({
  title = 'Quick Actions',
  actions = DEFAULT_ACTIONS,
  onActionClick,
  className = '',
}) {
  return (
    <div className={`quick-actions-container ${className}`.trim()}>
      <h3>{title}</h3>
      {actions.map((action, index) => {
        const label = typeof action === 'string' ? action : action.label;
        const key = typeof action === 'string' ? index : (action.id || index);

        return (
          <button
            key={key}
            type="button"
            className="challange-button"
            onClick={() => onActionClick && onActionClick(action)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
