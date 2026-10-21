"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { business, pestIssues, propertyTypes, puneLocalities, timeWindows } from "@/lib/business";
import type { EnquiryResponse } from "@/lib/enquiry";
import { formatInr } from "@/lib/format";
import { services } from "@/lib/services";
import {
  isPestIssue,
  isPropertyType,
  stepForBookingField,
  validateBooking,
  type BookingField,
  type BookingInput,
} from "@/lib/validation";
import { whatsAppHref } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

const steps = ["Service", "Property", "Address", "Time", "Contact", "Review"];

const empty: BookingInput = {
  serviceSlug: "",
  propertyType: "",
  locality: "",
  otherLocality: "",
  address: "",
  preferredDate: "",
  preferredWindow: "",
  name: "",
  phone: "",
  notes: "",
  consent: false,
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1 text-sm text-red-700">
      {message}
    </p>
  );
}

export function EnquiryFlow({
  initial,
}: {
  initial: { service?: string; property?: string; issue?: string; date?: string; locality?: string };
}) {
  const issueLabel = pestIssues.find((item) => item.id === initial.issue)?.label;
  const [form, setForm] = useState<BookingInput>({
    ...empty,
    serviceSlug: services.some((service) => service.slug === initial.service) ? initial.service ?? "" : "",
    propertyType: initial.property && isPropertyType(initial.property) ? initial.property : "",
    preferredDate: initial.date && /^\d{4}-\d{2}-\d{2}$/.test(initial.date) ? initial.date : "",
    locality: puneLocalities.some((item) => item === initial.locality) ? initial.locality ?? "" : "",
    notes: issueLabel && isPestIssue(initial.issue ?? "") ? `Pest issue: ${issueLabel}` : "",
  });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Partial<Record<BookingField, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "handoff" | "submitted" | "error">("idle");
  const [result, setResult] = useState<EnquiryResponse | null>(null);

  const selected = useMemo(
    () => services.find((service) => service.slug === form.serviceSlug),
    [form.serviceSlug],
  );

  function update<K extends keyof BookingInput>(key: K, value: BookingInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function validateCurrent(): boolean {
    const resultCheck = validateBooking(form);
    if (resultCheck.ok) {
      setErrors({});
      return true;
    }
    const relevant = Object.entries(resultCheck.fieldErrors).filter(
      ([field]) => stepForBookingField(field as BookingField) === step,
    );
    if (relevant.length === 0) {
      setErrors({});
      return true;
    }
    setErrors(Object.fromEntries(relevant));
    return false;
  }

  function next() {
    if (!validateCurrent()) return;
    setStep((value) => Math.min(value + 1, steps.length - 1));
  }

  async function submit() {
    const check = validateBooking(form);
    if (!check.ok) {
      setErrors(check.fieldErrors);
      const first = Object.keys(check.fieldErrors)[0] as BookingField | undefined;
      if (first) setStep(stepForBookingField(first));
      return;
    }

    setStatus("loading");
    setResult(null);
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "booking", ...form, consent: true }),
      });
      const data = (await response.json()) as EnquiryResponse;
      setResult(data);
      if (!response.ok || data.status === "error") {
        setStatus("error");
        if (data.fieldErrors) {
          setErrors(data.fieldErrors as Partial<Record<BookingField, string>>);
          const first = Object.keys(data.fieldErrors)[0] as BookingField | undefined;
          if (first) setStep(stepForBookingField(first));
        }
        return;
      }
      setStatus(data.status);
    } catch {
      setStatus("error");
      setResult({
        status: "error",
        message: "The enquiry could not be sent. Call or use WhatsApp instead.",
        whatsappUrl: whatsAppHref({
          serviceName: selected?.name,
          startingPrice: selected ? formatInr(selected.startingPrice) : undefined,
          locality: form.locality === "Other" ? form.otherLocality : form.locality,
        }),
      });
    }
  }

  if (status === "handoff" || status === "submitted") {
    return (
      <section className="rounded-3xl border border-line bg-white p-6 shadow-[0_12px_40px_rgba(6,78,59,0.05)] md:p-8" aria-live="polite">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-forest">
          {status === "submitted" ? "Enquiry sent" : "Enquiry ready to send"}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-deep">This is not a confirmed booking.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-charcoal/80">{result?.message}</p>
        <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-charcoal/55">Service</dt>
            <dd className="font-semibold text-deep">{selected?.name}</dd>
          </div>
          <div>
            <dt className="text-charcoal/55">Preferred time</dt>
            <dd className="font-semibold text-deep">
              {form.preferredDate} · {timeWindows.find((item) => item.id === form.preferredWindow)?.label}
            </dd>
          </div>
        </dl>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {result?.whatsappUrl ? (
            <a href={result.whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-full bg-forest px-5 font-semibold text-white">
              Send on WhatsApp
            </a>
          ) : null}
          <a href={business.phones[0].tel} className="inline-flex min-h-11 items-center justify-center rounded-full border border-line px-5 font-semibold text-deep">
            Call {business.phones[0].display}
          </a>
        </div>
      </section>
    );
  }

  return (
    <form
      className="rounded-3xl border border-line bg-white p-5 shadow-[0_12px_40px_rgba(6,78,59,0.05)] md:p-8"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        if (step < steps.length - 1) next();
        else void submit();
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-deep">
          Step {step + 1} of {steps.length}
        </p>
        <p className="text-sm text-charcoal/60">{steps[step]}</p>
      </div>
      <ol className="mt-3 grid grid-cols-6 gap-1" aria-label="Enquiry progress">
        {steps.map((label, index) => (
          <li key={label}>
            <button
              type="button"
              disabled={index > step}
              aria-current={index === step ? "step" : undefined}
              onClick={() => {
                if (index < step) setStep(index);
              }}
              className="flex h-11 items-center disabled:cursor-not-allowed"
            >
              <span
                className={cn("h-2 w-full rounded-full", index <= step ? "bg-forest" : "bg-line")}
              />
              <span className="sr-only">
                {label}
                {index < step ? ", completed" : index === step ? ", current" : ""}
              </span>
            </button>
          </li>
        ))}
      </ol>

      <div className="mt-6">
        {step === 0 ? (
          <fieldset>
            <legend className="text-xl font-semibold text-deep">Which service do you need?</legend>
            <div className="mt-4 grid gap-3">
              {services.map((service) => (
                <label key={service.id} className={cn("flex cursor-pointer gap-3 rounded-2xl border p-4", form.serviceSlug === service.slug ? "border-forest bg-mist" : "border-line")}>
                  <input
                    type="radio"
                    name="serviceSlug"
                    className="mt-1"
                    checked={form.serviceSlug === service.slug}
                    onChange={() => update("serviceSlug", service.slug)}
                  />
                  <span>
                    <span className="block font-semibold text-deep">{service.name}</span>
                    <span className="mt-1 block text-sm text-charcoal/70">
                      Starting at {formatInr(service.startingPrice)} · {service.description}
                    </span>
                  </span>
                </label>
              ))}
            </div>
            <FieldError message={errors.serviceSlug} />
          </fieldset>
        ) : null}

        {step === 1 ? (
          <fieldset>
            <legend className="text-xl font-semibold text-deep">What kind of property is it?</legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {propertyTypes.map((property) => (
                <label key={property.id} className={cn("flex cursor-pointer items-center gap-3 rounded-2xl border p-4", form.propertyType === property.id ? "border-forest bg-mist" : "border-line")}>
                  <input
                    type="radio"
                    name="propertyType"
                    checked={form.propertyType === property.id}
                    onChange={() => update("propertyType", property.id)}
                  />
                  <span className="font-medium text-deep">{property.label}</span>
                </label>
              ))}
            </div>
            <FieldError message={errors.propertyType} />
          </fieldset>
        ) : null}

        {step === 2 ? (
          <div className="grid gap-4">
            <h2 className="text-xl font-semibold text-deep">Where in Pune is the property?</h2>
            <label className="block text-sm font-semibold text-deep">
              Locality
              <select
                name="locality"
                value={form.locality}
                onChange={(event) => update("locality", event.target.value)}
                className="mt-1 w-full rounded-2xl border border-line bg-white px-3 py-3 font-medium"
              >
                <option value="">Select a locality</option>
                {puneLocalities.map((locality) => (
                  <option key={locality} value={locality}>
                    {locality}
                  </option>
                ))}
              </select>
              <FieldError message={errors.locality} />
            </label>
            {form.locality === "Other" ? (
              <label className="block text-sm font-semibold text-deep">
                Locality name
                <input
                  value={form.otherLocality}
                  onChange={(event) => update("otherLocality", event.target.value)}
                  className="mt-1 w-full rounded-2xl border border-line px-3 py-3 font-medium"
                />
                <FieldError message={errors.otherLocality} />
              </label>
            ) : null}
            <label className="block text-sm font-semibold text-deep">
              Address
              <textarea
                name="address"
                value={form.address}
                onChange={(event) => update("address", event.target.value)}
                rows={3}
                autoComplete="street-address"
                className="mt-1 w-full rounded-2xl border border-line px-3 py-3 font-medium"
                placeholder="Flat, building, street, and a nearby landmark"
              />
              <FieldError message={errors.address} />
            </label>
            <p className="text-sm leading-6 text-charcoal/70">
              Choosing a locality does not confirm that every neighbourhood is covered. The team confirms attendance after the enquiry.
            </p>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="grid gap-4">
            <h2 className="text-xl font-semibold text-deep">When would you prefer the visit?</h2>
            <p className="text-sm leading-6 text-charcoal/75">
              These are preferred times only. A window is not shown as available, and it is not reserved until the team confirms it.
            </p>
            <label className="block text-sm font-semibold text-deep">
              Preferred date
              <input
                type="date"
                name="preferredDate"
                value={form.preferredDate}
                onChange={(event) => update("preferredDate", event.target.value)}
                className="mt-1 w-full rounded-2xl border border-line px-3 py-3 font-medium"
              />
              <FieldError message={errors.preferredDate} />
            </label>
            <fieldset>
              <legend className="text-sm font-semibold text-deep">Preferred time window</legend>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {timeWindows.map((window) => (
                  <label key={window.id} className={cn("flex cursor-pointer gap-3 rounded-2xl border p-3", form.preferredWindow === window.id ? "border-forest bg-mist" : "border-line")}>
                    <input
                      type="radio"
                      name="preferredWindow"
                      checked={form.preferredWindow === window.id}
                      onChange={() => update("preferredWindow", window.id)}
                    />
                    <span>
                      <span className="block font-medium text-deep">{window.label}</span>
                      <span className="text-sm text-charcoal/65">{window.detail}</span>
                    </span>
                  </label>
                ))}
              </div>
              <FieldError message={errors.preferredWindow} />
            </fieldset>
          </div>
        ) : null}

        {step === 4 ? (
          <div className="grid gap-4">
            <h2 className="text-xl font-semibold text-deep">How should the team reach you?</h2>
            <label className="block text-sm font-semibold text-deep">
              Name
              <input
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={(event) => update("name", event.target.value)}
                className="mt-1 w-full rounded-2xl border border-line px-3 py-3 font-medium"
              />
              <FieldError message={errors.name} />
            </label>
            <label className="block text-sm font-semibold text-deep">
              Mobile number
              <input
                name="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                value={form.phone}
                onChange={(event) => update("phone", event.target.value)}
                className="mt-1 w-full rounded-2xl border border-line px-3 py-3 font-medium"
                placeholder="10-digit mobile number"
              />
              <FieldError message={errors.phone} />
            </label>
            <label className="block text-sm font-semibold text-deep">
              Pest details <span className="font-medium text-charcoal/50">(optional)</span>
              <textarea
                name="notes"
                value={form.notes}
                onChange={(event) => update("notes", event.target.value)}
                rows={4}
                className="mt-1 w-full rounded-2xl border border-line px-3 py-3 font-medium"
              />
              <FieldError message={errors.notes} />
            </label>
            <label className="flex items-start gap-3 text-sm leading-6 text-charcoal/80">
              <input
                type="checkbox"
                name="consent"
                checked={form.consent}
                onChange={(event) => update("consent", event.target.checked)}
                className="mt-1"
              />
              <span>I agree to be contacted about this enquiry by phone or WhatsApp. I understand this is not a confirmed appointment.</span>
            </label>
            <FieldError message={errors.consent} />
          </div>
        ) : null}

        {step === 5 ? (
          <div>
            <h2 className="text-xl font-semibold text-deep">Review the request</h2>
            <p className="mt-2 text-sm leading-6 text-charcoal/75">
              Sending this request does not reserve a slot or confirm a price. No payment is collected here.
            </p>
            <dl className="mt-4 divide-y divide-line rounded-2xl border border-line">
              {[
                ["Service", selected ? `${selected.name} · starting at ${formatInr(selected.startingPrice)}` : "Not selected"],
                ["Property", propertyTypes.find((item) => item.id === form.propertyType)?.label ?? "Not selected"],
                ["Locality", form.locality === "Other" ? form.otherLocality : form.locality],
                ["Address", form.address],
                ["Preferred date", form.preferredDate],
                ["Preferred time", timeWindows.find((item) => item.id === form.preferredWindow)?.detail ?? ""],
                ["Name", form.name],
                ["Phone", form.phone],
                ["Notes", form.notes || "None"],
              ].map(([label, value]) => (
                <div key={label} className="grid gap-1 px-4 py-3 sm:grid-cols-[140px_1fr]">
                  <dt className="text-sm text-charcoal/55">{label}</dt>
                  <dd className="text-sm font-medium text-deep">{value}</dd>
                </div>
              ))}
            </dl>
            {status === "error" && result ? (
              <p role="alert" className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-800">
                {result.message}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        {step > 0 ? (
          <button type="button" onClick={() => setStep((value) => value - 1)} className="min-h-11 rounded-full border border-line px-5 text-sm font-semibold text-deep">
            Back
          </button>
        ) : (
          <Link href="/services" className="inline-flex min-h-11 items-center justify-center text-sm font-semibold text-forest">
            Browse services instead
          </Link>
        )}
        <button
          type="submit"
          disabled={status === "loading"}
          className="min-h-11 rounded-full bg-forest px-5 text-sm font-semibold text-white hover:bg-deep disabled:opacity-60"
        >
          {status === "loading" ? "Sending enquiry…" : step === steps.length - 1 ? "Send enquiry" : "Continue"}
        </button>
      </div>
    </form>
  );
}
