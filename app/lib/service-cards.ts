import {
  COMMON_SERVICES,
  type CommonService,
} from "./common-services";

type ServiceRoutePage = {
  URL슬러그: string;
  지역?: string;
  페이지제목?: string;
};

export type ServiceCard = Pick<
  CommonService,
  "slug" | "title" | "description" | "supportNote"
> & {
  href: string;
};

const regionalServiceSlugAliases: Partial<Record<string, string[]>> = {
  "karaoke-room-demolition-company": ["karaoke-demolition-company"],
  "nail-salon-demolition-company": ["nail-shop-demolition-company"],
};

function getPathSegments(urlSlug: string) {
  return urlSlug.trim().replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
}

function normalizePath(urlSlug: string) {
  const path = getPathSegments(urlSlug).join("/");

  return path ? `/${path}` : "";
}

export function getRegionSlugFromUrlSlug(urlSlug: string) {
  return getPathSegments(urlSlug)[0] ?? "";
}

function getServiceKeyword(title: string) {
  return title.includes("철거업체") ? title : `${title} 철거업체`;
}

function getRegionNameForCard(
  page: ServiceRoutePage,
  serviceKeyword: string,
) {
  const regionName = page.지역?.trim();

  if (regionName) {
    return regionName;
  }

  const pageTitle = page.페이지제목?.trim() ?? "";
  const serviceKeywordIndex = pageTitle.indexOf(serviceKeyword);

  if (serviceKeywordIndex > 0) {
    return pageTitle.slice(0, serviceKeywordIndex).trim();
  }

  return pageTitle.split("|")[0]?.trim().split(/\s+/)[0] ?? "";
}

function getCardDescription(page: ServiceRoutePage, service: CommonService) {
  const serviceKeyword = getServiceKeyword(service.title);
  const regionName = getRegionNameForCard(page, serviceKeyword);

  return regionName
    ? `${regionName} ${serviceKeyword} | ${service.description}`
    : `${serviceKeyword} | ${service.description}`;
}

export function getServiceCardsForPages<T extends ServiceRoutePage>(
  pages: T[],
  regionSlug?: string,
) {
  const pageByServiceSlug = new Map<string, T>();

  pages.forEach((page) => {
    const [pageRegionSlug, serviceSlug] = getPathSegments(page.URL슬러그);

    if (!serviceSlug || (regionSlug && pageRegionSlug !== regionSlug)) {
      return;
    }

    pageByServiceSlug.set(serviceSlug, page);
  });

  return COMMON_SERVICES.reduce<ServiceCard[]>((cards, service) => {
    const serviceSlugs = [
      service.slug,
      ...(regionalServiceSlugAliases[service.slug] ?? []),
    ];
    const page = serviceSlugs
      .map((serviceSlug) => pageByServiceSlug.get(serviceSlug))
      .find((item) => item);

    if (!page) {
      return cards;
    }

    cards.push({
      slug: service.slug,
      title: service.title,
      description: getCardDescription(page, service),
      supportNote: service.supportNote,
      href: normalizePath(page.URL슬러그),
    });

    return cards;
  }, []);
}
