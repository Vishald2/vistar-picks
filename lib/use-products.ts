
"use client";

import { products, getAllowedCategories } from "@/lib/products";
import { useMarketplace } from "@/context/MarketplaceContext";

export function useProducts() {
  const { marketplace, countryCode } = useMarketplace();

  const allowedCategories = getAllowedCategories(countryCode ?? "");

  return products.filter(
    product =>
      product.marketplace === marketplace &&
      allowedCategories.includes(product.category)
  );
}
