import { COMMON_SERVICES, getCommonServiceBySlug } from "./common-services";
import type { PageData } from "./sheet";

export type InternalLink = {
  href: string;
  label: string;
  description?: string;
};

type LinkablePage = Pick<
  PageData,
  "URL슬러그" | "지역" | "서비스" | "페이지제목"
>;

const priorityRegionSlugs = [
  "gangnam",
  "songpa",
  "suwon",
  "jung",
  "seongnam",
  "mapo",
  "seocho",
  "yongsan",
  "jongno",
  "incheon-nam",
  "busan-haeundae",
  "daegu-suseong",
  "daejeon-seo",
  "gwangju-seo",
];

const priorityServiceSlugs = [
  "restaurant-demolition-company",
  "cafe-demolition-company",
  "academy-demolition-company",
  "office-demolition-company",
  "store-demolition-company",
  "business-closure-demolition",
  "karaoke-room-demolition-company",
  "screen-golf-demolition-company",
  "pc-room-demolition-company",
  "bowling-alley-demolition-company",
  "restoration",
  "building-demolition",
];

const regionalServiceSlugAliases: Partial<Record<string, string[]>> = {
  "karaoke-room-demolition-company": ["karaoke-demolition-company"],
  "nail-salon-demolition-company": ["nail-shop-demolition-company"],
};

function getPathSegments(urlSlug: string) {
  return normalizeInternalPath(urlSlug)
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .filter(Boolean);
}

function normalizeInternalPath(href: string) {
  const trimmedHref = href.trim().replace(/^\/+|\/+$/g, "");

  return trimmedHref ? `/${trimmedHref}` : "";
}

function getDetailInfo(page: LinkablePage) {
  const [regionSlug, serviceSlug] = getPathSegments(page.URL슬러그);

  if (!regionSlug || !serviceSlug) {
    return null;
  }

  return {
    href: `/${regionSlug}/${serviceSlug}`,
    regionSlug,
    serviceSlug,
    regionName: page.지역.trim() || regionSlug,
    serviceName: page.서비스.trim(),
    title: page.페이지제목.trim(),
  };
}

function getServiceLabel(serviceName: string) {
  const normalized = serviceName
    .replace(/\s*업체$/g, "")
    .replace(/\s*안내$/g, "")
    .trim();

  return normalized || serviceName.trim();
}

function getEquivalentServiceSlugs(serviceSlug: string) {
  const canonicalSlug =
    COMMON_SERVICES.find((service) =>
      [service.slug, ...(regionalServiceSlugAliases[service.slug] ?? [])].includes(
        serviceSlug,
      ),
    )?.slug ?? serviceSlug;

  return [
    canonicalSlug,
    ...(regionalServiceSlugAliases[canonicalSlug] ?? []),
  ];
}

function getCanonicalServiceSlug(serviceSlug: string) {
  return getEquivalentServiceSlugs(serviceSlug)[0] ?? serviceSlug;
}

function createDetailLink(page: LinkablePage): InternalLink | null {
  const info = getDetailInfo(page);

  if (!info) {
    return null;
  }

  return {
    href: info.href,
    label: `${info.regionName} ${getServiceLabel(info.serviceName)}`,
    description: info.title,
  };
}

function dedupeLinks(links: InternalLink[], currentHref?: string) {
  const normalizedCurrentHref = currentHref
    ? normalizeInternalPath(currentHref)
    : "";
  const seen = new Set<string>();

  return links.filter((link) => {
    const href = normalizeInternalPath(link.href);

    if (!href || href === normalizedCurrentHref || seen.has(href)) {
      return false;
    }

    seen.add(href);
    return true;
  });
}

function sortByPriority<T>(
  items: T[],
  getPriorityKey: (item: T) => string,
  priorityKeys: string[],
) {
  return [...items].sort((a, b) => {
    const aIndex = priorityKeys.indexOf(getPriorityKey(a));
    const bIndex = priorityKeys.indexOf(getPriorityKey(b));

    return (
      (aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex) -
      (bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex)
    );
  });
}

export function getMainRegionLinks(pages: LinkablePage[], limit = 12) {
  const regionMap = new Map<string, InternalLink>();

  pages.forEach((page) => {
    const info = getDetailInfo(page);

    if (!info || regionMap.has(info.regionSlug)) {
      return;
    }

    regionMap.set(info.regionSlug, {
      href: `/${info.regionSlug}`,
      label: `${info.regionName} 철거 상담`,
    });
  });

  return sortByPriority(
    [...regionMap.values()],
    (link) => getPathSegments(link.href)[0] ?? "",
    priorityRegionSlugs,
  ).slice(0, limit);
}

