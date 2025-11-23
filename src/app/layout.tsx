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
    <html lang={locale} dir={isRTL(locale) ? "rtl" : "ltr"}>
      <head>
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
