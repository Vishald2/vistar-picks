export type Product = {
  id: string;
  name: string;
  category: string;
  description?: string | null;
  image: string;
  slug: string;
  amazonUrl: string;
  asin?: string | null;
  currency?: string | null;
  price: number;
  rating?: number | null;
  reviewCount: number;
  lastVerifiedAt?: string | null;
  author?: string | null;
};