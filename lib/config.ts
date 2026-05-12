'use server';

import fs from 'fs';
import path from 'path';

export interface AboutConfig {
  enabled: boolean;
  badge: string;
  headline: string;
  headlineHighlight: string;
  paragraphs: string[];
  avatar: string;
  quote: string;
  founderName: string;
  founderTitle: string;
  founderBadges: string[];
  values: { icon: string; title: string; desc: string }[];
}

export interface MissionConfig {
  enabled: boolean;
  badge: string;
  headline: string;
  headlineHighlight: string;
  text: string;
  stats: { value: string; label: string; sub: string }[];
}

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
    newsletter: boolean;
    featuredCourses: boolean;
    viewAllCourses: boolean;
  };
  about?: AboutConfig;
  mission?: MissionConfig;
}

export interface ProductLesson {
  title: string;
  duration: string;
  free: boolean;
}

export interface ProductModule {
  title: string;
  duration: string;
  lessons: ProductLesson[];
}

export interface ProductInstructor {
  name: string;
  title: string;
  bio: string;
  rating: number;
  studentsCount: number;
  coursesCount: number;
  avatar: string;
}

export interface ProductReview {
  name: string;
  date: string;
  rating: number;
  comment: string;
  verified: boolean;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface ProductOffer {
  label: string;
  expiresAt: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  studentsCount?: number;
  duration?: string;
  lessonsCount?: number;
  level?: string;
  language?: string;
  lastUpdated?: string;
  tags: string[];
  variants: {
    name: string;
    options: string[];
  }[];
  learningOutcomes?: string[];
  includes?: { icon: string; label: string }[];
  curriculum?: ProductModule[];
  instructor?: ProductInstructor;
  ratingDistribution?: Record<string, number>;
  reviewsList?: ProductReview[];
  faq?: ProductFAQ[];
  guarantee?: { days: number; text: string };
  offer?: ProductOffer;
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

function readJsonFile<T>(filename: string): T {
  if (typeof window !== 'undefined') {
    throw new Error('readJsonFile can only be used on the server side');
  }
  const filePath = path.join(process.cwd(), 'config', filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

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

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.id === id) ?? null;
}

export async function getNavigationConfig(): Promise<NavigationConfig> {
  if (!navigationCache) {
    navigationCache = readJsonFile<NavigationConfig>('navigation.json');
  }
  return navigationCache;
}
