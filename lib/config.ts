'use server';

import fs from 'fs';
import path from 'path';
import { createSupabaseAdminClient } from './supabase-admin';

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

export interface WhatsAppConfig {
  enabled: boolean;
  phone: string;
  message: string;
  tooltip: string;
}

export interface ThemeColors {
  primary: string;
  primaryDark: string;
  secondary: string;
  secondaryDark: string;
  accent: string;
  success: string;
  warning: string;
  danger: string;
  gradient: { from: string; to: string };
}

export interface ThemeShape {
  radiusSm: string;
  radius: string;
  radiusLg: string;
  radiusXl: string;
  radiusFull: string;
}

export interface HeroStat {
  type: 'count' | 'static';
  value?: string;
  suffix?: string;
  label: string;
}

export interface HeroConfig {
  badge: string;
  badgeHref: string;
  headline: string;
  headlineHighlight: string;
  subheadline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; type: 'whatsapp' | 'link'; href?: string };
  stats: HeroStat[];
  illustration: string;
}

export interface FeaturedCoursesConfig {
  badge: string;
  title: string;
  subtitle: string;
  viewAllLabel: string;
}

export interface NewsletterBenefit {
  icon: string;
  text: string;
}

export interface NewsletterConfig {
  badge: string;
  headline: string;
  headlineHighlight: string;
  subheadline: string;
  benefits: NewsletterBenefit[];
  formTitle: string;
  formSubtitle: string;
  cta: string;
  subscribersCount: string;
  socialProofAvatars: string[];
  privacyText: string;
}

export interface BusinessConfig {
  currencySymbol: string;
  refundDays: number;
  freeShipping: boolean;
}

export interface FooterConfig {
  copyrightText: string;
  badges: string[];
}

export interface SiteConfig {
  site: {
    name: string;
    tagline?: string;
    description: string;
    logo: string;
    url?: string;
    locale?: string;
  };
  theme: {
    colors: ThemeColors;
    shape: ThemeShape;
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
  hero?: HeroConfig;
  featuredCourses?: FeaturedCoursesConfig;
  newsletter?: NewsletterConfig;
  business?: BusinessConfig;
  footer?: FooterConfig;
  whatsapp?: WhatsAppConfig;
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
  emoji: string;
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

async function getFromSupabase<T>(key: string): Promise<T | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;
  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from('app_configs')
      .select('value')
      .eq('key', key)
      .single();
    if (error || !data?.value) return null;
    const val = data.value;
    if (Array.isArray(val) && val.length === 0) return null;
    if (typeof val === 'object' && !Array.isArray(val) && Object.keys(val).length === 0) return null;
    return val as T;
  } catch {
    return null;
  }
}

export async function getSiteConfig(): Promise<SiteConfig> {
  const fromDB = await getFromSupabase<SiteConfig>('site');
  return fromDB ?? readJsonFile<SiteConfig>('site.json');
}

export async function getProducts(): Promise<Product[]> {
  const fromDB = await getFromSupabase<Product[]>('products');
  return fromDB ?? readJsonFile<Product[]>('products.json');
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.id === id) ?? null;
}

export async function getNavigationConfig(): Promise<NavigationConfig> {
  const fromDB = await getFromSupabase<NavigationConfig>('navigation');
  return fromDB ?? readJsonFile<NavigationConfig>('navigation.json');
}
