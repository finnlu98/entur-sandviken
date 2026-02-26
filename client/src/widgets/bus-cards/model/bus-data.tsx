import type { TravelRoute } from '../travel-card-widget';
import type { TravelResponse } from './travel-response';

export class BusData {
  constructor(travelResponse: TravelResponse, travelRoute: TravelRoute) {
    this.travelResponse = travelResponse;
    this.travelRoute = travelRoute;
  }

  travelResponse!: TravelResponse;
  travelRoute!: TravelRoute;
}
