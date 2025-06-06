import React, { useState } from 'react';
import { FiUser } from 'react-icons/fi';

interface AvatarImageProps {
  profileImage?: string;
  name?: string;
  size?: string;
  className?: string;
}

const AvatarImage: React.FC<AvatarImageProps> = ({ 
  profileImage, 
  name = 'User', 
  size = 'h-10 w-10',
  className = ''
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Build avatar URL
  const getAvatarUrl = () => {
    if (!profileImage || profileImage === 'default.jpg') {
      return null;
    }
    
    // If already a full URL
    if (profileImage.startsWith('http')) {
      return profileImage;
    }
    
    // If starts with /, just add base URL
    if (profileImage.startsWith('/')) {
      return `http://localhost:5000${profileImage}`;
    }
    
    // Otherwise, add /uploads/ prefix
    return `http://localhost:5000/uploads/${profileImage}`;
  };

  const avatarUrl = getAvatarUrl();
  const shouldShowImage = avatarUrl && !imageError;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={`flex-shrink-0 ${size} relative ${className}`}>
      {shouldShowImage ? (
        <>
          <img
            className={`${size} rounded-full object-cover border-2 border-gray-200`}
            src={avatarUrl}
            alt={`${name} avatar`}
            onError={handleImageError}
            onLoad={handleImageLoad}
            style={{ display: imageError ? 'none' : 'block' }}
          />
          {/* Fallback shown on error */}
          {imageError && (
            <div className={`${size} rounded-full bg-indigo-100 flex items-center justify-center border-2 border-gray-200`}>
              <span className="text-indigo-600 font-semibold text-sm">
                {getInitials(name)}
              </span>
            </div>
          )}
        </>
      ) : (
        // Default fallback when no image
        <div className={`${size} rounded-full bg-indigo-100 flex items-center justify-center border-2 border-gray-200`}>
          {profileImage && profileImage !== 'default.jpg' ? (
            <span className="text-indigo-600 font-semibold text-sm">
              {getInitials(name)}
            </span>
          ) : (
            <FiUser className="h-5 w-5 text-indigo-600" />
          )}
        </div>
      )}
    </div>
  );
};

export default AvatarImage; 