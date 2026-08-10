import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  COMMON_SERVICES,
  getCommonServiceBySlug,
} from "../lib/common-services";
import {
  getCommonServiceRelatedLinks,
  getRegionServiceLinks,
} from "../lib/internal-links";
import { getPages, normalizePageSlug, type PageData } from "../lib/sheet";
import {
  getRegionSlugFromUrlSlug,
} from "../lib/service-cards";
import {
  createBreadcrumbJsonLd,
  createFaqPageJsonLd,
  createOpenGraphMetadata,
  createTwitterMetadata,
  createWebPageJsonLd,
  JsonLd,
  SERVICE_OG_IMAGE,
  SITE_URL,
} from "../lib/seo";
import ConsultationSection from "../components/ConsultationSection";

const BASE_URL = SITE_URL;

type Props = {
  params: Promise<{
    region: string;
  }>;
};

type RegionRoutePage = PageData & {
  href: string;
};

function getPagePathSegments(page: PageData) {
  return normalizePageSlug(page.URL슬러그)
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .filter(Boolean);
}

function getRegionSlug(page: PageData) {
  return getRegionSlugFromUrlSlug(page.URL슬러그);
}

function getRegionPages(pages: PageData[], regionSlug: string) {
  return pages.reduce<RegionRoutePage[]>((regionPages, page) => {
    const segments = getPagePathSegments(page);

    if (segments[0] === regionSlug && segments.length === 2) {
      regionPages.push({
        ...page,
        href: normalizePageSlug(page.URL슬러그),
      });
    }

    return regionPages;
  }, []);
}

function getRegionName(regionPages: RegionRoutePage[], regionSlug: string) {
  return regionPages[0]?.지역?.trim() || regionSlug;
}

function getConsultationServiceName(serviceName: string) {
  return serviceName.replace(/업체/g, "").replace(/\s*안내$/g, "").trim();
}

function getUniqueRegionSlugs(pages: PageData[]) {
  return Array.from(
    new Set(
      pages
        .map(getRegionSlug)
        .filter((slug) => slug && !getCommonServiceBySlug(slug)),
    ),
  );
}

function getCommonServiceSeo(service: (typeof COMMON_SERVICES)[number]) {
  const canonical = `${BASE_URL}/${service.slug}`;

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    canonical,
  };
}

function getRegionSeo(regionName: string, regionSlug: string) {
  const canonical = `${BASE_URL}/${regionSlug}`;

  return {
    title: `${regionName} 철거·원상복구 상담 | 더세이브`,
    description: `${regionName} 상가철거, 식당철거, 사무실철거, 폐업철거와 원상복구 상담 페이지를 확인하세요.`,
    canonical,
  };
}

function stableIndex(seed: string, modulo: number) {
  const value = Array.from(seed).reduce(
    (total, char, index) => total + char.charCodeAt(0) * (index + 3),
    0,
  );

  return modulo > 0 ? value % modulo : 0;
}

function getServiceLabel(serviceName: string) {
  return serviceName.replace(/\s*업체$/g, "").replace(/\s*안내$/g, "").trim();
}

function joinKorean(items: string[]) {
  if (items.length <= 1) {
    return items[0] ?? "";
  }

  return `${items.slice(0, -1).join(", ")}와 ${items[items.length - 1]}`;
}

function getRegionFeaturePages(regionPages: RegionRoutePage[]) {
  if (regionPages.length === 0) {
    return [];
  }

  const start = stableIndex(regionPages[0].href, regionPages.length);

  return [
    ...regionPages.slice(start),
    ...regionPages.slice(0, start),
  ].slice(0, 3);
}

