import { business } from "@/lib/business";
import { ButtonLink } from "@/components/ui/Button";

export function FinalCta() {
  const phone = business.phones[0];

  return (
    <section className="relative overflow-hidden bg-deep text-white">
      <svg aria-hidden="true" className="pointer-events-none absolute -right-6 bottom-0 h-64 w-64 text-lime/25" viewBox="0 0 120 120">
        <path fill="currentColor" d="M62 6c30 18 50 50 40 88-26-8-38-38-40-88Z" />
        <path fill="currentColor" d="M18 28c24 10 40 32 34 66-20-12-30-36-34-66Z" />
        <path d="M64 16c8 20 12 40 10 64" stroke="#064E3B" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
      <div className="relative mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <h2 className="max-w-xl text-4xl font-semibold tracking-tight md:text-5xl">Ready to Take Back Your Space?</h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-white/75">
          Share the service, the property, and a time that suits you. The team confirms availability and the final price before any visit is booked.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/book" variant="inverse">
            Book a Service
          </ButtonLink>
          <a
            href={phone.tel}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/30 px-5 text-sm font-semibold hover:bg-white/10"
          >
            Call Us
          </a>
        </div>
      </div>
    </section>
  );
}
