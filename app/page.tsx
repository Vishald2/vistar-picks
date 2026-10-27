import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import PopularPicks from "@/components/PopularPicks";
import { products } from "@/lib/products";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="page-container">
        <div className="content-layout">
          <section className="product-section" aria-label="Products">
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          <PopularPicks />
        </div>
      </main>
    </>
  );
}
