import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { business } from "@/lib/business";
import { punePestKeywords, punePlaces } from "@/lib/seo";
import { categories } from "@/lib/services";
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
    "Pest control in Pune for cockroaches, bed bugs, rats, kitchens, apartments, bungalows, and shops. Starting prices from Vaishnavi Pest Control, Kothrud.",
  keywords: punePestKeywords,
  applicationName: "Vaishnavi Pest Control",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Vaishnavi Pest Control",
    title: "Pest Control Services in Pune | Vaishnavi Pest Control",
    description:
      "Pest control in Pune for cockroaches, bed bugs, rats, kitchens, apartments, bungalows, and shops. Starting prices from Vaishnavi Pest Control, Kothrud.",
    images: [
      {
        url: "/images/Family Comfort with Pest Control Care.png",
        width: 1536,
        height: 1024,
        alt: "A family and their dog on a living-room sofa",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  other: {
    "geo.region": "IN-MH",
    "geo.placename": "Pune",
  },
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
    areaServed: punePlaces(),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Pest control services in Pune",
      itemListElement: categories.map((category) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: `${category.shortName} pest control in Pune`,
        },
      })),
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
