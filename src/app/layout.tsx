import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { business } from "@/lib/business";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: "Pest Control Services in Pune | Vaishnavi Pest Control",
    template: "%s | Vaishnavi Pest Control",
  },
  description:
    "Professional pest control for kitchens, apartments, independent houses, and commercial spaces in Pune. Compare starting prices and send an enquiry.",
  applicationName: "Vaishnavi Pest Control",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Vaishnavi Pest Control",
    images: [
      {
        url: "/images/hero-living.jpg",
        width: 1800,
        height: 1350,
        alt: "Sunlit living room with a sofa, armchairs, and houseplants",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "PestControlService"],
    name: business.name,
    url: business.siteUrl,
    telephone: business.phones[0].e164,
    image: `${business.siteUrl}/brand/logo-lockup.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.publishedAddress.street,
      addressLocality: business.publishedAddress.locality,
      addressRegion: business.publishedAddress.region,
      postalCode: business.publishedAddress.postalCode,
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "City",
      name: "Pune",
    },
    sameAs: [business.facebook],
  };

  return (
    <html lang="en-IN" className={manrope.variable}>
      <body className={`${manrope.className} antialiased`}>
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="content">{children}</main>
        <Footer />
        <WhatsAppButton />
        <JsonLd data={schema} />
      </body>
    </html>
  );
}
