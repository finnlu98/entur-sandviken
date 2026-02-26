import moment from "moment";
import ICAL from "ical.js";
import type { CalendarEvent } from "../api/calender-ical-fetcher";

export const calenderMapper = {
  parseICalEvents(icalData: string): CalendarEvent[] {
    try {
      const jcalData = ICAL.parse(icalData);
      const comp = new ICAL.Component(jcalData);
      const vevents = comp.getAllSubcomponents("vevent");

      return vevents.map((vevent) => {
        const event = new ICAL.Event(vevent);

        return {
          id: event.uid,
          summary: event.summary,
          description: event.description,
          start: moment(event.startDate.toJSDate()),
          end: moment(event.endDate.toJSDate()),
          location: event.location,
          isAllDay: event.startDate.isDate,
        };
      });
    } catch (error) {
      console.error("Failed to parse iCal data:", error);
      return [];
    }
  },
  sortEvents(events: CalendarEvent[]): CalendarEvent[] {
    const now = moment();
    return events
      .map((event) => ({
        ...event,
        start: moment.isMoment(event.start) ? event.start : moment(event.start),
        end: moment.isMoment(event.end) ? event.end : moment(event.end),
      }))
      .filter((event) => event.end.isAfter(now))
      .sort((a, b) => a.start.valueOf() - b.start.valueOf());
  },
};
