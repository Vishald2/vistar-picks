
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
        <span className="product-category">{product.category}</span>

        <Link
          href={`/product/${product.slug}`}
          className="product-title"
        >
          {product.name}
        </Link>

        <p>{product.description}</p>

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
