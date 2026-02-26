import { MdDryCleaning } from 'react-icons/md';
import LaundryWeek from './card/laundry-week';
import LaundryWeekConfiguration from './configuration/laundry-week-configuraiton';
import { WidgetEnum, type WidgetDefinition } from '../core/model/widget-type';

export const LaundryWeekWidget: WidgetDefinition<LaundryWeekConfig> = {
  id: WidgetEnum.LaundryWeek,
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
