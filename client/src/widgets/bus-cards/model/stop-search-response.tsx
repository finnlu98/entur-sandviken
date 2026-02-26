import BaseResponse from '../../../api/model/base-response';

export class StopSearchResponse extends BaseResponse {
  features!: TravelStop[];
}

export class TravelStop {
  geometry!: Geometry;
  properties!: Properties;
}

class Properties {
  id!: string;
  label!: string;
  name!: string;
  county!: string;
}

class Geometry {
  coordinates!: number[];
}
