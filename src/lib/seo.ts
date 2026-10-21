import type { Metadata } from "next";
import { puneLocalities } from "@/lib/business";
import type { CategorySlug } from "@/lib/types";

export const punePestKeywords = [
  "pest control in Pune",
  "pest control services Pune",
  "pest control near me Pune",
  "Vaishnavi Pest Control",
  "cockroach control Pune",
  "bed bug treatment Pune",
  "rodent control Pune",
  "rat control Pune",
  "kitchen pest control Pune",
  "bathroom pest control Pune",
  "apartment pest control Pune",
  "bungalow pest control Pune",
  "commercial pest control Pune",
  "office pest control Pune",
  "pest control Kothrud",
  "pest control Kasba Peth",
  "pest control Pune 411052",
];

export const categorySearchTerms: Record<CategorySlug, { description: string; keywords: string[] }> = {
  "kitchen-bathroom": {
    description:
      "Kitchen and bathroom pest control in Pune for cockroaches and ants. Compare utensil-removal options, starting prices, and visit time.",
    keywords: ["kitchen pest control Pune", "bathroom pest control Pune", "cockroach control Pune", "ant control Pune"],
  },
  apartment: {
    description:
      "Apartment pest control in Pune for flats, cabinets, and shared walls. See starting prices and send an enquiry for your locality.",
    keywords: ["apartment pest control Pune", "flat pest control Pune", "pest control for flats in Pune"],
  },
  "independent-house": {
    description:
      "Bungalow and independent house pest control in Pune. Longer visits for corners, drains, and the perimeter, with starting prices.",
    keywords: ["bungalow pest control Pune", "independent house pest control Pune", "home pest control Pune"],
  },
  "insect-bug": {
    description:
      "Cockroach control and bed bug treatment in Pune. See what each visit covers, the starting price, and the estimated time.",
    keywords: ["cockroach control Pune", "cockroach treatment Pune", "bed bug treatment Pune", "bed bug control Pune"],
  },
  rodent: {
    description:
      "Rat and mouse control in Pune with inspection, trapping, and bait stations. Starting price shown. Suitability depends on the property.",
    keywords: ["rodent control Pune", "rat control Pune", "mouse control Pune", "pest control for rats in Pune"],
  },
  commercial: {
    description:
      "Office and shop pest control in Pune for workstations, pantries, storage, and entry points. Compare the starting price and enquire.",
    keywords: ["commercial pest control Pune", "office pest control Pune", "shop pest control Pune"],
  },
};

export function punePlaces() {
  return [
    { "@type": "City", name: "Pune" },
    ...puneLocalities
      .filter((name) => name !== "Other")
      .map((name) => ({ "@type": "Place", name: `${name}, Pune` })),
  ];
}

export function pageMetadata(title: string, description: string, path: string, keywords?: string[]): Metadata {
  return {
    title,
    description,
    keywords: keywords ?? punePestKeywords,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      locale: "en_IN",
    },
  };
}
