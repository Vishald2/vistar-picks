
import Link from "next/link";
import { products } from "@/lib/products";

export default function PopularPicks() {
  const picks = products.slice(0, 4);

  return (
    <aside className="popular-picks">
      <h2>Popular Picks</h2>
      <p className="sidebar-intro">
        Products worth exploring.
      </p>

      <div className="popular-list">
        {picks.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="popular-item"
          >
            <span className="popular-thumbnail" aria-hidden="true">
              {product.name.slice(0, 1)}
            </span>

            <span className="popular-item-text">
              <strong>{product.name}</strong>
              <span>{product.category}</span>
            </span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
