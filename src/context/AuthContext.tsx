import { createContext } from 'react';

import type { AuthContextValue } from './auth.types';

/**
 * Declared in its own module so `AuthProvider` can stay a component-only file and
 * satisfy react-refresh's single-export rule.
 */
export const AuthContext = createContext<AuthContextValue | null>(null);
