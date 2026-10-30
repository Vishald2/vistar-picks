
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { detectCountry } from "@/lib/detect-country";
import { getMarketplace } from "@/lib/marketplace";

type MarketplaceContextType = {
  marketplace: string;
  countryCode: string | null;
  isDetecting: boolean;
};

const MarketplaceContext =
  createContext<MarketplaceContextType | undefined>(undefined);

export function MarketplaceProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [marketplace, setMarketplace] = useState("Amazon.com");
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState(true);

  useEffect(() => {
    let active = true;

    async function initializeMarketplace() {
      try {
        const country = await detectCountry();

        if (!active) return;

        setCountryCode(country);
        setMarketplace(getMarketplace(country));
      } finally {
        if (active) {
          setIsDetecting(false);
        }
      }
    }

    initializeMarketplace();

    return () => {
      active = false;
    };
  }, []);

  return (
    <MarketplaceContext.Provider
      value={{ marketplace, countryCode, isDetecting }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);

  if (!context) {
    throw new Error(
      "useMarketplace must be used inside MarketplaceProvider."
    );
  }

  return context;
}
