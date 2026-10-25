import productData from "./product-data";
import type { Product } from "./product-types";

export type { Product } from "./product-types";

export const products: Product[] = productData;

export const categories = [
  "Electronics",
  "Home & Kitchen",
  "Fashion",
  "Books",
  "Sports & Fitness",
  "Beauty",
  "Automotive",
];