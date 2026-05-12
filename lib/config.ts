'use server';

import fs from 'fs';
import path from 'path';

export interface SiteConfig {
  site: {
    name: string;
    description: string;
    logo: string;
  };
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    border: string;
  };
  layout: {
    maxWidth: string;
    padding: string;
    borderRadius: string;
  };
  features: {
    darkMode: boolean;
    cart: boolean;
    wishlist: boolean;
    search: boolean;
    categories: boolean;
  };
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  tags: string[];
  variants: {
    name: string;
    options: string[];
  }[];
}

export interface NavigationConfig {
  brand: {
    name: string;
    logo: string;
    href: string;
  };
  main: {
    label: string;
    href: string;
    icon?: string;
    children?: {
      label: string;
      href: string;
    }[];
    badge?: string;
  }[];
  footer: {
    label: string;
    href: string;
  }[];
  social: {
    platform: string;
    url: string;
    icon: string;
  }[];
}

// Helper function per leggere file JSON (solo server-side)
function readJsonFile<T>(filename: string): T {
  // Verifica se siamo nel server
  if (typeof window !== 'undefined') {
    throw new Error('readJsonFile can only be used on the server side');
  }

  const filePath = path.join(process.cwd(), 'config', filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

// Cache per evitare letture multiple
let siteConfigCache: SiteConfig | null = null;
let productsCache: Product[] | null = null;
let navigationCache: NavigationConfig | null = null;

export async function getSiteConfig(): Promise<SiteConfig> {
  if (!siteConfigCache) {
    siteConfigCache = readJsonFile<SiteConfig>('site.json');
  }
  return siteConfigCache;
}

export async function getProducts(): Promise<Product[]> {
  if (!productsCache) {
    productsCache = readJsonFile<Product[]>('products.json');
  }
  return productsCache;
}

export async function getNavigationConfig(): Promise<NavigationConfig> {
  if (!navigationCache) {
    navigationCache = readJsonFile<NavigationConfig>('navigation.json');
  }
  return navigationCache;
}
