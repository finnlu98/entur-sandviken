import type { Coordinate } from './coordinate';

export interface Address {
  frienldyName: string;
  coordinate: Coordinate;
  municipalityName: string;
  countyNumber: string;
  municipalityNumber: string;
}
