import configuration from "../../../Configuration";
import BaseWidgetApi from "../../core/api/BaseWidgetApi";
import type { WeatherResponse } from "../model/response/WeatherResponse";
import type { SunriseResponse } from "../model/response/SunriseResponse";
import { WeatherForecast } from "../model/data/WeatherForecast";
import { WeatherData } from "../model/data/WeatherData";

class WeatherApi extends BaseWidgetApi {
  async getWeatherData(lat: string, lon: string): Promise<WeatherData | undefined> {
    if (!lat || !lon || lat.trim() === "" || lon.trim() === "") {
      return undefined;
    }

    const weatherEndpoint = this.formatEndpoint(configuration.getWeatherEndpoint(), { lat, lon });
    const sunriseEndpoint = this.formatEndpoint(configuration.getSunriseEndpoint(), { lat, lon });

    const weatherRes = await this.getExternalJson<WeatherResponse>(weatherEndpoint, "fetch-weather");
    const weatherForecast = new WeatherForecast(weatherRes);

    const sunriseRes = await this.getExternalJson<SunriseResponse>(sunriseEndpoint, "fetch-sunrise");

    return new WeatherData(weatherForecast, sunriseRes);
  }
}

const weatherApi = new WeatherApi();
export default weatherApi;
