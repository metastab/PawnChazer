import Avatar from '../../common/Avatar/Avatar';
import UserInfo from './UserInfo';
import Rating from './Rating';
import './ProfileHeader.css';

export default function ProfileHeader({
  username = 'metastab',
  realName = 'original name',
  avatarSrc = '/placeholder.jpg',
  rating = 1211,
  peakRating = 1444,
  gameType = 'Rapid',
  className = '',
}) {
  return (
    <div className={`profile-container ${className}`.trim()}>
      <Avatar
        src={avatarSrc}
        size={110}
        className="profile_image"
      />
      <UserInfo
        username={username}
        subtitle={realName}
      />
      <Rating
        rating={rating}
        peak={peakRating}
        type={gameType}
      />
    </div>
  );
}
