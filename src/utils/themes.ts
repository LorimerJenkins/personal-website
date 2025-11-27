export interface Theme {
  id: string;
  name: string;
  mode: "light" | "dark";
  defaultTheme?: boolean;
  colors: {
    background: string;
    backgroundGradientStart: string;
    backgroundGradientMid: string;
    backgroundGradientEnd: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    accentPrimary: string;
    accentSecondary: string;
    accentDark: string;
    surface: string;
    surfaceElevated: string;
    surfaceOverlay: string;
    border: string;
    borderSubtle: string;
    borderMuted: string;
    shadow: string;
    shadowStrong: string;
    textOnAccent: string;
  };
}

export const themes: Theme[] = [
  // ==========================================
  // DUSK BLUE - DARK (DEFAULT)
  // ==========================================
  {
    id: "dusk-blue-dark",
    name: "Dusk Blue",
    mode: "dark",
    defaultTheme: true,
    colors: {
      background: "#274c77",
      backgroundGradientStart: "#1a3a5c",
      backgroundGradientMid: "#274c77",
      backgroundGradientEnd: "#1a3a5c",
      textPrimary: "#e7ecef",
      textSecondary: "#a3cef1",
      textMuted: "#6096ba",
      accentPrimary: "#a3cef1",
      accentSecondary: "#6096ba",
      accentDark: "#274c77",
      surface: "#1e4266",
      surfaceElevated: "#2a5580",
      surfaceOverlay: "rgba(39, 76, 119, 0.95)",
      border: "#6096ba",
      borderSubtle: "#3d6a99",
      borderMuted: "#1e4266",
      shadow: "rgba(0, 0, 0, 0.3)",
      shadowStrong: "rgba(0, 0, 0, 0.5)",
      textOnAccent: "#e7ecef",
    },
  },
  // ==========================================
  // DUSK BLUE - LIGHT
  // ==========================================
  {
    id: "dusk-blue-light",
    name: "Dusk Blue",
    mode: "light",
    colors: {
      background: "#e7ecef",
      backgroundGradientStart: "#e7ecef",
      backgroundGradientMid: "#d8e2e8",
      backgroundGradientEnd: "#e7ecef",
      textPrimary: "#274c77",
      textSecondary: "#3d6a99",
      textMuted: "#8b8c89",
      accentPrimary: "#6096ba",
      accentSecondary: "#274c77",
      accentDark: "#274c77",
      surface: "#ffffff",
      surfaceElevated: "#f5f7f9",
      surfaceOverlay: "rgba(231, 236, 239, 0.95)",
      border: "#6096ba",
      borderSubtle: "#c5d5e0",
      borderMuted: "#b0c4d0",
      shadow: "rgba(39, 76, 119, 0.1)",
      shadowStrong: "rgba(39, 76, 119, 0.2)",
      textOnAccent: "#e7ecef",
    },
  },
  // ==========================================
  // SUNNY BEACH - DARK
  // ==========================================
  {
    id: "sunny-beach-dark",
    name: "Sunny Beach",
    mode: "dark",
    colors: {
      background: "#264653",
      backgroundGradientStart: "#1a3340",
      backgroundGradientMid: "#264653",
      backgroundGradientEnd: "#1a3340",
      textPrimary: "#e9c46a",
      textSecondary: "#f4a261",
      textMuted: "#2a9d8f",
      accentPrimary: "#e9c46a",
      accentSecondary: "#2a9d8f",
      accentDark: "#264653",
      surface: "#1e3a47",
      surfaceElevated: "#2d525f",
      surfaceOverlay: "rgba(38, 70, 83, 0.95)",
      border: "#2a9d8f",
      borderSubtle: "#3d7a73",
      borderMuted: "#1e3a47",
      shadow: "rgba(0, 0, 0, 0.3)",
      shadowStrong: "rgba(0, 0, 0, 0.5)",
      textOnAccent: "#264653",
    },
  },
  // ==========================================
  // SUNNY BEACH - LIGHT
  // ==========================================
  {
    id: "sunny-beach-light",
    name: "Sunny Beach",
    mode: "light",
    colors: {
      background: "#faf6f0",
      backgroundGradientStart: "#faf6f0",
      backgroundGradientMid: "#f5efe5",
      backgroundGradientEnd: "#faf6f0",
      textPrimary: "#264653",
      textSecondary: "#2a9d8f",
      textMuted: "#8b8c89",
      accentPrimary: "#2a9d8f",
      accentSecondary: "#e76f51",
      accentDark: "#264653",
      surface: "#ffffff",
      surfaceElevated: "#fdf9f3",
      surfaceOverlay: "rgba(250, 246, 240, 0.95)",
      border: "#2a9d8f",
      borderSubtle: "#d4e5e2",
      borderMuted: "#c5d5d2",
      shadow: "rgba(38, 70, 83, 0.1)",
      shadowStrong: "rgba(38, 70, 83, 0.2)",
      textOnAccent: "#faf6f0",
    },
  },
  // ==========================================
  // SOFT PINK - DARK
  // ==========================================
  {
    id: "soft-pink-dark",
    name: "Soft Pink",
    mode: "dark",
    colors: {
      background: "#4a2c3d",
      backgroundGradientStart: "#3d2433",
      backgroundGradientMid: "#4a2c3d",
      backgroundGradientEnd: "#3d2433",
      textPrimary: "#ffe5ec",
      textSecondary: "#ffc2d1",
      textMuted: "#ff8fab",
      accentPrimary: "#ffb3c6",
      accentSecondary: "#fb6f92",
      accentDark: "#4a2c3d",
      surface: "#5a3a4d",
      surfaceElevated: "#6a4a5d",
      surfaceOverlay: "rgba(74, 44, 61, 0.95)",
      border: "#ff8fab",
      borderSubtle: "#7a5a6d",
      borderMuted: "#5a3a4d",
      shadow: "rgba(0, 0, 0, 0.3)",
      shadowStrong: "rgba(0, 0, 0, 0.5)",
      textOnAccent: "#4a2c3d",
    },
  },
  // ==========================================
  // SOFT PINK - LIGHT
  // ==========================================
  {
    id: "soft-pink-light",
    name: "Soft Pink",
    mode: "light",
    colors: {
      background: "#ffe5ec",
      backgroundGradientStart: "#ffe5ec",
      backgroundGradientMid: "#ffd6e0",
      backgroundGradientEnd: "#ffe5ec",
      textPrimary: "#4a2c3d",
      textSecondary: "#7a4a5d",
      textMuted: "#a07080",
      accentPrimary: "#fb6f92",
      accentSecondary: "#ff8fab",
      accentDark: "#4a2c3d",
      surface: "#ffffff",
      surfaceElevated: "#fff0f3",
      surfaceOverlay: "rgba(255, 229, 236, 0.95)",
      border: "#ffb3c6",
      borderSubtle: "#ffd6e0",
      borderMuted: "#ffe0e8",
      shadow: "rgba(74, 44, 61, 0.1)",
      shadowStrong: "rgba(74, 44, 61, 0.2)",
      textOnAccent: "#ffe5ec",
    },
  },
  // ==========================================
  // MIDNIGHT SKY - DARK
  // ==========================================
  {
    id: "midnight-sky-dark",
    name: "Midnight Sky",
    mode: "dark",
    colors: {
      background: "#27187e",
      backgroundGradientStart: "#1a1054",
      backgroundGradientMid: "#27187e",
      backgroundGradientEnd: "#1a1054",
      textPrimary: "#f1f2f6",
      textSecondary: "#aeb8fe",
      textMuted: "#758bfd",
      accentPrimary: "#ff8600",
      accentSecondary: "#758bfd",
      accentDark: "#27187e",
      surface: "#1e1466",
      surfaceElevated: "#352a8a",
      surfaceOverlay: "rgba(39, 24, 126, 0.95)",
      border: "#758bfd",
      borderSubtle: "#4a3fa0",
      borderMuted: "#1e1466",
      shadow: "rgba(0, 0, 0, 0.3)",
      shadowStrong: "rgba(0, 0, 0, 0.5)",
      textOnAccent: "#27187e",
    },
  },
  // ==========================================
  // MIDNIGHT SKY - LIGHT
  // ==========================================
  {
    id: "midnight-sky-light",
    name: "Midnight Sky",
    mode: "light",
    colors: {
      background: "#f1f2f6",
      backgroundGradientStart: "#f1f2f6",
      backgroundGradientMid: "#e5e7f0",
      backgroundGradientEnd: "#f1f2f6",
      textPrimary: "#27187e",
      textSecondary: "#4a3fa0",
      textMuted: "#8b8c99",
      accentPrimary: "#758bfd",
      accentSecondary: "#ff8600",
      accentDark: "#27187e",
      surface: "#ffffff",
      surfaceElevated: "#f8f8fc",
      surfaceOverlay: "rgba(241, 242, 246, 0.95)",
      border: "#758bfd",
      borderSubtle: "#d0d4f0",
      borderMuted: "#e0e2f0",
      shadow: "rgba(39, 24, 126, 0.1)",
      shadowStrong: "rgba(39, 24, 126, 0.2)",
      textOnAccent: "#f1f2f6",
    },
  },
];

