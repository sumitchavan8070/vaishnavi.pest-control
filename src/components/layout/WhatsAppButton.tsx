"use client";

import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { formatInr } from "@/lib/format";
import { propertyTypes } from "@/lib/business";
import { getServiceBySlug } from "@/lib/services";
import { whatsAppHref } from "@/lib/whatsapp";

function WhatsAppLink() {
  const pathname = usePathname();
  const params = useSearchParams();
  const serviceFromPath = pathname.split("/").filter(Boolean).at(-1);
  const service =
    getServiceBySlug(params.get("service") ?? "") ?? getServiceBySlug(serviceFromPath ?? "");
  const property = propertyTypes.find((item) => item.id === params.get("property"));
  const href = whatsAppHref({
    serviceName: service?.name,
    startingPrice: service ? formatInr(service.startingPrice) : undefined,
    propertyType: property?.label,
    locality: params.get("locality") || undefined,
    preferredDate: params.get("date") || undefined,
  });
  const onServiceDetail = pathname.startsWith("/services/") && pathname.split("/").filter(Boolean).length >= 3;

  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`fixed right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-forest text-white shadow-[0_12px_30px_rgba(6,78,59,0.25)] hover:bg-deep md:h-auto md:w-auto md:gap-2 md:px-4 md:py-3 ${onServiceDetail ? "bottom-24 md:bottom-4" : "bottom-4"}`}
      aria-label="Chat with Vaishnavi Pest Control on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
      <span className="hidden text-sm font-semibold md:inline">WhatsApp</span>
    </a>
  );
}

export function WhatsAppButton() {
  return (
    <Suspense fallback={null}>
      <WhatsAppLink />
    </Suspense>
  );
}
