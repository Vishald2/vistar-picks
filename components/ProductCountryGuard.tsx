
"use client";

import { ReactNode } from "react";
import { useProducts } from "@/lib/use-products";
import { useMarketplace } from "@/context/MarketplaceContext";

interface Props {
  slug: string;
  children: ReactNode;
}

export default function ProductCountryGuard({
  slug,
  children,
}: Props) {
  const { isDetecting } = useMarketplace();
  const products = useProducts();

  if (isDetecting) {
    return <p>Checking product availability...</p>;
  }

  const isAvailable = products.some(
    (product) => product.slug === slug
  );

  if (!isAvailable) {
    return (
      <main className="page-container">
        <div className="search-empty">
          <h1>Product Not Available</h1>
          <p>
            This product is not available in your region.
          </p>
          <a href="/" className="search-reset-link">
            Browse available products
          </a>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
