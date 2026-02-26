import { MdDryCleaning } from 'react-icons/md';
import LaundryWeek from './card/laundry-week';
import LaundryWeekConfiguration from './configuration/laundryWeekConfiguraiton';
import { WidgetEnum, type WidgetDefinition } from '../core/model/widget-type';

export const LaundryWeekWidget: WidgetDefinition<LaundryWeekConfig> = {
  id: WidgetEnum.laundryWeek,
  friendlyName: 'Laundry week',
  widgetIcon: <MdDryCleaning />,
  widgetComponent: LaundryWeek,
  widgetConfig: { component: LaundryWeekConfiguration },
  defaultColSpan: 8,
  defaultRowSpan: 8,
};

export interface LaundryWeekConfig {
  responsibles: string[];
}
