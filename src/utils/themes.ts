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
  // ==========================================
  // OLIVE GARDEN - DARK
  // Olive Leaf #606c38, Black Forest #283618, Cornsilk #fefae0, Light Caramel #dda15e, Copper #bc6c25
  // ==========================================
  {
    id: "olive-garden-dark",
    name: "Olive Garden",
    mode: "dark",
    colors: {
      background: "#283618",
      backgroundGradientStart: "#1e2912",
      backgroundGradientMid: "#283618",
      backgroundGradientEnd: "#1e2912",
      textPrimary: "#fefae0",
      textSecondary: "#dda15e",
      textMuted: "#606c38",
      accentPrimary: "#dda15e",
      accentSecondary: "#bc6c25",
      accentDark: "#283618",
      surface: "#323f20",
      surfaceElevated: "#3d4a28",
      surfaceOverlay: "rgba(40, 54, 24, 0.95)",
      border: "#606c38",
      borderSubtle: "#4a5530",
      borderMuted: "#323f20",
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
    name: "Olive Garden",
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
  // Molten Lava #780000, Flag Red #c1121f, Papaya Whip #fdf0d5, Deep Space Blue #003049, Steel Blue #669bbc
  // ==========================================
  {
    id: "fiery-ocean-dark",
    name: "Fiery Ocean",
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
    name: "Fiery Ocean",
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
  // OCEAN BLUE SERENITY - DARK
  // Deep Twilight #03045e, French Blue #023e8a, Bright Teal Blue #0077b6, Blue Green #0096c7, Turquoise Surf #00b4d8, Sky Aqua #48cae4, Frosted Blue #90e0ef, Light Cyan #caf0f8
  // ==========================================
  {
    id: "ocean-serenity-dark",
    name: "Ocean Serenity",
    mode: "dark",
    colors: {
      background: "#03045e",
      backgroundGradientStart: "#020340",
      backgroundGradientMid: "#03045e",
      backgroundGradientEnd: "#020340",
      textPrimary: "#caf0f8",
      textSecondary: "#90e0ef",
      textMuted: "#48cae4",
      accentPrimary: "#00b4d8",
      accentSecondary: "#0077b6",
      accentDark: "#023e8a",
      surface: "#05086e",
      surfaceElevated: "#0a0d80",
      surfaceOverlay: "rgba(3, 4, 94, 0.95)",
      border: "#0077b6",
      borderSubtle: "#023e8a",
      borderMuted: "#05086e",
      shadow: "rgba(0, 0, 0, 0.3)",
      shadowStrong: "rgba(0, 0, 0, 0.5)",
      textOnAccent: "#03045e",
    },
  },
  // ==========================================
  // OCEAN BLUE SERENITY - LIGHT
  // ==========================================
  {
    id: "ocean-serenity-light",
    name: "Ocean Serenity",
    mode: "light",
    colors: {
      background: "#caf0f8",
      backgroundGradientStart: "#caf0f8",
      backgroundGradientMid: "#b8e8f2",
      backgroundGradientEnd: "#caf0f8",
      textPrimary: "#03045e",
      textSecondary: "#023e8a",
      textMuted: "#4080a0",
      accentPrimary: "#0077b6",
      accentSecondary: "#00b4d8",
      accentDark: "#03045e",
      surface: "#ffffff",
      surfaceElevated: "#e8f8fc",
      surfaceOverlay: "rgba(202, 240, 248, 0.95)",
      border: "#0077b6",
      borderSubtle: "#90e0ef",
      borderMuted: "#ade8f4",
      shadow: "rgba(3, 4, 94, 0.1)",
      shadowStrong: "rgba(3, 4, 94, 0.2)",
      textOnAccent: "#caf0f8",
    },
  },
  // ==========================================
  // VIBRANT FIESTA - DARK
  // Amber Gold #ffbe0b, Blaze Orange #fb5607, Neon Pink #ff006e, Blue Violet #8338ec, Azure Blue #3a86ff
  // ==========================================
  {
    id: "vibrant-fiesta-dark",
    name: "Vibrant Fiesta",
    mode: "dark",
    colors: {
      background: "#1a1033",
      backgroundGradientStart: "#120a25",
      backgroundGradientMid: "#1a1033",
      backgroundGradientEnd: "#120a25",
      textPrimary: "#ffffff",
      textSecondary: "#ffbe0b",
      textMuted: "#8338ec",
      accentPrimary: "#ff006e",
      accentSecondary: "#3a86ff",
      accentDark: "#8338ec",
      surface: "#251845",
      surfaceElevated: "#302055",
      surfaceOverlay: "rgba(26, 16, 51, 0.95)",
      border: "#8338ec",
      borderSubtle: "#5a2d99",
      borderMuted: "#251845",
      shadow: "rgba(0, 0, 0, 0.3)",
      shadowStrong: "rgba(0, 0, 0, 0.5)",
      textOnAccent: "#ffffff",
    },
  },
  // ==========================================
  // VIBRANT FIESTA - LIGHT
  // ==========================================
  {
    id: "vibrant-fiesta-light",
    name: "Vibrant Fiesta",
    mode: "light",
    colors: {
      background: "#fff8e8",
      backgroundGradientStart: "#fff8e8",
      backgroundGradientMid: "#fff0d8",
      backgroundGradientEnd: "#fff8e8",
      textPrimary: "#1a1033",
      textSecondary: "#8338ec",
      textMuted: "#806090",
      accentPrimary: "#ff006e",
      accentSecondary: "#3a86ff",
      accentDark: "#1a1033",
      surface: "#ffffff",
      surfaceElevated: "#fffcf5",
      surfaceOverlay: "rgba(255, 248, 232, 0.95)",
      border: "#8338ec",
      borderSubtle: "#d0c0e8",
      borderMuted: "#e8e0f0",
      shadow: "rgba(26, 16, 51, 0.1)",
      shadowStrong: "rgba(26, 16, 51, 0.2)",
      textOnAccent: "#ffffff",
    },
  },
  // ==========================================
  // GOLDEN SUMMER FIELDS - DARK
  // Dry Sage #ccd5ae, Beige #e9edc9, Cornsilk #fefae0, Papaya Whip #faedcd, Light Bronze #d4a373
  // ==========================================
  {
    id: "golden-summer-dark",
    name: "Golden Summer",
    mode: "dark",
    colors: {
      background: "#3d4030",
      backgroundGradientStart: "#2e3024",
      backgroundGradientMid: "#3d4030",
      backgroundGradientEnd: "#2e3024",
      textPrimary: "#fefae0",
      textSecondary: "#faedcd",
      textMuted: "#ccd5ae",
      accentPrimary: "#d4a373",
      accentSecondary: "#ccd5ae",
      accentDark: "#3d4030",
      surface: "#484b3a",
      surfaceElevated: "#555845",
      surfaceOverlay: "rgba(61, 64, 48, 0.95)",
      border: "#ccd5ae",
      borderSubtle: "#6a6d58",
      borderMuted: "#484b3a",
      shadow: "rgba(0, 0, 0, 0.3)",
      shadowStrong: "rgba(0, 0, 0, 0.5)",
      textOnAccent: "#3d4030",
    },
  },
  // ==========================================
  // GOLDEN SUMMER FIELDS - LIGHT
  // ==========================================
  {
    id: "golden-summer-light",
    name: "Golden Summer",
    mode: "light",
    colors: {
      background: "#fefae0",
      backgroundGradientStart: "#fefae0",
      backgroundGradientMid: "#f8f4d0",
      backgroundGradientEnd: "#fefae0",
      textPrimary: "#3d4030",
      textSecondary: "#5a5d48",
      textMuted: "#8a8d78",
      accentPrimary: "#d4a373",
      accentSecondary: "#606c38",
      accentDark: "#3d4030",
      surface: "#ffffff",
      surfaceElevated: "#fdfbf0",
      surfaceOverlay: "rgba(254, 250, 224, 0.95)",
      border: "#ccd5ae",
      borderSubtle: "#dde2c8",
      borderMuted: "#e8ecd5",
      shadow: "rgba(61, 64, 48, 0.1)",
      shadowStrong: "rgba(61, 64, 48, 0.2)",
      textOnAccent: "#fefae0",
    },
  },
  // ==========================================
  // REFRESHING SUMMER - DARK
  // Sky Blue #8ecae6, Blue Green #219ebc, Deep Space Blue #023047, Amber Flame #ffb703, Tiger Orange #fb8500
  // ==========================================
  {
    id: "refreshing-summer-dark",
    name: "Refreshing Summer",
    mode: "dark",
    colors: {
      background: "#023047",
      backgroundGradientStart: "#012030",
      backgroundGradientMid: "#023047",
      backgroundGradientEnd: "#012030",
      textPrimary: "#ffffff",
      textSecondary: "#8ecae6",
      textMuted: "#219ebc",
      accentPrimary: "#ffb703",
      accentSecondary: "#fb8500",
      accentDark: "#023047",
      surface: "#034060",
      surfaceElevated: "#045070",
      surfaceOverlay: "rgba(2, 48, 71, 0.95)",
      border: "#219ebc",
      borderSubtle: "#056080",
      borderMuted: "#034060",
      shadow: "rgba(0, 0, 0, 0.3)",
      shadowStrong: "rgba(0, 0, 0, 0.5)",
      textOnAccent: "#023047",
    },
  },
  // ==========================================
  // REFRESHING SUMMER - LIGHT
  // ==========================================
  {
    id: "refreshing-summer-light",
    name: "Refreshing Summer",
    mode: "light",
    colors: {
      background: "#e8f4f8",
      backgroundGradientStart: "#e8f4f8",
      backgroundGradientMid: "#d8ecf2",
      backgroundGradientEnd: "#e8f4f8",
      textPrimary: "#023047",
      textSecondary: "#219ebc",
      textMuted: "#5a8090",
      accentPrimary: "#fb8500",
      accentSecondary: "#ffb703",
      accentDark: "#023047",
      surface: "#ffffff",
      surfaceElevated: "#f0f8fc",
      surfaceOverlay: "rgba(232, 244, 248, 0.95)",
      border: "#219ebc",
      borderSubtle: "#b0d8e8",
      borderMuted: "#c8e4f0",
      shadow: "rgba(2, 48, 71, 0.1)",
      shadowStrong: "rgba(2, 48, 71, 0.2)",
      textOnAccent: "#ffffff",
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
