import type { User, UserRole } from '@/types';

export interface AuthState {
  user: User | null;
  token: string | null;
  role: UserRole | null;
}

export const AuthActionType = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  PROFILE_UPDATED: 'PROFILE_UPDATED',
} as const;

export type AuthAction =
  | { type: typeof AuthActionType.LOGIN_SUCCESS; payload: { user: User; token: string } }
  | { type: typeof AuthActionType.LOGOUT_SUCCESS }
  | { type: typeof AuthActionType.PROFILE_UPDATED; payload: { user: User } };

export interface AuthContextValue extends AuthState {
  /** True once a token and user are present. */
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateProfile: (user: User) => void;
}
