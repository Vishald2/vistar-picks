
"use client";

import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import PopularPicks from "@/components/PopularPicks";
import { useProducts } from "@/lib/use-products";
import { useMarketplace } from "@/context/MarketplaceContext";

export default function HomePage() {
const { isDetecting } = useMarketplace();

const filteredProducts = useProducts();

  return (
    <>
      <Header />

      <main className="page-container">
        <div className="content-layout">
          <section className="product-section" aria-label="Products">
            {isDetecting ? (
              <p>Finding products for your region...</p>
            ) : (
              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </section>

          <PopularPicks />
        </div>
      </main>
    </>
  );
}
