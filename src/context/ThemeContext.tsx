import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type ThemeMode = "light" | "dark";
export type AccentId = "violet" | "cyan" | "rose" | "emerald" | "amber" | "blue";

export const ACCENTS: Record<
  AccentId,
  { label: string; primary: string; secondary: string }
> = {
  violet: { label: "Violet", primary: "#6c63ff", secondary: "#a855f7" },
  cyan: { label: "Cyan", primary: "#00d4ff", secondary: "#0891b2" },
  rose: { label: "Rose", primary: "#f43f5e", secondary: "#fb7185" },
  emerald: { label: "Emerald", primary: "#10b981", secondary: "#34d399" },
  amber: { label: "Amber", primary: "#f59e0b", secondary: "#fbbf24" },
  blue: { label: "Blue", primary: "#3b82f6", secondary: "#60a5fa" },
};

interface ThemeContextValue {
  mode: ThemeMode;
  accent: AccentId;
  setMode: (mode: ThemeMode) => void;
  setAccent: (accent: AccentId) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "portfolio-theme";

function loadStoredTheme(): { mode: ThemeMode; accent: AccentId } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        mode: parsed.mode === "light" ? "light" : "dark",
        accent: ACCENTS[parsed.accent as AccentId] ? parsed.accent : "violet",
      };
    }
  } catch {
    /* ignore */
  }
  return { mode: "dark", accent: "violet" };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const stored = loadStoredTheme();
  const [mode, setMode] = useState<ThemeMode>(stored.mode);
  const [accent, setAccent] = useState<AccentId>(stored.accent);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", mode);
    root.setAttribute("data-accent", accent);

    const colors = ACCENTS[accent];
    root.style.setProperty("--accent", colors.primary);
    root.style.setProperty("--accent2", colors.secondary);
    root.style.setProperty(
      "--accent-glow",
      `${colors.primary}4d`
    );
    root.style.setProperty(
      "--accent-soft",
      `${colors.primary}14`
    );
    root.style.setProperty(
      "--accent-border",
      `${colors.primary}40`
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify({ mode, accent }));
  }, [mode, accent]);

  return (
    <ThemeContext.Provider value={{ mode, accent, setMode, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
