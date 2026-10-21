import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest">404</p>
      <h1 className="mt-3 text-4xl font-semibold text-deep">That page is not on this site</h1>
      <p className="mt-4 text-sm leading-7 text-charcoal/75">
        The link may be out of date. You can browse the Pune service catalogue or send an enquiry.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <ButtonLink href="/services">View services</ButtonLink>
        <ButtonLink href="/" variant="secondary">
          Go home
        </ButtonLink>
      </div>
    </section>
  );
}
