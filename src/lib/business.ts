import { formatIndianPhone, telHref } from "@/lib/format";
import type { PhoneNumber } from "@/lib/types";

const VERIFIED_WHATSAPP = "919881572421";
const VERIFIED_PRIMARY = "+919881572421";
const VERIFIED_SECONDARY = "+919561956185";

function envOr(name: string, fallback: string): string {
  const value = process.env[name]?.trim();
  return value ? value : fallback;
}

function toPhone(id: string, label: string, raw: string): PhoneNumber {
  const e164 = raw.startsWith("+") ? raw : `+${raw.replace(/\D/g, "")}`;
  return {
    id,
    label,
    e164,
    display: formatIndianPhone(e164),
    tel: telHref(e164),
  };
}

export const business = {
  name: "Vaishnavi Pest Control",
  legalName: "Vaishnavi Pest Control",
  tagline: "Safe Homes. Healthy Lives.",
  siteUrl: envOr("NEXT_PUBLIC_SITE_URL", "https://vaishnavipestcontrol.in").replace(/\/$/, ""),
  listedLocation: "Kasba Peth, Pune - 411002",
  serviceArea: "Pune, Maharashtra",
  city: "Pune",
  region: "Maharashtra",
  overallRating: 4.7,
  overallReviews: 10244,
  publishedAddress: {
    street: "Plot No. 74, Karve Road, Near MKSSS, Karve Nagar, Kothrud",
    locality: "Pune",
    region: "Maharashtra",
    postalCode: "411052",
    country: "India",
  },
  phones: [
    toPhone("primary", "Primary", envOr("NEXT_PUBLIC_PHONE_PRIMARY", VERIFIED_PRIMARY)),
    toPhone("secondary", "Alternate", envOr("NEXT_PUBLIC_PHONE_SECONDARY", VERIFIED_SECONDARY)),
  ] satisfies PhoneNumber[],
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL?.trim() ?? "",
  facebook: "https://www.facebook.com/Vaishnavi-Pest-Control-103177288677577",
  ratingNote: "Overall rating supplied for this Pune service listing.",
} as const;

export function getWhatsAppDigits(): string | null {
  const configured = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim();
  const source = configured ? configured : VERIFIED_WHATSAPP;
  const digits = source.replace(/\D/g, "");
  return digits.length >= 10 ? digits : null;
}

export const puneLocalities = [
  "Kothrud",
  "Karve Nagar",
  "Kasba Peth",
  "Erandwane",
  "Deccan Gymkhana",
  "Shivajinagar",
  "Sadashiv Peth",
  "Narayan Peth",
  "Camp",
  "Koregaon Park",
  "Kalyani Nagar",
  "Viman Nagar",
  "Kharadi",
  "Hadapsar",
  "Magarpatta",
  "Wanowrie",
  "Kondhwa",
  "Bibwewadi",
  "Sinhagad Road",
  "Baner",
  "Aundh",
  "Pashan",
  "Bavdhan",
  "Wakad",
  "Hinjawadi",
  "Pimple Saudagar",
  "Pimpri",
  "Chinchwad",
  "Nigdi",
  "Other",
] as const;

export const propertyTypes = [
  { id: "apartment", label: "Apartment" },
  { id: "independent-house", label: "Independent house" },
  { id: "kitchen-bathroom", label: "Kitchen and bathroom" },
  { id: "commercial", label: "Office or shop" },
  { id: "other", label: "Other" },
] as const;

export const pestIssues = [
  { id: "cockroaches-ants", label: "Cockroaches or ants" },
  { id: "bed-bugs", label: "Bed bugs" },
  { id: "rodents", label: "Rats or mice" },
  { id: "kitchen", label: "Kitchen or bathroom pests" },
  { id: "general", label: "Not sure yet" },
] as const;

export const timeWindows = [
  { id: "morning", label: "Morning", detail: "8:00 am – 11:00 am" },
  { id: "midday", label: "Midday", detail: "11:00 am – 2:00 pm" },
  { id: "afternoon", label: "Afternoon", detail: "2:00 pm – 5:00 pm" },
  { id: "evening", label: "Evening", detail: "5:00 pm – 8:00 pm" },
] as const;

export type PropertyTypeId = (typeof propertyTypes)[number]["id"];
export type PestIssueId = (typeof pestIssues)[number]["id"];
export type TimeWindowId = (typeof timeWindows)[number]["id"];
export type Locality = (typeof puneLocalities)[number];
