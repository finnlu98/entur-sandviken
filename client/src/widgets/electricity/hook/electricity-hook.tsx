import ElviaFetcher from '../api/elvia-fetcher';
import { useWidgetQuery } from '../../core/hooks/use-widget-query';
import type { ElectricityData } from '../model/electricity-data';
import { useElviaKeyQuery } from './electricity-key-hook';
import { ELVIA_CONSUMPTION_QUERY_KEY } from './electricity-query-keys';

import { ELECTRICITY_FETCH_INTERVAL } from '../electricity-constants';

export function useElviaConsumptionQuery() {
  const hasKeyQuery = useElviaKeyQuery();
  const hasElviaKey = hasKeyQuery.data === true;
  const canFetchConsumption = hasElviaKey && hasKeyQuery.isFetchedAfterMount;

  return useWidgetQuery<ElectricityData>({
    queryKey: ELVIA_CONSUMPTION_QUERY_KEY,
    queryFn: () => ElviaFetcher.fetchConsumptionData(),
    enabled: canFetchConsumption,
    refetchInterval: ELECTRICITY_FETCH_INTERVAL,
    staleTime: 50 * 60 * 1000,
  });
}
