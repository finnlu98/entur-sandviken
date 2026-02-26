import type { Station } from "./CityBikeResponse";

export class CityBikeData {
  constructor(public stations: Station[]) {}
}