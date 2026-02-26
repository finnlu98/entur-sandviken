/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HEIMR_BACKEND_ENDPOINT?: string;
  readonly VITE_HOME_ASSISTANT_SECRET_TOKEN?: string;
  readonly VITE_STOCK_ENDPOINT?: string;
  readonly VITE_ENV?: string;
  readonly VITE_LAYOUT_VERSION?: string;
  readonly VITE_CONFIG_VERSION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
