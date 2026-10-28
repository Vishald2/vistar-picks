import productData from "./product-data";
import type { Product } from "./product-types";

export type { Product } from "./product-types";

export const products: Product[] = productData;

export const categories = [
  "Automotive",
  "Beauty",
  "Books",
  "Electronics",
  "Fashion",
  "Jewellery",
  "Home & Kitchen",
  "Sports & Fitness",
];