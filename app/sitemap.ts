import type { MetadataRoute } from "next";
import { getPages } from "./lib/sheet";
import { COMMON_SERVICES } from "./lib/common-services";

const BASE_URL = "https://demolition-seo-site.vercel.app";

function toAbsoluteUrl(slug: string) {
  return `${BASE_URL}/${slug.replace(/^\/+/, "")}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getPages();

  return [
    {
      url: BASE_URL,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...COMMON_SERVICES.map((service) => ({
      url: toAbsoluteUrl(service.slug),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...pages
      .filter((page) => page.URL슬러그)
      .map((page) => ({
        url: toAbsoluteUrl(page.URL슬러그),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
  ];
}
