import {
  pestIssues,
  propertyTypes,
  puneLocalities,
  timeWindows,
  type PestIssueId,
  type PropertyTypeId,
  type TimeWindowId,
} from "@/lib/business";
import { getServiceBySlug } from "@/lib/services";

export interface BookingInput {
  serviceSlug: string;
  propertyType: string;
  locality: string;
  otherLocality: string;
  address: string;
  preferredDate: string;
  preferredWindow: string;
  name: string;
  phone: string;
  notes: string;
  consent: boolean;
}

export interface ContactInput {
  name: string;
  phone: string;
  message: string;
  consent: boolean;
}

export interface BookingEnquiry {
  kind: "booking";
  serviceSlug: string;
  serviceName: string;
  startingPrice: number;
  propertyType: PropertyTypeId;
  propertyLabel: string;
  locality: string;
  address: string;
  preferredDate: string;
  preferredWindow: TimeWindowId;
  preferredWindowLabel: string;
  name: string;
  phone: string;
  notes: string;
  consent: true;
}

export interface ContactEnquiry {
  kind: "contact";
  name: string;
  phone: string;
  message: string;
  consent: true;
}

type FieldErrors<T extends string> = Partial<Record<T, string>>;

export type BookingField = keyof BookingInput;
export type ContactField = keyof ContactInput;

interface Success<T> {
  ok: true;
  value: T;
}

interface Failure<T extends string> {
  ok: false;
  message: string;
  fieldErrors: FieldErrors<T>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(record: Record<string, unknown>, key: string): string {
  const value = record[key];
  return typeof value === "string" ? value.trim() : "";
}

function readBoolean(record: Record<string, unknown>, key: string): boolean {
  return record[key] === true;
}

export function normalizePhone(input: string): string {
  const digits = input.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
}

export function isIndianMobile(input: string): boolean {
  return /^[6-9]\d{9}$/.test(normalizePhone(input));
}

function istToday(): string {
  const shifted = new Date(Date.now() + 5.5 * 60 * 60 * 1000);
  return shifted.toISOString().slice(0, 10);
}

function addDays(isoDate: string, days: number): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function isValidDateInput(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

export function parseBookingRecord(value: unknown): BookingInput {
  const record = isRecord(value) ? value : {};
  return {
    serviceSlug: readString(record, "serviceSlug"),
    propertyType: readString(record, "propertyType"),
    locality: readString(record, "locality"),
    otherLocality: readString(record, "otherLocality"),
    address: readString(record, "address"),
    preferredDate: readString(record, "preferredDate"),
    preferredWindow: readString(record, "preferredWindow"),
    name: readString(record, "name"),
    phone: readString(record, "phone"),
    notes: readString(record, "notes"),
    consent: readBoolean(record, "consent"),
  };
}

export function parseContactRecord(value: unknown): ContactInput {
  const record = isRecord(value) ? value : {};
  return {
    name: readString(record, "name"),
    phone: readString(record, "phone"),
    message: readString(record, "message"),
    consent: readBoolean(record, "consent"),
  };
}

export function validateBooking(input: BookingInput): Success<BookingEnquiry> | Failure<BookingField> {
  const fieldErrors: FieldErrors<BookingField> = {};
  const service = getServiceBySlug(input.serviceSlug);
  if (!service) fieldErrors.serviceSlug = "Select a service from the catalogue.";

  const property = propertyTypes.find((item) => item.id === input.propertyType);
  if (!property) fieldErrors.propertyType = "Select a property type.";

  const knownLocality = puneLocalities.find((item) => item === input.locality);
  let locality = "";
  if (!knownLocality) {
    fieldErrors.locality = "Select a Pune locality.";
  } else if (knownLocality === "Other") {
    if (input.otherLocality.length < 2) {
      fieldErrors.otherLocality = "Enter the locality name.";
    } else {
      locality = input.otherLocality;
    }
  } else {
    locality = knownLocality;
  }

  if (input.address.length < 8) {
    fieldErrors.address = "Enter the property address, including a landmark if you have one.";
  }

  const today = istToday();
  const latest = addDays(today, 90);
  if (!isValidDateInput(input.preferredDate)) {
    fieldErrors.preferredDate = "Choose a preferred date.";
  } else if (input.preferredDate < today) {
    fieldErrors.preferredDate = "Choose today or a future date.";
  } else if (input.preferredDate > latest) {
    fieldErrors.preferredDate = "Choose a date within the next 90 days.";
  }

  const window = timeWindows.find((item) => item.id === input.preferredWindow);
  if (!window) fieldErrors.preferredWindow = "Choose a preferred time window.";

  if (input.name.length < 2) fieldErrors.name = "Enter the contact name.";
  if (!isIndianMobile(input.phone)) {
    fieldErrors.phone = "Enter a valid 10-digit Indian mobile number.";
  }
  if (input.notes.length > 500) fieldErrors.notes = "Keep notes within 500 characters.";
  if (!input.consent) {
    fieldErrors.consent = "Consent is required before this enquiry can be sent.";
  }

  if (Object.keys(fieldErrors).length > 0 || !service || !property || !window || !locality) {
    return {
      ok: false,
      message: "Check the highlighted fields and try again.",
      fieldErrors,
    };
  }

  return {
    ok: true,
    value: {
      kind: "booking",
      serviceSlug: service.slug,
      serviceName: service.name,
      startingPrice: service.startingPrice,
      propertyType: property.id,
      propertyLabel: property.label,
      locality,
      address: input.address,
      preferredDate: input.preferredDate,
      preferredWindow: window.id,
      preferredWindowLabel: `${window.label} (${window.detail})`,
      name: input.name,
      phone: normalizePhone(input.phone),
      notes: input.notes,
      consent: true,
    },
  };
}

export function validateContact(
  input: ContactInput,
): Success<ContactEnquiry> | Failure<ContactField> {
  const fieldErrors: FieldErrors<ContactField> = {};
  if (input.name.length < 2) fieldErrors.name = "Enter your name.";
  if (!isIndianMobile(input.phone)) {
    fieldErrors.phone = "Enter a valid 10-digit Indian mobile number.";
  }
  if (input.message.length < 10) {
    fieldErrors.message = "Add a short message so the team knows how to help.";
  }
  if (input.message.length > 1000) fieldErrors.message = "Keep the message within 1,000 characters.";
  if (!input.consent) fieldErrors.consent = "Consent is required before this message can be sent.";

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, message: "Check the highlighted fields and try again.", fieldErrors };
  }

  return {
    ok: true,
    value: {
      kind: "contact",
      name: input.name,
      phone: normalizePhone(input.phone),
      message: input.message,
      consent: true,
    },
  };
}

export function stepForBookingField(field: BookingField): number {
  switch (field) {
    case "serviceSlug":
      return 0;
    case "propertyType":
      return 1;
    case "locality":
    case "otherLocality":
    case "address":
      return 2;
    case "preferredDate":
    case "preferredWindow":
      return 3;
    default:
      return 4;
  }
}

export function isPropertyType(value: string): value is PropertyTypeId {
  return propertyTypes.some((item) => item.id === value);
}

export function isPestIssue(value: string): value is PestIssueId {
  return pestIssues.some((item) => item.id === value);
}

export function isTimeWindow(value: string): value is TimeWindowId {
  return timeWindows.some((item) => item.id === value);
}
