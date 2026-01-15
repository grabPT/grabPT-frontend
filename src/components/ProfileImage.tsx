import HeaderProfile from '@/assets/images/HeaderProfile.png';
import { onErrorImage } from '@/utils/onErrorImage';

interface ProfileImageProps {
  src: string | null | undefined;
  alt: string;
}

/**
 * 프로필 이미지. null일 수 있는 profileImageUrl을 그대로 넣으세여
 * w랑 h full이라서 커버 씌우셈여 rounded같은 것도
 * @param src
 * @param alt
 */
const ProfileImage = ({ src, alt }: ProfileImageProps) => {
  return (
    <div className="h-full w-full">
      <img
        src={src || HeaderProfile}
        alt={alt}
        onError={onErrorImage}
        className="h-full w-full object-cover"
      />
    </div>
  );
};

export default ProfileImage;