function getRegionOverview(regionName: string, regionPages: RegionRoutePage[]) {
  const featurePages = getRegionFeaturePages(regionPages);
  const serviceLabels = featurePages.map((page) => getServiceLabel(page.서비스));
  const serviceText = joinKorean(serviceLabels);
  const primaryPage = featurePages[0] ?? regionPages[0];

  return {
    serviceText,
    primaryPage,
    featurePages,
    lead:
      `${regionName} 철거·원상복구 상담은 업종별 상세페이지의 현장 정보와 작업 범위를 기준으로 확인합니다. ` +
      `${serviceText || "상가, 식당, 사무실"}처럼 공간마다 남길 설비와 철거할 부분이 달라질 수 있어 상담 전 기본 조건을 먼저 정리하는 편이 좋습니다.`,
    precheck:
      `${regionName} 현장 상담 전에는 면적, 층수, 반출 동선, 작업 가능 시간, 원상복구 기준을 함께 확인합니다. ` +
      primaryPage.현장특징,
    scope:
      `${serviceText || "업종"} 페이지에서는 업종별 설비와 폐기물 성격을 나누어 안내합니다. ` +
      primaryPage.철거범위,
    estimate:
      `${regionName} 견적은 단순 면적만으로 정하기 어렵고 폐기물 양, 장비 진입 조건, 공용부 사용 가능 여부, 복구 범위가 함께 반영됩니다. ` +
      primaryPage.비용안내,
  };
}

function getRegionFaqItems(regionName: string, regionPages: RegionRoutePage[]) {
  const overview = getRegionOverview(regionName, regionPages);
  const labels = overview.featurePages.map((page) => getServiceLabel(page.서비스));

  return [
    {
      question: `${regionName} 철거 상담 전에 어떤 내용을 준비하면 좋나요?`,
      answer:
        `현장 사진, 면적, 층수, 철거 희망 범위, 작업 가능 시간, 원상복구 기준을 알려주시면 상담 범위를 정리하는 데 도움이 됩니다. ` +
        `${overview.primaryPage.주의사항}`,
    },
    {
      question: `${regionName} 업종별 철거 범위는 어떻게 달라지나요?`,
      answer:
        `${joinKorean(labels) || "업종"}처럼 공간마다 설비와 폐기물 종류가 다릅니다. ` +
        "상담에서는 남길 설비와 철거할 부분을 구분하고 반출 순서를 현장 조건에 맞춰 확인합니다.",
    },
  ];
}

function getCommonServiceOverview(service: (typeof COMMON_SERVICES)[number]) {
  const facilities = service.facilities.slice(0, 2).join(", ");
  const checks = service.checks.slice(0, 2).join(", ");
  const scope = service.scope.slice(0, 2).join(", ");

  return `${facilities} 상태와 ${checks}을 먼저 확인하고, ${scope} 범위를 현장 조건에 맞춰 나누어 상담합니다.`;
}

