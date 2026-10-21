"use client";

import { business } from "@/lib/business";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-4xl font-semibold text-deep">This page could not be loaded</h1>
      <p className="mt-4 text-sm leading-7 text-charcoal/75">
        Try again, or call {business.phones[0].display} and the team can help directly.
      </p>
      <button type="button" onClick={reset} className="mt-6 min-h-11 rounded-full bg-forest px-5 text-sm font-semibold text-white">
        Try again
      </button>
    </section>
  );
}
