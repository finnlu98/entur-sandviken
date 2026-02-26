import { IoAddCircle } from 'react-icons/io5';
import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import type { StocksConfig } from '../../stocks-widget';

interface StocksConfigurationProps {
  config?: StocksConfig;
  setConfig?: (config: StocksConfig) => void;
}

const defaultConfig: StocksConfig = {
  tickers: [],
};

const StocksConfiguration: React.FC<StocksConfigurationProps> = ({
  config = defaultConfig,
  setConfig,
}) => {
  const [newTicker, setNewTicker] = useState('');

  function handleAddTicker() {
    if (newTicker.trim() === '') return;
    const updatedTickers = [...(config.tickers || []), newTicker.trim().toUpperCase()];
    setConfig?.({
      ...config,
      tickers: updatedTickers,
    });
    setNewTicker('');
  }

  function handleRemoveTicker(ticker: string) {
    const updatedTickers = config.tickers.filter((t) => t !== ticker);
    setConfig?.({ ...config, tickers: updatedTickers });
  }

  return (
    <div className="h-column">
      <label htmlFor="stockSymbols">Stock Symbols:</label>
      {config?.tickers?.map((symbol, index) => (
        <div className="h-row">
          <div key={index}>{symbol}</div>
          <div className="right-align" onClick={() => handleRemoveTicker(symbol)}>
            <MdDelete size={20} />
          </div>
        </div>
      ))}
      <div className="h-row">
        <input
          type="text"
          placeholder="Ticker"
          value={newTicker}
          onChange={(e) => setNewTicker(e.target.value)}
        />
        <div className="right-align">
          <IoAddCircle size={20} onClick={handleAddTicker} />
        </div>
      </div>
    </div>
  );
};

export default StocksConfiguration;
