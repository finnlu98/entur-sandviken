import { WidgetEnum } from '../../../../widgets/core/model/widget-type';
import type { GridItem } from '../../grid/model/grid-models';

const defaultTemplate: GridItem[] = [
  {
    id: '942c9130-9db9-4574-aac2-6095f3399f17',
    col: 0,
    row: 3,
    widget: WidgetEnum.Weather,
    colSpan: 12,
    rowSpan: 7,
  },
  {
    id: 'd157f2d8-06aa-4636-8b27-a3110ff2b672',
    col: 0,
    row: 10,
    widget: WidgetEnum.BusCards,
    colSpan: 12,
    rowSpan: 9,
  },
  {
    id: '9484eb7b-6592-4dd4-983c-7c901efc9536',
    col: 12,
    row: 10,
    widget: WidgetEnum.Calender,
    colSpan: 12,
    rowSpan: 7,
  },
  {
    id: 'f515d2dd-9ba0-4aeb-8ff5-b464788ec979',
    col: 0,
    row: 0,
    widget: WidgetEnum.Header,
    colSpan: 24,
    rowSpan: 3,
  },
  {
    id: '9e34569b-16ff-4e14-b8ba-abc13d813084',
    col: 12,
    row: 3,
    widget: WidgetEnum.CityBike,
    colSpan: 12,
    rowSpan: 7,
  },
  {
    id: '03ce08f3-0a06-4297-9b90-73cc9cada1b8',
    col: 12,
    row: 17,
    widget: WidgetEnum.News,
    colSpan: 12,
    rowSpan: 12,
  },
  {
    id: 'b13f9751-52eb-48fa-b7de-f2965cde7f88',
    col: 0,
    row: 19,
    widget: WidgetEnum.Electricity,
    colSpan: 12,
    rowSpan: 9,
  },
];

export default defaultTemplate;
