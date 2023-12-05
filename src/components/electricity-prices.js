import React, { useState, useEffect } from "react";
import './electricity-prices.css'
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );



function ElectrictyPrices({ electrictyPrices }) {
  const [elecPrices, setElecPrices] = useState(electrictyPrices);
  const [dynamicData, setData] = useState(null);

  const todaysDate = moment().format('DD/MM/YY')

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `${todaysDate} - NOK per kWh`,
        color: "white"
      },
    },
    scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: 'white', 
          }
        },
        y: {
          grid: {
            display: false,
          },
          ticks: {
            color: 'white' 
          }
        },
      }
  };

  useEffect(() => {
    if (elecPrices && elecPrices.length > 0) {
      const labels = elecPrices.map((entry) => moment(entry.time_start).format('HH') );
      const nokData = elecPrices.map((entry) => entry.NOK_per_kWh);
  
      setData({
        labels,
        datasets: [
          {
            data: nokData,
            backgroundColor: 'rgba(0, 184, 241, 0.8)'
          }
        ],
      });
    }
  }, [elecPrices]);

  if (!dynamicData || dynamicData.labels.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="electricity-widget">
      <Bar options={options} data={dynamicData} />;
    </div>
  );
}

export default ElectrictyPrices;
