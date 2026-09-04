import { getPages, normalizePageSlug, type PageData } from "../../lib/sheet";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ConsultationChecklist from "../../components/ConsultationChecklist";
import ConsultationSection from "../../components/ConsultationSection";
import RelatedServicesSidebar from "../../components/RelatedServicesSidebar";
import { getDetailRelatedLinks } from "../../lib/internal-links";
import {
  createBreadcrumbJsonLd,
  createFaqPageJsonLd,
  createOpenGraphMetadata,
  createTwitterMetadata,
  createWebPageJsonLd,
  JsonLd,
  SERVICE_OG_IMAGE,
  SITE_URL,
} from "../../lib/seo";

const BASE_URL = SITE_URL;

type Props = {
  params: Promise<{
    region: string;
    service: string;
  }>;
};

function findPageBySlug(pages: PageData[], slug: string) {
  const normalizedSlug = normalizePageSlug(slug);

  return pages.find(
    (item) => normalizePageSlug(item.URL슬러그) === normalizedSlug,
  );
}

function getConsultationServiceName(serviceName: string) {
  return serviceName.replace(/업체/g, "").replace(/\s*안내$/g, "").trim();
}

function getHeroServiceLabel(serviceName: string) {
  return getConsultationServiceName(serviceName).replace(/\s+/g, " ").trim();
}

function getStableVariant(seed: string, modulo: number) {
  const value = Array.from(seed).reduce(
    (total, char, index) => total + char.charCodeAt(0) * (index + 5),
    0,
  );

  return value % modulo;
}

function getTextFocus(text: string) {
  return text
    .split(/[.]/)[0]
    .replace(/\s+/g, " ")
    .replace(/^[^은는]+[은는]\s*/, "")
    .trim();
}

function getCompactFocus(text: string) {
  return getTextFocus(text)
    .replace(/(합니다|됩니다|봅니다|줍니다|좋습니다|어렵습니다|필요합니다|확인해야 합니다)$/, "")
    .trim();
}

function getIntroFollowup(page: PageData, seed: string) {
  const scopeFocus = getTextFocus(page.철거범위);
  const processFocus = getTextFocus(page.진행절차);
  const estimateFocus = getTextFocus(page.비용안내);
  const serviceLabel = getHeroServiceLabel(page.서비스);
  const variants = [
    `${page.지역} ${serviceLabel} 상담에서는 ${scopeFocus} 내용을 기준으로 현장 사진과 작업 가능 시간을 함께 확인합니다.`,
    `${processFocus} 흐름을 미리 살피면 ${page.지역} 현장에서 필요한 철거 범위와 원상복구 확인 항목을 나누기 쉽습니다.`,
    `${estimateFocus} 부분은 현장마다 달라질 수 있어 ${page.지역} ${serviceLabel} 상담에서 범위를 먼저 정리합니다.`,
  ];

  return variants[getStableVariant(`${seed}:intro-followup`, variants.length)];
}

function getBodyLead(page: PageData, seed: string) {
  const featureFocus = getCompactFocus(page.현장특징);
  const cautionFocus = getCompactFocus(page.주의사항);
  const serviceLabel = getHeroServiceLabel(page.서비스);
  const variants = [
    `${page.메인키워드} 상담에서는 ${serviceLabel} 특성에 맞춰 작업 구역, 보존 설비, 폐기물 반출 순서를 먼저 나누고 ${featureFocus} 부분까지 함께 살핍니다.`,
    `${page.지역} ${serviceLabel} 현장은 철거 대상과 남겨야 할 설비가 함께 있을 수 있어 ${cautionFocus} 기준을 상담 초반에 정리합니다.`,
    `${page.메인키워드} 작업 범위는 현장 사진과 관리 기준을 함께 봐야 구체화되며, ${featureFocus} 항목을 확인하면 일정 조율이 수월합니다.`,
    `${page.지역}에서 ${serviceLabel} 철거를 준비할 때는 폐기물 분류와 원상복구 확인 항목을 초반에 나누고 ${cautionFocus} 여부를 같이 봅니다.`,
  ];

  return variants[getStableVariant(`${seed}:body-lead`, variants.length)];
}