// Helper functions
export const getDefaultTheme = (): Theme => {
  return themes.find((t) => t.defaultTheme) || themes[0];
};

export const getThemeById = (id: string): Theme | undefined => {
  return themes.find((t) => t.id === id);
};

export const getDarkThemes = (): Theme[] => {
  return themes.filter((t) => t.mode === "dark");
};

export const getLightThemes = (): Theme[] => {
  return themes.filter((t) => t.mode === "light");
};

export const applyTheme = (theme: Theme): void => {
  const root = document.documentElement;

  root.style.setProperty("--background", theme.colors.background);
  root.style.setProperty(
    "--background-gradient-start",
    theme.colors.backgroundGradientStart,
  );
  root.style.setProperty(
    "--background-gradient-mid",
    theme.colors.backgroundGradientMid,
  );
  root.style.setProperty(
    "--background-gradient-end",
    theme.colors.backgroundGradientEnd,
  );
  root.style.setProperty("--text-primary", theme.colors.textPrimary);
  root.style.setProperty("--text-secondary", theme.colors.textSecondary);
  root.style.setProperty("--text-muted", theme.colors.textMuted);
  root.style.setProperty("--accent-primary", theme.colors.accentPrimary);
  root.style.setProperty("--accent-secondary", theme.colors.accentSecondary);
  root.style.setProperty("--accent-dark", theme.colors.accentDark);
  root.style.setProperty("--surface", theme.colors.surface);
  root.style.setProperty("--surface-elevated", theme.colors.surfaceElevated);
  root.style.setProperty("--surface-overlay", theme.colors.surfaceOverlay);
  root.style.setProperty("--border", theme.colors.border);
  root.style.setProperty("--border-subtle", theme.colors.borderSubtle);
  root.style.setProperty("--border-muted", theme.colors.borderMuted);
  root.style.setProperty("--shadow", theme.colors.shadow);
  root.style.setProperty("--shadow-strong", theme.colors.shadowStrong);
  root.style.setProperty("--text-on-accent", theme.colors.textOnAccent);

  root.setAttribute("data-theme", theme.mode);
  root.setAttribute("data-theme-id", theme.id);
};

export const saveThemePreference = (themeId: string): void => {
  localStorage.setItem("themeId", themeId);
};

export const loadThemePreference = (): string | null => {
  return localStorage.getItem("themeId");
};
