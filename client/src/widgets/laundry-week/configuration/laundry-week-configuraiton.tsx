import { IoAddCircle } from 'react-icons/io5';
import type { LaundryWeekConfig } from '../laundry-week-widget';
import { MdDelete } from 'react-icons/md';
import { useState } from 'react';

interface LaundryWeekConfigurationProps {
  config?: LaundryWeekConfig;
  setConfig: (config: LaundryWeekConfig) => void;
}

const defaultConfig = {
  responsibles: [],
};

const LaundryWeekConfiguration: React.FC<LaundryWeekConfigurationProps> = ({
  config = defaultConfig,
  setConfig,
}) => {
  const [newResponsible, setNewResponsible] = useState('');

  function handleAddResponsible() {
    if (newResponsible.trim() === '') return;
    const updatedResponsibles = [...(config.responsibles || []), newResponsible.trim()];
    setConfig({
      ...config,
      responsibles: updatedResponsibles,
    });
    setNewResponsible('');
  }

  function handleRemoveResponsible(responsible: string) {
    const updatedResponsibles = config.responsibles.filter((r) => r !== responsible);
    setConfig({
      ...config,
      responsibles: updatedResponsibles,
    });
  }

  return (
    <div className="h-column">
      <label htmlFor="stockSymbols">Responsibles</label>
      {config?.responsibles?.map((responsible, index) => (
        <div className="h-row">
          <div key={index}>{responsible}</div>
          <div className="right-align" onClick={() => handleRemoveResponsible(responsible)}>
            <MdDelete size={20} />
          </div>
        </div>
      ))}
      <div className="h-row">
        <input
          type="text"
          placeholder="Responsible"
          value={newResponsible}
          onChange={(e) => setNewResponsible(e.target.value)}
        />
        <div className="right-align">
          <IoAddCircle size={20} onClick={handleAddResponsible} />
        </div>
      </div>
    </div>
  );
};

export default LaundryWeekConfiguration;
