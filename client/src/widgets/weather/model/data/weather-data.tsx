import type { SunriseResponse } from '../response/sunrise-response';
import type { WeatherForecast } from './weather-forecast';

export class WeatherData {
  constructor(weatherForecast: WeatherForecast, sunriseData: SunriseResponse) {
    this.weatherForecast = weatherForecast;
    this.sunriseData = sunriseData;
  }

  weatherForecast!: WeatherForecast;
  sunriseData!: SunriseResponse;
}
