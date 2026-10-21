import Link from "next/link";
import { reviewPageSize, reviews } from "@/lib/reviews";

export function ReviewList({
  page,
  path,
  compact = false,
}: {
  page: number;
  path: string;
  compact?: boolean;
}) {
  const totalPages = Math.max(1, Math.ceil(reviews.length / reviewPageSize));
  const current = Number.isFinite(page) ? Math.min(Math.max(page, 1), totalPages) : 1;
  const visible = reviews.slice((current - 1) * reviewPageSize, current * reviewPageSize);

  return (
    <div>
      {visible.length === 0 ? (
        <p className="rounded-3xl border border-dashed border-line bg-white p-6 text-sm text-charcoal/70">
          No written reviews are available to show.
        </p>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {visible.map((review) => (
            <figure key={review.id} className="flex h-full flex-col rounded-3xl border border-line bg-white p-5">
              <blockquote className="flex-1 text-sm leading-7 text-charcoal/85">“{review.quote}”</blockquote>
              <figcaption className="mt-4 border-t border-line pt-4">
                <p className="font-semibold text-deep">{review.author}</p>
                <p className="mt-1 text-sm text-charcoal/70">{review.context}</p>
                <p className="mt-1 text-xs text-charcoal/55">{review.source}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
      <nav aria-label="Review pages" className="mt-5 flex items-center justify-between gap-3">
        {current > 1 ? (
          <Link href={`${path}?page=${current - 1}`} className="min-h-11 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-deep">
            Previous
          </Link>
        ) : (
          <span className="min-h-11 rounded-full border border-line px-4 py-2 text-sm font-semibold text-charcoal/35">
            Previous
          </span>
        )}
        <p className="text-sm text-charcoal/70">
          Page {current} of {totalPages}
        </p>
        {current < totalPages && !compact ? (
          <Link href={`${path}?page=${current + 1}`} className="min-h-11 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-deep">
            Next
          </Link>
        ) : compact ? (
          <Link href="/reviews" className="min-h-11 rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white">
            All reviews
          </Link>
        ) : (
          <span className="min-h-11 rounded-full border border-line px-4 py-2 text-sm font-semibold text-charcoal/35">
            Next
          </span>
        )}
      </nav>
    </div>
  );
}
