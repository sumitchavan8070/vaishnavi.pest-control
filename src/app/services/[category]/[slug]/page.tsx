import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Clock, Minus } from "lucide-react";
import { ServiceCard } from "@/components/services/ServiceCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { StarRating } from "@/components/ui/StarRating";
import { business } from "@/lib/business";
import { formatDuration, formatInr } from "@/lib/format";
import { getCategory, getRelatedServices, getService, services } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";
import { whatsAppHref } from "@/lib/whatsapp";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ category: service.category, slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const service = getService(category, slug);
  if (!service) return {};
  return pageMetadata(
    `${service.name} in Pune`,
    `${service.description} Starting at ${formatInr(service.startingPrice)}. Estimated duration ${formatDuration(service.durationMinutes)}.`,
    `/services/${service.category}/${service.slug}`,
  );
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const service = getService(category, slug);
  if (!service) notFound();
  const categoryInfo = getCategory(service.category);
  const related = getRelatedServices(service);
  const price = formatInr(service.startingPrice);
  const duration = formatDuration(service.durationMinutes);
  const propertyQuery = ["apartment", "independent-house", "kitchen-bathroom", "commercial"].includes(service.category)
    ? `&property=${service.category}`
    : "";
  const bookHref = `/book?service=${service.slug}${propertyQuery}`;
  const whatsapp = whatsAppHref({
    serviceName: service.name,
    startingPrice: price,
  });
  const phone = business.phones[0];
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: categoryInfo?.name,
    description: service.description,
    areaServed: { "@type": "City", name: "Pune" },
    provider: {
      "@type": "PestControlService",
      name: business.name,
      telephone: phone.e164,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: service.startingPrice,
        priceCurrency: "INR",
      },
      description: "Starting price. The final price depends on inspection and property conditions.",
      url: `${business.siteUrl}/services/${service.category}/${service.slug}`,
    },
  };

  return (
    <article className="mx-auto max-w-6xl px-4 py-8 pb-28 md:px-6 md:pb-12">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: categoryInfo?.name ?? "Category", href: `/services/${service.category}` },
          { name: service.name, href: `/services/${service.category}/${service.slug}` },
        ]}
      />
      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <div className="relative aspect-[16/9] overflow-hidden rounded-[28px]">
            <Image src={service.image} alt={service.imageAlt} fill priority className="object-cover" sizes="(min-width: 1024px) 60vw, 100vw" />
            <p className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-charcoal/70">
              Illustrative photograph
            </p>
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-forest">{categoryInfo?.name} · Pune</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-deep">{service.name}</h1>
          <div className="mt-4">
            <StarRating value={service.rating} count={service.reviewCount} note="Rating supplied for this service." />
          </div>
          <p className="mt-5 text-base leading-7 text-charcoal/85">{service.overview}</p>
          <p className="mt-4 rounded-2xl bg-mist px-4 py-3 text-sm leading-6 text-charcoal/80">
            Final pricing and the treatment recommendation may depend on inspection and property conditions. {price} is the starting price, not a fixed quote.
          </p>
          {service.freeRevisit ? (
            <p className="mt-4 rounded-2xl bg-lime/30 px-4 py-3 text-sm font-medium text-deep">
              Utensil removal included + free revisit if pests return.
            </p>
          ) : null}

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <section className="rounded-3xl border border-line bg-white p-5">
              <h2 className="text-lg font-semibold text-deep">What is included</h2>
              <ul className="mt-3 space-y-2">
                {service.includes.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-6 text-charcoal/80">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-forest" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <section className="rounded-3xl border border-line bg-white p-5">
              <h2 className="text-lg font-semibold text-deep">What is not included</h2>
              {service.excludes.length === 0 ? (
                <p className="mt-3 text-sm leading-6 text-charcoal/75">
                  The published description does not list an exclusion. Ask the team to confirm the scope before the visit.
                </p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {service.excludes.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-6 text-charcoal/80">
                      <Minus className="mt-1 h-4 w-4 shrink-0 text-charcoal/50" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-deep">Where this treatment fits</h2>
            <p className="mt-3 text-sm leading-7 text-charcoal/80">{service.suitableFor}</p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-deep">Before the visit</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-charcoal/80">
              {service.preparation.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-deep">After the visit</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-charcoal/80">
              {service.aftercare.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mt-8 rounded-3xl border border-line bg-white p-5">
            <h2 className="text-2xl font-semibold text-deep">Plan options</h2>
            {service.optionCount === null ? (
              <p className="mt-3 text-sm leading-7 text-charcoal/80">
                The number of plan options was not specified for this service. The starting price is {price}. Contact the team for a recommendation instead of relying on a variant list.
              </p>
            ) : (
              <p className="mt-3 text-sm leading-7 text-charcoal/80">
                This service lists {service.optionCount} plan options. Their names and price differences are not published, so they are not shown here. The starting price is {price}. Ask which option fits the property.
              </p>
            )}
            <Link href={bookHref} className="mt-4 inline-flex min-h-11 items-center rounded-full bg-forest px-5 text-sm font-semibold text-white">
              Ask about options
            </Link>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-deep">Questions about this service</h2>
            <div className="mt-4">
              <Accordion items={service.faqs} />
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-3xl border border-line bg-white p-5 shadow-[0_12px_40px_rgba(6,78,59,0.05)] lg:sticky lg:top-24">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/50">Starting at</p>
          <p className="mt-1 text-3xl font-semibold text-forest">{price}</p>
          <p className="mt-2 flex items-center gap-2 text-sm font-medium text-deep">
            <Clock className="h-4 w-4 text-forest" aria-hidden="true" />
            About {duration}
          </p>
          <p className="mt-3 text-sm leading-6 text-charcoal/70">
            The final price can change after the property is understood. This panel does not confirm a slot.
          </p>
          <Link href={bookHref} className="mt-5 flex min-h-11 items-center justify-center rounded-full bg-forest px-5 text-sm font-semibold text-white hover:bg-deep">
            Enquire about this service
          </Link>
          <a href={phone.tel} className="mt-3 flex min-h-11 items-center justify-center rounded-full border border-line px-5 text-sm font-semibold text-deep">
            Call {phone.display}
          </a>
          {whatsapp ? (
            <a href={whatsapp} target="_blank" rel="noreferrer" className="mt-3 flex min-h-11 items-center justify-center rounded-full border border-line px-5 text-sm font-semibold text-deep">
              WhatsApp this service
            </a>
          ) : null}
        </aside>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-deep">Related services</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {related.map((item) => (
            <ServiceCard key={item.id} service={item} />
          ))}
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white p-3 md:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-charcoal/60">Starting at</p>
            <p className="text-lg font-semibold text-forest">{price}</p>
          </div>
          <Link href={bookHref} className="inline-flex min-h-11 items-center rounded-full bg-forest px-5 text-sm font-semibold text-white">
            Enquire
          </Link>
        </div>
      </div>
      <JsonLd data={schema} />
    </article>
  );
}
