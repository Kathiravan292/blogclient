import axios, { AxiosError, type AxiosInstance } from 'axios';

import { API_BASE_URL } from '@/config/env';
import type { ApiErrorResponse } from '@/types';
import { storage } from '@/utils/storage';

/**
 * Shared axios instance. A request interceptor attaches the bearer token, so no
 * component has to read `localStorage` or build an `Authorization` header itself —
 * the bug in the old client where the token was captured once at module load is gone.
 */
export const http: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

http.interceptors.request.use((config) => {
  const token = storage.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/**
 * Pulls the server's `message` out of a failed request so callers can surface it
 * directly. Falls back through the axios message to a generic string.
 */
export function getErrorMessage(error: unknown, fallback = 'Something went wrong.'): string {
  if (error instanceof AxiosError) {
    const body = error.response?.data as ApiErrorResponse | undefined;

    return body?.message ?? error.message ?? fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}

/** True when the failure was an HTTP response with the given status. */
export function isHttpStatus(error: unknown, status: number): boolean {
  return error instanceof AxiosError && error.response?.status === status;
}
