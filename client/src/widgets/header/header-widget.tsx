import { FaHeading } from 'react-icons/fa';
import Header from './header';
import { WidgetEnum, type WidgetDefinition } from '../core/model/widget-type';

export const HeaderWidget: WidgetDefinition<object> = {
  id: WidgetEnum.Header,
  friendlyName: 'Header',
  widgetIcon: <FaHeading />,
  widgetComponent: Header,
  defaultColSpan: 24,
  defaultRowSpan: 3,
  defaultWidgetStyling: false,
};
