import { HeaderWidget } from '../../header/header-widget';
import { TravelCardWidget } from '../../bus-cards/travel-card-widget';
import { CalenderWidget } from '../../calender/calender-widget';
import { CityBikeWidget } from '../../city-bike/city-bike-widget';
import { ElectricityWidget } from '../../electricity/electricity-widget';
import { HomeActionsWidget } from '../../home/home-widget';
import { NewsWidget } from '../../news/news-widget';
import { StocksWidget } from '../../stocks/stocks-widget';
import { WeatherWidget } from '../../weather/weather-widget';
import { WidgetEnum, type WidgetDefinition } from './widget-type';
import { SwimmingWidget } from '../../swimming/swimming-widget';
import { LaundryWeekWidget } from '../../laundry-week/laundry-week-widget';

export const Widgets: Record<WidgetEnum, WidgetDefinition<any>> = {
  [WidgetEnum.Header]: HeaderWidget,
  [WidgetEnum.Weather]: WeatherWidget,
  [WidgetEnum.Stocks]: StocksWidget,
  [WidgetEnum.News]: NewsWidget,
  [WidgetEnum.LaundryWeek]: LaundryWeekWidget,
  [WidgetEnum.HomeActions]: HomeActionsWidget,
  [WidgetEnum.Electricity]: ElectricityWidget,
  [WidgetEnum.CityBike]: CityBikeWidget,
  [WidgetEnum.Calender]: CalenderWidget,
  [WidgetEnum.BusCards]: TravelCardWidget,
  [WidgetEnum.Swimming]: SwimmingWidget,
};

export const WidgetConfigs: Record<WidgetEnum, object> = (
  Object.keys(Widgets) as WidgetEnum[]
).reduce(
  (acc, key) => {
    acc[key] = Widgets[key].widgetConfig?.config ?? null;
    return acc;
  },
  {} as Record<WidgetEnum, object>
);
