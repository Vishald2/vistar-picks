
import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CuratedRibbon from "@/components/CuratedRibbon";
import { MarketplaceProvider } from "@/context/MarketplaceContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://selectivekart.com"),

  title: {
    default: "Selective Kart | Smart Product Choices",
    template: "%s | Selective Kart",
  },

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
        <MarketplaceProvider>
          <CuratedRibbon />
          <GoogleAnalytics />
          {children}
        </MarketplaceProvider>
      </body>
    </html>
  );
}
