import type { Station } from './city-bike-response';

export class CityBikeData {
  constructor(public stations: Station[]) {}
}
