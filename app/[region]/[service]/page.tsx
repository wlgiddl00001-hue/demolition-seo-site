import { getPages, normalizePageSlug, type PageData } from "../../lib/sheet";
import type { Metadata } from "next";
import ConsultationChecklist from "../../components/ConsultationChecklist";
import ConsultationSection from "../../components/ConsultationSection";
import RelatedServicesSidebar from "../../components/RelatedServicesSidebar";

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

function getHeroTitle(regionName: string, serviceName: string) {
  const serviceLabel = getHeroServiceLabel(serviceName);

  if (serviceLabel.includes("원상복구")) {
    return `${regionName} 원상복구 상담 안내`;
  }

  if (serviceLabel.includes("철거")) {
    return `${regionName} ${serviceLabel}부터 원상복구까지 한 번에`;
  }

  return `${regionName} ${serviceLabel} 철거와 원상복구 상담`;
}

function getHeroFocusText(serviceName: string) {
  const normalizedService = serviceName.replace(/\s+/g, "");

  if (normalizedService.includes("식당")) {
    return "주방 설비, 후드, 배관, 가스, 바닥 오염 상태";
  }

  if (normalizedService.includes("카페")) {
    return "카운터, 급배수, 전기, 쇼케이스, 간판 철거 범위";
  }

  if (normalizedService.includes("PC방")) {
    return "전기 배선, 통신선, 칸막이, 냉난방 설비";
  }

  if (normalizedService.includes("노래방")) {
    return "방음재, 룸 칸막이, 음향 장비, 소방설비";
  }

  if (normalizedService.includes("사무실")) {
    return "파티션, 천장, 바닥재, 전기·통신 설비";
  }

  if (normalizedService.includes("미용실")) {
    return "샴푸대, 급배수, 거울, 전기 설비";
  }

  if (normalizedService.includes("헬스장")) {
    return "바닥재, 샤워실, 운동기구 반출 동선";
  }

  if (normalizedService.includes("학원")) {
    return "칸막이, 책상, 보드, 전기·통신 설비";
  }

  if (normalizedService.includes("상가")) {
    return "내부 인테리어, 간판, 바닥·벽면 마감, 폐기물 반출 조건";
  }

  if (normalizedService.includes("폐업")) {
    return "폐업 일정, 집기 정리, 폐기물 반출, 원상복구 범위";
  }

  if (normalizedService.includes("원상복구")) {
    return "계약서 기준, 관리실 확인 사항, 바닥·벽면·천장 마감 상태";
  }

  return "철거 범위, 원상복구 상태, 폐기물 반출 조건";
}

function getHeroDescription(regionName: string, serviceName: string) {
  const serviceLabel = getHeroServiceLabel(serviceName);
  const focusText = getHeroFocusText(serviceName);

  return `${regionName}에서 ${serviceLabel}를 준비 중이라면 현장의 철거 범위와 원상복구 상태를 먼저 확인해야 합니다. ${focusText}를 살펴보고, 현장 구조와 폐기물 양, 장비 진입 조건, 작업 일정에 맞춰 견적과 진행 절차를 안내합니다.`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, service } = await params;
  const pages = await getPages();

  const slug = `/${region}/${service}`;
  const page = findPageBySlug(pages, slug);

  if (!page) {
    return {
      title: "페이지를 찾을 수 없습니다",
      description: "요청한 철거 페이지를 찾을 수 없습니다.",
    };
  }

  return {
    title: page.페이지제목,
    description: page.메타설명,
  };
}

