import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/lib/cartContext";
import { getNavigationConfig, getSiteConfig } from "@/lib/config";
import PageContainer from "@/components/PageContainer";
import WhatsAppButton from "@/components/WhatsAppButton";

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
          <div className="flex flex-col min-h-screen">
            <Navigation navConfig={navConfig} features={siteConfig.features} />
            <CartDrawer />
            <main className="flex-1">{children}</main>
            <footer className="bg-gray-900 dark:bg-slate-950 text-white">
            <PageContainer className="py-12 sm:py-16">
              {/* Top grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                {/* Brand */}
                <div className="col-span-2 sm:col-span-2 md:col-span-1">
                  <h3 className="text-lg font-black mb-2 text-white">{siteConfig.site.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{siteConfig.site.description}</p>
                  {/* Social */}
                  <div className="flex gap-3">
                    {navConfig.social.map((social) => (
                      <a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-blue-600 text-gray-400 hover:text-white transition-all text-sm"
                        aria-label={social.platform}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Footer links — split into pairs for tablet */}
                {navConfig.footer.map((link) => (
                  <div key={link.href}>
                    <a href={link.href} className="text-gray-300 hover:text-blue-400 transition-colors text-sm font-medium">
                      {link.label}
                    </a>
                  </div>
                ))}
              </div>

              {/* Bottom bar */}
              <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-gray-500 text-xs sm:text-sm">
                  © 2026 {siteConfig.site.name}. Tutti i diritti riservati.
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span>🔒 Pagamenti sicuri</span>
                  <span>🛡️ Garanzia 30 giorni</span>
                </div>
              </div>
            </PageContainer>
          </footer>
          {siteConfig.whatsapp?.enabled && (
            <WhatsAppButton
              phone={siteConfig.whatsapp.phone}
              message={siteConfig.whatsapp.message}
              tooltip={siteConfig.whatsapp.tooltip}
            />
          )}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
