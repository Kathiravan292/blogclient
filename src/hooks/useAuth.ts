import { useContext } from 'react';

import { AuthContext } from '@/context/AuthContext';
import type { AuthContextValue } from '@/context/auth.types';

/**
 * Reads the auth context and narrows away the `null` default, so callers get a
 * non-optional value and a clear error if the provider is missing.
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside an <AuthProvider>.');
  }

  return context;
}
