const DEFAULT_API_BASE_URL = 'https://blogserver-ruo1.onrender.com/api/v1';

/**
 * Base URL of the API. Override per environment with `VITE_API_BASE_URL` in a `.env`
 * file; the deployed server is the fallback so a fresh checkout works without setup.
 */
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL).replace(
  /\/+$/,
  '',
);
