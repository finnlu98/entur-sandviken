import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useWidgetQuery } from '../../core/hooks/use-widget-query';
import { ELVIA_CONSUMPTION_QUERY_KEY, HAS_ELVIA_KEY_QUERY_KEY } from './electricity-query-keys';
import elviaApi from '../api/elvia-fetcher';

type ElviaKeyState = {
  hasElviaKey: boolean;
  postElviaKey: (key: string) => Promise<boolean>;
};

export function useElviaKeyQuery() {
  return useWidgetQuery<boolean>({
    queryKey: HAS_ELVIA_KEY_QUERY_KEY,
    queryFn: () => elviaApi.getHasElviaKey(),
    staleTime: 0,
  });
}

export function useElviaKeyStatus(): boolean {
  const hasKeyQuery = useElviaKeyQuery();
  return hasKeyQuery.data ?? false;
}

export function useElviaKeyManagement(): ElviaKeyState {
  const queryClient = useQueryClient();
  const hasElviaKey = useElviaKeyStatus();

  const postKeyMutation = useMutation({
    mutationFn: async (key: string) => {
      return await elviaApi.postElviaKey(key);
    },
    onSuccess: async (isValid) => {
      queryClient.setQueryData(HAS_ELVIA_KEY_QUERY_KEY, isValid);
      if (isValid) {
        await queryClient.invalidateQueries({ queryKey: ELVIA_CONSUMPTION_QUERY_KEY });
      }
    },
    onError: (error) => {
      console.error('Failed to post Elvia key', error);
      queryClient.setQueryData(HAS_ELVIA_KEY_QUERY_KEY, false);
    },
  });

  const postElviaKey = useCallback(
    async (key: string): Promise<boolean> => {
      try {
        const isValid = await postKeyMutation.mutateAsync(key);
        return isValid;
      } catch {
        return false;
      }
    },
    [postKeyMutation]
  );

  return {
    hasElviaKey,
    postElviaKey,
  };
}
