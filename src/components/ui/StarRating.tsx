import { Star } from "lucide-react";
import { formatCount } from "@/lib/format";

interface StarRatingProps {
  value: number;
  count?: number;
  note?: string;
  size?: "sm" | "md";
}

export function StarRating({ value, count, note, size = "sm" }: StarRatingProps) {
  const width = `${Math.max(0, Math.min(5, value)) / 5 * 100}%`;
  const icon = size === "md" ? "h-5 w-5" : "h-4 w-4";
  const label = count
    ? `Rated ${value.toFixed(1)} out of 5 from ${formatCount(count)} reviews`
    : `Rated ${value.toFixed(1)} out of 5`;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative" aria-hidden="true">
          <div className="flex text-charcoal/15">
            {Array.from({ length: 5 }, (_, index) => (
              <Star key={index} className={`${icon} fill-current`} />
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width }}>
            <div className="flex w-max text-sun">
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} className={`${icon} fill-current`} />
              ))}
            </div>
          </div>
        </div>
        <span className="sr-only">{label}</span>
        <span className="text-sm font-semibold text-deep">{value.toFixed(1)}</span>
        {typeof count === "number" ? (
          <span className="text-sm text-charcoal/70">{formatCount(count)} reviews</span>
        ) : null}
      </div>
      {note ? <p className="mt-1 text-xs leading-5 text-charcoal/60">{note}</p> : null}
    </div>
  );
}
