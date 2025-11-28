export interface Theme {
  id: string;
  nameKey: string;
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

// Special ID for random theme mode
export const RANDOM_THEME_ID = "random";

export const themes: Theme[] = [
  // ==========================================
  // DUSK BLUE - DARK (was default, now random is default)
  // ==========================================
  {
    id: "dusk-blue-dark",
    nameKey: "themeDuskBlue",
    mode: "dark",
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
    nameKey: "themeDuskBlue",
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
    nameKey: "themeSunnyBeach",
    mode: "dark",
    colors: {
      background: "#264653",
      backgroundGradientStart: "#1a3340",
      backgroundGradientMid: "#264653",
      backgroundGradientEnd: "#1a3340",
      textPrimary: "#e9c46a",
      textSecondary: "#f4a261",
      textMuted: "#2a9d8f",
      accentPrimary: "#e76f51",
      accentSecondary: "#f4a261",
      accentDark: "#264653",
      surface: "#1e3a47",
      surfaceElevated: "#2f5460",
      surfaceOverlay: "rgba(38, 70, 83, 0.95)",
      border: "#2a9d8f",
      borderSubtle: "#3d6a70",
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
    nameKey: "themeSunnyBeach",
    mode: "light",
    colors: {
      background: "#e9c46a",
      backgroundGradientStart: "#e9c46a",
      backgroundGradientMid: "#f4d58d",
      backgroundGradientEnd: "#e9c46a",
      textPrimary: "#264653",
      textSecondary: "#2a9d8f",
      textMuted: "#6b5c3e",
      accentPrimary: "#e76f51",
      accentSecondary: "#264653",
      accentDark: "#264653",
      surface: "#fdf6e3",
      surfaceElevated: "#fff8e7",
      surfaceOverlay: "rgba(233, 196, 106, 0.95)",
      border: "#2a9d8f",
      borderSubtle: "#c9b896",
      borderMuted: "#d9c9a6",
      shadow: "rgba(38, 70, 83, 0.1)",
      shadowStrong: "rgba(38, 70, 83, 0.2)",
      textOnAccent: "#264653",
    },
  },
  // ==========================================
  // ROSE BLUSH - DARK
  // ==========================================
  {
    id: "rose-blush-dark",
    nameKey: "themeRoseBlush",
    mode: "dark",
    colors: {
      background: "#4a2c3d",
      backgroundGradientStart: "#3a2230",
      backgroundGradientMid: "#4a2c3d",
      backgroundGradientEnd: "#3a2230",
      textPrimary: "#ffe5ec",
      textSecondary: "#ffb3c6",
      textMuted: "#fb6f92",
      accentPrimary: "#ff8fab",
      accentSecondary: "#ffb3c6",
      accentDark: "#4a2c3d",
      surface: "#3e2535",
      surfaceElevated: "#5a3548",
      surfaceOverlay: "rgba(74, 44, 61, 0.95)",
      border: "#fb6f92",
      borderSubtle: "#6b4055",
      borderMuted: "#3e2535",
      shadow: "rgba(0, 0, 0, 0.3)",
      shadowStrong: "rgba(0, 0, 0, 0.5)",
      textOnAccent: "#4a2c3d",
    },
  },
  // ==========================================
  // ROSE BLUSH - LIGHT
  // ==========================================
  {
    id: "rose-blush-light",
    nameKey: "themeRoseBlush",
    mode: "light",
    colors: {
      background: "#ffe5ec",
      backgroundGradientStart: "#ffe5ec",
      backgroundGradientMid: "#ffd6e0",
      backgroundGradientEnd: "#ffe5ec",
      textPrimary: "#4a2c3d",
      textSecondary: "#6b4055",
      textMuted: "#8b6b7b",
      accentPrimary: "#ff8fab",
      accentSecondary: "#fb6f92",
      accentDark: "#4a2c3d",
      surface: "#ffffff",
      surfaceElevated: "#fff0f3",
      surfaceOverlay: "rgba(255, 229, 236, 0.95)",
      border: "#ffb3c6",
      borderSubtle: "#ffc8d6",
      borderMuted: "#ffd6e0",
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
    nameKey: "themeMidnightSky",
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
    nameKey: "themeMidnightSky",
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
  // ==========================================
  // OLIVE GARDEN - DARK
  // ==========================================
  {
    id: "olive-garden-dark",
    nameKey: "themeOliveGarden",
    mode: "dark",
    colors: {
      background: "#283618",
      backgroundGradientStart: "#1e2912",
      backgroundGradientMid: "#283618",
      backgroundGradientEnd: "#1e2912",
      textPrimary: "#fefae0",
      textSecondary: "#dda15e",
      textMuted: "#606c38",
      accentPrimary: "#bc6c25",
      accentSecondary: "#dda15e",
      accentDark: "#283618",
      surface: "#1e2912",
      surfaceElevated: "#3a4a28",
      surfaceOverlay: "rgba(40, 54, 24, 0.95)",
      border: "#606c38",
      borderSubtle: "#4a5530",
      borderMuted: "#1e2912",
      shadow: "rgba(0, 0, 0, 0.3)",
      shadowStrong: "rgba(0, 0, 0, 0.5)",
      textOnAccent: "#283618",
    },
  },
  // ==========================================
  // OLIVE GARDEN - LIGHT
  // ==========================================
  {
    id: "olive-garden-light",
    nameKey: "themeOliveGarden",
    mode: "light",
    colors: {
      background: "#fefae0",
      backgroundGradientStart: "#fefae0",
      backgroundGradientMid: "#f5f0d0",
      backgroundGradientEnd: "#fefae0",
      textPrimary: "#283618",
      textSecondary: "#606c38",
      textMuted: "#8b8c70",
      accentPrimary: "#606c38",
      accentSecondary: "#bc6c25",
      accentDark: "#283618",
      surface: "#ffffff",
      surfaceElevated: "#fdfbf0",
      surfaceOverlay: "rgba(254, 250, 224, 0.95)",
      border: "#606c38",
      borderSubtle: "#c5c8a8",
      borderMuted: "#dde0c8",
      shadow: "rgba(40, 54, 24, 0.1)",
      shadowStrong: "rgba(40, 54, 24, 0.2)",
      textOnAccent: "#fefae0",
    },
  },
  // ==========================================
  // FIERY OCEAN - DARK
  // ==========================================
  {
    id: "fiery-ocean-dark",
    nameKey: "themeFieryOcean",
    mode: "dark",
    colors: {
      background: "#003049",
      backgroundGradientStart: "#00243a",
      backgroundGradientMid: "#003049",
      backgroundGradientEnd: "#00243a",
      textPrimary: "#fdf0d5",
      textSecondary: "#669bbc",
      textMuted: "#4a7a99",
      accentPrimary: "#c1121f",
      accentSecondary: "#669bbc",
      accentDark: "#780000",
      surface: "#004060",
      surfaceElevated: "#005070",
      surfaceOverlay: "rgba(0, 48, 73, 0.95)",
      border: "#669bbc",
      borderSubtle: "#406080",
      borderMuted: "#004060",
      shadow: "rgba(0, 0, 0, 0.3)",
      shadowStrong: "rgba(0, 0, 0, 0.5)",
      textOnAccent: "#fdf0d5",
    },
  },
  // ==========================================
  // FIERY OCEAN - LIGHT
  // ==========================================
  {
    id: "fiery-ocean-light",
    nameKey: "themeFieryOcean",
    mode: "light",
    colors: {
      background: "#fdf0d5",
      backgroundGradientStart: "#fdf0d5",
      backgroundGradientMid: "#f8e8c8",
      backgroundGradientEnd: "#fdf0d5",
      textPrimary: "#003049",
      textSecondary: "#780000",
      textMuted: "#666055",
      accentPrimary: "#c1121f",
      accentSecondary: "#669bbc",
      accentDark: "#003049",
      surface: "#ffffff",
      surfaceElevated: "#fef8ee",
      surfaceOverlay: "rgba(253, 240, 213, 0.95)",
      border: "#669bbc",
      borderSubtle: "#d0d8e0",
      borderMuted: "#e0e4e8",
      shadow: "rgba(0, 48, 73, 0.1)",
      shadowStrong: "rgba(0, 48, 73, 0.2)",
      textOnAccent: "#fdf0d5",
    },
  },
  // ==========================================
  // OCEAN SERENITY - DARK
  // ==========================================
  {
    id: "ocean-serenity-dark",
    nameKey: "themeOceanSerenity",
    mode: "dark",
    colors: {
      background: "#0d1b2a",
      backgroundGradientStart: "#0a141f",
      backgroundGradientMid: "#0d1b2a",
      backgroundGradientEnd: "#0a141f",
      textPrimary: "#e0e1dd",
      textSecondary: "#778da9",
      textMuted: "#415a77",
      accentPrimary: "#778da9",
      accentSecondary: "#1b263b",
      accentDark: "#0d1b2a",
      surface: "#1b263b",
      surfaceElevated: "#283a52",
      surfaceOverlay: "rgba(13, 27, 42, 0.95)",
      border: "#415a77",
      borderSubtle: "#2d3f54",
      borderMuted: "#1b263b",
      shadow: "rgba(0, 0, 0, 0.3)",
      shadowStrong: "rgba(0, 0, 0, 0.5)",
      textOnAccent: "#0d1b2a",
    },
  },
  // ==========================================
  // OCEAN SERENITY - LIGHT
  // ==========================================
  {
    id: "ocean-serenity-light",
    nameKey: "themeOceanSerenity",
    mode: "light",
    colors: {
      background: "#e0e1dd",
      backgroundGradientStart: "#e0e1dd",
      backgroundGradientMid: "#d4d5d0",
      backgroundGradientEnd: "#e0e1dd",
      textPrimary: "#0d1b2a",
      textSecondary: "#1b263b",
      textMuted: "#6b7280",
      accentPrimary: "#415a77",
      accentSecondary: "#778da9",
      accentDark: "#0d1b2a",
      surface: "#ffffff",
      surfaceElevated: "#f5f5f4",
      surfaceOverlay: "rgba(224, 225, 221, 0.95)",
      border: "#778da9",
      borderSubtle: "#c0c4c8",
      borderMuted: "#d8dadc",
      shadow: "rgba(13, 27, 42, 0.1)",
      shadowStrong: "rgba(13, 27, 42, 0.2)",
      textOnAccent: "#e0e1dd",
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

// Get a random theme from all available themes
export const getRandomTheme = (): Theme => {
  const randomIndex = Math.floor(Math.random() * themes.length);
  return themes[randomIndex];
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
