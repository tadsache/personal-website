"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { themes, defaultTheme, type Theme } from "@/lib/themes";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: defaultTheme,
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem("theme", t.id);
  };

  // Load persisted theme and apply CSS variables
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const found = themes.find((t) => t.id === saved);
    if (found) setThemeState(found);
  }, []);

  // Apply CSS variables to :root whenever theme changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--color-bg", theme.bg);
    root.style.setProperty("--color-primary", theme.primary);
    root.style.setProperty("--color-accent", theme.accent);
    root.style.setProperty("--color-accent-subtle", theme.accentSubtle);
    root.style.setProperty("--color-primary-muted", theme.primaryMuted);
    root.style.setProperty("--color-dot-grid", theme.dotGrid);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
