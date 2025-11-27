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
        }
      };

      var savedThemeId = localStorage.getItem('themeId');
      var themeId = savedThemeId && themes[savedThemeId] ? savedThemeId : 'dusk-blue-dark';
      var theme = themes[themeId];

      if (!savedThemeId) {
        localStorage.setItem('themeId', themeId);
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
