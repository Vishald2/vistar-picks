
"use client";

import Image from "next/image";
import Link from "next/link";
import { useProducts } from "@/lib/use-products";

type Props = {
  category: string;
  productType?: string;
};

export default function RelatedProductsSidebar({
  category,
  productType,
}: Props) {

  console.log("RelatedProductsSidebar props:", { category, productType });
  const availableProducts = useProducts();

  const productCategoryMap: Record<string, string> = {
    electronics: "Electronics",
    "home-kitchen": "Home & Kitchen",
    "home-living": "",
  };

  

  // First, try to find products matching the article's productType.
  const productTypeMatches = productType
    ? availableProducts
        .filter((product) => product.productType === productType)
        .slice(0, 3)
    : [];

    console.log("Available products:", availableProducts);
    console.log("Product category map:", productCategoryMap);

    console.log("Product type matches:", productTypeMatches);

  // If no productType match exists, use the existing category logic.
  const relatedProducts =
    productTypeMatches.length > 0
      ? productTypeMatches
      : availableProducts
          .filter(
            (product) =>
              product.category === productCategoryMap[category]
          )
          .slice(0, 3);

  return (
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
  );
}
