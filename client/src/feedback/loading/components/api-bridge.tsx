import { useEffect } from 'react';
import type { AxiosInstance } from 'axios';
import { loadingManager } from '../utils/loading-manager';
import { RequestMeta } from '../types/loading-types';

interface ApiBridgeProps {
  apiClient: AxiosInstance;
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    meta?: RequestMeta;
  }
}

export const ApiBridge = ({ apiClient }: ApiBridgeProps) => {
  useEffect(() => {
    const requestInterceptor = apiClient.interceptors.request.use(
      (config) => {
        const loadingKey = config.meta?.loadingKey;
        loadingManager.start(loadingKey);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = apiClient.interceptors.response.use(
      (response) => {
        const loadingKey = response.config.meta?.loadingKey;
        loadingManager.stop(loadingKey);
        return response;
      },
      (error) => {
        const loadingKey = error.config?.meta?.loadingKey;
        console.error('ApiBridge: Response error', { url: error.config?.url, loadingKey, error });
        loadingManager.stop(loadingKey);
        return Promise.reject(error);
      }
    );

    return () => {
      apiClient.interceptors.request.eject(requestInterceptor);
      apiClient.interceptors.response.eject(responseInterceptor);
    };
  }, [apiClient]);

  return null;
};
