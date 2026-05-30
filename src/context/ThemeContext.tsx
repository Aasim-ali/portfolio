import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type ThemeMode = "light" | "dark";
export type AccentId = "violet" | "cyan" | "rose" | "emerald" | "amber" | "blue" | "indigo" | "slate";

export const ACCENTS: Record<
  AccentId,
  { label: string; primary: string; secondary: string }
> = {
  // Deep, modern tech look (Better than old violet)
  violet: { label: "Violet", primary: "#7c3aed", secondary: "#c084fc" },
  
  // Cyberpunk, vibrant contrast (Better than old cyan)
  cyan: { label: "Cyan", primary: "#06b6d4", secondary: "#22d3ee" },
  
  // Premium coral/rose feel (Less aggressive pink)
  rose: { label: "Rose", primary: "#e11d48", secondary: "#fda4af" },
  
  // Fresh, clean organic mint (Better than dull green)
  emerald: { label: "Emerald", primary: "#059669", secondary: "#34d399" },
  
  // Warm honey/gold (Safe for text contrast)
  amber: { label: "Amber", primary: "#d97706", secondary: "#fcd34d" },
  
  // Sleek, trustworthy brand blue (Tailwind-inspired)
  blue: { label: "Blue", primary: "#2563eb", secondary: "#60a5fa" },

  // NEW: Sleek corporate tech vibe
  indigo: { label: "Indigo", primary: "#4f46e5", secondary: "#818cf8" },

  // NEW: Minimalist dark/light mode accent
  slate: { label: "Slate", primary: "#475569", secondary: "#94a3b8" },
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
