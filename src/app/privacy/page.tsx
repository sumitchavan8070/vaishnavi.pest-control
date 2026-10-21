import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { business } from "@/lib/business";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Privacy Policy",
  "How Vaishnavi Pest Control uses the name, phone number, and property details you send through this website.",
  "/privacy",
);

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Privacy" title="Privacy policy">
        <p>This page explains what the website does with an enquiry. It is written in plain language for customers in Pune.</p>
      </PageHero>
      <section className="mx-auto max-w-3xl space-y-5 px-4 py-12 text-sm leading-7 text-charcoal/85 md:px-6">
        <p>
          If you use the enquiry or contact form, you are asked for your name, mobile number, and details about the property or pest problem. A booking enquiry also asks for a Pune locality, address, preferred date, and preferred time window. You can add optional notes.
        </p>
        <p>
          The form is used to help the team reply. This website does not take card numbers, UPI IDs, or other payment details. If no enquiry webhook is configured, the form does not store the request in a database. It prepares a WhatsApp message or asks you to call. If a webhook is configured by the business, the same details are sent to that endpoint so the team can reply. Delivery is not the same thing as a confirmed appointment.
        </p>
        <p>
          WhatsApp messages are sent by you through WhatsApp. Their handling is then covered by WhatsApp as well as by the business that receives them.
        </p>
        <p>
          The site uses the published business phone numbers and, when configured, the business WhatsApp number. It does not sell enquiry details. To ask about this policy, call {business.phones[0].display}. No separate privacy email is published.
        </p>
      </section>
    </>
  );
}
