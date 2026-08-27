import './Footer.css';

const DEFAULT_FOOTER_ITEMS = [
  'footer-01',
  'footer-02',
  'footer-03',
  'footer-04',
  'footer-03',
  'footer-04',
  'footer-03',
  'footer-04',
];

export default function Footer({
  items = DEFAULT_FOOTER_ITEMS,
  className = '',
}) {
  return (
    <footer className={`footer-container ${className}`.trim()}>
      <div className="footer">
        {items.map((item, index) => (
          <span key={index} style={{ display: 'contents' }}>
            <p className="footer-txt">{item}</p>
            {index < items.length - 1 && <span className="footer-dot">•</span>}
          </span>
        ))}
      </div>
    </footer>
  );
}
