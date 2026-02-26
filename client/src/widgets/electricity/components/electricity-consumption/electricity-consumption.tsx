import moment from 'moment';
import './electricity-consumption.css';
import { ImPower } from 'react-icons/im';
import { MdPriceChange } from 'react-icons/md';
import { GiLevelTwo } from 'react-icons/gi';
import { IoIosTimer } from 'react-icons/io';
import BarChart from '../charts/bar-chart';
import { ElectricityLevelFormatter } from '../../model/enum/electricity-level';
import LoadingHelperWidget from '../../../core/components/loading-helper-widget';
import { WidgetEnum } from '../../../core/model/widget-type';
import type { ElectricityData } from '../../model/electricity-data';

interface ElectricityConsumptionProps {
  data?: ElectricityData;
}

const ElectricyConsumption: React.FC<ElectricityConsumptionProps> = ({ data }) => {
  return (
    <LoadingHelperWidget
      widgetKey={WidgetEnum.Electricity}
      loadingKeys={['post-elvia-key', 'fetch-elvia-consumption', 'has-elvia-key']}
      showConfig={() => !data}
    >
      {data && (
        <div className="electricity-container h-column gap">
          <div className="consumption-cards h-row gap center">
            <div className="consumption-card h-column gap-tiny">
              <ImPower className="react-icon-orange" />
              <div className="font-small">{data?.consumptionMonth} kwh</div>
            </div>
            <div className="consumption-card h-column gap-tiny">
              <MdPriceChange className="react-icon-green" />
              <div className="font-small">{data?.estimatedPrice} NOK</div>
            </div>
            <div className="consumption-card h-column gap-tiny">
              <div className="level-header">
                <GiLevelTwo className="react-icon-orange" />{' '}
                {ElectricityLevelFormatter.formatLevel(data?.capacityLevel)}
              </div>
              <div className="font-small">
                {ElectricityLevelFormatter.formatInterval(data?.capacityLevel)} kwh
              </div>
            </div>
            <div className="consumption-card h-column gap-tiny">
              <div className="level-header">
                <IoIosTimer className="react-icon-gray" />{' '}
                {moment(data?.consumptionHighestHour?.startTime).format('h a')}
              </div>
              <div className="font-small">{data?.consumptionHighestHour?.value} kwh</div>
            </div>
          </div>

          <div className="bar-chart-container h-column center text-align-center font-small">
            Peak kwh per day in {moment().format('MMMM')}
            {data?.chartFormattedData && (
              <BarChart
                chartData={data.chartFormattedData}
                title={`Highest avg kWh per day in ${moment().format('MMMM')}`}
                meanMax={data.meanMaxLevel ?? -1}
              />
            )}
          </div>
        </div>
      )}
    </LoadingHelperWidget>
  );
};

export default ElectricyConsumption;
