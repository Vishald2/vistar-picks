
import type { MetadataRoute } from "next";
import { products } from "@/lib/products";

export const dynamic = "force-static";

const SITE_URL = "https://selectivekart.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/product/${product.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/search`,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...productPages,
  ];
}
