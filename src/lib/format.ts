export function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  const parts: string[] = [];

  if (hours === 1) parts.push("1 hour");
  else if (hours > 1) parts.push(`${hours} hours`);

  if (remainder === 1) parts.push("1 minute");
  else if (remainder > 1) parts.push(`${remainder} minutes`);

  return parts.join(" ") || "0 minutes";
}

export function formatCount(value: number): string {
  return new Intl.NumberFormat("en-IN").format(value);
}

export function formatIndianPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  const local = digits.startsWith("91") && digits.length === 12 ? digits.slice(2) : digits;

  if (local.length === 10) {
    return `0${local.slice(0, 5)} ${local.slice(5)}`;
  }

  return value.startsWith("+") ? value : `+${digits}`;
}

export function telHref(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("91")) return `tel:+${digits}`;
  if (digits.length === 10) return `tel:+91${digits}`;
  return `tel:+${digits}`;
}
