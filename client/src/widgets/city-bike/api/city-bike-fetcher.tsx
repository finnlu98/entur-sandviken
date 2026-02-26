import configuration from "../../../Configuration";
import type { CityBikeStationResponse } from "../model/CityBikeStationsResponse";
import type { CityBikeStatusResponse } from "../model/CityBikeStatusResponse";
import externalApiClient from "../../../api/ExternalApiClient";
import BaseWidgetApi from "../../core/api/BaseWidgetApi";


class CityBikeApi extends BaseWidgetApi {
  async getCityBikeStatus(): Promise<CityBikeStatusResponse> {
    try {
      const statusEndpoint = configuration.getOsloCityBikeConfig().Status.Endpoint;
      const identifier = configuration.getIdentifierConfig();
      const statusRes = await externalApiClient.get<CityBikeStatusResponse>(statusEndpoint, {
        headers: { "Client-Identifier": identifier },
        meta: { loadingKey: "fetch-city-bike-status" },
      });
      return statusRes.data;
    } catch (error) {
      console.error("Can`t get City Bike data");
      throw error;
    }
  }

  async getCityBikeStations(): Promise<CityBikeStationResponse> {
    try {
      const stationEndpoint = configuration.getOsloCityBikeConfig().StationsInformation.Endpoint;
      const identifier = configuration.getIdentifierConfig();
      const stationRes = await externalApiClient.get<CityBikeStationResponse>(stationEndpoint, {
        headers: { "Client-Identifier": identifier },
        meta: { loadingKey: "fetch-city-bike-stations" },
      });
      return stationRes.data;
    } catch (error) {
      console.error("Can`t get City Bike stations data");
      throw error;
    }
  }
}

const cityBikeApi = new CityBikeApi();
export default cityBikeApi;
