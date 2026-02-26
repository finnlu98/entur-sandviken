import './stocks.css';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { IoMdArrowDropup } from 'react-icons/io';
import type { StockResponse } from '../../model/stock-response';

interface StocksProps {
  data?: StockResponse;
}

const Stocks: React.FC<StocksProps> = ({ data }) => {
  function formatPercantage(perc: string) {
    const value = Number(perc);
    if (isNaN(value)) return 'N/A';

    const f = `${(value * 100).toFixed(2)}%`;
    if (value >= 0) {
      return (
        <div className="change h-row pos">
          {' '}
          {f} <IoMdArrowDropup size={20} />
        </div>
      );
    }
    return (
      <div className="change h-row">
        {' '}
        {f} <MdOutlineArrowDropDown size={20} />
      </div>
    );
  }

  return (
    <div className="h-row font-small font-bold">
      {data &&
        data.stocks.map((stock) => {
          return (
            <div key={stock.symbol} className="stock h-column">
              <div>{stock.symbol}:</div>
              {formatPercantage(stock.fiftyDayAverageChangePercent)}
            </div>
          );
        })}
    </div>
  );
};

export default Stocks;
