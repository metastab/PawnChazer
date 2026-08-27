import './Empty.css';

export default function Empty({ children, className = '' }) {
  return (
    <div className={`empty-container ${className}`.trim()}>
      {children}
    </div>
  );
}
