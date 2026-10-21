import type { Metadata } from "next";
import { EnquiryFlow } from "@/components/booking/EnquiryFlow";
import { business } from "@/lib/business";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Book Pest Control in Pune",
  "Book pest control in Pune. Choose a service, a Pune locality, and a preferred time. The request is not a confirmed booking until the team accepts it.",
  "/book",
);

function one(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  return (
    <section className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest">Pune enquiry</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-deep">Request a visit</h1>
      <p className="mt-4 text-base leading-7 text-charcoal/80">
        Work through the six steps, then send the request. Preferred times are requests only. Call {business.phones[0].display} if you would rather speak to someone now.
      </p>
      <div className="mt-8">
        <EnquiryFlow
          initial={{
            service: one(params.service),
            property: one(params.property),
            issue: one(params.issue),
            date: one(params.date),
            locality: one(params.locality),
          }}
        />
      </div>
    </section>
  );
}
