import { useContext } from 'react';
import { LoadingContext } from '../providers/loading-provider';

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
};
