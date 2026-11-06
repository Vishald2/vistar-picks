export type Product = {
  id: string;
  marketplace: string;
  name: string;
  category: string;
  productType?: string | null;
  description?: string | null;
  image: string;
  slug: string;
  amazonUrl: string;
  asin?: string | null;
  currency?: string | null;
  price: number;
  rating?: number | null;
  reviewCount: number | null;
  lastVerifiedAt?: string | null;
  author?: string | null;
  experience?: string | null;
};