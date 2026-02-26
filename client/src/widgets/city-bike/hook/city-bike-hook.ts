import { useMemo } from 'react';
import { useWidgetQuery } from '../../core/hooks/use-widget-query';
import type { CityBikeConfig } from '../city-bike-widget';
import type { CityBikeData } from '../model/city-bike-data';
import type { CityBikeResponse, Station } from '../model/city-bike-response';
import CityBikeService from '../service/city-bike-service';
import type { CityBikeStatusResponse } from '../model/city-bike-status-response';
import { cityBikeStatusMapper } from '../mapper/city-bike-mapper';
import cityBikeApi from '../api/city-bike-fetcher';

import {
  CITY_BIKE_FETCH_INTERVAL,
  CITY_BIKE_STATIONS_FETCH_INTERVAL,
} from '../city-bike-constants';

export function useCityBikeStatusQuery(config: CityBikeConfig | undefined) {
  return useWidgetQuery<CityBikeStatusResponse | undefined>({
    queryKey: ['cityBikeStatus'],
    queryFn: async () => {
      if (!config) return undefined;
      return await cityBikeApi.getCityBikeStatus();
    },
    enabled: Boolean(config),
    refetchInterval: CITY_BIKE_FETCH_INTERVAL,
    staleTime: 2 * 60 * 1000,
  });
}

export function useCityBikeStationQuery() {
  return useWidgetQuery<CityBikeResponse | undefined>({
    queryKey: ['cityBikeStations'],
    queryFn: async () => {
      return await cityBikeApi.getCityBikeStations();
    },
    refetchInterval: CITY_BIKE_STATIONS_FETCH_INTERVAL,
    staleTime: 10 * 60 * 1000,
  });
}

export function useClosestCityBikeStations(
  stationsResponse: CityBikeResponse | undefined,
  coordinate: { lat: number | string; lon: number | string } | undefined,
  maxDistanceMeters = 500
): Station[] {
  return useMemo(() => {
    if (!stationsResponse || !coordinate) return [];
    const lat = Number(coordinate.lat);
    const lon = Number(coordinate.lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon) || (lat === 0 && lon === 0)) return [];
    return (
      CityBikeService.getClosestStations({ lat, lon }, stationsResponse, maxDistanceMeters) ?? []
    );
  }, [stationsResponse, coordinate, maxDistanceMeters]);
}

export function useMappedStatusQuery(config: CityBikeConfig | undefined): {
  data: CityBikeData | undefined;
} {
  const { data: stationsRes } = useCityBikeStationQuery();
  const { data: statusRes } = useCityBikeStatusQuery(config);

  return useMemo(() => {
    if (!config || !config?.stations || !stationsRes || !statusRes) return { data: undefined };
    return { data: cityBikeStatusMapper(config.stations, stationsRes, statusRes) };
  }, [config, stationsRes, statusRes]);
}
