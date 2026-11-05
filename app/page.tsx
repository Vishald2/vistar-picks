"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { useProducts } from "@/lib/use-products";
import { articles } from "@/lib/articles";

const categories = [
  { id: "electronics", name: "Electronics" },
  { id: "home-kitchen", name: "Home & Kitchen" },
  { id: "home-living", name: "Home & Living" },
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("electronics");

  const [articleSearch, setArticleSearch] = useState("");

  const availableProducts = useProducts();

  const productCategoryMap: Record<string, string> = {
    electronics: "Electronics",
    "home-kitchen": "Home & Kitchen",
    "home-living": "",
  };

  const relatedProducts = availableProducts
    .filter(
      (product) =>
        product.category === productCategoryMap[selectedCategory]
    )
    .slice(0, 3);

    useEffect(() => {
      const params = new URLSearchParams(window.location.search);

      const category = params.get("category");

      if (category && categories.some((item) => item.id === category)) {
        setSelectedCategory(category);
      }

      setArticleSearch(params.get("articleQuery") ?? "");
    }, []);

    const filteredArticles = articles.filter((article) => {
    const searchText = articleSearch.trim().toLowerCase();

    const matchesCategory =
      !!searchText || article.category === selectedCategory;

    const matchesSearch =
      !searchText ||
      article.title.toLowerCase().includes(searchText) ||
      article.description.toLowerCase().includes(searchText);

    return matchesCategory && matchesSearch;
  });

  const selectedCategoryName =
    categories.find((category) => category.id === selectedCategory)?.name ?? "";

  function clearSearch() {
    setArticleSearch("");
    window.history.replaceState({}, "", "/");
  }

  return (
    <>
      <Header />

      <main className="article-home">

        {/* Left Sidebar */}
        <aside className="article-sidebar">
          <h2>Categories</h2>

          <nav aria-label="Article categories">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`article-category ${
                  selectedCategory === category.id ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Article Section */}
        <section className="article-content">
          <div className="article-section-heading">
            <h1>
              {articleSearch ? "Search Results" : selectedCategoryName}
            </h1>

            <p>
              {articleSearch
                ? `Articles matching "${articleSearch}"`
                : "Explore our guides, insights and useful buying advice."}
            </p>

            {articleSearch && (
              <button
                type="button"
                onClick={clearSearch}
                className="clear-article-search"
              >
                Clear Search
              </button>
            )}
          </div>

          {filteredArticles.length > 0 ? (
            <div className="article-grid">
              {filteredArticles.map((article) => (
          <Link
            href={`/articles/${article.slug}`}
            className="article-card"
            key={article.id}
          >
                  <div className="article-card-image">
                    <img src={article.image} alt={article.title} />
                  </div>

                  <div className="article-card-body">
                    <h2>{article.title}</h2>
                    <p>{article.description}</p>
                    <span className="article-read-more">
                      Read Article →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="no-articles">
              No articles found. Try another search.
            </p>
          )}
        </section>

        {/* Right Sidebar */}
        <aside className="related-products-sidebar">
          <h2>Related Products</h2>

          {relatedProducts.length > 0 ? (
            <div className="related-products-list">
              {relatedProducts.map((product) => (
                <article className="related-product" key={product.id}>
                  <Link
                    href={`/product/${product.slug}`}
                    className="related-product-image"
                  >
                    <Image
                      src={`/products/${product.image}`}
                      alt={product.name}
                      width={100}
                      height={100}
                    />
                  </Link>

                  <div className="related-product-info">
                    <Link
                      href={`/product/${product.slug}`}
                      className="related-product-name"
                    >
                      {product.name}
                    </Link>

                    <Link
                      href={`/product/${product.slug}`}
                      className="related-product-link"
                    >
                      View product →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="no-related-products">
              Related products coming soon.
            </p>
          )}
        </aside>

      </main>
    </>
  );
}
