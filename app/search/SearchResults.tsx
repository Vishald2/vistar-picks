
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { categories } from "@/lib/products";
import { useProducts } from "@/lib/use-products";
import { useMarketplace } from "@/context/MarketplaceContext";

export default function SearchResults() {
  const { isDetecting } = useMarketplace();
  const products = useProducts();

  const searchParams = useSearchParams();
  const query = (searchParams.get("q") ?? "").trim().toLowerCase();

  const selectedCategory =
    searchParams.get("category") ?? "All Categories";

  const validCategory =
    selectedCategory === "All Categories" ||
    categories.includes(selectedCategory);

  const results = products.filter((product) => {
    const matchesQuery =
      !query ||
      `${product.name} ${product.category} ${product.description ?? ""}`
        .toLowerCase()
        .includes(query);

    const matchesCategory =
      selectedCategory === "All Categories" ||
      product.category === selectedCategory;

    return matchesQuery && matchesCategory;
  });

  if (isDetecting) {
    return <p>Loading products...</p>;
  }

  return (
    <div className="search-results-container">
      <h1>Search Products</h1>

      <p className="search-results-summary">
        {query ? (
          <>Results for <strong>&quot;{searchParams.get("q")}&quot;</strong></>
        ) : (
          "Browse our products"
        )}

        {validCategory &&
          selectedCategory !== "All Categories" &&
          ` in ${selectedCategory}`}
      </p>

      {!validCategory ? (
        <p className="search-empty">
          Invalid category. Please choose a valid category.
        </p>
      ) : results.length === 0 ? (
        <div className="search-empty">
          <h2>No products found</h2>
          <p>Try another search term or select a different category.</p>
          <Link href="/" className="search-reset-link">
            Browse all products
          </Link>
        </div>
      ) : (
        <>
          <p className="search-result-count">
            {results.length} product{results.length === 1 ? "" : "s"} found
          </p>

          <div className="product-grid">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
