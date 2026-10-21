import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/home/FinalCta";
import { CategoryGrid } from "@/components/services/CategoryGrid";
import { ServiceCard } from "@/components/services/ServiceCard";
import { PageHero } from "@/components/ui/PageHero";
import { categories, filterServices } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Pest Control Services in Pune",
  "Compare pest control in Pune: kitchen, bathroom, apartment, bungalow, cockroach, bed bug, rat, and office or shop treatment, with starting prices.",
  "/services",
);

function one(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const property = one(params.property);
  const issue = one(params.issue);
  const activeIssue = issue === "general" ? "" : issue;
  const filtered = filterServices(property, activeIssue);
  const filtering = Boolean(property || activeIssue);

  return (
    <>
      <PageHero eyebrow="Pune catalogue" title="All pest control services">
        <p>
          Choose a category or compare every published starting price. Plan options are counted where the catalogue gives a number, and they are not invented where it does not.
        </p>
      </PageHero>
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <CategoryGrid />
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-deep">
            {filtering ? `${filtered.length} matching services` : "Every listed service"}
          </h2>
          {filtering ? (
            <Link href="/services" className="text-sm font-semibold text-forest">
              Clear filters
            </Link>
          ) : null}
        </div>
        {filtered.length === 0 ? (
          <p className="mt-6 rounded-3xl border border-dashed border-line bg-white p-6 text-sm leading-6 text-charcoal/75">
            Nothing in the catalogue matches that filter.{" "}
            <Link href="/services" className="font-semibold text-forest">
              View every service
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="font-semibold text-forest">
              contact the team
            </Link>
            .
          </p>
        ) : (
          <div className="mt-6 grid gap-5">
            {filtered.map((service) => (
              <ServiceCard key={service.id} service={service} layout="row" />
            ))}
          </div>
        )}
        <ul className="mt-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link href={`/services/${category.slug}`} className="inline-flex min-h-10 items-center rounded-full border border-line bg-white px-4 text-sm font-semibold text-deep hover:border-forest">
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <FinalCta />
    </>
  );
}
