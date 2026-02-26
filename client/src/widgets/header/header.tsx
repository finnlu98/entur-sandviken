import React, { useState, useEffect } from 'react';
import './header.css';
import moment from 'moment';
import { useAuth } from '../../context/auth-context';
import ImageCircle from '../../core/shared/image-cirlce/image-circle';

const defaultBanner = './img/header/OsloGate.jpg';

const Header: React.FC = () => {
  const [minutes, setMinutes] = useState(moment().format('HH:mm:ss'));
  const { home } = useAuth();
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setMinutes(moment().format('HH:mm:ss'));
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);
  return (
    <div className="header-container">
      <img
        className="header-background-image"
        src={home?.bannerUrl || defaultBanner}
        alt="header background"
      />
      <div className="header-content-container">
        <h1>
          <strong>{home?.name ? home.name : 'Heimr'}</strong>
        </h1>
        <div>
          <h1>{minutes}</h1>
        </div>
        <div className="h-row center">
          {home &&
            home?.users?.map((user, index) => (
              <div key={index}>
                {user?.avatarUrl ? (
                  <ImageCircle imgPath={user?.avatarUrl || ''} />
                ) : (
                  <ImageCircle text={user?.email?.[0].toLocaleUpperCase() || ''} />
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
