"use client";

import { useMarketplace } from "@/context/MarketplaceContext";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

interface Props {
  currentSlug: string;
}

export default function SimilarProducts({ currentSlug }: Props) {
  const { marketplace, isDetecting } = useMarketplace();

  if (isDetecting) return null;

  const currentProduct = products.find(
    (product) => product.slug === currentSlug
  );

  if (!currentProduct) return null;

  const similarProducts = products
    .filter(
      (product) =>
        product.marketplace === marketplace &&
        product.slug !== currentSlug &&
        product.category?.trim().toLowerCase() ===
          currentProduct.category?.trim().toLowerCase()
    )
    .slice(0, 5);

  if (similarProducts.length === 0) return null;

  return (
    <section className="similar-products-section">
      <h2>You May Also Like</h2>

      <div className="product-grid">
        {similarProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}