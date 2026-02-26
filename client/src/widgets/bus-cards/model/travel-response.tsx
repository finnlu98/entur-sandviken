import BaseResponse from '../../../api/model/base-response';

export class TravelResponse extends BaseResponse {
  static Identifier = 'TravelResponse';
  data!: Data;
}

class Data {
  trip!: Trip;
}

class Trip {
  tripPatterns!: TripPatterns[];
}

export class TripPatterns {
  legs!: Leg[];
}

export class Leg {
  expectedStartTime!: string;
  expectedEndTime!: string;
  mode!: string;
  distance!: number;
  fromPlace!: Place;
  toPlace!: Place;
  line!: Line;
}

class Place {
  name!: string;
}

class Line {
  id!: string;
  publicCode!: string;
  name!: string;
}
