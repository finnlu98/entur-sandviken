import BaseResponse from '../../../../api/model/base-response';

export class WeatherResponse extends BaseResponse {
  static Identifier: 'WeatherResponse';
  properties!: Properties;
}

class Properties {
  timeseries!: TimeSeries[];
}

export class TimeSeries {
  time!: string;
  data!: Data;
}

class Data {
  instant!: Instant;
  next_1_hours!: IntervalSummary;
  next_6_hours!: IntervalSummary;
}

class Instant {
  details!: Details;
}

class IntervalSummary {
  summary!: Summary;
  details!: RainDetails;
}

class Details {
  air_temperature!: number;
}

class Summary {
  symbol_code!: string;
}

class RainDetails {
  precipitation_amount!: number;
}
