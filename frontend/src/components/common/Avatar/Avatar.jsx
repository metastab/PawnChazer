import './Avatar.css';

export default function Avatar({
  src = '/placeholder.jpg',
  alt = 'Profile',
  size = 110,
  className = '',
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={`avatar-image ${className}`.trim()}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
}
