import { getWhatsAppDigits } from "@/lib/business";

export interface WhatsAppContext {
  serviceName?: string;
  startingPrice?: string;
  propertyType?: string;
  locality?: string;
  preferredDate?: string;
  preferredWindow?: string;
  name?: string;
  notes?: string;
}

export function buildWhatsAppMessage(context: WhatsAppContext = {}): string {
  const lines = [
    "Hello Vaishnavi Pest Control, I would like to enquire about a service in Pune.",
  ];

  if (context.serviceName) lines.push(`Service: ${context.serviceName}`);
  if (context.startingPrice) lines.push(`Starting price shown on the website: ${context.startingPrice}`);
  if (context.propertyType) lines.push(`Property type: ${context.propertyType}`);
  if (context.locality) lines.push(`Locality: ${context.locality}`);
  if (context.preferredDate) lines.push(`Preferred date: ${context.preferredDate}`);
  if (context.preferredWindow) lines.push(`Preferred time: ${context.preferredWindow}`);
  if (context.name) lines.push(`Name: ${context.name}`);
  if (context.notes) lines.push(`Notes: ${context.notes}`);

  lines.push("Please confirm availability and the final price. This message is an enquiry, not a confirmed booking.");
  return lines.join("\n");
}

export function whatsAppHref(context: WhatsAppContext = {}): string | null {
  const digits = getWhatsAppDigits();
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(buildWhatsAppMessage(context))}`;
}
