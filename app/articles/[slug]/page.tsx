import { articles } from "@/lib/articles";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import fs from "node:fs";
import path from "node:path";
import { remark } from "remark";
import html from "remark-html";
import RelatedProductsSidebar from "@/components/RelatedProductsSidebar";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `https://selectivekart.com/articles/${article.slug}`,
    },
  };
}


export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const filePath = path.join(
    process.cwd(),
    "articles",
    article.fileName
  );

  if (!fs.existsSync(filePath)) {
    throw new Error(`Article file not found: ${article.fileName}`);
  }

  const markdown = fs.readFileSync(filePath, "utf8");

  const processedContent = await remark()
    .use(html)
    .process(markdown);

  const contentHtml = processedContent.toString();

  const categories = [
    { id: "electronics", name: "Electronics" },
    { id: "home-kitchen", name: "Home & Kitchen" },
    { id: "home-living", name: "Home & Living" },
  ];

  return (
    <>
      <Header />

      <main className="article-home">

        {/* Left Sidebar */}
        <aside className="article-sidebar">
          <h2>Categories</h2>

          <nav aria-label="Article categories">
            {categories.map((category) => (
              <span
                key={category.id}
                className={`article-category ${
                  article.category === category.id ? "active" : ""
                }`}
              >
                {category.name}
              </span>
            ))}
          </nav>
        </aside>

        {/* Main Article */}
        <section className="article-content">

          <Link href="/" className="article-back-link">
            ← Back to Articles
          </Link>

          <div className="single-article-header">
            <h1>{article.title}</h1>
            <p>{article.description}</p>
          </div>

          <div className="single-article-image">
            <Image
              src={article.image}
              alt={article.title}
              width={1200}
              height={675}
              priority
            />
          </div>

          <div
            className="single-article-content"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

        </section>

        {/* Right Sidebar */}
        <RelatedProductsSidebar category={article.category} />

      </main>
    </>
  );
}
