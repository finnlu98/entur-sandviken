import { useQueries } from '@tanstack/react-query';
import calenderApi, { type CalendarEvent } from '../api/calender-ical-fetcher';
import type { CalenderConfig } from '../CalenderWidget';
import { calenderMapper } from '../mapper/calender-mappers';
import { AlertVariant } from '../../../feedback/alert/model/AlertTypes';

import { CALENDER_FETCH_INTERVAL } from '../calender-constants';

export function useCalenderQueries(config: CalenderConfig | undefined) {
  const results = useQueries({
    queries: config?.calenderICalEndpoints?.map((endpoint) => createCalenderQuery(endpoint)) ?? [],
  });

  const events: CalendarEvent[] = [];
  results.forEach((result) => {
    if (result.data) {
      events.push(...result.data);
    }
  });

  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);

  return {
    data:
      !config?.calenderICalEndpoints || config?.calenderICalEndpoints.length === 0
        ? undefined
        : calenderMapper.sortEvents(events),
    isLoading,
    isError,
  };
}

export function createCalenderQuery(endpoint: string) {
  return {
    queryKey: ['calenderEvents', endpoint],
    queryFn: async () => {
      try {
        const response = await calenderApi.fetchICalEvents(endpoint);
        return response;
      } catch (error) {
        console.error(`Failed to fetch iCal data from endpoint ${endpoint}:`, error);
        return [];
      }
    },
    enabled: Boolean(endpoint),
    refetchInterval: CALENDER_FETCH_INTERVAL,
    staleTime: 23 * 60 * 60 * 1000,
  };
}

export async function validateCalenderEndpoint(endpoint: string): Promise<{
  isValid: boolean;
  events?: CalendarEvent[];
  alertVariant?: AlertVariant;
  message?: string;
}> {
  try {
    const events = await calenderApi.fetchICalEvents(endpoint);

    return {
      isValid: events.length !== 2,
      alertVariant: events.length !== 2 ? AlertVariant.SUCCESS : AlertVariant.INFO,
      events,
      message:
        events.length === 2
          ? 'Great news! We found your calendar, but no events were found. A common reason for this is that the events in your calender are not publicly available. Read about this from your calendar provider. Do you want to proceed with adding the calend'
          : undefined,
    };
  } catch {
    return {
      isValid: false,
      alertVariant: AlertVariant.ERROR,
      message: 'Oops! This url is not a valid iCal feed. Try another url.',
    };
  }
}
