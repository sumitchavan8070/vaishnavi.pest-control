import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/services";
import { categoryIcons } from "@/components/services/category-icons";

export function CategoryGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => {
        const Icon = categoryIcons[category.slug];
        return (
          <Link
            key={category.slug}
            href={`/services/${category.slug}`}
            className="group flex h-full flex-col rounded-3xl border border-line bg-white p-5 shadow-[0_10px_30px_rgba(6,78,59,0.04)] motion-safe:transition hover:-translate-y-1 hover:border-forest"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime/30 text-forest">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <span className="mt-4 text-lg font-semibold text-deep">{category.name}</span>
            <span className="mt-2 flex-1 text-sm leading-6 text-charcoal/75">{category.description}</span>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-forest">
              View services
              <ArrowRight className="h-4 w-4 motion-safe:transition group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
