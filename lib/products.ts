
export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  price?: number;
  slug: string;
  rating?: number;
  reviewCount?: number;
  amazonUrl: string;
};


export const categories = [
  "Electronics",
  "Home & Kitchen",
  "Fashion",
  "Books",
  "Sports & Fitness",
  "Beauty",
];

export const products: Product[] = [
  {
  id: "1",
  name: "Noise Airwave Max XR Wireless Over-Ear Headphones",
  category: "Electronics",
  description:
    "Wireless over-ear headphones featuring up to 120 hours of playtime, ANC, spatial audio, dual pairing and Bluetooth 6.0.",
  image: "/products/noise-airwave-max-xr.jpg",
  slug: "noise-airwave-max-xr",
  rating: 4.1,
  reviewCount: 541,
  amazonUrl:
  "https://www.amazon.in/gp/aw/d/B0F9PGWSD9?pd_rd_plhdr=t&hsa_cr_id=0&qid=1792634451&sr=1-1-941ebe59-d25b-49d0-b214-12cc5b66c90f&i=electronics&aref=x764eig3oV&_encoding=UTF8&pd_rd_w=A7Tub&content-id=amzn1.sym.7b6188a8-103f-4f88-b43a-19aba06e30c1%3Aamzn1.sym.7b6188a8-103f-4f88-b43a-19aba06e30c1&pf_rd_p=7b6188a8-103f-4f88-b43a-19aba06e30c1&pf_rd_r=0HF9SSRED17EWZJDKZ30&pd_rd_wg=gVvZf&pd_rd_r=7942e73a-d868-432f-93ed-28921d150e24&th=1&linkCode=sl2&tag=vistartrading-21&linkId=f88c154c9b3efe05a9d4ba91fcd1f6f4&ref_=as_li_ss_tl",
},
  {
    id: "2",
    name: "Insulated Water Bottle",
    category: "Home & Kitchen",
    description: "Compare bottles for everyday use and travel.",
    image: "/products/water-bottle.jpg",
    slug: "insulated-water-bottle",
    amazonUrl:"https://link.amazon/A0h7kX3DJ",
  },
  {
    id: "3",
    name: "Adjustable Laptop Stand",
    category: "Electronics",
    description: "Explore laptop stands for home and office desks.",
    image: "/products/laptop-stand.jpg",
    slug: "adjustable-laptop-stand",
    amazonUrl:
      "https://link.amazon/B07N75YAD" },
  {
    id: "4",
    name: "Kitchen Storage Containers",
    category: "Home & Kitchen",
    description: "Find practical storage options for your kitchen.",
    image: "/products/storage-containers.jpg",
    slug: "kitchen-storage-containers",
    amazonUrl:
      "https://link.amazon/A04mv7Ilb"},
  {
    id: "5",
    name: "Smartwatch",
    category: "Electronics",
    description: "Compare smartwatch features and capabilities.",
    image: "/products/smartwatch.jpg",
    slug: "smartwatch",
    amazonUrl:
      "https://link.amazon/A01EHfHRJ"},
  {
    id: "6",
    name: "Computer Mouse",
    category: "Electronics",
    description: "Explore mice for productivity and everyday work.",
    image: "/products/mouse.jpg",
    slug: "computer-mouse",
    amazonUrl:
      "https://link.amazon/B01Rb0rVW"},
      {
        id: "7",
        name: "Dell 15 Laptop, 14th Gen Intel Core i3/Core 3 100U Processor",
        category: "Electronics",
        description: "Dell 15 (Previously Inspiron) Laptop, 14th Gen Intel Core i3/Core 3 100U Processor, 16GB DDR4, 512 SSD, Intel UHD Graphics, 15.6\" FHD 120Hz IPS AG 250 nit Display, Win 11 + Office 2024, Black, 1.63Kg",
        image: "/products/7-Dell-15-Laptop-71rhZEheSZL_SL1500.jpg",
        slug: "7-Dell-15-Laptop-71rhZEheSZL_SL1500",
        amazonUrl:
          "https://link.amazon/B02u0Xj11"
      },
];
