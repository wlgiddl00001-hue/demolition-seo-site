import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  COMMON_SERVICES,
  getCommonServiceBySlug,
} from "../lib/common-services";
import { getPages, normalizePageSlug, type PageData } from "../lib/sheet";
import {
  getRegionSlugFromUrlSlug,
  getServiceCardsForPages,
} from "../lib/service-cards";
import ConsultationSection from "../components/ConsultationSection";

const BASE_URL = "https://demolition-seo-site.vercel.app";

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
    const canonical = `${BASE_URL}/${commonService.slug}`;

    return {
      title: commonService.metaTitle,
      description: commonService.metaDescription,
      alternates: {
        canonical,
      },
      openGraph: {
        title: commonService.metaTitle,
        description: commonService.metaDescription,
        url: canonical,
        siteName: "더세이브",
        type: "website",
      },
    };
  }

  const pages = await getPages();
  const regionPages = getRegionPages(pages, region);

  if (regionPages.length === 0) {
    return {
      title: "페이지를 찾을 수 없습니다",
      description: "요청한 철거 상담 페이지를 찾을 수 없습니다.",
    };
  }

  const regionName = getRegionName(regionPages, region);
  const canonical = `${BASE_URL}/${region}`;

  return {
    title: `${regionName} 철거·원상복구 상담 | 더세이브`,
    description: `${regionName} 상가철거, 식당철거, 사무실철거, 폐업철거와 원상복구 상담 페이지를 확인하세요.`,
    alternates: {
      canonical,
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
  const serviceCards = getServiceCardsForPages(regionPages, region);

  return (
    <main className="region-index-page">
      <section className="region-index-hero">
        <div className="home-shell">
          <p className="home-eyebrow">지역별 철거 상담</p>
          <h1>{regionName} 철거·원상복구 상담</h1>
          <p>
            {regionName}에서 제공되는 업종별 철거 및 원상복구 상세페이지를
            확인하세요. 아래 링크는 기존 지역별 상세 URL을 그대로 사용합니다.
          </p>
          <div className="common-service-actions">
            <a className="home-button home-button-primary" href="/#consultation-section">
              무료 견적 상담
            </a>
            <a className="home-button home-button-secondary" href="tel:010-8286-7620">
              010-8286-7620 전화 상담
            </a>
          </div>
        </div>
      </section>

      <section className="region-index-body">
        <div className="home-shell">
          <div className="home-link-grid">
            {serviceCards.map((service) => (
              <a className="home-service-link" href={service.href} key={service.slug}>
                <span>{service.title}</span>
                <small>{service.description}</small>
                {service.supportNote ? <em>{service.supportNote}</em> : null}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function CommonServiceDetail({ serviceSlug }: { serviceSlug: string }) {
  const service = getCommonServiceBySlug(serviceSlug);

  if (!service) {
    notFound();
  }

  const relatedServices = COMMON_SERVICES.filter(
    (item) => item.slug !== service.slug,
  ).slice(0, 4);

  return (
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
              <a className="home-button home-button-primary" href="/#consultation-section">
                무료 견적 상담
              </a>
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
              <p>{service.intro}</p>
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
            <a href="/#region-section">지역별 철거 선택으로 돌아가기</a>
            <a href="/#services-section">업종별 서비스 전체 보기</a>
            <div>
              <h2>관련 서비스</h2>
              {relatedServices.map((item) => (
                <a href={`/${item.slug}`} key={item.slug}>
                  {item.title}
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <ConsultationSection
        id="common-service-consultation"
        title={`${getConsultationServiceName(service.title)} 상담 신청`}
      />
    </main>
  );
}
