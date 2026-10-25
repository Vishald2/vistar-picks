
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  return (
    <article className="product-card">
      <Link
        href={`/product/${product.slug}`}
        className="product-image-link"
        aria-label={`View ${product.name}`}
      >
        
        <div className="product-image">
        <Image
            src={`/products/${product.image}`}
            alt={product.name}
            fill
            sizes="(max-width: 700px) 50vw, 240px"
            className="product-photo"
        />
        </div>

      </Link>

      <div className="product-card-body">

        <Link
          href={`/product/${product.slug}`}
          className="product-title"
        >
          {product.name}
        </Link>

{product.price != null && (
  
  <div className="product-card-price">
      <span className="product-price-currency">
      {product.currency}
  </span>
  <span> </span>
    {new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(product.price)}
  </div>
)}

    {product.rating != null && (
      <div className="product-rating" aria-label={`Rated ${product.rating} out of 5`}>
        <span className="product-rating-stars" aria-hidden="true">
  {"★".repeat(Math.floor(product.rating))}
  {"☆".repeat(5 - Math.floor(product.rating))}
        </span>

        <span className="product-rating-score">{product.rating.toFixed(1)}/5</span>

        {product.reviewCount != null && (
          <span className="product-rating-count">
            ({product.reviewCount.toLocaleString("en-IN")} ratings)
          </span>
        )}
      </div>
    )}

        <Link
          href={`/product/${product.slug}`}
          className="text-link"
        >
          View details →
        </Link>
      </div>
    </article>
  );
}
