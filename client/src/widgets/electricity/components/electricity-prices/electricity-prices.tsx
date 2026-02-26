import React, { useState, useEffect } from 'react';
import './electricity-prices.css';
import moment from 'moment';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import FetchElectricityPrices from '../../api/electricity-price-fetcher';
import { ComponentData, Datasets, type ElectricityPrice } from '../../model/ElectricityPrices';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ElectrictyPrices: React.FC = () => {
  const [elecPrices, setElecPrices] = useState<ElectricityPrice[]>();
  const [dynamicData, setData] = useState<ComponentData>();

  useEffect(() => {
    const setAndFetchElecPrices = async () => setElecPrices(await FetchElectricityPrices());
    setAndFetchElecPrices();
  }, []);

  useEffect(() => {
    if (elecPrices && elecPrices.length > 0) {
      const labels = elecPrices.map((entry) => moment(entry.time_start).format('HH'));
      const nokData = elecPrices.map((entry) => entry.NOK_per_kWh);

      setData(new ComponentData(labels, [new Datasets(nokData)]));
    }
  }, [elecPrices]);

  if (!dynamicData || dynamicData.labels.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="electricity-widget">
      {/* <BarChart title={`${todaysDate} - NOK per kWh`} chartData={dynamicData} /> */}
    </div>
  );
};

export default ElectrictyPrices;
