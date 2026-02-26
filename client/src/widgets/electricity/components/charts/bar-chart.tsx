import type { ComponentData } from '../../model/electricity-prices';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from 'chart.js';
import annotationPlugin, { type AnnotationOptions } from 'chartjs-plugin-annotation';

import { Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, annotationPlugin);

interface BarChartProps {
  title: string;
  chartData: ComponentData;
  meanMax: number;
}

const BarChart: React.FC<BarChartProps> = ({ title, chartData, meanMax }) => {
  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
        color: 'white',
      },
      annotation: {
        annotations: {
          currentLevel: {
            type: 'line',
            yMin: 2,
            yMax: 2,
            borderColor: 'white',
            borderWidth: 1,
            label: {
              display: true,
              content: '',
              position: 'end',
              yAdjust: -15,
              backgroundColor: 'rgba(0,0,0,0)',
              color: 'white',
            },
          } as AnnotationOptions<'line'>,
          avgLine: {
            type: 'line',
            yMin: meanMax,
            yMax: meanMax,
            borderColor: 'white',
            borderWidth: 1,
            borderDash: [6, 6],
            label: {
              display: true,
              content: `(Avg peak ${meanMax} kwh)`,
              position: 'end',
              yAdjust: -13,
              backgroundColor: 'rgba(0,0,0,0)',
              color: 'white',
              font: {
                weight: 'normal',
                size: 12,
              },
            },
          } as AnnotationOptions<'line'>,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: 'white' },
      },
      y: {
        grid: { display: false },
        ticks: { color: 'white' },
      },
    },
  };

  return (
    <div className="electricity-widget">
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default BarChart;
