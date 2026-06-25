"use client";

import { useState } from "react";

const regions = [
  "서울",
  "경기",
  "인천",
  "부산",
  "대구",
  "대전",
  "광주",
  "울산",
  "세종",
  "충청",
  "강원",
] as const;

type Region = (typeof regions)[number];

type ServicePage = {
  URL슬러그: string;
  페이지제목: string;
};

type RouteResolvableServicePage = ServicePage & {
  href: string;
};

type VisibleRegionGroup = {
  anchorSlug: string;
  district: string;
  region: string;
  pages: RouteResolvableServicePage[];
};

export type PagesByRegion = Array<{
  region: string;
  pages: ServicePage[];
}>;

const districtsByRegion: Record<Region, readonly string[]> = {
  서울: [
    "강남구",
    "강동구",
    "강북구",
    "강서구",
    "관악구",
    "광진구",
    "구로구",
    "금천구",
    "노원구",
    "도봉구",
    "동대문구",
    "동작구",
    "마포구",
    "서대문구",
    "서초구",
    "성동구",
    "성북구",
    "송파구",
    "양천구",
    "영등포구",
    "용산구",
    "은평구",
    "종로구",
    "중구",
    "중랑구",
  ],
  경기: [
    "수원",
    "고양",
    "용인",
    "성남",
    "화성",
    "부천",
    "남양주",
    "안산",
    "평택",
    "안양",
    "시흥",
    "파주",
    "김포",
    "의정부",
    "광명",
    "경기광주",
    "하남",
    "군포",
    "의왕",
    "오산",
    "이천",
  ],
  인천: [
    "인천중구",
    "인천동구",
    "인천미추홀구",
    "인천연수구",
    "인천남동구",
    "인천부평구",
    "인천계양구",
    "인천서구",
  ],
  부산: [
    "부산영도구",
    "부산부산진구",
    "부산동래구",
    "부산남구",
    "부산북구",
    "부산해운대구",
    "부산사하구",
    "부산금정구",
    "부산강서구",
    "부산연제구",
    "부산수영구",
    "부산사상구",
    "부산기장군",
  ],
  대구: [
    "대구달서구",
    "대구수성구",
    "대구북구",
    "대구동구",
    "대구중구",
    "대구달성군",
    "대구서구",
    "대구남구",
  ],
  대전: [
    "대전동구",
    "대전중구",
    "대전서구",
    "대전유성구",
    "대전대덕구",
  ],
  광주: [
    "광주동구",
    "광주서구",
    "광주남구",
    "광주북구",
    "광주광산구",
  ],
  울산: [],
  세종: [],
  충청: [],
  강원: [],
};

const pendingMessage = "해당 지역 정보는 순차적으로 추가될 예정입니다.";

const districtAnchorSlugs: Record<string, string> = {
  강남구: "gangnam",
  강동구: "gangdong",
  강북구: "gangbuk",
  강서구: "gangseo",
  관악구: "gwanak",
  광진구: "gwangjin",
  구로구: "guro",
  금천구: "geumcheon",
  노원구: "nowon",
  도봉구: "dobong",
  동대문구: "dongdaemun",
  동작구: "dongjak",
  마포구: "mapo",
  서대문구: "seodaemun",
  서초구: "seocho",
  성동구: "seongdong",
  성북구: "seongbuk",
  송파구: "songpa",
  양천구: "yangcheon",
  영등포구: "yeongdeungpo",
  용산구: "yongsan",
  은평구: "eunpyeong",
  종로구: "jongno",
  중구: "jung",
  중랑구: "jungnang",
  수원: "suwon",
  고양: "goyang",
  용인: "yongin",
  성남: "seongnam",
  화성: "hwaseong",
  부천: "bucheon",
  남양주: "namyangju",
  안산: "ansan",
  평택: "pyeongtaek",
  안양: "anyang",
  시흥: "siheung",
  파주: "paju",
  김포: "gimpo",
  의정부: "uijeongbu",
  광주: "gwangju",
  하남: "hanam",
  광명: "gwangmyeong",
  군포: "gunpo",
  의왕: "uiwang",
  오산: "osan",
  이천: "icheon",
  대구달서구: "daegu-dalseo",
  대구수성구: "daegu-suseong",
  대구북구: "daegu-buk",
  대구동구: "daegu-dong",
  대구중구: "daegu-jung",
  대구달성군: "daegu-dalseong",
  대구서구: "daegu-seo",
  대구남구: "daegu-nam",
  대전동구: "daejeon-dong",
  대전중구: "daejeon-jung",
  대전서구: "daejeon-seo",
  대전유성구: "daejeon-yuseong",
  대전대덕구: "daejeon-daedeok",
  광주동구: "gwangju-dong",
  광주서구: "gwangju-seo",
  광주남구: "gwangju-nam",
  광주북구: "gwangju-buk",
  광주광산구: "gwangju-gwangsan",
};

