export interface LoadingContextValue {
  start: (key?: string) => void;
  stop: (key?: string) => void;
  isLoading: (key?: string) => boolean;
  anyLoading: boolean;
}

export interface RequestMeta {
  loadingKey?: string;
  successMessage?: string;
  errorMessage?: string;
  silentError?: boolean;
}
