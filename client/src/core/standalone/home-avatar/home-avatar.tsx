import React from 'react';
import './home-avatar.css';
import ImageCircle from '../../shared/image-cirlce/image-circle';
interface HomeAvatarProps {
  imgPath: string;
}

const HomeAvatar: React.FC<HomeAvatarProps> = ({ imgPath }) => {
  return <ImageCircle imgPath={imgPath} alt="Avatar" />;
};

export default HomeAvatar;