function normalizeRegionName(region: string) {
  return region.trim().replace(/\s+/g, "");
}

function normalizeRegionNameForMatch(region: string) {
  return normalizeRegionName(region).replace(/(특별시|광역시|특례시|시|군|구)$/, "");
}

function findRegionPages(pagesByRegion: PagesByRegion, district: string) {
  const normalizedDistrict = normalizeRegionName(district);
  const exactMatch = pagesByRegion.find(
    ({ region }) => normalizeRegionName(region) === normalizedDistrict,
  );

  if (exactMatch) {
    return exactMatch;
  }

  const relaxedDistrict = normalizeRegionNameForMatch(district);

  const relaxedMatch = pagesByRegion.find(
    ({ region }) => normalizeRegionNameForMatch(region) === relaxedDistrict,
  );

  if (relaxedMatch) {
    return relaxedMatch;
  }

  return pagesByRegion.find(({ region }) => {
    const normalizedRegion = normalizeRegionName(region);
    const relaxedRegion = normalizeRegionNameForMatch(region);

    return (
      normalizedRegion.endsWith(normalizedDistrict) ||
      relaxedRegion.endsWith(relaxedDistrict)
    );
  });
}

function toPageHref(pageSlug: string) {
  const trimmedSlug = pageSlug.trim();

  if (!trimmedSlug) {
    return null;
  }

  const href = trimmedSlug.startsWith("/") ? trimmedSlug : "/" + trimmedSlug;
  const pathSegments = href.replace(/^\/+|\/+$/g, "").split("/");
  const isEnglishDetailSlug =
    pathSegments.length === 2 &&
    pathSegments.every((segment) => /^[a-z0-9-]+$/.test(segment));

  return isEnglishDetailSlug ? href : null;
}

function getRouteResolvablePages(pages: ServicePage[]) {
  return pages.reduce<RouteResolvableServicePage[]>((linkablePages, page) => {
    const href = toPageHref(page.URL슬러그);

    if (href) {
      linkablePages.push({ ...page, href });
    }

    return linkablePages;
  }, []);
}

function getDistrictAnchorSlug(district: string) {
  return districtAnchorSlugs[district] ?? normalizeRegionNameForMatch(district);
}

function getDisplayRegionName(region: string) {
  return region
    .replace(/부산부산진구/g, "부산진구")
    .replace(/대구(달서구|수성구|달성군)/g, "$1")
    .replace(/대전(유성구|대덕구)/g, "$1")
    .replace(/광주(광산구)/g, "$1");
}

