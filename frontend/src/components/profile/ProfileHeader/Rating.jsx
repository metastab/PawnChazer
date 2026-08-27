export default function Rating({
  rating = 1211,
  peak = 1444,
  type = 'Rapid',
  showType = false,
  className = '',
}) {
  return (
    <div className={`rating ${className}`.trim()}>
      <div className="rating-number">
        <h1>{rating}</h1>
      </div>

      {showType && (
        <div className="rating-type">
          <span className="rating-icon">◉</span>
          {type}
        </div>
      )}

      <div className="rating-peak">
        Peak {peak}
      </div>
    </div>
  );
}
