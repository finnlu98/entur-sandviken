import { BiSolidBus } from 'react-icons/bi';
import TravelCard from './components/card/travel-card';
import TravelCardConfiguration from './components/configuration/travel-card-configuration';
import type { TravelStop } from './model/StopSearchResponse';
import type { TripIdentifier } from './model/enum/TripIdentifier';
import { WidgetEnum, type WidgetDefinition } from '../core/model/widget-type';
import type { BusData } from './model/BusData';
import { useBusQueries } from './hooks/bus-hook';
import TravelCardDocumentation from './components/documentation/travel-card-configuration';
import { TRAVEL_CARD_FETCH_INTERVAL } from './bus-cards-constants';

export const TravelCardWidget: WidgetDefinition<TravelCardConfig, BusData[]> = {
  id: WidgetEnum.busCards,
  friendlyName: 'Travel',
  widgetIcon: <BiSolidBus />,
  useQuery: useBusQueries,
  widgetComponent: TravelCard,
  widgetConfig: {
    component: TravelCardConfiguration,
    documentation: TravelCardDocumentation,
  },
  defaultColSpan: 12,
  defaultRowSpan: 8,
  fetchtingInterval: TRAVEL_CARD_FETCH_INTERVAL,
};

export interface TravelCardConfig {
  tripIdentifier: TripIdentifier;
  travelRoutes: TravelRoute[];
}

export interface TravelRoute {
  imgIdentifier: string;
  startPlace: TravelStop;
  stopPlace: TravelStop;
  configCard: ConfigCard;
  configColor: ConfigColor;
}

interface ConfigColor {
  general: number;
  green: number;
  yellow: number;
}

interface ConfigCard {
  numRows: number;
  minFilter: number;
}
