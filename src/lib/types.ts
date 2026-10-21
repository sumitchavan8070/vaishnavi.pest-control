export type CategorySlug =
  | "kitchen-bathroom"
  | "apartment"
  | "independent-house"
  | "insect-bug"
  | "rodent"
  | "commercial";

export interface Category {
  slug: CategorySlug;
  name: string;
  shortName: string;
  description: string;
  summary: string;
  image: string;
  imageAlt: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  slug: string;
  category: CategorySlug;
  name: string;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  durationMinutes: number;
  description: string;
  overview: string;
  optionCount: number | null;
  includes: string[];
  excludes: string[];
  freeRevisit: boolean;
  image: string;
  imageAlt: string;
  suitableFor: string;
  preparation: string[];
  aftercare: string[];
  faqs: FaqItem[];
}

export interface Review {
  id: string;
  author: string;
  quote: string;
  source: string;
  context: string;
}

export interface PhoneNumber {
  id: string;
  label: string;
  e164: string;
  display: string;
  tel: string;
}
