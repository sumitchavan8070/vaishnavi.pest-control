import type { Metadata } from "next";
import { FinalCta } from "@/components/home/FinalCta";
import { Accordion } from "@/components/ui/Accordion";
import { PageHero } from "@/components/ui/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqs } from "@/lib/faqs";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Pest Control FAQ for Pune",
  "Pest control questions for Pune: cost, cockroaches, bed bugs, rats, kitchen preparation, pets, revisits, and which areas are covered.",
  "/faq",
);

export default function FaqPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <PageHero eyebrow="FAQ" title="Pest control questions in Pune">
        <p>
          These answers follow the published catalogue and the contact details on the current website. Where a treatment can vary, the answer says so instead of offering a guarantee.
        </p>
      </PageHero>
      <section className="mx-auto max-w-3xl px-4 py-12 md:px-6">
        <Accordion items={faqs} />
      </section>
      <FinalCta />
    </>
  );
}
