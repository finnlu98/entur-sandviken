import { FaSwimmingPool } from 'react-icons/fa';
import { WidgetEnum, type WidgetDefinition } from '../core/model/widget-type';
import type { SwimmingResponse } from './model/swimming-response';
import Swimming from './components/card/swimming';
import { useSwimmingQuery } from './hook/swimming-hook';
import SwimmingConfiguration from './components/configuration/swimming-configuration';
import type { Address } from '../../model/adress';
import SwimmingDocumentation from './components/documentation/swimming-documentation';
import { SWIMMING_FETCH_INTERVAL } from './swimming-constants';

export const SwimmingWidget: WidgetDefinition<SwimmingConfig, SwimmingResponse[]> = {
  id: WidgetEnum.Swimming,
  friendlyName: 'Swimming',
  widgetIcon: <FaSwimmingPool />,
  widgetComponent: Swimming,
  useQuery: useSwimmingQuery,
  widgetConfig: {
    component: SwimmingConfiguration,
    documentation: SwimmingDocumentation,
  },
  defaultColSpan: 6,
  defaultRowSpan: 6,
  fetchtingInterval: SWIMMING_FETCH_INTERVAL,
};

export interface SwimmingConfig {
  searchLocation?: Address;
  keepIds?: string[];
  displayMap?: boolean;
}
