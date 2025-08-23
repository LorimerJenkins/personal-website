import { DM_Sans } from "next/font/google";
import "./globals.css";
import { metadata as data } from "@/utils/SEO/SEO";
import { QueryProvider } from "@/lib/queryClient";
import Script from "next/script";

export const metadata = data;

const dmSans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
