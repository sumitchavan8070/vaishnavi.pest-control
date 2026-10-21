import { NextResponse } from "next/server";
import { formatInr } from "@/lib/format";
import type { ContactEnquiry, BookingEnquiry } from "@/lib/validation";
import { parseBookingRecord, parseContactRecord, validateBooking, validateContact } from "@/lib/validation";
import { whatsAppHref } from "@/lib/whatsapp";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

async function deliver(
  enquiry: BookingEnquiry | ContactEnquiry,
  whatsappUrl: string | null,
  handoffMessage: string,
) {
  const webhook = process.env.ENQUIRY_WEBHOOK_URL?.trim();

  if (!webhook) {
    return NextResponse.json({ status: "handoff", message: handoffMessage, whatsappUrl });
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "vaishnavi-pest-control-web",
        receivedAt: new Date().toISOString(),
        enquiry,
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          status: "error",
          message: "The enquiry could not be delivered. Please call or use WhatsApp.",
          whatsappUrl,
        },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message: "The enquiry could not be delivered. Please call or use WhatsApp.",
        whatsappUrl,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    status: "submitted",
    message:
      "Your enquiry was delivered. It is not a confirmed appointment until Vaishnavi Pest Control contacts you.",
    whatsappUrl,
  });
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    const text = await request.text();
    if (text.length > 20000) {
      return NextResponse.json(
        { status: "error", message: "That enquiry is too long to send.", whatsappUrl: null },
        { status: 413 },
      );
    }
    json = JSON.parse(text) as unknown;
  } catch {
    return NextResponse.json(
      { status: "error", message: "The enquiry could not be read.", whatsappUrl: null },
      { status: 400 },
    );
  }

  if (!isRecord(json)) {
    return NextResponse.json(
      { status: "error", message: "The enquiry could not be read.", whatsappUrl: null },
      { status: 400 },
    );
  }

  if (json.kind === "contact") {
    const parsed = validateContact(parseContactRecord(json));
    if (!parsed.ok) {
      return NextResponse.json(
        { status: "error", message: parsed.message, fieldErrors: parsed.fieldErrors, whatsappUrl: null },
        { status: 400 },
      );
    }
    return deliver(
      parsed.value,
      whatsAppHref({ name: parsed.value.name, notes: parsed.value.message }),
      "No booking system is connected, so this message was not stored. Send it on WhatsApp or call the team.",
    );
  }

  if (json.kind === "booking") {
    const parsed = validateBooking(parseBookingRecord(json));
    if (!parsed.ok) {
      return NextResponse.json(
        { status: "error", message: parsed.message, fieldErrors: parsed.fieldErrors, whatsappUrl: null },
        { status: 400 },
      );
    }
    const enquiry = parsed.value;
    return deliver(
      enquiry,
      whatsAppHref({
        serviceName: enquiry.serviceName,
        startingPrice: formatInr(enquiry.startingPrice),
        propertyType: enquiry.propertyLabel,
        locality: enquiry.locality,
        preferredDate: enquiry.preferredDate,
        preferredWindow: enquiry.preferredWindowLabel,
        name: enquiry.name,
        notes: enquiry.notes || undefined,
      }),
      "No booking system is connected, so this request was not stored and the time is not reserved. Send it on WhatsApp or call the team to confirm availability and the final price.",
    );
  }

  return NextResponse.json(
    { status: "error", message: "This form could not be recognised.", whatsappUrl: null },
    { status: 400 },
  );
}
