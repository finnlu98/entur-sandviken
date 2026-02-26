import React from 'react';
import { AlertTypeIcons, type AlertVariant } from '../model/AlertTypes';

interface AlertResponseProps {
  message: string;
  variant: AlertVariant;
  buttonAction?: React.ReactNode;
}

const AlertResponse: React.FC<AlertResponseProps> = ({ message, variant, buttonAction }) => {
  const Icon = AlertTypeIcons[variant];

  return (
    <div className={`alert alert-${variant.toString()} h-column`} role="status">
      <div className="h-row">
        <span className={`alert-icon alert-${variant.toString()}`} aria-hidden="true">
          <Icon />
        </span>
        <span className="alert-message">{message}</span>
      </div>
      {buttonAction && <span className="alert-button-action">{buttonAction}</span>}
    </div>
  );
};

export default AlertResponse;
