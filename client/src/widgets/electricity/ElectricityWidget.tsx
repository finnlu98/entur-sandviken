import { ImPower } from 'react-icons/im';
import ElectricyConsumption from './components/electricity-consumption/electricity-consumption';
import ElectricityConfiguration from './components/configuration/electricity-configuration';
import { WidgetEnum, type WidgetDefinition } from '../core/model/widget-type';
import { ELECTRICITY_FETCH_INTERVAL } from './electricity-constants';
import { useElviaConsumptionQuery } from './hook/electricity-hook';
import type { ElectricityData } from './model/ElectricityData';
import ElectricityDocumentation from './components/documentation/electricity-documentation';

export const ElectricityWidget: WidgetDefinition<object, ElectricityData> = {
  id: WidgetEnum.electricity,
  friendlyName: 'Electricity',
  widgetIcon: <ImPower />,
  useQuery: useElviaConsumptionQuery,
  widgetComponent: ElectricyConsumption,
  widgetConfig: {
    component: ElectricityConfiguration,
    documentation: ElectricityDocumentation,
  },
  defaultColSpan: 12,
  defaultRowSpan: 6,
  fetchtingInterval: ELECTRICITY_FETCH_INTERVAL,
};
