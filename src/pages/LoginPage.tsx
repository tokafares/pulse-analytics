import { useState } from "react";
import type { FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function LoginPage() {
  const { login, isAuthenticated, isLoading, error } = useAuth();
  const [email, setEmail] = useState("demo@pulseanalytics.io");
  const [password, setPassword] = useState("password123");

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await login({ email, password });
    } catch {
      // error is surfaced via context state
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white">
            P
          </div>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
            Pulse Analytics
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Sign in to your admin dashboard
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              placeholder="you@company.com"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="mb-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Signing in…" : "Sign in"}
          </button>

          <p className="mt-4 text-center text-xs text-slate-400 dark:text-slate-500">
            Demo project — any email and password will work.
          </p>
        </form>
      </div>
    </div>
  );
}
