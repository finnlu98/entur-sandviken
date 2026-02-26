import type { Moment } from "moment";

import BaseWidgetApi from "../../core/api/BaseWidgetApi";
import { calenderMapper } from "../mapper/calender-mappers";

export interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: Moment;
  end: Moment;
  location?: string;
  isAllDay: boolean;
}

class CalenderApi extends BaseWidgetApi {
  async fetchICalEvents(endpoint: string): Promise<CalendarEvent[]> {
    const response = await this.postInternalJson<string>("/broker", {}, { endpoint: endpoint }, "fetch-ical-events");
    return calenderMapper.parseICalEvents(response);
  }
}

const calenderApi = new CalenderApi();
export default calenderApi;