export default function HomeRegionExplorer({
  pagesByRegion,
}: {
  pagesByRegion: PagesByRegion;
}) {
  const [selectedRegion, setSelectedRegion] = useState<Region>("서울");
  const districts = districtsByRegion[selectedRegion];
  const hasDistricts = districts.length > 0;
  const districtHeading = hasDistricts
    ? `${getDisplayRegionName(selectedRegion)} 지역 보기`
    : "지역 정보 준비중";
  const visibleRegionGroups = districts.flatMap<VisibleRegionGroup>((district) => {
    const regionPages = findRegionPages(pagesByRegion, district);

    if (!regionPages) {
      return [];
    }

    const anchorSlug = getDistrictAnchorSlug(district);
    const routeResolvablePages = getRouteResolvablePages(regionPages.pages);

    return [
      {
        anchorSlug,
        district,
        region: regionPages.region,
        pages: routeResolvablePages,
      },
    ];
  });
  const sectionAnchorSlugByDistrict = new Map(
    visibleRegionGroups.map(({ anchorSlug, district }) => [
      district,
      anchorSlug,
    ]),
  );

  const handlePendingDistrictClick = () => {
    alert(pendingMessage);
  };

  const handleDistrictScroll = (slug?: string) => {
    if (!slug) {
      handlePendingDistrictClick();
      return;
    }

    const sectionId = `region-${slug}`;
    const section = document.getElementById(sectionId);

    document.getElementById(`region-${slug}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    if (!section) {
      handlePendingDistrictClick();
    }
  };

  return (
    <>
      <section
        className="home-hero-section"
        style={{
          padding: "80px 24px 88px",
          background: "#f3f4f6",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <p
            className="home-hero-eyebrow"
            style={{ color: "#6b7280", marginBottom: "12px" }}
          >
            철거 · 원상복구 · 폐기물 처리
          </p>

          <h1
            className="home-hero-title"
            style={{
              fontSize: "42px",
              lineHeight: 1.2,
              margin: "0 0 16px",
            }}
          >
            전국 원상복구 철거업체 찾기
          </h1>

          <p
            className="home-hero-description"
            style={{ margin: "0 auto", fontSize: "18px", maxWidth: "760px" }}
          >
            식당, 학원, 사무실, 상가 등 업종별 원상복구 철거 정보를 지역별로 한눈에 확인해보세요.
          </p>

          <a
            className="home-phone-link"
            href="tel:010-8286-7620"
            style={{
              display: "inline-block",
              marginTop: "24px",
              padding: "14px 22px",
              background: "#111827",
              color: "white",
              textDecoration: "none",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            010-8286-7620 전화 상담하기
          </a>

          <div className="hero-region-layout">
            <img
              className="home-hero-image"
              src="/hero-demolition.png"
              alt="철거 원상복구 상담 안내"
              style={{
                display: "block",
                width: "100%",
                maxWidth: "820px",
                margin: "0 auto",
                boxSizing: "border-box",
                borderRadius: "16px",
                border: "1px solid #e5e7eb",
              }}
            />

            <div className="hero-region-selector">
              <p
                className="hero-region-label"
                style={{
                  margin: "0 0 12px",
                  color: "#6b7280",
                  fontSize: "13px",
                  fontWeight: 800,
                  letterSpacing: "0.04em",
                }}
              >
                지역 선택
              </p>

              <div className="hero-region-buttons" aria-label="지역 선택">
                {regions.map((region) => (
                  <button
                    className="hero-region-button"
                    key={region}
                    type="button"
                    aria-pressed={selectedRegion === region}
                    onClick={() => setSelectedRegion(region)}
                  >
                    {getDisplayRegionName(region)}
                  </button>
                ))}
              </div>
            </div>

            <div className="hero-district-card" aria-live="polite">
              <h2
                className="hero-district-heading"
                style={{
                  margin: "0 0 12px",
                  color: "#374151",
                  fontSize: "15px",
                }}
              >
                {districtHeading}
              </h2>

              {hasDistricts ? (
                <div className="hero-district-chips">
                  {districts.map((district) => {
                    const anchorSlug = sectionAnchorSlugByDistrict.get(district);

                    return (
                      <button
                        className="hero-district-chip"
                        key={district}
                        type="button"
                        onClick={() => handleDistrictScroll(anchorSlug)}
                      >
                        {getDisplayRegionName(district)}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p
                  className="hero-district-pending"
                  style={{ margin: 0, color: "#6b7280" }}
                >
                  {pendingMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        className="home-services-section"
        style={{ padding: "48px 24px", background: "#fafafa" }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="home-services-header" style={{ marginBottom: "28px" }}>
            <h2
              className="home-services-title"
              style={{
                margin: "0 0 10px",
                fontSize: "30px",
                lineHeight: 1.25,
                fontWeight: 800,
                wordBreak: "keep-all",
                overflowWrap: "break-word",
              }}
            >
              지역별 철거 서비스 바로가기
            </h2>

            <p
              className="home-services-description"
              style={{
                margin: 0,
                maxWidth: "720px",
                color: "#6b7280",
                fontSize: "16px",
                lineHeight: 1.7,
                wordBreak: "keep-all",
                overflowWrap: "break-word",
              }}
            >
              아래에서 원하는 지역과 철거 서비스를 선택하면 해당 상담 안내 페이지로 이동할 수 있습니다.
            </p>
          </div>

          <div
            aria-live="polite"
            style={{
              display: "grid",
              gap: "20px",
            }}
          >
            {hasDistricts ? (
              visibleRegionGroups.map(({ anchorSlug, region, pages: regionPages }) => (
                <section
                  className="home-region-section"
                  id={`region-${anchorSlug}`}
                  key={region}
                  style={{
                    padding: "24px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    background: "white",
                    boxSizing: "border-box",
                    transition:
                      "border-color 160ms ease, box-shadow 160ms ease",
                  }}
                >
                  <h3
                    style={{
                      margin: "0 0 16px",
                      fontSize: "22px",
                      lineHeight: 1.35,
                      fontWeight: 800,
                      wordBreak: "keep-all",
                      overflowWrap: "break-word",
                    }}
                  >
                    {getDisplayRegionName(region)}
                  </h3>

                  {regionPages.length > 0 ? (
                    <div
                      className="home-service-grid"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                        gap: "16px",
                      }}
                    >
                      {regionPages.map((page) => (
                        <a
                          className="home-service-card"
                          key={page.URL슬러그}
                          href={page.href}
                          style={{
                            display: "flex",
                            minHeight: "88px",
                            alignItems: "center",
                            padding: "24px",
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px",
                            textDecoration: "none",
                            color: "#111827",
                            background: "#ffffff",
                            boxSizing: "border-box",
                            fontSize: "17px",
                            fontWeight: 600,
                            lineHeight: 1.625,
                            wordBreak: "keep-all",
                            whiteSpace: "normal",
                            overflowWrap: "break-word",
                            transition:
                              "border-color 160ms ease, background 160ms ease, transform 160ms ease",
                          }}
                        >
                          {getDisplayRegionName(page.페이지제목)}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div
                      className="home-region-pending"
                      style={{
                        padding: "18px 16px",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        background: "#ffffff",
                        color: "#6b7280",
                        boxSizing: "border-box",
                        fontSize: "15px",
                        fontWeight: 700,
                        lineHeight: 1.5,
                      }}
                    >
                      {pendingMessage}
                    </div>
                  )}
                </section>
              ))
            ) : (
              <div
                className="home-services-pending"
                style={{
                  padding: "32px 24px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  background: "#ffffff",
                  color: "#6b7280",
                  textAlign: "center",
                  fontSize: "16px",
                  fontWeight: 700,
                }}
              >
                {pendingMessage}
              </div>
            )}
          </div>
        </div>

        <style>
          {`
            .hero-region-layout {
              margin-top: 40px;
              text-align: left;
            }

            .hero-region-selector {
              max-width: 900px;
              margin: 30px auto 0;
              padding: 24px;
              border: 1px solid #e5e7eb;
              border-radius: 14px;
              background: rgba(255, 255, 255, 0.58);
              box-sizing: border-box;
            }

            .hero-region-buttons {
              display: grid;
              grid-template-columns: repeat(6, minmax(0, 1fr));
              gap: 12px;
            }

            .hero-region-button {
              display: inline-flex;
              min-height: 48px;
              min-width: 88px;
              width: 100%;
              align-items: center;
              justify-content: center;
              padding: 12px 20px;
              border: 1px solid #dce1e7;
              border-radius: 999px;
              background: #ffffff;
              color: #374151;
              box-sizing: border-box;
              cursor: pointer;
              font: inherit;
              font-size: 16px;
              font-weight: 600;
              line-height: 1.4;
              text-align: center;
              white-space: nowrap;
              word-break: keep-all;
              transition: border-color 160ms ease, background 160ms ease,
                color 160ms ease;
            }

            .hero-region-button[aria-pressed="true"] {
              border-color: #111827;
              background: #111827;
              color: #ffffff;
            }

            .hero-region-button:hover:not([aria-pressed="true"]) {
              border-color: #9ca3af;
              background: #f9fafb;
            }

            .hero-district-card {
              max-width: 960px;
              margin: 14px auto 0;
              padding: 24px;
              border: 1px solid #e5e7eb;
              border-radius: 12px;
              background: rgba(255, 255, 255, 0.78);
              box-sizing: border-box;
            }

            .hero-district-chips {
              display: grid;
              grid-template-columns: repeat(6, minmax(0, 1fr));
              gap: 12px;
            }

            .hero-district-chip {
              display: inline-flex;
              min-height: 44px;
              min-width: 112px;
              width: 100%;
              align-items: center;
              justify-content: center;
              padding: 10px 16px;
              border-radius: 999px;
              border: 1px solid #e5e7eb;
              background: #ffffff;
              color: #4b5563;
              box-sizing: border-box;
              cursor: pointer;
              font: inherit;
              font-size: 16px;
              font-weight: 600;
              line-height: 1.4;
              text-align: center;
              white-space: nowrap;
              word-break: keep-all;
              text-decoration: none;
              transition: border-color 160ms ease, color 160ms ease,
                background 160ms ease;
            }

            button.hero-district-chip:hover {
              border-color: #9ca3af;
              background: #f9fafb;
              color: #111827;
            }

            .home-service-card:hover {
              border-color: #9ca3af;
              background: #f9fafb;
              transform: translateY(-1px);
            }

            .home-region-section:hover {
              border-color: #d1d5db;
              box-shadow: 0 14px 34px rgba(15, 23, 42, 0.07);
            }

            @media (max-width: 1280px) {
              .hero-district-chips {
                grid-template-columns: repeat(5, minmax(0, 1fr));
              }
            }

            @media (max-width: 1024px) {
              .hero-region-buttons {
                grid-template-columns: repeat(5, minmax(0, 1fr));
              }

              .hero-district-chips {
                grid-template-columns: repeat(4, minmax(0, 1fr));
              }

              .home-service-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
              }
            }

            @media (max-width: 768px) {
              .home-hero-section {
                padding: 56px 18px 64px !important;
                background: #111827 !important;
                border-bottom-color: #1f2937 !important;
                color: #f8fafc !important;
              }

              .home-hero-eyebrow {
                color: #e2e8f0 !important;
              }

              .home-hero-title {
                margin-bottom: 14px !important;
                color: #ffffff !important;
                font-size: 32px !important;
                line-height: 1.25 !important;
                word-break: keep-all;
              }

              .home-hero-description {
                color: #cbd5e1 !important;
                font-size: 16px !important;
                line-height: 1.65;
                word-break: keep-all;
              }

              .home-phone-link {
                display: inline-flex !important;
                min-height: 48px;
                align-items: center;
                justify-content: center;
                margin-top: 22px !important;
                padding: 12px 20px !important;
                box-sizing: border-box;
              }

              .hero-region-layout {
                margin-top: 32px;
              }

              .home-hero-image {
                height: auto;
                border-radius: 12px !important;
              }

              .hero-region-selector {
                margin-top: 24px;
                padding: 16px;
                background: rgba(255, 255, 255, 0.94);
                color: #111827 !important;
              }

              .hero-region-label {
                color: #475569 !important;
              }

              .hero-region-buttons {
                grid-template-columns: repeat(4, minmax(0, 1fr));
                gap: 8px;
              }

              .hero-region-button {
                min-height: 44px;
                min-width: 76px;
                padding: 7px 10px;
                font-size: 14px;
              }

              .hero-district-card {
                padding: 16px;
                background: rgba(255, 255, 255, 0.94);
                color: #111827 !important;
              }

              .hero-district-heading {
                color: #1f2937 !important;
              }

              .hero-district-pending {
                color: #475569 !important;
              }

              .hero-district-chip {
                min-height: 42px;
                min-width: 96px;
                padding: 6px 10px;
                font-size: 14px;
              }

              .hero-district-chips {
                grid-template-columns: repeat(3, minmax(0, 1fr));
                gap: 8px;
              }

              .home-services-section {
                padding: 40px 18px !important;
                background: #111827 !important;
                color: #f8fafc !important;
              }

              .home-services-header {
                color: #f8fafc !important;
              }

              .home-services-title {
                color: #ffffff !important;
                font-size: 26px !important;
              }

              .home-services-description {
                color: #cbd5e1 !important;
              }

              .home-services-section > div > div[aria-live="polite"] {
                color: #f8fafc !important;
              }

              .home-region-section {
                padding: 20px !important;
                background: #ffffff !important;
                color: #111827 !important;
              }

              .home-region-section h3 {
                color: #111827 !important;
              }

              .home-region-section,
              .home-region-section p,
              .home-region-section span,
              .home-region-section strong {
                color: #111827 !important;
              }

              .home-service-grid {
                grid-template-columns: 1fr !important;
              }

              .home-service-card {
                min-height: 76px !important;
                width: 100%;
                padding: 16px !important;
                background: #ffffff !important;
                color: #111827 !important;
                font-size: 16px !important;
                line-height: 1.625 !important;
                overflow-wrap: break-word !important;
              }

              .home-services-pending {
                background: #ffffff !important;
                color: #475569 !important;
              }

              .home-region-pending {
                background: #ffffff !important;
                color: #475569 !important;
              }
            }

            @media (max-width: 640px) {
              .hero-region-buttons {
                grid-template-columns: repeat(3, minmax(0, 1fr));
              }

              .hero-district-chips {
                grid-template-columns: repeat(2, minmax(0, 1fr));
              }
            }
          `}
        </style>
      </section>
    </>
  );
}
