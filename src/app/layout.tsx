import { DM_Sans } from "next/font/google";
import "./globals.css";
import { metadata as data } from "@/utils/SEO/SEO";
import { QueryProvider } from "@/lib/queryClient";

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
      <body className={dmSans.className} style={{ margin: 0, padding: 0 }}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
