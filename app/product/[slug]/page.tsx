
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { products } from "@/lib/products";
import styles from "./productdetails.module.css";
import { productContent } from "@/lib/product-content";
import SimilarProducts from "@/components/SimilarProducts";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const description =
    product.description?.trim() ||
    `Explore ${product.name}, compare its features, and check the latest availability on Amazon.`;

  const canonicalUrl = `https://selectivekart.com/product/${product.slug}`;

  return {
    title: product.name,
    description: description.slice(0, 160),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: product.name,
      description: description.slice(0, 160),
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: `/products/${product.image}`,
          alt: product.name,
        },
      ],
    },
  };
}

type PageProps = {
  params: Promise<{ slug: string }>;
};
 
export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailsPage({ params }: PageProps) {

  const { slug } = await params;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

const copy = productContent[product.slug] ?? {
  introduction: "",
  overview: product.description,
  whatToCheck: "Compare specifications, quality and value before buying.",
};

const similarProducts = products
  .filter(
    (item) =>
      item.slug !== product.slug &&
      item.category?.trim().toLowerCase() ===
        product.category?.trim().toLowerCase()
  )
  .slice(0, 5);


  return (
    <>
      <Header />

      <main className={styles.page}>
        <div className={styles.container}>
          <nav className="product-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-separator">›</span>
            <Link href={`/?category=${encodeURIComponent(product.category)}`}>
              {product.category}
            </Link>
            <span className="breadcrumb-separator">›</span>
            <span className="current-breadcrumb">{product.name}</span>
          </nav>

<section className="product-hero" aria-labelledby="product-title">
  {/* Left column: product image */}
  <div className="product-image-panel">
    <div className="product-image-stage">
      <Image
        src={`/products/${product.image}`}
        alt={product.name}
        width={700}
        height={700}
        priority
        className="product-detail-image"
      />
    </div>
  </div>

  {/* Right column: product details */}
  <div className="product-info">

  <h1 className="product-detail-title">
    {product.name}
  </h1>

  {product.category?.trim().toLowerCase() === "books" &&
    product.author?.trim() && (
      <p className="productAuthor">
        by: {product.author}
      </p>
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

    {product.price != null && (
  <div className="product-price">
    <span className="product-price-currency">
      {product.currency}
    </span>
    <span></span>
    <span className="product-price-amount">
      {new Intl.NumberFormat("en-IN", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(product.price)}
    </span>

  </div>
)}

{product.lastVerifiedAt && (
  <div className="product-last-verified">
    Last reviewed: {product.lastVerifiedAt}
  </div>
)}

{copy.introduction?.trim() && (
  <>
    <p className="product-introduction">{copy.introduction}</p>

    <div className="product-divider" />
  </>
)}

    <section className="product-info-section">
     <h2>
        {product.category?.trim().toLowerCase() === "books"
          ? "Book overview"
          : "Product overview"}
      </h2>
      <p>{copy.overview}</p>
    </section>

    <section className="product-info-section">
      <h2>What to check</h2>
      <p>{copy.whatToCheck}</p>
    </section>

    <div className="product-purchase-area">
    <a
      href={product.amazonUrl}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      className="product-amazon-button"
    >
      View on Amazon ↗
    </a>
    </div>
  </div>
</section>

<section className="product-details-lower">
  <section className="details-content-section">
    <h2>About this product</h2>
    <p>{copy.overview}</p>
  </section>

  <section className="details-content-section">
    <h2>Features to compare</h2>
    <ul>
      {[
        "Product specifications and dimensions",
        "Build quality and materials",
        "Ease of use and maintenance",
        "Compatibility with your needs",
      ].map((feature) => (
        <li key={feature}>
          <span className="details-check">✓</span>
          {feature}
        </li>
      ))}
    </ul>
  </section>

  <section className="details-content-section">
    <h2>Things to consider</h2>
    <ul className="details-considerations">
      {[
        "Check the manufacturer's specifications.",
        "Compare similar products before buying.",
        "Review the seller's return policy and warranty.",
      ].map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </section>

  <section className="details-buying-tip">
    <h2>Buying tip</h2>
    <p>{copy.whatToCheck}</p>
  </section>

<SimilarProducts currentSlug={product.slug} />

  <p className="details-disclosure">
    <strong>Affiliate disclosure:</strong> Selective Kart may earn a
    commission from qualifying purchases made through affiliate links.
    Product details and availability should be confirmed with the seller.
  </p>
</section>


        </div>
      </main>
    </>
  );
}
