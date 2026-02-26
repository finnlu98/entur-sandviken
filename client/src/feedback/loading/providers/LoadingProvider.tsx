import { createContext, useState, useEffect, type ReactNode } from 'react';
import type { LoadingContextValue } from '../types/loading.types';
import { loadingManager } from '../utils/loading-manager';

export const LoadingContext = createContext<LoadingContextValue | null>(null);

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const unsubscribe = loadingManager.subscribe(() => {
      forceUpdate({});
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const contextValue: LoadingContextValue = {
    start: (key?: string) => loadingManager.start(key),
    stop: (key?: string) => loadingManager.stop(key),
    isLoading: (key?: string) => loadingManager.isLoading(key),
    anyLoading: loadingManager.anyLoading,
  };

  return <LoadingContext.Provider value={contextValue}>{children}</LoadingContext.Provider>;
};
