import HomePostMan from '../../api/home-postman';
import './home-action-button.css';
import React from 'react';

interface HomeActionButtonProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  event: string;
  callOnClick: boolean;
}

const HomeActionButton: React.FC<HomeActionButtonProps> = ({ Icon, event, callOnClick }) => {
  const callPostman = async () => {
    if (callOnClick) await HomePostMan(event);
  };

  return (
    <div className="home-button" onClick={async () => await callPostman()}>
      <Icon className="home-button-icon" />
    </div>
  );
};

export default HomeActionButton;
