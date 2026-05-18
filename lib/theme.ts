import type { SiteConfig } from './config';

/**
 * Generates a CSS string with brand custom properties derived from site.json.
 * Injected into <head> in app/layout.tsx so the entire app can reference
 * var(--brand-*) instead of hardcoded Tailwind colour utilities.
 * Changing colours in site.json → restart dev server → entire UI updates.
 */
export function generateThemeCSS(config: SiteConfig): string {
  const { colors, shape } = config.theme;
  return `
    :root {
      --brand-primary: ${colors.primary};
      --brand-primary-dark: ${colors.primaryDark};
      --brand-secondary: ${colors.secondary};
      --brand-secondary-dark: ${colors.secondaryDark};
      --brand-accent: ${colors.accent};
      --brand-success: ${colors.success};
      --brand-warning: ${colors.warning};
      --brand-danger: ${colors.danger};
      --brand-gradient-from: ${colors.gradient.from};
      --brand-gradient-to: ${colors.gradient.to};
      --brand-radius-sm: ${shape.radiusSm};
      --brand-radius: ${shape.radius};
      --brand-radius-lg: ${shape.radiusLg};
      --brand-radius-xl: ${shape.radiusXl};
      --brand-radius-full: ${shape.radiusFull};
    }
  `.replace(/\n\s{4}/g, '\n').trim();
}
