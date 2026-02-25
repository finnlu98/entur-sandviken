import { HeaderWidget } from "../../header/HeaderWidget";
import { TravelCardWidget } from "../../bus-cards/TravelCardWidget";
import { CalenderWidget } from "../../calender/CalenderWidget";
import { CityBikeWidget } from "../../city-bike/CityBikeWidget";
import { ElectricityWidget } from "../../electricity/ElectricityWidget";
import { HomeActionsWidget } from "../../home/HomeWidget";
import { LaundryWeekWidget } from "../../laundry-week/LaundryWeekWidget";
import { NewsWidget } from "../../news/NewsWidget";
import { StocksWidget } from "../../stocks/StocksWidget";
import { WeatherWidget } from "../../weather/WeatherWidget";
import { WidgetDefinition, WidgetEnum } from "./widget-type";
import { SwimmingWidget } from "../../swimming/swimming-widget";

export const Widgets: Record<WidgetEnum, WidgetDefinition<any>> = {
  [WidgetEnum.header]: HeaderWidget,
  [WidgetEnum.weather]: WeatherWidget,
  [WidgetEnum.stocks]: StocksWidget,
  [WidgetEnum.news]: NewsWidget,
  [WidgetEnum.laundryWeek]: LaundryWeekWidget,
  [WidgetEnum.homeActions]: HomeActionsWidget,
  [WidgetEnum.electricity]: ElectricityWidget,
  [WidgetEnum.cityBike]: CityBikeWidget,
  [WidgetEnum.calender]: CalenderWidget,
  [WidgetEnum.busCards]: TravelCardWidget,
  [WidgetEnum.swimming]: SwimmingWidget,
};

export const WidgetConfigs: Record<WidgetEnum, object> = (Object.keys(Widgets) as WidgetEnum[]).reduce(
  (acc, key) => {
    acc[key] = Widgets[key].widgetConfig?.config ?? null;
    return acc;
  },
  {} as Record<WidgetEnum, object>,
);
