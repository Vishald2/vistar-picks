
"use client";

import { useEffect, useState, type ComponentProps } from "react";
import { categories } from "@/lib/products";
import Link from "next/link";

export default function Header() {


const [category, setCategory] = useState("All Categories");
const [query, setQuery] = useState("");

useEffect(() => {
  const params = new URLSearchParams(window.location.search);

  const urlCategory = params.get("category");
  const urlQuery = params.get("q");

  if (urlCategory && categories.includes(urlCategory)) {
    setCategory(urlCategory);
  } else {
    setCategory("All Categories");
  }

  setQuery(urlQuery ?? "");
}, []);

function handleSearch(
  event: Parameters<
    NonNullable<ComponentProps<"form">["onSubmit"]>
  >[0]
) {
  event.preventDefault();

  console.log("SUBMIT FIRED");
  console.log("Query:", query);
  console.log("Category:", category);

  const params = new URLSearchParams();

  if (query.trim()) params.set("q", query.trim());

  if (category !== "All Categories") {
    params.set("category", category);
  }

  const searchPath = "/search";
  const url = params.toString()
    ? `${searchPath}?${params.toString()}`
    : searchPath;

  console.log("Navigating to:", url);
  window.location.href = url;
}


  return (
    <header className="site-header">
      <div className="header-inner">
      <Link
        className="brand"
        href="/"
        aria-label="Vistar Picks home"
      >
        <span className="brand-name">Selective Kart</span>
        <span className="brand-tagline">Smart product choices</span>
      </Link>
        <form className="search-form" onSubmit={handleSearch}>
          <select
  aria-label="Choose category"
  value={category}
  onChange={(event) => {
    console.log("Category changed:", event.target.value);
    setCategory(event.target.value);
  }}
>
  <option value="All Categories">All Categories</option>
  {categories.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ))}
</select>

          <input
            aria-label="Search products"
            placeholder="Search products..."
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
