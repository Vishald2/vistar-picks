import productData from "./product-data";
import type { Product } from "./product-types";

export type { Product } from "./product-types";

export const products: Product[] = productData;

export const categories = [
    "Home & Kitchen",
    "Women Clothing",
    "Lingerie & Nightwear",
    "Men Clothing",
    "Beauty",
    "Books",
    "Electronics",
    "Fashion",
    "Jewellery",
    "Sports & Fitness",
    "Automotive",
];

export interface CategoryExclusion {
    category: string;
    List: string[];
}

export const categoryExclusions: CategoryExclusion[] = [
    {
        category: "Lingerie & Nightwear",
        List: ["GB", "GBR", "AU", "AUS", "IN", 
                    "IND", "CA","CAN", "KY", "CYM"],
    }
];

export function getAllowedCategories(countryCode: string) {
    return categories.filter(category => {
        const exclusion = categoryExclusions.find(
            x => x.category === category
        );

        // No exclusion entry means available everywhere
        if (!exclusion) return true;

        return !exclusion.List.includes(countryCode);
    });
}