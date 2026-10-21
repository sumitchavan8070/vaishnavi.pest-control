import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { formatDuration, formatInr } from "@/lib/format";
import { getCategory } from "@/lib/services";
import type { Service } from "@/lib/types";
import { StarRating } from "@/components/ui/StarRating";

export function ServiceCard({ service, layout = "grid" }: { service: Service; layout?: "grid" | "row" }) {
  const category = getCategory(service.category);
  const href = `/services/${service.category}/${service.slug}`;
  const price = formatInr(service.startingPrice);
  const duration = formatDuration(service.durationMinutes);

  return (
    <article
      className={
        layout === "row"
          ? "grid overflow-hidden rounded-3xl border border-line bg-white shadow-[0_12px_40px_rgba(6,78,59,0.05)] motion-safe:transition hover:-translate-y-0.5 md:grid-cols-[240px_1fr]"
          : "flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-[0_12px_40px_rgba(6,78,59,0.05)] motion-safe:transition hover:-translate-y-1"
      }
    >
      <div className={layout === "row" ? "relative min-h-48" : "relative aspect-[16/10]"}>
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          sizes={layout === "row" ? "(min-width: 768px) 240px, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-deep">
          {category?.name}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold leading-snug text-deep">
          <Link href={href} className="hover:text-forest">
            {service.name}
          </Link>
        </h3>
        <div className="mt-3">
          <StarRating value={service.rating} count={service.reviewCount} />
        </div>
        <p className="mt-3 text-sm leading-6 text-charcoal/80">{service.description}</p>
        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/50">Starting at</p>
            <p className="mt-1 text-xl font-semibold text-forest">{price}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/50">Duration</p>
            <p className="mt-1 inline-flex items-center justify-end gap-1 text-sm font-semibold text-deep">
              <Clock className="h-4 w-4 text-forest" aria-hidden="true" />
              {duration}
            </p>
          </div>
        </div>
        {service.freeRevisit ? (
          <p className="mt-3 rounded-2xl bg-lime/25 px-3 py-2 text-sm font-medium text-deep">
            Free revisit if pests return
          </p>
        ) : null}
        <div className="mt-4 flex items-center justify-between gap-3">
          <Link
            href={href}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-forest px-4 text-sm font-semibold text-white hover:bg-deep"
          >
            View details
          </Link>
          <p className="text-xs text-charcoal/60">
            {service.optionCount === null ? "Options not specified" : `${service.optionCount} plan options`}
          </p>
        </div>
      </div>
    </article>
  );
}
