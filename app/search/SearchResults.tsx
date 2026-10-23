
"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { products, categories } from "@/lib/products";

export default function SearchResults() {
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
      `${product.name} ${product.category} ${product.description}`
        .toLowerCase()
        .includes(query);

    const matchesCategory =
      selectedCategory === "All Categories" ||
      product.category === selectedCategory;

    return matchesQuery && matchesCategory;
  });

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

          <div className="search-results-grid">
            {results.map((product) => (
              <Link
                href={`/product/${product.slug}`}
                className="search-result-card"
                key={product.id}
              >
                <div className="search-result-image">
                  <Image
                    src={`${process.env.NODE_ENV === "production" ? "/vistar-picks" : ""}${product.image}`}
                    alt={product.name}
                    width={300}
                    height={240}
                  />
                </div>

                <span className="search-result-category">
                  {product.category}
                </span>

                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <span className="search-result-link">View Product →</span>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
