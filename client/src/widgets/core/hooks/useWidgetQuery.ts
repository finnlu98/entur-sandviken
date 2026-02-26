import { useQuery, type QueryKey } from '@tanstack/react-query';

export type WidgetQueryOptions<TData> = {
  queryKey: QueryKey;
  queryFn: () => Promise<TData>;
  enabled?: boolean;
  refetchInterval?: number | false;
  refetchIntervalInBackground?: boolean;
  staleTime?: number;
  refetchOnWindowFocus?: boolean;
};

export function useWidgetQuery<TData>(options: WidgetQueryOptions<TData>) {
  return useQuery<TData>({
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: false,
    ...options,
  });
}
