export interface ProductVariant {
  size?: string;
  color?: string;
  price: number;
  comparePrice?: number;
  sku: string;
  qty?: number;
  imageAlt?: string;
}

export interface Product {
  title: string;
  slug: string;
  description: string;
  vendor: string;
  type: string;
  category: string;
  tags: string[];
  price: number;
  comparePrice?: number;
  image: string;
  seoTitle: string;
  seoDescription: string;
  variants: ProductVariant[];
  isDigital?: boolean;
}

export const products: Product[] = [
  {
    title: 'Physical Product "The Band" T-Shirt',
    slug: 'physical-product-the-band-t-shirt',
    description: "Celebrate the timeless legacy of one of rock music's most influential groups with our exclusive The Band Graphic T-Shirt. Perfect for music lovers and vintage style enthusiasts, this t-shirt features a striking graphic of The Band, capturing the essence of their iconic sound and enduring spirit.",
    vendor: 'Harmony Threads',
    type: 'Graphic shirt',
    category: 'Apparel & Accessories > Clothing > T-Shirts',
    tags: ['Unisex', 'Clothing', 'Men', 'Women', 'Casual', 'Vintage'],
    price: 19.99,
    comparePrice: 24.99,
    image: 'https://burst.shopifycdn.com/photos/forest-hiker.jpg?width=1000',
    seoTitle: 'Vintage The Band Graphic T-Shirt: Iconic Rock Music Tribute Tee',
    seoDescription: "Celebrate the legacy of rock icons with our exclusive The Band Graphic T-Shirt. Perfect for music lovers and vintage style fans, this tee features a striking graphic of The Band, capturing their iconic sound and spirit.",
    isDigital: false,
    variants: [
      { size: 'Small', color: 'green', price: 19.99, comparePrice: 24.99, sku: 'TheBandTShirt-SG', qty: 47 },
      { size: 'Small', color: 'gray', price: 19.99, comparePrice: 24.99, sku: 'TheBandTShirt-SA', qty: 42 },
      { size: 'Small', color: 'red', price: 19.99, comparePrice: 24.99, sku: 'TheBandTShirt-SR', qty: 51 },
      { size: 'Medium', color: 'green', price: 19.99, comparePrice: 24.99, sku: 'TheBandTShirt-MG', qty: 40 },
      { size: 'Medium', color: 'gray', price: 19.99, comparePrice: 24.99, sku: 'TheBandTShirt-MA', qty: 39 },
      { size: 'Medium', color: 'red', price: 19.99, comparePrice: 24.99, sku: 'TheBandTShirt-MR', qty: 56 },
      { size: 'Large', color: 'green', price: 19.99, comparePrice: 24.99, sku: 'TheBandTShirt-LG', qty: 50 },
      { size: 'Large', color: 'gray', price: 19.99, comparePrice: 24.99, sku: 'TheBandTShirt-LA', qty: 44 },
      { size: 'Large', color: 'red', price: 19.99, comparePrice: 24.99, sku: 'TheBandTShirt-LR', qty: 34 },
      { size: 'XL', color: 'green', price: 19.99, comparePrice: 24.99, sku: 'TheBandTShirt-XG', qty: 27 },
      { size: 'XL', color: 'gray', price: 19.99, comparePrice: 24.99, sku: 'TheBandTShirt-XA', qty: 43 },
      { size: 'XL', color: 'red', price: 19.99, comparePrice: 24.99, sku: 'TheBandTShirt-XR', qty: 40 },
    ],
  },
  {
    title: 'Digital Product The History of Rock Music',
    slug: 'digital-product-the-history-of-rock-music',
    description: "Dive deep into the history of rock music with this comprehensive digital book. From the roots of blues and country to the birth of punk, grunge, and beyond.",
    vendor: 'Harmony Publishing',
    type: 'Digital book',
    category: 'Media > Books > E-Books',
    tags: ['Rock Music', 'Music History', 'eBook', 'Music Culture'],
    price: 14.99,
    image: 'https://burst.shopifycdn.com/photos/forest-hiker.jpg?width=1000',
    seoTitle: 'The History of Rock Music — Digital Book (PDF, Audio, Kindle)',
    seoDescription: 'A comprehensive digital guide to the history of rock music. Available as PDF, audiobook, and Kindle.',
    isDigital: true,
    variants: [
      { size: 'PDF', price: 14.99, sku: 'HRM-EBK-PDF' },
      { size: 'Audio', price: 14.99, sku: 'HRM-EBK-AUD' },
      { size: 'Kindle', price: 14.99, sku: 'HRM-EBK-KND' },
    ],
  },
  {
    title: 'Example Perfume',
    slug: 'example-perfume',
    description: 'A bold, sophisticated fragrance for those who command the room. Rich dark woods, a hint of citrus, and a long-lasting dry-down that turns heads.',
    vendor: 'Acme',
    type: 'Perfume',
    category: 'Health & Beauty > Perfumes & Colognes',
    tags: ['mens perfume', 'fragrance', 'premium'],
    price: 74.99,
    comparePrice: 80.00,
    image: 'https://burst.shopifycdn.com/photos/black-glass-perfume-bottle-and-spritzer.jpg?width=500',
    seoTitle: 'Signature Premium Perfume — Bold Mens Fragrance by Acme',
    seoDescription: 'A bold premium fragrance for the discerning man. $74.99.',
    isDigital: false,
    variants: [
      { size: 'Premium', price: 74.99, comparePrice: 80.00, sku: 'EX-PERF-MEN' },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}
