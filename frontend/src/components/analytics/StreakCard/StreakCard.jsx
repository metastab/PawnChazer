import './StreakCard.css';

const DEFAULT_DAYS = [
  { label: 'M', active: true },
  { label: 'T', active: true },
  { label: 'W', active: true },
  { label: 'T', active: false },
  { label: 'F', active: false },
  { label: 'S', active: false },
  { label: 'S', active: false },
];

export default function StreakCard({
  title = 'Current Streak',
  days = DEFAULT_DAYS,
  className = '',
}) {
  return (
    <div className={`streak-container ${className}`.trim()}>
      <div className="streak-title">{title}</div>
      <div className="days-container">
        {days.map((day, index) => {
          const label = typeof day === 'string' ? day : day.label;
          const isActive = typeof day === 'object' ? day.active : false;

          return (
            <div
              key={index}
              className={`day-box ${isActive ? 'active' : ''}`.trim()}
              style={
                isActive
                  ? { backgroundColor: '#21c45d', color: 'white' }
                  : undefined
              }
            >
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
