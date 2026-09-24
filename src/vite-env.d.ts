/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the blogserver API, including the `/api/v1` prefix. */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