export function getRegionServiceLinks(
  pages: LinkablePage[],
  regionSlug: string,
  limit = 12,
) {
  const links = pages
    .map((page) => {
      const info = getDetailInfo(page);

      return info && info.regionSlug === regionSlug
        ? { info, link: createDetailLink(page) }
        : null;
    })
    .filter(
      (
        item,
      ): item is {
        info: NonNullable<ReturnType<typeof getDetailInfo>>;
        link: InternalLink;
      } => Boolean(item?.link),
    );

  return dedupeLinks(
    sortByPriority(
      links,
      ({ info }) => getCanonicalServiceSlug(info.serviceSlug),
      priorityServiceSlugs,
    ).map(({ link }) => link),
  ).slice(0, limit);
}

export function getDetailRelatedLinks(
  pages: LinkablePage[],
  currentSlug: string,
  limit = 10,
) {
  const currentHref = normalizeInternalPath(currentSlug);
  const currentPage = pages.find(
    (page) => normalizeInternalPath(page.URL슬러그) === currentHref,
  );
  const currentInfo = currentPage ? getDetailInfo(currentPage) : null;

  if (!currentInfo) {
    return [];
  }

  const sameRegionLinks = getRegionServiceLinks(
    pages,
    currentInfo.regionSlug,
    5,
  );
  const serviceSlugs = getEquivalentServiceSlugs(currentInfo.serviceSlug);
  const sameServiceLinks = sortByPriority(
    pages
      .map((page) => {
        const info = getDetailInfo(page);

        return info && serviceSlugs.includes(info.serviceSlug)
          ? { info, link: createDetailLink(page) }
          : null;
      })
      .filter(
        (
          item,
        ): item is {
          info: NonNullable<ReturnType<typeof getDetailInfo>>;
          link: InternalLink;
        } => Boolean(item?.link),
      ),
    ({ info }) => info.regionSlug,
    priorityRegionSlugs,
  )
    .map(({ link }) => link)
    .slice(0, 4);
  const commonServiceSlug = getCanonicalServiceSlug(currentInfo.serviceSlug);
  const commonService = getCommonServiceBySlug(commonServiceSlug);
  const commonLinks: InternalLink[] = [
    commonService
      ? {
          href: `/${commonService.slug}`,
          label: `${commonService.title} 작업 범위 보기`,
        }
      : null,
    { href: `/${currentInfo.regionSlug}`, label: `${currentInfo.regionName} 철거 서비스 전체 보기` },
    { href: "/", label: "철거·원상복구 전체 서비스" },
  ].filter((link): link is InternalLink => Boolean(link));

  return dedupeLinks(
    [...sameRegionLinks, ...sameServiceLinks, ...commonLinks],
    currentHref,
  ).slice(0, limit);
}

export function getCommonServiceRelatedLinks(
  pages: LinkablePage[],
  serviceSlug: string,
  limit = 10,
) {
  const equivalentSlugs = getEquivalentServiceSlugs(serviceSlug);
  const regionalLinks = sortByPriority(
    pages
      .map((page) => {
        const info = getDetailInfo(page);

        return info && equivalentSlugs.includes(info.serviceSlug)
          ? { info, link: createDetailLink(page) }
          : null;
      })
      .filter(
        (
          item,
        ): item is {
          info: NonNullable<ReturnType<typeof getDetailInfo>>;
          link: InternalLink;
        } => Boolean(item?.link),
      ),
    ({ info }) => info.regionSlug,
    priorityRegionSlugs,
  ).map(({ link }) => link);
  const relatedCommonLinks = priorityServiceSlugs
    .filter((slug) => slug !== serviceSlug)
    .map((slug) => getCommonServiceBySlug(slug))
    .filter((service) => service !== undefined)
    .map((service) => ({
      href: `/${service.slug}`,
      label: service.title,
    }));
  const fallbackRegionLinks = getMainRegionLinks(pages, 6);

  return dedupeLinks(
    [
      ...regionalLinks,
      ...relatedCommonLinks,
      ...fallbackRegionLinks,
      { href: "/", label: "철거·원상복구 전체 서비스" },
    ],
    `/${serviceSlug}`,
  ).slice(0, limit);
}
