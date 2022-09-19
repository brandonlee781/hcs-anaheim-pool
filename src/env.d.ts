/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EVENT: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
