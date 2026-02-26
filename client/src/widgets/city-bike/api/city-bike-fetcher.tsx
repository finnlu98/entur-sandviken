import configuration from '../../../configuration';
import type { CityBikeStationResponse } from '../model/city-bike-stations-response';
import type { CityBikeStatusResponse } from '../model/city-bike-status-response';
import externalApiClient from '../../../api/external-api-client';
import BaseWidgetApi from '../../core/api/base-widget-api';

class CityBikeApi extends BaseWidgetApi {
  async getCityBikeStatus(): Promise<CityBikeStatusResponse> {
    try {
      const statusEndpoint = configuration.getOsloCityBikeConfig().Status.Endpoint;
      const identifier = configuration.getIdentifierConfig();
      const statusRes = await externalApiClient.get<CityBikeStatusResponse>(statusEndpoint, {
        headers: { 'Client-Identifier': identifier },
        meta: { loadingKey: 'fetch-city-bike-status' },
      });
      return statusRes.data;
    } catch (error) {
      console.error('Can`t get City Bike data');
      throw error;
    }
  }

  async getCityBikeStations(): Promise<CityBikeStationResponse> {
    try {
      const stationEndpoint = configuration.getOsloCityBikeConfig().StationsInformation.Endpoint;
      const identifier = configuration.getIdentifierConfig();
      const stationRes = await externalApiClient.get<CityBikeStationResponse>(stationEndpoint, {
        headers: { 'Client-Identifier': identifier },
        meta: { loadingKey: 'fetch-city-bike-stations' },
      });
      return stationRes.data;
    } catch (error) {
      console.error('Can`t get City Bike stations data');
      throw error;
    }
  }
}

const cityBikeApi = new CityBikeApi();
export default cityBikeApi;
