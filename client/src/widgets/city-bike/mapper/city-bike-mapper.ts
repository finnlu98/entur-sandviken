import { CityBikeData } from '../model/city-bike-data';
import type { CityBikeResponse, Station } from '../model/city-bike-response';
import type { CityBikeStatusResponse } from '../model/city-bike-status-response';

export function cityBikeStatusMapper(
  keepStations: string[],
  stations: CityBikeResponse,
  status: CityBikeStatusResponse
) {
  const keepIds = new Set(keepStations.map((id) => Number(id)));
  const filteredStations =
    stations?.data.stations.filter((station) => keepIds.has(Number(station.station_id))) ?? [];
  const filteredStatus =
    status?.data.stations.filter((station) => keepIds.has(Number(station.station_id))) ?? [];

  const stationMap = new Map<number, Station>(
    filteredStations.map((s) => [Number(s.station_id), s])
  );

  filteredStatus.forEach((status) => {
    const id = Number(status.station_id);
    const station = stationMap.get(id);
    if (station) {
      station.last_reported = status.last_reported;
      station.num_bikes_available = status.num_bikes_available;
      stationMap.set(id, station);
    }
  });

  return new CityBikeData(Array.from(stationMap.values()));
}
