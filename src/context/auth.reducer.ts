import { type AuthAction, AuthActionType, type AuthState } from './auth.types';
import { storage } from '@/utils/storage';

/** Seeds state from `localStorage` so a refresh keeps the user signed in. */
export function getInitialAuthState(): AuthState {
  const user = storage.getUser();

  return {
    user,
    token: storage.getToken(),
    // Prefer the role on the stored user; the separate key is kept for older sessions.
    role: user?.role ?? storage.getRole(),
  };
}

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionType.LOGIN_SUCCESS:
      return {
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.user.role,
      };

    case AuthActionType.PROFILE_UPDATED:
      // A profile edit must not discard the session's token.
      return { ...state, user: action.payload.user, role: action.payload.user.role };

    case AuthActionType.LOGOUT_SUCCESS:
      return { user: null, token: null, role: null };

    default:
      return state;
  }
}
