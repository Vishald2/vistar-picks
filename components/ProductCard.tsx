
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { formatPrice, formatReviewCount } from "@/lib/util";

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
                <span className="product-price-amount">
                  {formatPrice(product.price, product.marketplace)}
                </span>
  </div>
)}

<div className="product-rating" aria-label={
  product.rating != null
    ? `Rated ${product.rating} out of 5`
    : "Not yet rated"
}>
  <span className="product-rating-stars" aria-hidden="true">
    {product.rating != null
      ? (
          "★".repeat(Math.floor(product.rating)) +
          "☆".repeat(5 - Math.floor(product.rating))
        )
      : "☆☆☆☆☆"
    }
  </span>

  {product.rating != null && (
    <>
      <span className="product-rating-score">
        {product.rating.toFixed(1)}/5
      </span>

      {product.reviewCount != null && (
        <span className="product-rating-count">
          ({formatReviewCount(product.reviewCount, product.marketplace)} ratings)
        </span>
      )}
    </>
  )}
</div>

      <a
        href={`/product/${product.slug}`}
        className="product-details-link"
      >
        View details →
      </a>
      </div>
    </article>
  );
}
