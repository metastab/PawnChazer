export default function UserInfo({
  username = 'metastab',
  subtitle = 'original name',
  className = '',
}) {
  return (
    <div className={`panel_main ${className}`.trim()}>
      <div className="ids">
        <h1>{username}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  );
}
