
import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  title: "Vistar Picks | Smart Product Choices",
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
         <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