export async function generateStaticParams() {
  const pages = await getPages();
  const regionParams = getUniqueRegionSlugs(pages).map((region) => ({
    region,
  }));
  const commonServiceParams = COMMON_SERVICES.map((service) => ({
    region: service.slug,
  }));

  return [...regionParams, ...commonServiceParams];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region } = await params;
  const commonService = getCommonServiceBySlug(region);

  if (commonService) {
    const seo = getCommonServiceSeo(commonService);

    return {
      title: seo.title,
      description: seo.description,
      alternates: {
        canonical: seo.canonical,
      },
      openGraph: createOpenGraphMetadata({
        title: seo.title,
        description: seo.description,
        url: seo.canonical,
        image: SERVICE_OG_IMAGE,
      }),
      twitter: createTwitterMetadata({
        title: seo.title,
        description: seo.description,
        image: SERVICE_OG_IMAGE,
      }),
      robots: {
        index: true,
        follow: true,
      },
    };
  }

  const pages = await getPages();
  const regionPages = getRegionPages(pages, region);

  if (regionPages.length === 0) {
    notFound();
  }

  const regionName = getRegionName(regionPages, region);
  const seo = getRegionSeo(regionName, region);

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: seo.canonical,
    },
    openGraph: createOpenGraphMetadata({
      title: seo.title,
      description: seo.description,
      url: seo.canonical,
      image: SERVICE_OG_IMAGE,
    }),
    twitter: createTwitterMetadata({
      title: seo.title,
      description: seo.description,
      image: SERVICE_OG_IMAGE,
    }),
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RegionOrCommonServicePage({ params }: Props) {
  const { region } = await params;
  const commonService = getCommonServiceBySlug(region);

  if (commonService) {
    return <CommonServiceDetail serviceSlug={region} />;
  }

  const pages = await getPages();
  const regionPages = getRegionPages(pages, region);

  if (regionPages.length === 0) {
    notFound();
  }

  const regionName = getRegionName(regionPages, region);
  const regionServiceLinks = getRegionServiceLinks(pages, region, 12);
  const seo = getRegionSeo(regionName, region);
  const overview = getRegionOverview(regionName, regionPages);
  const faqItems = getRegionFaqItems(regionName, regionPages);
  const faqJsonLd = createFaqPageJsonLd(faqItems);

  return (
    <>
      <JsonLd
        data={[
          createWebPageJsonLd({
            name: seo.title,
            description: seo.description,
            url: seo.canonical,
          }),
          createBreadcrumbJsonLd([
            { name: "홈", item: BASE_URL },
            { name: `${regionName} 철거·원상복구 상담`, item: seo.canonical },
          ]),
          faqJsonLd,
        ].filter(Boolean)}
      />
      <main className="region-index-page">
        <section className="region-index-hero">
          <div className="home-shell">
            <p className="home-eyebrow">지역별 철거 상담</p>
            <h1>{regionName} 철거·원상복구 상담</h1>
            <p>{overview.lead}</p>
            <div className="common-service-actions">
              <Link className="home-button home-button-primary" href="#consultation-section">
                무료 견적 상담
              </Link>
              <a className="home-button home-button-secondary" href="tel:010-8286-7620">
                010-8286-7620 전화 상담
              </a>
            </div>
          </div>
        </section>

        <section className="region-index-body">
          <div className="home-shell common-service-layout">
            <article className="common-service-content">
              <section>
                <h2>{regionName} 철거·원상복구 상담 안내</h2>
                <p>{overview.precheck}</p>
              </section>

              <section>
                <h2>상담 전에 확인할 항목</h2>
                <ul>
                  <li>철거할 공간의 면적과 층수</li>
                  <li>엘리베이터, 계단, 차량 진입 등 폐기물 반출 동선</li>
                  <li>임대차 계약서나 관리실에서 요구하는 원상복구 기준</li>
                  <li>영업 종료일, 이전 일정, 작업 가능 시간</li>
                </ul>
              </section>

              <section>
                <h2>업종별로 달라지는 철거 범위</h2>
                <p>{overview.scope}</p>
                <div className="home-link-grid">
                  {overview.featurePages.map((page) => (
                    <Link className="home-service-link" href={page.href} key={page.href}>
                      <span>{getServiceLabel(page.서비스)}</span>
                      <small>{page.페이지제목}</small>
                    </Link>
                  ))}
                </div>
              </section>

              <section>
                <h2>견적에 영향을 주는 요소</h2>
                <p>{overview.estimate}</p>
              </section>

              <section>
                <h2>철거와 원상복구 진행 순서</h2>
                <ol>
                  <li>전화 또는 상담 폼으로 지역과 업종, 철거 범위를 접수합니다.</li>
                  <li>현장 사진이나 방문 확인으로 남길 설비와 철거할 부분을 구분합니다.</li>
                  <li>폐기물 분류, 반출 동선, 작업 가능 시간을 확인해 일정을 조율합니다.</li>
                  <li>철거 후 자재와 폐기물을 정리하고 요청받은 원상복구 범위를 확인합니다.</li>
                </ol>
              </section>

              <section>
                <h2>{regionName} 자주 묻는 질문</h2>
                <div className="common-service-faq">
                  {faqItems.map((item) => (
                    <div key={item.question}>
                      <h3>{item.question}</h3>
                      <p>{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2>{regionName} 주요 업종 상세페이지</h2>
                <div className="home-link-grid">
                  {regionServiceLinks.map((link) => (
                    <a className="home-service-link" href={link.href} key={link.href}>
                      <span>{link.label}</span>
                      {link.description ? <small>{link.description}</small> : null}
                    </a>
                  ))}
                </div>
              </section>
            </article>

            <aside className="common-service-side" aria-label="지역 페이지 이동 링크">
              <Link href="/">메인페이지로 돌아가기</Link>
              <Link href="/#region-section">다른 지역 선택하기</Link>
              <Link href="#consultation-section">무료 견적 상담으로 이동</Link>
              <div>
                <h2>주요 상세페이지</h2>
                {regionServiceLinks.slice(0, 6).map((link) => (
                  <Link href={link.href} key={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <ConsultationSection
          title={`${regionName} 철거·원상복구 상담 신청`}
        />
      </main>
    </>
  );
}

async function CommonServiceDetail({ serviceSlug }: { serviceSlug: string }) {
  const service = getCommonServiceBySlug(serviceSlug);

  if (!service) {
    notFound();
  }

  const pages = await getPages();
  const relatedLinks = getCommonServiceRelatedLinks(pages, service.slug, 10);
  const seo = getCommonServiceSeo(service);
  const faqJsonLd = createFaqPageJsonLd(service.faq);

  return (
    <>
      <JsonLd
        data={[
          createWebPageJsonLd({
            name: seo.title,
            description: seo.description,
            url: seo.canonical,
          }),
          createBreadcrumbJsonLd([
            { name: "홈", item: BASE_URL },
            { name: service.title, item: seo.canonical },
          ]),
          faqJsonLd,
        ].filter(Boolean)}
      />
      <main className="common-service-page">
        <section className="common-service-hero">
          <div className="home-shell common-service-hero-grid">
            <div>
              <p className="home-eyebrow">더세이브 업종별 철거 상담</p>
              <h1>{service.title}</h1>
              <p>{service.intro}</p>
              {service.supportNote ? (
                <small className="common-service-note">{service.supportNote}</small>
              ) : null}
              <div className="common-service-actions">
                <Link className="home-button home-button-primary" href="#consultation-section">
                  무료 견적 상담
                </Link>
                <a className="home-button home-button-secondary" href="tel:010-8286-7620">
                  010-8286-7620 전화 상담
                </a>
              </div>
            </div>
            <img
              src="/service-banner.png"
              alt={`${service.title} 상담 안내 이미지`}
            />
          </div>
        </section>

        <section className="common-service-body">
          <div className="home-shell common-service-layout">
            <article className="common-service-content">
              <section>
                <h2>서비스 개요</h2>
                <p>{service.description}</p>
                <p>{getCommonServiceOverview(service)}</p>
              </section>

              <section>
                <h2>주로 철거하는 시설과 설비</h2>
                <ul>
                  {service.facilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2>작업 전 확인사항</h2>
                <ul>
                  {service.checks.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2>철거 범위와 폐기물 정리</h2>
                <ul>
                  {service.scope.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2>원상복구와 마감 확인</h2>
                <p>{service.restoration}</p>
              </section>

              <section>
                <h2>작업 기간과 견적에 영향을 주는 요소</h2>
                <p>{service.estimate}</p>
              </section>

              <section>
                <h2>상담 절차</h2>
                <ol>
                  <li>전화 또는 상담 폼으로 현장 정보를 접수합니다.</li>
                  <li>면적, 업종, 폐기물 양, 원상복구 기준을 확인합니다.</li>
                  <li>필요 시 현장 사진이나 방문 확인으로 작업 범위를 정리합니다.</li>
                  <li>견적과 일정을 안내하고 작업 가능 시간을 조율합니다.</li>
                  <li>철거, 폐기물 정리, 마감 확인 순서로 진행합니다.</li>
                </ol>
              </section>

              <section>
                <h2>자주 묻는 질문</h2>
                <div className="common-service-faq">
                  {service.faq.map((item) => (
                    <div key={item.question}>
                      <h3>{item.question}</h3>
                      <p>{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>

            </article>

            <aside className="common-service-side" aria-label="관련 링크">
              <Link href="/#region-section">지역별 철거 선택으로 돌아가기</Link>
              <Link href="/#services-section">업종별 서비스 전체 보기</Link>
              <div>
                <h2>관련 서비스</h2>
                {relatedLinks.map((item) => (
                  <Link href={item.href} key={item.href}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <ConsultationSection
          title={`${getConsultationServiceName(service.title)} 상담 신청`}
        />
      </main>
    </>
  );
}
