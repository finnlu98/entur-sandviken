import HomeActionButton from './home-action-button/home-action-button';
import { FaUnlock } from 'react-icons/fa';
import { BsFillLightbulbOffFill } from 'react-icons/bs';
import './home-action-buttons.css';
import ImageCircle from '../../../core/shared/image-cirlce/image-circle';
import HomeActionPopupButton from './home-action-popup-button/home-action-popup-button';
import LockOptions from '../model/lock-options';

const HomeActionButtons: React.FC = () => {
  return (
    <div className="home-buttons-container">
      <div className="home-icon-container">
        <ImageCircle imgPath="./img/home/home-assistant.png" alt="home" />
      </div>
      <HomeActionButton Icon={BsFillLightbulbOffFill} event={'TurnOffHome'} callOnClick={true} />
      <HomeActionPopupButton Icon={FaUnlock} event={'TurnOffAutoLock'} options={LockOptions} />
    </div>
  );
};

export default HomeActionButtons;
