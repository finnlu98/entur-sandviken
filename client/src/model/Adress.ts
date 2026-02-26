import type { Coordinate } from "./Coordinate";

export interface Address {
  frienldyName: string;
  coordinate: Coordinate;
  municipalityName: string;
  countyNumber: string;
  municipalityNumber: string;
}
