import { TbHome } from 'react-icons/tb';
import HomeActionButtons from './components/home-action-buttons';
import { WidgetEnum, type WidgetDefinition } from '../core/model/widget-type';

export const HomeActionsWidget: WidgetDefinition<object> = {
  id: WidgetEnum.homeActions,
  friendlyName: 'Home actions',
  widgetIcon: <TbHome />,
  widgetComponent: HomeActionButtons,
  defaultColSpan: 10,
  defaultRowSpan: 4,
  boolenHiddenSupported: true,
};
