import type { Metadata } from "next";
import { FinalCta } from "@/components/home/FinalCta";
import { ReviewList } from "@/components/reviews/ReviewList";
import { PageHero } from "@/components/ui/PageHero";
import { StarRating } from "@/components/ui/StarRating";
import { business } from "@/lib/business";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Customer Reviews",
  "Written reviews published by Vaishnavi Pest Control, shown separately from the supplied 4.7 overall rating.",
  "/reviews",
);

function pageNumber(value: string | string[] | undefined): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const page = pageNumber(params.page);

  return (
    <>
      <PageHero eyebrow="Reviews" title="Reviews published by the business">
        <p>
          Only reviews already published on vaishnavipestcontrol.in are shown. Names are shortened the way the original site published them. No extra customers, star scores, or review-platform badges have been added.
        </p>
      </PageHero>
      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="mb-8 max-w-md rounded-3xl border border-line bg-white p-5">
          <StarRating value={business.overallRating} count={business.overallReviews} size="md" note={business.ratingNote} />
          <p className="mt-3 text-sm leading-6 text-charcoal/70">
            A 2019 review mentions a six-month warranty for one termite and bed bug visit. That is the customer’s account of that job. It is not shown here as a current warranty for every service.
          </p>
        </div>
        <ReviewList page={page} path="/reviews" />
      </section>
      <FinalCta />
    </>
  );
}
