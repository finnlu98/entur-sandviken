import { useWidgetQuery } from '../../core/hooks/use-widget-query';
import swimmingApi from '../api/swimming-fetcher';
import type { SwimmingResponse } from '../model/swimming-response';
import type { SwimmingConfig } from '../swimming-widget';

import { SWIMMING_FETCH_INTERVAL } from '../swimming-constants';

export function useSwimmingQuery(config: SwimmingConfig | undefined) {
  return useWidgetQuery<SwimmingResponse[] | undefined>({
    queryKey: ['swimming', config?.searchLocation?.frienldyName],
    queryFn: () => {
      if (!config || !config?.searchLocation) return Promise.resolve(undefined);
      return swimmingApi.getSwimmingData(config.searchLocation);
    },
    enabled: Boolean(config),
    refetchInterval: SWIMMING_FETCH_INTERVAL,
    staleTime: 90 * 60 * 1000,
  });
}
