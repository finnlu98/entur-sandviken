import type { Coordinate } from '../../../model/coordinate';

export class SwimmingResponse {
  locationName!: string;
  locationId!: string;
  time!: string;
  position!: Coordinate;
  temperature!: number;
  distanceFromLocation!: number;
}
