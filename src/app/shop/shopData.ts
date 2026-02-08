export type ProductCategory = "hats" | "book" | "watch" | "other";

export interface ProductVariant {
  id: string;
  label: string;
  priceModifier?: number;
}

export interface Product {
  id: string;
  title: string;
  descriptionKey: string;
  price: number; // in GBP pence
  currency: "gbp";
  categoryKey: ProductCategory;
  images: string[]; // array of image paths
  stripePriceId: string;
  variants?: {
    label: string;
    options: ProductVariant[];
  };
  badge?: string;
  soldOut?: boolean;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "kermit-cap-black",
    title: "Kermit Cap - Black",
    descriptionKey: "ketmitCapDescription",
    price: 1500,
    currency: "gbp",
    categoryKey: "hats",
    images: [
      "/images/shop/kermit-cap/hat-black.jpg",
      "/images/shop/kermit-cap/safety.jpg",
    ],
    stripePriceId: "price_1SyfjtLuxI8AFSxIuntgB1RV",
    variants: {
      label: "Size",
      options: [{ id: "one-size", label: "One Size" }],
    },
    featured: true,
  },
  {
    id: "kermit-cap-pink",
    title: "Kermit Cap - Pink",
    descriptionKey: "ketmitCapDescription",
    price: 1500,
    currency: "gbp",
    categoryKey: "hats",
    images: [
      "/images/shop/kermit-cap/hat-pink.jpg",
      "/images/shop/kermit-cap/safety.jpg",
    ],
    stripePriceId: "price_1SyfkLLuxI8AFSxI1Xjc3XvZ",
    variants: {
      label: "Size",
      options: [{ id: "one-size", label: "One Size" }],
    },
    featured: true,
  },
  {
    id: "kermit-cap-grey",
    title: "Kermit Cap - Grey",
    descriptionKey: "ketmitCapDescription",
    price: 1500,
    currency: "gbp",
    categoryKey: "hats",
    images: [
      "/images/shop/kermit-cap/hat-grey.jpg",
      "/images/shop/kermit-cap/safety.jpg",
    ],
    stripePriceId: "price_1SyfksLuxI8AFSxIC4heiSiy",
    variants: {
      label: "Size",
      options: [{ id: "one-size", label: "One Size" }],
    },
    featured: true,
  },
  {
    id: "bitcoin",
    title: "Bitcoin",
    descriptionKey: "bitcoinDescription",
    price: 1000,
    currency: "gbp",
    categoryKey: "other",
    images: [
      "/images/shop/bitcoin/bitcoin.jpg",
      "/images/shop/bitcoin/bitcoin-2.jpg",
      "/images/shop/bitcoin/bitcoin-3.jpg",
    ],
    stripePriceId: "price_1SyflcLuxI8AFSxIPJ0O45PW",
    variants: {
      label: "Size",
      options: [{ id: "one-size", label: "One Size" }],
    },
    featured: true,
  },
  {
    id: "watch",
    title: "Casio Watch",
    descriptionKey: "watchDescription",
    price: 4000,
    currency: "gbp",
    categoryKey: "watch",
    images: [
      "/images/shop/watch/watch.jpg",
      "/images/shop/watch/watch-2.jpg",
      "/images/shop/watch/watch-3.jpg",
      "/images/shop/watch/watch-4.jpg",
      "/images/shop/watch/watch-5.jpg",
    ],
    stripePriceId: "price_1SyfmGLuxI8AFSxIRaTNC3pU",
    variants: {
      label: "Size",
      options: [{ id: "one-size", label: "One Size" }],
    },
    featured: true,
  },
  {
    id: "carmex",
    title: "Carmex",
    descriptionKey: "carmexDescription",
    price: 500,
    currency: "gbp",
    categoryKey: "other",
    images: [
      "/images/shop/carmex/carmex.jpg",
      "/images/shop/carmex/carmex-2.jpg",
    ],
    stripePriceId: "price_1Syg0HLuxI8AFSxIFKc8x5H8",
    variants: {
      label: "Size",
      options: [{ id: "one-size", label: "One Size" }],
    },
    featured: true,
  },
  {
    id: "zero-to-one",
    title: "Zero To One",
    descriptionKey: "zeroToOneDescription",
    price: 2000,
    currency: "gbp",
    categoryKey: "book",
    images: [
      "/images/shop/zeroToOne/zeroToOne.jpg",
      "/images/shop/zeroToOne/zeroToOne-2.jpg",
      "/images/shop/zeroToOne/zeroToOne-3.jpeg",
    ],
    stripePriceId: "price_1SyfnuLuxI8AFSxI13xDEKUg",
    variants: {
      label: "Size",
      options: [{ id: "one-size", label: "One Size" }],
    },
    featured: true,
  },
  {
    id: "test-item",
    title: "Test Item",
    descriptionKey: "testItemDescription",
    price: 30,
    currency: "gbp",
    categoryKey: "other",
    images: ["/images/shop/testItem/testItem.jpg"],
    stripePriceId: "price_1Syg6fLuxI8AFSxISLE0wmyD",
    variants: {
      label: "Size",
      options: [{ id: "one-size", label: "One Size" }],
    },
    featured: true,
  },
];

export function formatPrice(pence: number): string {
  return `£${(pence / 100).toFixed(2)}`;
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
