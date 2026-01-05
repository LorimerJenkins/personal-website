"use client";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/queryClient";
import Script from "next/script";
import { useEffect, useState } from "react";
import {
  getLocaleFromStorage,
  isRTL,
  SupportedLocale,
} from "@/utils/translations";

const dmSans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

// Theme initialization script - runs before React hydrates to prevent flash
const themeScript = `
  (function() {
    try {
      var DEFAULT_THEME_ID = 'midnight-sky-dark';
      
      var themes = {
        "dusk-blue-dark": {
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
          mode: "dark"
        },
        "dusk-blue-light": {
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
          mode: "light"
        },
        "sunny-beach-dark": {
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
          mode: "dark"
        },
        "sunny-beach-light": {
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
          mode: "light"
        },
        "soft-pink-dark": {
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
          mode: "dark"
        },
        "soft-pink-light": {
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
          mode: "light"
        },
        "midnight-sky-dark": {
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
          mode: "dark"
        },
        "midnight-sky-light": {
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
          mode: "light"
        },
        "olive-garden-dark": {
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
          mode: "dark"
        },
        "olive-garden-light": {
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
          mode: "light"
        },
        "fiery-ocean-dark": {
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
          mode: "dark"
        },
        "fiery-ocean-light": {
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
          mode: "light"
        },
        "ocean-serenity-dark": {
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
          mode: "dark"
        },
        "ocean-serenity-light": {
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
          mode: "light"
        },
        "vibrant-fiesta-dark": {
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
          mode: "dark"
        },
        "vibrant-fiesta-light": {
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
          mode: "light"
        },
        "golden-summer-dark": {
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
          mode: "dark"
        },
        "golden-summer-light": {
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
          mode: "light"
        },
        "refreshing-summer-dark": {
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
          mode: "dark"
        },
        "refreshing-summer-light": {
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
          mode: "light"
        }
      };

      var themeKeys = Object.keys(themes);
      var savedThemeId = localStorage.getItem('themePreference');
      var themeId;
      var theme;

      if (savedThemeId === 'random') {
        // User explicitly chose random mode - pick a random theme
        var randomIndex = Math.floor(Math.random() * themeKeys.length);
        themeId = themeKeys[randomIndex];
        theme = themes[themeId];
        // Store the actual theme ID applied this session for React to pick up
        sessionStorage.setItem('currentRandomThemeId', themeId);
      } else if (savedThemeId && themes[savedThemeId]) {
        // User has a specific saved theme
        themeId = savedThemeId;
        theme = themes[themeId];
      } else {
        // No saved preference or invalid theme - use default theme
        themeId = DEFAULT_THEME_ID;
        theme = themes[themeId];
      }

      var root = document.documentElement;
      root.style.setProperty('--background', theme.background);
      root.style.setProperty('--background-gradient-start', theme.backgroundGradientStart);
      root.style.setProperty('--background-gradient-mid', theme.backgroundGradientMid);
      root.style.setProperty('--background-gradient-end', theme.backgroundGradientEnd);
      root.style.setProperty('--text-primary', theme.textPrimary);
      root.style.setProperty('--text-secondary', theme.textSecondary);
      root.style.setProperty('--text-muted', theme.textMuted);
      root.style.setProperty('--accent-primary', theme.accentPrimary);
      root.style.setProperty('--accent-secondary', theme.accentSecondary);
      root.style.setProperty('--accent-dark', theme.accentDark);
      root.style.setProperty('--surface', theme.surface);
      root.style.setProperty('--surface-elevated', theme.surfaceElevated);
      root.style.setProperty('--surface-overlay', theme.surfaceOverlay);
      root.style.setProperty('--border', theme.border);
      root.style.setProperty('--border-subtle', theme.borderSubtle);
      root.style.setProperty('--border-muted', theme.borderMuted);
      root.style.setProperty('--shadow', theme.shadow);
      root.style.setProperty('--shadow-strong', theme.shadowStrong);
      root.style.setProperty('--text-on-accent', theme.textOnAccent);
      root.setAttribute('data-theme', theme.mode);
      root.setAttribute('data-theme-id', themeId);
    } catch (e) {
      console.error('Theme initialization failed:', e);
    }
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale, setLocale] = useState<SupportedLocale>("en");

  useEffect(() => {
    const currentLocale = getLocaleFromStorage();
    setLocale(currentLocale);

    const handleLocaleChange = (
      event: CustomEvent<{ locale: SupportedLocale }>,
    ) => {
      setLocale(event.detail.locale);
    };

    window.addEventListener(
      "localeChange",
      handleLocaleChange as EventListener,
    );
    return () =>
      window.removeEventListener(
        "localeChange",
        handleLocaleChange as EventListener,
      );
  }, []);

  return (
    <html
      lang={locale}
      dir={isRTL(locale) ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
          suppressHydrationWarning
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZSCZDNP5XG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZSCZDNP5XG');
          `}
        </Script>
      </head>
      <body className={dmSans.className} style={{ margin: 0, padding: 0 }}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
