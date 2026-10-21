import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { business } from "@/lib/business";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Terms of Use",
  "Terms for using the Vaishnavi Pest Control website, including starting prices, enquiries, and cancellations.",
  "/terms",
);

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Terms" title="Terms of use">
        <p>These terms explain what this website does and does not confirm. They are a practical summary, not a substitute for the instructions you receive on the day of a visit.</p>
      </PageHero>
      <section className="mx-auto max-w-3xl space-y-5 px-4 py-12 text-sm leading-7 text-charcoal/85 md:px-6">
        <p>
          Vaishnavi Pest Control offers pest control services in Pune, Maharashtra. Prices on this website are starting prices in Indian rupees. They are not a fixed quote for every property. The final price and the treatment can change after the property and the infestation are understood.
        </p>
        <p>
          An enquiry submitted here is a request. It does not reserve a technician, confirm a time, or create a paid order. A preferred time window is a preference. It is shown as available only if a booking system confirms it, and no such availability feed is connected to this site.
        </p>
        <p>
          Preparation, re-entry, and the care of children and pets depend on the product used for the selected service. Follow the technician’s instructions. A free revisit if pests return applies only where the service description states it: Pest Control (Includes Utensil Removal).
        </p>
        <p>
          There is no online account for rescheduling. Call {business.phones[0].display} or {business.phones[1].display} to change or cancel a request. Do so as early as you can.
        </p>
        <p>
          Photographs of kitchens, homes, and workplaces are illustrative stock photographs. They are not photographs of customer properties or of completed jobs. Written reviews are reproduced from the business website and are the customers’ own words.
        </p>
        <p>The published street address is {business.publishedAddress.street}, {business.publishedAddress.locality} {business.publishedAddress.postalCode}. The catalogue also lists {business.listedLocation}.</p>
      </section>
    </>
  );
}
