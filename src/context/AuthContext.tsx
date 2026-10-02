import { createContext, useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { login as loginRequest, type LoginCredentials } from "../data/api";
import type { AuthUser } from "../types";

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

const SESSION_KEY = "pulse-analytics-session";

function readStoredUser(): AuthUser | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(readStoredUser);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!credentials.email || !credentials.password) {
        throw new Error("Email and password are required.");
      }
      const authUser = await loginRequest(credentials);
      setUser(authUser);
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(authUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem(SESSION_KEY);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      isLoading,
      error,
      login,
      logout,
    }),
    [user, isLoading, error, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
