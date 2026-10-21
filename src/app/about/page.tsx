import type { Metadata } from "next";
import { FinalCta } from "@/components/home/FinalCta";
import { PageHero } from "@/components/ui/PageHero";
import { business } from "@/lib/business";
import { otherPublishedServices } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Pest Control Company in Pune",
  "Vaishnavi Pest Control serves homes, apartments, and shops in Pune. The published address is in Kothrud, and the catalogue lists Kasba Peth.",
  "/about",
);

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="A Pune pest control team you can call directly">
        <p>
          Vaishnavi Pest Control describes itself as a professionally managed company working on residential and commercial pest control, with the aim of making homes easier to live in. This website keeps the published contact details and separates them from prices that were not listed.
        </p>
      </PageHero>
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-2 md:px-6">
        <div className="space-y-4 text-base leading-7 text-charcoal/85">
          <p>
            The business says its team works on residential and commercial properties and that treatment is planned around the problem in front of them. The older website also says the company wants its work to have a lasting effect. Those are the company’s own words about how it works. They are not a certificate, a guarantee, or a promise that every product is safe for every household.
          </p>
          <p>
            Service recommendations on this site come from the priced catalogue: kitchens and bathrooms, apartments, independent houses, cockroach treatment, bed bug treatment, rodent control, and offices or shops. A free revisit if pests return is stated only for Pest Control (Includes Utensil Removal).
          </p>
          <p>
            The current website also names other work that does not have a price in this catalogue. Call before assuming it is available on the same terms.
          </p>
        </div>
        <aside className="rounded-3xl border border-line bg-white p-6">
          <h2 className="text-lg font-semibold text-deep">Published details</h2>
          <dl className="mt-4 space-y-4 text-sm leading-6">
            <div>
              <dt className="font-semibold text-deep">Address on the current website</dt>
              <dd className="text-charcoal/80">
                {business.publishedAddress.street}, {business.publishedAddress.locality}, {business.publishedAddress.region} {business.publishedAddress.postalCode}, {business.publishedAddress.country}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-deep">Listed service location</dt>
              <dd className="text-charcoal/80">{business.listedLocation}</dd>
            </div>
            <div>
              <dt className="font-semibold text-deep">Phone</dt>
              <dd className="space-y-1">
                {business.phones.map((phone) => (
                  <a key={phone.id} href={phone.tel} className="block font-semibold text-forest">
                    {phone.display}
                  </a>
                ))}
              </dd>
            </div>
          </dl>
          <h3 className="mt-6 font-semibold text-deep">Also named on the current website</h3>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-charcoal/80">
            {otherPublishedServices.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-5 text-charcoal/60">No prices are shown for these because none were supplied.</p>
        </aside>
      </section>
      <FinalCta />
    </>
  );
}
