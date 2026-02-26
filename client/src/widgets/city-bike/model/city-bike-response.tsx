import BaseResponse from '../../../api/model/base-response';

export class CityBikeResponse extends BaseResponse {
  data!: DataStatus;
}

class DataStatus {
  stations!: Station[];
}

export class Station {
  station_id!: string;
  last_reported!: number;
  num_bikes_available!: number;
  lat!: number;
  lon!: number;
}