function getPageSeo(page: PageData, slug: string) {
  return {
    title: page.페이지제목,
    description: page.메타설명,
    canonical: `${BASE_URL}${slug}`,
  };
}

function getPageFaqItems(page: PageData) {
  return [
    { question: page.FAQ1질문, answer: page.FAQ1답변 },
    { question: page.FAQ2질문, answer: page.FAQ2답변 },
    { question: page.FAQ3질문, answer: page.FAQ3답변 },
    { question: page.FAQ4질문, answer: page.FAQ4답변 },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, service } = await params;
  const pages = await getPages();

  const slug = `/${region}/${service}`;
  const page = findPageBySlug(pages, slug);

  if (!page) {
    notFound();
  }

  const seo = getPageSeo(page, slug);

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

export default async function ServicePage({ params }: Props) {
  const { region, service } = await params;
  const pages = await getPages();

  const slug = `/${region}/${service}`;
  const page = findPageBySlug(pages, slug);

  if (!page) {
    notFound();
  }
  const contentTitleVariants = [
    `${page.지역} ${page.서비스} 현장 체크포인트`,
    `${page.지역} ${page.서비스} 원상복구 핵심 정리`,
    `${page.지역} ${page.서비스} 작업 전 확인사항`,
    `${page.지역} ${page.서비스} 철거 범위와 진행 기준`,
    `${page.지역} ${page.서비스} 맞춤 원상복구 포인트`,
  ];

  const contentTitle =
    contentTitleVariants[getStableVariant(slug, contentTitleVariants.length)];
  const sectionTitleVariants = [
  {
    feature: `${page.지역} ${page.서비스} 현장에서 자주 확인하는 부분`,
    scope: `${page.서비스} 작업 범위는 어디까지 포함될까?`,
    process: `${page.지역} 현장 작업은 어떤 순서로 진행될까?`,
    cost: `${page.서비스} 견적이 달라지는 주요 기준`,
    caution: `${page.지역} ${page.서비스} 작업 전 미리 볼 사항`,
    faq: `${page.지역} ${page.서비스} 자주 묻는 질문`,
  },
  {
    feature: `${page.서비스} 현장별 주요 특징`,
    scope: `${page.지역} ${page.서비스} 철거 범위 정리`,
    process: `방문 확인부터 원상복구까지 진행 흐름`,
    cost: `비용을 결정하는 현장 조건`,
    caution: `작업 전 확인해야 할 관리 기준`,
    faq: `${page.서비스} 상담 전 많이 묻는 질문`,
  },
  {
    feature: `${page.지역} ${page.서비스} 현장 체크사항`,
    scope: `철거와 원상복구가 필요한 부분`,
    process: `${page.서비스} 작업 진행 방식`,
    cost: `${page.지역} 현장 견적 산정 포인트`,
    caution: `추가 비용을 줄이기 위한 확인사항`,
    faq: `${page.지역} ${page.서비스} FAQ`,
  },
];

  const sectionTitles =
  sectionTitleVariants[getStableVariant(`${slug}:titles`, sectionTitleVariants.length)];
  const sectionContent = {
    feature: page.현장특징,
    scope: page.철거범위,
    process: page.진행절차,
    cost: page.비용안내,
    caution: page.주의사항,
  };
  const sectionOrderVariants: Array<Array<keyof typeof sectionContent>> = [
    ["feature", "scope", "process", "cost", "caution"],
    ["scope", "feature", "process", "caution", "cost"],
    ["process", "feature", "scope", "cost", "caution"],
    ["feature", "process", "scope", "caution", "cost"],
  ];
  const orderedSectionKeys =
    sectionOrderVariants[getStableVariant(`${slug}:section-order`, sectionOrderVariants.length)];
  const heroTitle = page.H1 || `${page.지역} ${getHeroServiceLabel(page.서비스)} 상담 안내`;
  const heroDescription = page.본문요약 || page.메타설명;
  const introFollowup = getIntroFollowup(page, slug);
  const bodyLead = getBodyLead(page, slug);
  const seo = getPageSeo(page, slug);
  const regionUrl = `${BASE_URL}/${region}`;
  const faqJsonLd = createFaqPageJsonLd(getPageFaqItems(page));
  const relatedLinks = getDetailRelatedLinks(pages, slug, 10);
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
            { name: `${page.지역} 철거·원상복구 상담`, item: regionUrl },
            { name: seo.title, item: seo.canonical },
          ]),
          faqJsonLd,
        ].filter(Boolean)}
      />
    <main
      className="service-page"
      style={{
        fontFamily: "Arial, sans-serif",
        lineHeight: 1.6,
        color: "#111827",
      }}
    >
      <style>
        {`
          @media (max-width: 1024px), (prefers-color-scheme: dark) {
            .service-page {
              background: #111827 !important;
              color: #cbd5e1 !important;
            }

            .service-page-hero {
              background: #111827 !important;
              border-bottom-color: #1f2937 !important;
              color: #f8fafc !important;
            }

            .service-page-eyebrow {
              color: #94a3b8 !important;
            }

            .service-page-hero-title,
            .service-page-section-title,
            .service-page-content-title,
            .service-page-prose h3 {
              color: #ffffff !important;
            }

            .service-page-hero-description,
            .service-page-intro,
            .service-page-prose,
            .service-page-prose p {
              color: #cbd5e1 !important;
            }

            .service-page-body {
              background: #111827 !important;
              color: #cbd5e1 !important;
            }

            .service-page .service-page-body .service-page-intro-title {
              color: #ffffff !important;
            }

            .service-page .service-page-body .service-page-intro-copy {
              color: #cbd5e1 !important;
            }
          }

          .service-page-intro-copy {
            font-size: clamp(18px, 2.8vw, 21px);
            line-height: 1.75;
          }

          .service-page-intro-title {
            margin: 56px 0 28px;
            font-size: clamp(27px, 4vw, 36px);
            font-weight: 800;
            line-height: 1.35;
          }

          .service-page-body-copy {
            font-size: clamp(18px, 2.5vw, 20px);
            line-height: 1.85;
          }
        `}
      </style>
      <section className="home-hero regional-detail-hero" aria-labelledby="regional-hero-title">
        <div className="home-shell regional-detail-hero-grid">
          <div className="home-hero-copy">
            <p className="home-eyebrow">{page.지역} · {page.서비스}</p>
            <h1 id="regional-hero-title">{heroTitle}</h1>
            <p className="home-hero-description">{heroDescription}</p>
            <div className="detail-hero-link-grid" aria-label="상세 안내 링크">
              <Link className="detail-hero-link-card" href="/#region-section">
                <span>지역 비교</span>
                <strong>다른 지역 철거 페이지도 함께 확인</strong>
              </Link>
              <a className="detail-hero-link-card" href="#consultation-section">
                <span>견적 준비</span>
                <strong>현장 정보를 남기고 상담 신청</strong>
              </a>
              <a className="detail-hero-link-card" href="tel:010-8286-7620">
                <span>전화 상담</span>
                <strong>010-8286-7620 빠른 연결</strong>
              </a>
              <Link className="detail-hero-link-card" href="/#services-section">
                <span>업종 전체</span>
                <strong>업종별 철거 범위 둘러보기</strong>
              </Link>
            </div>
          </div>
          <ConsultationChecklist
            className="home-hero-checklist"
            titleId="regional-hero-checklist-title"
          />
        </div>
      </section>

      <section className="service-page-body" style={{ padding: "48px 24px" }}>
        <div className="regional-service-layout">
          <RelatedServicesSidebar
            currentServiceSlug={service}
            links={relatedLinks}
          />
          <div className="regional-service-main">
        <div style={{ width: "100%", maxWidth: "960px", margin: "0 auto" }}>
          <img
            src="/service-banner.png"
            alt="철거 서비스 안내"
            style={{
              display: "block",
              width: "100%",
              maxWidth: "720px",
              margin: "0 auto 32px",
              boxSizing: "border-box",
              borderRadius: "16px",
              border: "1px solid #e5e7eb",
            }}
          />

          <h2
            className="service-page-section-title service-page-intro-title"
            style={{ textAlign: "center" }}
          >
            {page.메인키워드} 상담 안내
          </h2>

          <p
            className="service-page-intro service-page-intro-copy"
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            {page.도입문}
          </p>

          <p
            className="service-page-intro service-page-intro-copy"
            style={{
              maxWidth: "760px",
              margin: "16px auto 0",
              textAlign: "center",
            }}
          >
            {introFollowup}
          </p>

          <div style={{ margin: "48px 0" }}>
            <img
              src="/support-package.png"
              alt="폐업 원상복구 지원 안내"
              style={{
                display: "block",
                width: "100%",
                maxWidth: "720px",
                margin: "0 auto 24px",
                boxSizing: "border-box",
                borderRadius: "16px",
                border: "1px solid #e5e7eb",
              }}
            />

            <img
              src="/why-choose-us.png"
              alt="더세이브 철거를 선택해야 하는 이유"
              style={{
                display: "block",
                width: "100%",
                maxWidth: "720px",
                margin: "0 auto 24px",
                boxSizing: "border-box",
                borderRadius: "16px",
                border: "1px solid #e5e7eb",
              }}
            />

            <img
              src="/process-step-1.png"
              alt="철거 진행 절차 1단계 2단계"
              style={{
                display: "block",
                width: "100%",
                maxWidth: "720px",
                margin: "0 auto 24px",
                boxSizing: "border-box",
                borderRadius: "16px",
                border: "1px solid #e5e7eb",
              }}
            />

            <img
              src="/process-step-2.png"
              alt="철거 진행 절차 3단계 5단계"
              style={{
                display: "block",
                width: "100%",
                maxWidth: "720px",
                margin: "0 auto 24px",
                boxSizing: "border-box",
                borderRadius: "16px",
                border: "1px solid #e5e7eb",
              }}
            />

            <img
              src="/process-step-3.png"
              alt="철거 진행 절차 6단계 7단계"
              style={{
                display: "block",
                width: "100%",
                maxWidth: "720px",
                margin: "0 auto 24px",
                boxSizing: "border-box",
                borderRadius: "16px",
                border: "1px solid #e5e7eb",
              }}
            />

            <img
              src="/before-after.png"
              alt="철거 원상복구 전후 비교"
              style={{
                display: "block",
                width: "100%",
                maxWidth: "720px",
                margin: "0 auto 24px",
                boxSizing: "border-box",
                borderRadius: "16px",
                border: "1px solid #e5e7eb",
              }}
            />
          </div>

         <h2
  className="service-page-content-title"
  style={{
    marginTop: "48px",
    textAlign: "center",
    fontSize: "28px",
    fontWeight: 800,
    lineHeight: 1.35,
  }}
