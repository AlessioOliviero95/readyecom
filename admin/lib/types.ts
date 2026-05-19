export interface ThemeColors {
  primary: string; primaryDark: string;
  secondary: string; secondaryDark: string;
  accent: string; success: string; warning: string; danger: string;
  gradient: { from: string; to: string };
}
export interface ThemeShape {
  radiusSm: string; radius: string; radiusLg: string; radiusXl: string; radiusFull: string;
}
export interface HeroStat { type: 'count' | 'static'; value?: string; suffix?: string; label: string; }
export interface HeroConfig {
  badge: string; badgeHref: string; headline: string; headlineHighlight: string; subheadline: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; type: 'whatsapp' | 'link'; href?: string };
  stats: HeroStat[]; illustration: string;
}
export interface NewsletterBenefit { icon: string; text: string; }
export interface NewsletterConfig {
  badge: string; headline: string; headlineHighlight: string; subheadline: string;
  benefits: NewsletterBenefit[]; formTitle: string; formSubtitle: string;
  cta: string; subscribersCount: string; socialProofAvatars: string[]; privacyText: string;
}
export interface FeaturedCoursesConfig { badge: string; title: string; subtitle: string; viewAllLabel: string; }
export interface BusinessConfig { currencySymbol: string; refundDays: number; freeShipping: boolean; }
export interface FooterConfig { copyrightText: string; badges: string[]; }
export interface WhatsAppConfig { enabled: boolean; phone: string; message: string; tooltip: string; }
export interface AboutConfig {
  enabled: boolean; badge: string; headline: string; headlineHighlight: string;
  paragraphs: string[]; avatar: string; quote: string; founderName: string;
  founderTitle: string; founderBadges: string[];
  values: { icon: string; title: string; desc: string }[];
}
export interface MissionConfig {
  enabled: boolean; badge: string; headline: string; headlineHighlight: string;
  text: string; stats: { value: string; label: string; sub: string }[];
}
export interface SiteConfig {
  site: { name: string; tagline?: string; description: string; logo: string; url?: string; locale?: string; };
  theme: { colors: ThemeColors; shape: ThemeShape; };
  layout: { maxWidth: string; padding: string; borderRadius: string; };
  features: { darkMode: boolean; cart: boolean; wishlist: boolean; search: boolean; categories: boolean; newsletter: boolean; featuredCourses: boolean; viewAllCourses: boolean; };
  hero?: HeroConfig;
  featuredCourses?: FeaturedCoursesConfig;
  newsletter?: NewsletterConfig;
  business?: BusinessConfig;
  footer?: FooterConfig;
  whatsapp?: WhatsAppConfig;
  about?: AboutConfig;
  mission?: MissionConfig;
}

export interface NavigationConfig {
  brand: { name: string; logo: string; href: string; };
  main: { label: string; href: string; icon?: string; badge?: string; children?: { label: string; href: string }[] }[];
  footer: { label: string; href: string }[];
  social: { platform: string; url: string; icon: string }[];
}

export interface ProductLesson { title: string; duration: string; free: boolean; }
export interface ProductModule { title: string; duration: string; lessons: ProductLesson[]; }
export interface ProductInstructor { name: string; title: string; bio: string; rating: number; studentsCount: number; coursesCount: number; avatar: string; }
export interface ProductReview { name: string; date: string; rating: number; comment: string; verified: boolean; }
export interface ProductFAQ { question: string; answer: string; }
export interface ProductOffer { label: string; expiresAt: string; }
export interface Product {
  id: string; name: string; subtitle?: string; description: string;
  price: number; originalPrice?: number; image: string; emoji: string;
  category: string; inStock: boolean; rating: number; reviews: number;
  studentsCount?: number; duration?: string; lessonsCount?: number;
  level?: string; language?: string; lastUpdated?: string;
  tags: string[]; variants: { name: string; options: string[] }[];
  learningOutcomes?: string[]; includes?: { icon: string; label: string }[];
  curriculum?: ProductModule[]; instructor?: ProductInstructor;
  ratingDistribution?: Record<string, number>; reviewsList?: ProductReview[];
  faq?: ProductFAQ[]; guarantee?: { days: number; text: string }; offer?: ProductOffer;
}
