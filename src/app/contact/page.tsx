import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/ui/PageHero";
import { business } from "@/lib/business";
import { pageMetadata } from "@/lib/seo";
import { whatsAppHref } from "@/lib/whatsapp";

export const metadata: Metadata = pageMetadata(
  "Contact Pest Control in Pune",
  "Call or WhatsApp Vaishnavi Pest Control in Pune. Published address: Plot No. 74, Karve Road, Kothrud, Pune 411052. Kasba Peth is also listed.",
  "/contact",
);

export default function ContactPage() {
  const whatsapp = whatsAppHref();

  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to the Pune team">
        <p>
          Call either published number, send a WhatsApp message, or use the form. The form is an enquiry. It does not confirm a visit, and a map is not shown because exact coordinates were not verified.
        </p>
      </PageHero>
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5 rounded-3xl border border-line bg-white p-6">
          <div>
            <h2 className="font-semibold text-deep">Published address</h2>
            <p className="mt-2 text-sm leading-6 text-charcoal/80">
              {business.publishedAddress.street}
              <br />
              {business.publishedAddress.locality}, {business.publishedAddress.region} {business.publishedAddress.postalCode}
              <br />
              {business.publishedAddress.country}
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-deep">Listed service location</h2>
            <p className="mt-2 text-sm leading-6 text-charcoal/80">{business.listedLocation}</p>
          </div>
          <div>
            <h2 className="font-semibold text-deep">Service area</h2>
            <p className="mt-2 text-sm leading-6 text-charcoal/80">{business.serviceArea}. Share your locality so the team can confirm attendance.</p>
          </div>
          <div>
            <h2 className="font-semibold text-deep">Phone</h2>
            <ul className="mt-2 space-y-2">
              {business.phones.map((phone) => (
                <li key={phone.id}>
                  <a href={phone.tel} className="font-semibold text-forest">
                    {phone.display}
                  </a>
                  <span className="ml-2 text-sm text-charcoal/60">{phone.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-deep">WhatsApp</h2>
            {whatsapp ? (
              <a href={whatsapp} target="_blank" rel="noreferrer" className="mt-2 inline-flex font-semibold text-forest">
                Message {business.phones[0].display}
              </a>
            ) : (
              <p className="mt-2 text-sm text-charcoal/70">WhatsApp is hidden until a number is configured.</p>
            )}
          </div>
          <div>
            <h2 className="font-semibold text-deep">Email and hours</h2>
            <p className="mt-2 text-sm leading-6 text-charcoal/80">
              {business.email ? (
                <a href={`mailto:${business.email}`} className="font-semibold text-forest">
                  {business.email}
                </a>
              ) : (
                "No public email address is listed."
              )}
            </p>
            <p className="mt-2 text-sm leading-6 text-charcoal/80">Opening hours are not published. Call before visiting the Kothrud address.</p>
          </div>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
