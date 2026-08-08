export default function ProfileImage({ src, size = 100, className }) {
  return (
    <img
      src={src}
      alt="Profile"
      className={className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        objectFit: "cover",
      }}
    />
  );
}
