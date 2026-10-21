import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FinalCta } from "@/components/home/FinalCta";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { categories, getCategory, getServicesByCategory } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";
import type { CategorySlug } from "@/lib/types";

const titles: Record<CategorySlug, string> = {
  "kitchen-bathroom": "Kitchen and Bathroom Pest Control in Pune",
  apartment: "Apartment Pest Control in Pune",
  "independent-house": "Bungalow Pest Control in Pune",
  "insect-bug": "Cockroach and Bed Bug Control in Pune",
  rodent: "Rodent Control in Pune",
  commercial: "Commercial Pest Control in Pune",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return pageMetadata(titles[category.slug], category.summary, `/services/${category.slug}`);
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const items = getServicesByCategory(category.slug);
  const propertyLink = ["apartment", "independent-house", "kitchen-bathroom", "commercial"].includes(category.slug)
    ? `/book?property=${category.slug}`
    : "/book";

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Services", href: "/services" },
            { name: category.name, href: `/services/${category.slug}` },
          ]}
        />
        <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest">Pune</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-deep md:text-5xl">{titles[category.slug]}</h1>
            <p className="mt-4 text-base leading-7 text-charcoal/80">{category.summary}</p>
            <div className="mt-6">
              <ButtonLink href={propertyLink}>Enquire in this category</ButtonLink>
            </div>
          </div>
          <div className="relative min-h-72 overflow-hidden rounded-[28px]">
            <Image src={category.image} alt={category.imageAlt} fill className="object-cover" sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
        </div>
        {items.length === 0 ? (
          <p className="mt-10 rounded-3xl border border-dashed border-line bg-white p-6">No services are listed in this category yet.</p>
        ) : (
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {items.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </section>
      <FinalCta />
    </>
  );
}
