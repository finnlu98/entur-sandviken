import React, { useState } from 'react';
import { MdDelete, MdOutlineVerified } from 'react-icons/md';
import { IoAddCircle } from 'react-icons/io5';
import { validateCalenderEndpoint } from '../../hook/calender-hook';
import AlertResponse from '../../../../feedback/alert/component/alert-response';
import { AlertVariant } from '../../../../feedback/alert/model/alert-types';
import type { CalenderConfig } from '../../calender-widget';
import PopupButton from '../../../../core/shared/popup/popup';

interface CalenderConfigurationProps {
  config?: CalenderConfig;
  setConfig: (newConfig: CalenderConfig) => void;
}

const defaultConfig: CalenderConfig = {
  calenderId: '',
  calenderKey: '',
  calenderICalEndpoints: [],
};

const norwegianHolidaysEndpoint = 'https://calendars.icloud.com/holidays/no_nb.ics/';

const CalenderConfiguration: React.FC<CalenderConfigurationProps> = ({
  config = defaultConfig,
  setConfig,
}) => {
  const [newEndpoint, setNewEndpoint] = useState<string>('');
  const [validEndpoint, setValidEndpoint] = useState<{
    isValid: boolean;
    alertVariant?: AlertVariant;
    error?: string;
  } | null>({ isValid: true });

  const addEndpoint = (newConfig: Partial<CalenderConfig>) => {
    setConfig({
      ...config,
      ...newConfig,
    });
    setNewEndpoint('');
  };

  const removeEndpoint = (index: number) => {
    const updatedEndpoints = config.calenderICalEndpoints.filter((_, i) => i !== index);
    addEndpoint({ calenderICalEndpoints: updatedEndpoints });
  };

  const verifyEndpiont = (endpoint: string) => {
    validateCalenderEndpoint(endpoint).then((result) => {
      if (!result.isValid) {
        setValidEndpoint({
          isValid: false,
          alertVariant: result.alertVariant,
          error: result.message,
        });
      } else {
        addEndpoint({ calenderICalEndpoints: [...config.calenderICalEndpoints, endpoint] });
        setValidEndpoint(null);
      }
    });
  };

  const overrideAddCalender = (endpoint: string) => {
    addEndpoint({ calenderICalEndpoints: [...config.calenderICalEndpoints, endpoint] });
    setValidEndpoint(null);
  };

  const addDefaultCalender = (endpoint: string, closePopup: () => void) => {
    verifyEndpiont(endpoint);
    closePopup();
  };

  return (
    <>
      <div className="h-column gap-xlarge">
        <div className="h-row fill-width">
          <label>iCal links:</label>
          <PopupButton
            position="bottom"
            surface="surface"
            buttonHiearchy="secondary small"
            align="start"
          >
            {(closePopup) => [
              <span>Default calendars</span>,
              <button
                onClick={() => addDefaultCalender(norwegianHolidaysEndpoint, closePopup)}
                className="secondary"
                disabled={config.calenderICalEndpoints.includes(norwegianHolidaysEndpoint)}
              >
                <span className="h-row gap-small">
                  <p>Norwegian holidays</p>
                  <IoAddCircle />
                </span>
              </button>,
            ]}
          </PopupButton>
        </div>
        <div className="h-column gap-large">
          {config?.calenderICalEndpoints?.map((endpoint, index) => (
            <div className="h-row gap-large fill-width" key={index}>
              <div>
                <p title={endpoint}>
                  {endpoint.length > 50 ? `${endpoint.substring(0, 50)}...` : endpoint}
                </p>
              </div>
              <div className="h-row gap-small">
                <MdOutlineVerified />
                <button className="button-text-only-padding" onClick={() => removeEndpoint(index)}>
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
          <div className="h-row gap-large">
            <input
              type="text"
              placeholder="Paste your public calendar link here"
              value={newEndpoint}
              onChange={(e) => setNewEndpoint(e.target.value)}
              onFocus={() => {
                if (!validEndpoint?.isValid) setValidEndpoint(null);
              }}
            />
            <button
              onClick={() => verifyEndpiont(newEndpoint)}
              disabled={validEndpoint?.isValid === false}
            >
              <IoAddCircle />
            </button>
          </div>
          {validEndpoint && !validEndpoint.isValid && (
            <div>
              <AlertResponse
                message={validEndpoint.error ?? 'Unknown error'}
                variant={validEndpoint.alertVariant ?? AlertVariant.ERROR}
                buttonAction={
                  validEndpoint.alertVariant === AlertVariant.INFO ? (
                    <button className="secondary" onClick={() => overrideAddCalender(newEndpoint)}>
                      Add calendar
                    </button>
                  ) : undefined
                }
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CalenderConfiguration;
