/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly MY_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}