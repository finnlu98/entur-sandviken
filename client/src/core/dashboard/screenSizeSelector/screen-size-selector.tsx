import React, { useEffect, useState } from 'react';
import './screen-size-selector.css';
import { useDashboard } from '../../../context/dashboard-context';
import type ScreenSize from '../model/ScreenSize';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import PopupButton from '../../shared/popup/Popup';
import { FaRulerCombined } from 'react-icons/fa';

const PRESETS = [
  { name: 'Tablet (Portrait)', width: 768, height: 1024 },
  { name: 'Tablet (Landscape)', width: 1024, height: 768 },
];

export const ScreenSizeSelector: React.FC = () => {
  const [isDirty, setIsDirty] = useState(false);
  const { dashboardSize, setDashboardSize } = useDashboard();
  const [prevCustomSize, setPrevCustomSize] = useState<ScreenSize[]>([]);
  const { editMode } = useDashboard();
  const [customSize, setCustomSize] = useState<ScreenSize>(dashboardSize);

  const onSetCustomSize = (size: ScreenSize) => {
    setCustomSize(size);
    setIsDirty(true);
  };

  const handlePresetClick = (preset: ScreenSize) => {
    setPrevCustomSize([...prevCustomSize, dashboardSize]);
    setDashboardSize(preset);
    setCustomSize(preset);
    setIsDirty(false);
  };

  const handleCustomSubmit = () => {
    const { width, height } = customSize;
    if (!isNaN(width) && !isNaN(height) && width > 0 && height > 0) {
      setDashboardSize(customSize);
      setIsDirty(false);
    }
  };

  const handleBack = () => {
    if (prevCustomSize.length > 0) {
      const lastSize = prevCustomSize[prevCustomSize.length - 1];
      setDashboardSize(lastSize);
      setCustomSize(lastSize);
      setPrevCustomSize(prevCustomSize.slice(0, -1));
      setIsDirty(false);
    }
  };

  useEffect(() => {
    if (editMode.editMode === false) {
      setPrevCustomSize([]);
    }
  }, [editMode]);

  return (
    <>
      {editMode.editMode && (
        <div className="screen-size-selector animate-appear">
          <PopupButton position="bottom" align="end" surface="surface">
            {() => [
              <span>
                <FaRulerCombined />
              </span>,

              <div className="screen-size-dropdown h-column">
                <div className="screen-size-presets h-column">
                  <div className="h-row custom-header">
                    <h4>Presets</h4>
                    <button
                      onClick={handleBack}
                      className="secondary button-tertiary"
                      disabled={prevCustomSize.length === 0}
                    >
                      <MdOutlineKeyboardBackspace size={20} />
                    </button>
                  </div>
                  {PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      className="secondary preset-button"
                      onClick={() => handlePresetClick(preset)}
                    >
                      <span>{preset.name}</span>
                      <span>
                        {preset.width} × {preset.height}
                      </span>
                    </button>
                  ))}
                </div>
                <hr></hr>
                <div className="h-column gap-large">
                  <h4>Custom Size</h4>
                  <div className="h-row">
                    <input
                      type="number"
                      placeholder="Width"
                      value={customSize.width}
                      onChange={(e) =>
                        onSetCustomSize({ ...customSize, width: parseInt(e.target.value) })
                      }
                    />
                    <span>×</span>
                    <input
                      type="number"
                      placeholder="Height"
                      value={customSize.height}
                      onChange={(e) =>
                        onSetCustomSize({ ...customSize, height: parseInt(e.target.value) })
                      }
                    />
                    <button onClick={handleCustomSubmit} disabled={!isDirty}>
                      Apply
                    </button>
                  </div>
                </div>
              </div>,
            ]}
          </PopupButton>
        </div>
      )}
    </>
  );
};
