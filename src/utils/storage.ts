import type { User, UserRole } from '@/types';

/**
 * Typed wrapper over `localStorage`. Centralising the keys keeps the auth reducer and
 * the HTTP layer from drifting apart, and every read is guarded so a corrupted value
 * or a browser with storage disabled cannot crash the app at start-up.
 */
const StorageKey = {
  USER: 'user',
  TOKEN: 'token',
  ROLE: 'role',
} as const;

function readRaw(key: string): string | null {
  try {
    const value = localStorage.getItem(key);

    // The previous implementation persisted the literal strings "null"/"undefined".
    return value === null || value === 'null' || value === 'undefined' ? null : value;
  } catch {
    return null;
  }
}

function writeRaw(key: string, value: string | null): void {
  try {
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, value);
    }
  } catch {
    // Private-mode or quota failures are not worth breaking a render over.
  }
}

export const storage = {
  getUser(): User | null {
    const raw = readRaw(StorageKey.USER);

    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as User;
    } catch {
      writeRaw(StorageKey.USER, null);
      return null;
    }
  },

  getToken(): string | null {
    return readRaw(StorageKey.TOKEN);
  },

  getRole(): UserRole | null {
    return readRaw(StorageKey.ROLE) as UserRole | null;
  },

  setSession(user: User | null, token: string | null, role: UserRole | null): void {
    writeRaw(StorageKey.USER, user ? JSON.stringify(user) : null);
    writeRaw(StorageKey.TOKEN, token);
    writeRaw(StorageKey.ROLE, role);
  },

  clearSession(): void {
    writeRaw(StorageKey.USER, null);
    writeRaw(StorageKey.TOKEN, null);
    writeRaw(StorageKey.ROLE, null);
  },
};
