import type { MetadataRoute } from "next";
import { business } from "@/lib/business";
import { categories, services } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = ["", "/services", "/about", "/reviews", "/faq", "/contact", "/book", "/privacy", "/terms"];

  return [
    ...staticPaths.map((path) => ({
      url: `${business.siteUrl}${path || "/"}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...categories.map((category) => ({
      url: `${business.siteUrl}/services/${category.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...services.map((service) => ({
      url: `${business.siteUrl}/services/${service.category}/${service.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
