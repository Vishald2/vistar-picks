"use client";

import { useEffect, useState, type ComponentProps } from "react";
import { getAllowedCategories } from "@/lib/products";
import { detectCountry } from "@/lib/detect-country";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProducts } from "@/lib/use-products";
import { categories } from "@/lib/products";

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [category, setCategory] = useState("All Categories");
  const [query, setQuery] = useState("");
  const [allowedCategories, setAllowedCategories] = useState<string[]>([]);

  const availableProducts = useProducts();

  const availableCategories = categories.filter(category =>
    availableProducts.some(product => product.category === category)
  );

  useEffect(() => {
    async function initialize() {
      const countryCode = await detectCountry();

      // If country detection fails, show all categories
      const availableCategories = getAllowedCategories(countryCode ?? "");

      setAllowedCategories(availableCategories);

      const params = new URLSearchParams(window.location.search);

      const urlCategory = params.get("category");
      const urlQuery = params.get("q");

      if (urlCategory && availableCategories.includes(urlCategory)) {
        setCategory(urlCategory);
      } else {
        setCategory("All Categories");
      }

      setQuery(urlQuery ?? "");
    }

    initialize();
  }, []);

  function handleSearch(
    event: Parameters<
      NonNullable<ComponentProps<"form">["onSubmit"]>
    >[0]
  ) {
    event.preventDefault();

    if (isHomePage) {
      const searchUrl = query.trim()
      ? `/?articleQuery=${encodeURIComponent(query.trim())}`
      : "/";

      window.location.href = searchUrl;
      return;
    }

    const params = new URLSearchParams();

    if (query.trim()) params.set("q", query.trim());

    if (category !== "All Categories") {
      params.set("category", category);
    }

    const searchPath = "/search";
    const url = params.toString()
      ? `${searchPath}?${params.toString()}`
      : searchPath;

    window.location.href = url;
  }

  return (
    <header className="site-header">
      <div className="header-inner">

        <Link
          className="brand"
          href="/"
          aria-label="Selective Kart home"
        >
          <span className="brand-name">Selective Kart</span>
          <span className="brand-tagline">Smart product choices</span>
        </Link>

        <nav className="header-nav" aria-label="Main navigation">
          <Link
            href="/"
            className={`header-nav-link ${
              pathname === "/" ? "active" : ""
            }`}
          >
            Home
          </Link>

          <Link
            href="/storefront"
            className={`header-nav-link ${
              pathname === "/storefront" ? "active" : ""
            }`}
          >
            Storefront
          </Link>
        </nav>

        <form className="search-form" onSubmit={handleSearch}>
          <select
            aria-label="Choose category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="All Categories">All Categories</option>

            {availableCategories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <input
            aria-label="Search products"
            placeholder={isHomePage ? "Search articles..." : "Search products..."}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />

          <button type="submit" aria-label="Search">
            Search
          </button>
        </form>

      </div>
    </header>
  );
}