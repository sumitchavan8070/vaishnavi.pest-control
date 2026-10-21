import { Bug, Building2, Home, Rat, Store, UtensilsCrossed, type LucideIcon } from "lucide-react";
import type { CategorySlug } from "@/lib/types";

export const categoryIcons: Record<CategorySlug, LucideIcon> = {
  "kitchen-bathroom": UtensilsCrossed,
  apartment: Building2,
  "independent-house": Home,
  "insect-bug": Bug,
  rodent: Rat,
  commercial: Store,
};
