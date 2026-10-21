"use client";

import { useState, type FormEvent } from "react";
import { business } from "@/lib/business";
import type { EnquiryResponse } from "@/lib/enquiry";
import { validateContact, type ContactField, type ContactInput } from "@/lib/validation";
import { whatsAppHref } from "@/lib/whatsapp";

const empty: ContactInput = { name: "", phone: "", message: "", consent: false };

export function ContactForm() {
  const [form, setForm] = useState<ContactInput>(empty);
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "handoff" | "submitted" | "error">("idle");
  const [message, setMessage] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  function update<K extends keyof ContactInput>(key: K, value: ContactInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const check = validateContact(form);
    if (!check.ok) {
      setErrors(check.fieldErrors);
      setStatus("error");
      setMessage(check.message);
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "contact", ...form }),
      });
      const data = (await response.json()) as EnquiryResponse;
      setMessage(data.message);
      setWhatsappUrl(data.whatsappUrl);
      if (data.fieldErrors) setErrors(data.fieldErrors as Partial<Record<ContactField, string>>);
      setStatus(!response.ok || data.status === "error" ? "error" : data.status);
    } catch {
      setStatus("error");
      setMessage("The message could not be sent. Please call or use WhatsApp.");
      setWhatsappUrl(whatsAppHref({ notes: form.message, name: form.name }));
    }
  }

  if (status === "handoff" || status === "submitted") {
    return (
      <div className="rounded-3xl border border-line bg-white p-6" aria-live="polite">
        <h2 className="text-2xl font-semibold text-deep">
          {status === "submitted" ? "Message sent" : "Message ready"}
        </h2>
        <p className="mt-3 text-sm leading-7 text-charcoal/80">{message}</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          {whatsappUrl ? (
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-full bg-forest px-5 text-sm font-semibold text-white">
              Send on WhatsApp
            </a>
          ) : null}
          <a href={business.phones[0].tel} className="inline-flex min-h-11 items-center justify-center rounded-full border border-line px-5 text-sm font-semibold text-deep">
            Call {business.phones[0].display}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 rounded-3xl border border-line bg-white p-6">
      <h2 className="text-2xl font-semibold text-deep">Send a message</h2>
      <label className="text-sm font-semibold text-deep">
        Name
        <input value={form.name} onChange={(event) => update("name", event.target.value)} autoComplete="name" className="mt-1 w-full rounded-2xl border border-line px-3 py-3 font-medium" />
        {errors.name ? <span role="alert" className="mt-1 block font-medium text-red-700">{errors.name}</span> : null}
      </label>
      <label className="text-sm font-semibold text-deep">
        Mobile number
        <input value={form.phone} onChange={(event) => update("phone", event.target.value)} type="tel" inputMode="numeric" autoComplete="tel" className="mt-1 w-full rounded-2xl border border-line px-3 py-3 font-medium" />
        {errors.phone ? <span role="alert" className="mt-1 block font-medium text-red-700">{errors.phone}</span> : null}
      </label>
      <label className="text-sm font-semibold text-deep">
        Message
        <textarea value={form.message} onChange={(event) => update("message", event.target.value)} rows={5} className="mt-1 w-full rounded-2xl border border-line px-3 py-3 font-medium" />
        {errors.message ? <span role="alert" className="mt-1 block font-medium text-red-700">{errors.message}</span> : null}
      </label>
      <label className="flex items-start gap-3 text-sm leading-6 text-charcoal/80">
        <input type="checkbox" checked={form.consent} onChange={(event) => update("consent", event.target.checked)} className="mt-1" />
        I agree to be contacted about this message by phone or WhatsApp.
      </label>
      {errors.consent ? <p role="alert" className="text-sm text-red-700">{errors.consent}</p> : null}
      {status === "error" && message ? <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-800">{message}</p> : null}
      <button type="submit" disabled={status === "loading"} className="min-h-11 rounded-full bg-forest px-5 text-sm font-semibold text-white hover:bg-deep disabled:opacity-60">
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
