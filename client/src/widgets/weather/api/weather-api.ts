import configuration from '../../../configuration';
import BaseWidgetApi from '../../core/api/base-widget-api';
import type { WeatherResponse } from '../model/response/weather-response';
import type { SunriseResponse } from '../model/response/sunrise-response';
import { WeatherForecast } from '../model/data/weather-forecast';
import { WeatherData } from '../model/data/weather-data';

class WeatherApi extends BaseWidgetApi {
  async getWeatherData(lat: string, lon: string): Promise<WeatherData | undefined> {
    if (!lat || !lon || lat.trim() === '' || lon.trim() === '') {
      return undefined;
    }

    const weatherEndpoint = this.formatEndpoint(configuration.getWeatherEndpoint(), { lat, lon });
    const sunriseEndpoint = this.formatEndpoint(configuration.getSunriseEndpoint(), { lat, lon });

    const weatherRes = await this.getExternalJson<WeatherResponse>(
      weatherEndpoint,
      'fetch-weather'
    );
    const weatherForecast = new WeatherForecast(weatherRes);

    const sunriseRes = await this.getExternalJson<SunriseResponse>(
      sunriseEndpoint,
      'fetch-sunrise'
    );

    return new WeatherData(weatherForecast, sunriseRes);
  }
}

const weatherApi = new WeatherApi();
export default weatherApi;
