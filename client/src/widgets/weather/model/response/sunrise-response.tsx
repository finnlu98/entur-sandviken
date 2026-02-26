import BaseResponse from '../../../../api/model/base-response';

export class SunriseResponse extends BaseResponse {
  static Identifier = 'SunriseResponse';
  properties!: Properties;
}

class Properties {
  sunrise!: Sunrise;
  sunset!: Sunset;
}

class EventTime {
  time!: string;
}

class Sunrise extends EventTime {}
class Sunset extends EventTime {}
