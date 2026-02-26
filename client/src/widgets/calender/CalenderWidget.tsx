import { SlCalender } from 'react-icons/sl';
import Calender from './components/card/calender';
import CalenderConfiguration from './components/configuration/calender-configuration';
import { WidgetEnum, type WidgetDefinition } from '../core/model/widget-type';
import type { CalendarEvent } from './api/calender-ical-fetcher';
import { useCalenderQueries } from './hook/calender-hook';
import CalenderDocumentation from './components/documentation/calender-documentation';
import { CALENDER_FETCH_INTERVAL } from './calender-constants';

export const CalenderWidget: WidgetDefinition<CalenderConfig, CalendarEvent[]> = {
  id: WidgetEnum.calender,
  friendlyName: 'Calender',
  widgetIcon: <SlCalender />,
  useQuery: useCalenderQueries,
  widgetComponent: Calender,
  widgetConfig: {
    component: CalenderConfiguration,
    documentation: CalenderDocumentation,
  },
  defaultColSpan: 12,
  defaultRowSpan: 8,
  fetchtingInterval: CALENDER_FETCH_INTERVAL,
};

export interface CalenderConfig {
  calenderId: string;
  calenderKey: string;
  calenderICalEndpoints: string[];
}
