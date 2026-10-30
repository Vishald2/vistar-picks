import productData from "./product-data";
import type { Product } from "./product-types";

export type { Product } from "./product-types";

export const products: Product[] = productData;

export const categories = [
    "Home & Kitchen",
    "Women Clothing",
    "Men Clothing",
    "Beauty",
    "Books",
    "Electronics",
    "Fashion",
    "Jewellery",
    "Sports & Fitness",
    "Automotive",
];