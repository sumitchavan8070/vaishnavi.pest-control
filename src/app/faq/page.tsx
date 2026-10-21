import type { Metadata } from "next";
import { FinalCta } from "@/components/home/FinalCta";
import { Accordion } from "@/components/ui/Accordion";
import { PageHero } from "@/components/ui/PageHero";
import { faqs } from "@/lib/faqs";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Pest Control FAQ for Pune",
  "Answers about pests treated, starting prices, visit length, kitchen preparation, pets, revisits, Pune coverage, and cancellations.",
  "/faq",
);

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Questions people ask before a visit">
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
