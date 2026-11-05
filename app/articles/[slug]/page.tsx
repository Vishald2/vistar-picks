
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
import { categories } from "@/lib/products";
import GoToTop from "@/components/GoToTop";

export const dynamicParams = false;

type ArticleHeading = {
  depth: number;
  text: string;
  id: string;
};

function getHeadingText(node: any): string {
  if (node.type === "text" || node.type === "inlineCode") {
    return node.value ?? "";
  }

  return (node.children ?? []).map(getHeadingText).join("");
}

function addHeadingIds(headings: ArticleHeading[]) {
  return () => (tree: any) => {
    const counts: Record<string, number> = {};

    for (const node of tree.children ?? []) {
      if (node.type !== "heading" || node.depth < 2 || node.depth > 3) {
        continue;
      }

      const text = getHeadingText(node).trim();

      if (!text) continue;

      const baseId =
        text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .trim()
          .replace(/\s+/g, "-") || "section";

      counts[baseId] = (counts[baseId] ?? 0) + 1;

      const id =
        counts[baseId] === 1
          ? baseId
          : `${baseId}-${counts[baseId]}`;

      node.data = {
        ...node.data,
        hProperties: {
          ...node.data?.hProperties,
          id,
          className: [],
        },
      };

      headings.push({
        depth: node.depth,
        text,
        id,
      });
    }
  };
}

function getCategoryId(category: string): string {
  return category
    .toLowerCase()
    .replace(/\s*&\s*/g, "-")
    .replace(/\s+/g, "-");
}

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

  const currentIndex = articles.findIndex(
    (item) => item.slug === slug
  );

  const previousArticle =
    currentIndex > 0 ? articles[currentIndex - 1] : null;

  const nextArticle =
    currentIndex < articles.length - 1
      ? articles[currentIndex + 1]
      : null;

  const relatedArticles = articles
    .filter(
      (item) =>
        item.category === article.category &&
        item.slug !== article.slug
    )
    .slice(0, 3);

  const articleCategories = categories
    .map((name) => ({
      id: getCategoryId(name),
      name,
    }))
    .filter((category) =>
      articles.some((item) => item.category === category.id)
    );

  const filePath = path.join(
    process.cwd(),
    "articles",
    article.fileName
  );

  if (!fs.existsSync(filePath)) {
    throw new Error(`Article file not found: ${article.fileName}`);
  }

  const markdown = fs.readFileSync(filePath, "utf8");

  const headings: ArticleHeading[] = [];

  const processedContent = await remark()
    .use(addHeadingIds(headings) as any)
    .use(html)
    .process(markdown);

  const contentHtml = processedContent.toString();

  return (
    <>
      <Header />

      <main className="article-home">

        {/* Left Sidebar */}
        <aside className="article-sidebar">
          <h2>Categories</h2>

          <nav aria-label="Article categories">
            {articleCategories.map((category) => (
              <Link
                key={category.id}
                href={`/?category=${category.id}`}
                className={`article-category ${
                  article.category === category.id ? "active" : ""
                }`}
              >
                {category.name}
              </Link>
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

          {headings.length > 0 && (
            <nav className="article-toc" aria-label="Table of Contents">
              <h2>Table of Contents</h2>

              <ul>
                {headings.map((heading) => (
                  <li
                    key={heading.id}
                    className={`toc-level-${heading.depth}`}
                  >
                    <a href={`#user-content-${heading.id}`}>
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div
            className="single-article-content"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {relatedArticles.length > 0 && (
            <section className="related-articles-section">
              <h2>Related Articles</h2>

              <div className="related-articles-grid">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    href={`/articles/${relatedArticle.slug}`}
                    className="related-article-card"
                    key={relatedArticle.id}
                  >
                    <img
                      src={relatedArticle.image}
                      alt={relatedArticle.title}
                    />

                    <div className="related-article-info">
                      <h3>{relatedArticle.title}</h3>
                      <p>{relatedArticle.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <nav className="article-navigation" aria-label="Article navigation">

            <div className="article-navigation-item previous">
              {previousArticle && (
                <Link href={`/articles/${previousArticle.slug}`}>
                  <span>← Previous Article</span>
                  <strong>{previousArticle.title}</strong>
                </Link>
              )}
            </div>

            <div className="article-navigation-item next">
              {nextArticle && (
                <Link href={`/articles/${nextArticle.slug}`}>
                  <span>Next Article →</span>
                  <strong>{nextArticle.title}</strong>
                </Link>
              )}
            </div>

          </nav>

        </section>

        {/* Right Sidebar */}
        <RelatedProductsSidebar category={article.category} />

        <GoToTop />

      </main>
    </>
  );
}
