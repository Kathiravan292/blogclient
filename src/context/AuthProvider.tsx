import { type ReactNode, useCallback, useMemo, useReducer } from 'react';

import { AuthContext } from './AuthContext';
import { authReducer, getInitialAuthState } from './auth.reducer';
import { AuthActionType, type AuthContextValue } from './auth.types';
import type { User } from '@/types';
import { storage } from '@/utils/storage';

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Holds the signed-in user for the whole tree and mirrors it into `localStorage`.
 * Persistence happens inside each action rather than in an effect on the whole state,
 * so logging out cannot leave a stale token behind.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, undefined, getInitialAuthState);

  const login = useCallback((user: User, token: string) => {
    storage.setSession(user, token, user.role);
    dispatch({ type: AuthActionType.LOGIN_SUCCESS, payload: { user, token } });
  }, []);

  const logout = useCallback(() => {
    storage.clearSession();
    dispatch({ type: AuthActionType.LOGOUT_SUCCESS });
  }, []);

  const updateProfile = useCallback((user: User) => {
    storage.setSession(user, storage.getToken(), user.role);
    dispatch({ type: AuthActionType.PROFILE_UPDATED, payload: { user } });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      isAuthenticated: Boolean(state.token && state.user),
      login,
      logout,
      updateProfile,
    }),
    [state, login, logout, updateProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
