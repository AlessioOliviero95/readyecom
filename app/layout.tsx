import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/lib/cartContext";
import { getNavigationConfig, getSiteConfig } from "@/lib/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReadyEcom - Piattaforma Educativa",
  description: "Sviluppa le tue capacità cognitive con corsi innovativi e interattivi",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navConfig = await getNavigationConfig();
  const siteConfig = await getSiteConfig();

  return (
    <html lang="it" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <Navigation navConfig={navConfig} features={siteConfig.features} />
          <CartDrawer />
          {children}
          <footer className="bg-gray-900 dark:bg-slate-950 text-white mt-20">
            <div className="container mx-auto px-4 py-16">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-blue-400">{siteConfig.site.name}</h3>
                  <p className="text-gray-400">{siteConfig.site.description}</p>
                </div>
                {navConfig.footer.map((link) => (
                  <div key={link.href} className="flex flex-col">
                    <a href={link.href} className="text-gray-400 hover:text-blue-400 transition-colors">
                      {link.label}
                    </a>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-800 pt-8">
                <div className="flex gap-6 justify-center">
                  {navConfig.social.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
                <p className="text-center text-gray-500 mt-8 text-sm">
                  © 2026 {siteConfig.site.name}. Tutti i diritti riservati.
                </p>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
