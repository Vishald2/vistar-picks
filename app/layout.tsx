
import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CuratedRibbon from "@/components/CuratedRibbon";

export const metadata: Metadata = {
  title: "Selective Kart | Smart Product Choices",
  description:
    "Discover useful products, compare features, and make informed buying decisions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
         <CuratedRibbon />
         <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
