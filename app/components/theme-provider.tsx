"use client";

import * as React from "react";

/**
 * Shared localStorage key for the shell theme mode.
 * Theme persistence is independent from any product-specific workspace state.
 */
const THEME_STORAGE_KEY = "ui-theme";

type ThemeMode = "dark" | "light" | "system";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => undefined,
};

const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState);

function applyTheme(theme: ThemeMode): void {
  const root = window.document.documentElement;

  root.classList.remove("light", "dark");

  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    root.classList.add(systemTheme);
    return;
  }

  root.classList.add(theme);
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = THEME_STORAGE_KEY,
}: ThemeProviderProps): React.ReactElement {
  const [theme, setThemeState] = React.useState<ThemeMode>(() => {
    if (typeof window === "undefined") {
      return defaultTheme;
    }

    const storedTheme = window.localStorage.getItem(storageKey);
    return storedTheme === "light" || storedTheme === "dark" || storedTheme === "system"
      ? storedTheme
      : defaultTheme;
  });

  React.useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = React.useCallback(
    (nextTheme: ThemeMode): void => {
      window.localStorage.setItem(storageKey, nextTheme);
      setThemeState(nextTheme);
    },
    [storageKey],
  );

  const value = React.useMemo<ThemeProviderState>(
    () => ({
      theme,
      setTheme,
    }),
    [theme, setTheme],
  );

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
}

export function useTheme(): ThemeProviderState {
  const context = React.useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
