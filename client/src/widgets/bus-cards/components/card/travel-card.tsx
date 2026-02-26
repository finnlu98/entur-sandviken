import BusCards from './bus-cards';
import './travel-card.css';
import LoadingHelperWidget from '../../../core/components/loading-helper-widget';
import { WidgetEnum } from '../../../core/model/widget-type';
import type { BusData } from '../../model/bus-data';
import type { TravelCardConfig } from '../../travel-card-widget';
import { TripIdentifier } from '../../model/enum/trip-identifier';

interface TravelCardProps {
  data?: BusData[] | undefined;
  config?: TravelCardConfig;
}

const TravelCard: React.FC<TravelCardProps> = ({ data, config }) => {
  return (
    <LoadingHelperWidget
      widgetKey={WidgetEnum.BusCards}
      loadingKeys={['fetch-bus-card']}
      showConfig={() => !data || data.length === 0}
    >
      <div className="travel-container">
        <div className="widget-title">
          Public transport{' '}
          <img className="widget-title-icon" src="./img/bus-card/sign.png" alt="sign" />
        </div>
        <div className="travel-rows">
          {data?.map((busData) => (
            <BusCards
              key={busData.travelRoute.stopPlace.properties.id}
              tripIdentifier={config?.tripIdentifier ?? TripIdentifier.Title}
              travelRoute={busData.travelRoute}
              tripPatterns={busData.travelResponse.data.trip.tripPatterns}
            />
          ))}
        </div>
      </div>
    </LoadingHelperWidget>
  );
};

export default TravelCard;
