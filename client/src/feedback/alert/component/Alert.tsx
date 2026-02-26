import { AlertTypeIcons, type AlertItem } from '../model/AlertTypes';
import './Alert.css';
import { IoMdClose } from 'react-icons/io';

const AlertContainer: React.FC<{ alerts: AlertItem[]; onDismiss: (id: string) => void }> = ({
  alerts,
  onDismiss,
}) => {
  return (
    <div className="alert-container surface column">
      {alerts.map((alert) => {
        const Icon = AlertTypeIcons[alert.variant];
        return (
          <div key={alert.id} className={`alert alert-${alert.variant.toString()} `} role="status">
            <span className={`alert-icon alert-${alert.variant.toString()}`} aria-hidden="true">
              <Icon />
            </span>
            <span className="alert-message">{alert.message}</span>
            <button
              className="secondary"
              onClick={() => onDismiss(alert.id)}
              aria-label="Close alert"
            >
              <IoMdClose />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default AlertContainer;
