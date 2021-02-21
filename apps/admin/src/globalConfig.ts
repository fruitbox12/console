interface GlobalConfig {
  VERSION: string;
  API_GATEWAY_PUBLIC_URL: string;
  AUTH0_DOMAIN: string;
  AUTH0_CLIENT_ID: string;
  GOOGLE_MAP_API_KEY: string;
  IPINFO_ACCESS_TOKEN: string;
}

declare global {
  interface Window {
    _env_: GlobalConfig;
  }
}

export {};
