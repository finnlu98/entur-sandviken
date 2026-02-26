import type { CityBikeResponse, Station } from "../model/CityBikeResponse";

class CityBikeService {
  static getClosestStations(
    position: { lat: number; lon: number },
    stations: CityBikeResponse,
    maxDistanceMeters: number,
  ): Station[] | null {
    if (stations && stations.data && stations.data.stations) {
      const stationsWithDistance = stations.data.stations.filter((station) => {
        const distance = this.getDistanceInMeters(position.lat, position.lon, station.lat, station.lon);
        return distance <= maxDistanceMeters;
      });
      return stationsWithDistance;
    }

    return null;
  }

  static getDistanceInMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const earthRadiusMeters = 6371000;
    const toRadians = (degrees: number) => degrees * (Math.PI / 180);

    const latDiff = toRadians(lat2 - lat1);
    const lonDiff = toRadians(lon2 - lon1);

    const lat1Rad = toRadians(lat1);
    const lat2Rad = toRadians(lat2);

    const sinLatDiff = Math.sin(latDiff / 2);
    const sinLonDiff = Math.sin(lonDiff / 2);

    const calculation = sinLatDiff * sinLatDiff + Math.cos(lat1Rad) * Math.cos(lat2Rad) * sinLonDiff * sinLonDiff;

    const angularDistance = 2 * Math.atan2(Math.sqrt(calculation), Math.sqrt(1 - calculation));

    return earthRadiusMeters * angularDistance;
  }
}
export default CityBikeService;
