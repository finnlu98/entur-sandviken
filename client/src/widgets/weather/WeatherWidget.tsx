import { TiWeatherSunny } from 'react-icons/ti';
import Dailyweather from './components/card/daily-weather';
import WeatherConfiguration from './components/configuration/weatherConfiguration';
import { useWeatherQuery } from './hooks/useWeatherQuery';
import { WidgetEnum, type WidgetDefinition } from '../core/model/widget-type';
import { WEATHER_FETCH_INTERVAL } from './weather-constants';
import type { WeatherData } from './model/data/WeatherData';
import WeatherDocumentation from './components/documentation/weather-documentation';

export const WeatherWidget: WidgetDefinition<WeatherConfig, WeatherData> = {
  id: WidgetEnum.weather,
  friendlyName: 'Weather',
  widgetIcon: <TiWeatherSunny />,
  widgetComponent: Dailyweather,
  useQuery: useWeatherQuery,
  widgetConfig: {
    component: WeatherConfiguration,
    documentation: WeatherDocumentation,
  },
  defaultColSpan: 12,
  defaultRowSpan: 6,
  fetchtingInterval: WEATHER_FETCH_INTERVAL,
};

export interface WeatherConfig {
  lat: string;
  lon: string;
}