export default async function ServicePage({ params }: Props) {
  const { region, service } = await params;
  const pages = await getPages();

  const slug = `/${region}/${service}`;
  const page = findPageBySlug(pages, slug);

  if (!page) {
    return (
      <main style={{ padding: "40px" }}>
        <h1>페이지를 찾을 수 없습니다</h1>
        <p>요청한 주소: {slug}</p>
      </main>
    );
  }
  const contentTitleVariants = [
    `${page.지역} ${page.서비스} 현장 체크포인트`,
    `${page.지역} ${page.서비스} 원상복구 핵심 정리`,
    `${page.지역} ${page.서비스} 작업 전 확인사항`,
    `${page.지역} ${page.서비스} 철거 범위와 진행 기준`,
    `${page.지역} ${page.서비스} 맞춤 원상복구 포인트`,
  ];

  const contentTitle =
    contentTitleVariants[slug.length % contentTitleVariants.length];
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
  sectionTitleVariants[slug.length % sectionTitleVariants.length];
  const heroTitle = getHeroTitle(page.지역, page.서비스);
  const heroDescription = getHeroDescription(page.지역, page.서비스);
    return (
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
            <div className="home-hero-actions" aria-label="상단 바로가기">
              <a className="home-button home-button-primary" href="/#region-section">
                지역별 철거 선택
              </a>
              <a className="home-button home-button-secondary" href="#regional-service-consultation">
                무료 견적 신청
              </a>
              <a className="home-button home-button-secondary" href="tel:010-8286-7620">
                010-8286-7620 전화 상담
              </a>
              <a className="home-button home-button-accent-soft" href="/#services-section">
                업종별 서비스
              </a>
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
          <RelatedServicesSidebar currentServiceSlug={service} />
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
            {page.지역}에서 {page.서비스}를 준비 중이라면 현장 사진과 철거
            범위를 먼저 확인하는 것이 중요합니다. 공간 구조, 폐기물 양,
            원상복구 필요 여부에 따라 작업 방식과 견적이 달라질 수 있습니다.
          </p>

          <p
            className="service-page-intro service-page-intro-copy"
            style={{
              maxWidth: "760px",
              margin: "16px auto 0",
              textAlign: "center",
            }}
          >
            더세이브는 상담을 통해 현재 현장 상황을 확인하고, 필요한 철거
            범위와 원상복구 방향을 안내드립니다. 식당, 상가, 사무실 등 다양한
            공간의 철거 상담을 도와드립니다.
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
  <p className="service-page-body-copy">{page.도입문}</p>

  <h3
  style={{
    marginTop: "36px",
    marginBottom: "10px",
    fontSize: "22px",
    fontWeight: 800,
    lineHeight: 1.4,
  }}
>
  {sectionTitles.feature}
</h3>
  <p className="service-page-body-copy">{page.현장특징}</p>

  <h3
  style={{
    marginTop: "36px",
    marginBottom: "10px",
    fontSize: "22px",
    fontWeight: 800,
    lineHeight: 1.4,
  }}
>
  {sectionTitles.scope}
</h3>
  <p className="service-page-body-copy">{page.철거범위}</p>

  <h3
  style={{
    marginTop: "36px",
    marginBottom: "10px",
    fontSize: "22px",
    fontWeight: 800,
    lineHeight: 1.4,
  }}
>
  {sectionTitles.process}
</h3>
  <p className="service-page-body-copy">{page.진행절차}</p>

  <h3
  style={{
    marginTop: "36px",
    marginBottom: "10px",
    fontSize: "22px",
    fontWeight: 800,
    lineHeight: 1.4,
  }}
>
  {sectionTitles.cost}
</h3>
  <p className="service-page-body-copy">{page.비용안내}</p>

  <h3
  style={{
    marginTop: "36px",
    marginBottom: "10px",
    fontSize: "22px",
    fontWeight: 800,
    lineHeight: 1.4,
  }}
>
  {sectionTitles.caution}
</h3>
  <p className="service-page-body-copy">{page.주의사항}</p>

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
</div> 
        </div>
      <ConsultationSection
        id="regional-service-consultation"
        title={`${page.지역} ${getConsultationServiceName(page.서비스)} 상담 신청`}
      />
          </div>
        </div>
      </section>
    </main>
  );
}
