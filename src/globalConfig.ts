interface GlobalConfig {
  FRONTEND_VERSION: string;
  API_GATEWAY_PUBLIC_URL: string;
  AUTH0_DOMAIN: string;
  AUTH0_CLIENT_ID: string;
}

declare global {
  interface Window {
    _env_: GlobalConfig;
  }
}

export {};