>
  {contentTitle}
</h2>

<div
  className="service-page-prose"
  style={{
    maxWidth: "760px",
    margin: "20px auto 0",
    fontSize: "17px",
    lineHeight: 1.8,
  }}
>
  <p className="service-page-body-copy">
    {bodyLead}
  </p>

  {orderedSectionKeys.map((sectionKey) => (
    <section key={sectionKey}>
      <h3
        style={{
          marginTop: "36px",
          marginBottom: "10px",
          fontSize: "22px",
          fontWeight: 800,
          lineHeight: 1.4,
        }}
      >
        {sectionTitles[sectionKey]}
      </h3>
      <p className="service-page-body-copy">{sectionContent[sectionKey]}</p>
    </section>
  ))}

  <h3
  style={{
    marginTop: "36px",
    marginBottom: "10px",
    fontSize: "22px",
    fontWeight: 800,
    lineHeight: 1.4,
  }}
>
  {sectionTitles.faq}
</h3>

  <div style={{ marginTop: "16px" }}>
    <strong>Q. {page.FAQ1질문}</strong>
    <p>A. {page.FAQ1답변}</p>
  </div>

  <div style={{ marginTop: "16px" }}>
    <strong>Q. {page.FAQ2질문}</strong>
    <p>A. {page.FAQ2답변}</p>
  </div>

  <div style={{ marginTop: "16px" }}>
    <strong>Q. {page.FAQ3질문}</strong>
    <p>A. {page.FAQ3답변}</p>
  </div>

  <div style={{ marginTop: "16px" }}>
    <strong>Q. {page.FAQ4질문}</strong>
    <p>A. {page.FAQ4답변}</p>
  </div>
</div> 
        </div>
      <ConsultationSection
        title={`${page.지역} ${getConsultationServiceName(page.서비스)} 상담 신청`}
      />
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
