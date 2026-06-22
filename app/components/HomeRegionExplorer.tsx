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
    "광주",
    "하남",
    "광명",
    "군포",
  ],
  인천: [],
  부산: [],
  대구: [],
  대전: [],
  광주: [],
  울산: [],
  세종: [],
  충청: [],
  강원: [],
};

const pendingMessage = "해당 지역 정보는 순차적으로 추가될 예정입니다.";

function toPageHref(slug: string) {
  return `/${slug.replace(/^\/+/, "")}`;
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
    ? `${selectedRegion} 지역 보기`
    : "지역 정보 준비중";
  const visibleRegionGroups = pagesByRegion.filter(({ region }) =>
    districts.includes(region),
  );

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
          <p style={{ color: "#6b7280", marginBottom: "12px" }}>
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
                    {region}
                  </button>
                ))}
              </div>
            </div>

            <div className="hero-district-card" aria-live="polite">
              <h2
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
                  {districts.map((district) => (
                    <span className="hero-district-chip" key={district}>
                      {district}
                    </span>
                  ))}
                </div>
              ) : (
                <p style={{ margin: 0, color: "#6b7280" }}>
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
          <div style={{ marginBottom: "28px" }}>
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
              visibleRegionGroups.map(({ region, pages: regionPages }) => (
                <section
                  className="home-region-section"
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
                    {region}
                  </h3>

                  <div
                    className="home-service-grid"
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(210px, 1fr))",
                      gap: "12px",
                    }}
                  >
                    {regionPages.map((page) => (
                      <a
                        className="home-service-card"
                        key={page.URL슬러그}
                        href={toPageHref(page.URL슬러그)}
                        style={{
                          display: "flex",
                          minHeight: "64px",
                          alignItems: "center",
                          padding: "14px 16px",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          textDecoration: "none",
                          color: "#111827",
                          background: "#ffffff",
                          boxSizing: "border-box",
                          fontSize: "15px",
                          fontWeight: 800,
                          lineHeight: 1.45,
                          wordBreak: "keep-all",
                          overflowWrap: "break-word",
                          transition:
                            "border-color 160ms ease, background 160ms ease, transform 160ms ease",
                        }}
                      >
                        {page.페이지제목}
                      </a>
                    ))}
                  </div>
                </section>
              ))
            ) : (
              <div
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
              max-width: 720px;
              margin: 30px auto 0;
              padding: 18px 20px;
              border: 1px solid #e5e7eb;
              border-radius: 14px;
              background: rgba(255, 255, 255, 0.58);
              box-sizing: border-box;
            }

            .hero-region-buttons {
              display: flex;
              flex-wrap: wrap;
              gap: 8px;
              justify-content: center;
            }

            .hero-region-button {
              padding: 6px 13px;
              border: 1px solid #dce1e7;
              border-radius: 999px;
              background: #ffffff;
              color: #374151;
              cursor: pointer;
              font: inherit;
              font-size: 13px;
              font-weight: 700;
              line-height: 1.4;
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
              max-width: 720px;
              margin: 14px auto 0;
              padding: 14px 16px;
              border: 1px solid #e5e7eb;
              border-radius: 12px;
              background: rgba(255, 255, 255, 0.78);
              box-sizing: border-box;
            }

            .hero-district-chips {
              display: flex;
              flex-wrap: wrap;
              gap: 7px;
            }

            .hero-district-chip {
              padding: 4px 9px;
              border-radius: 999px;
              border: 1px solid #e5e7eb;
              background: #ffffff;
              color: #4b5563;
              font-size: 12px;
              font-weight: 600;
              line-height: 1.4;
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

            @media (max-width: 640px) {
              .home-hero-section {
                padding: 56px 18px 64px !important;
              }

              .home-hero-title {
                margin-bottom: 14px !important;
                font-size: 32px !important;
                line-height: 1.25 !important;
                word-break: keep-all;
              }

              .home-hero-description {
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
              }

              .hero-region-buttons {
                display: grid;
                grid-template-columns: repeat(3, minmax(0, 1fr));
                gap: 7px;
              }

              .hero-region-button {
                min-height: 40px;
                padding: 7px 10px;
              }

              .hero-district-card {
                padding: 14px;
              }

              .hero-district-chip {
                display: inline-flex;
                min-height: 32px;
                align-items: center;
                padding: 6px 10px;
                box-sizing: border-box;
                font-size: 13px;
              }

              .home-services-section {
                padding: 40px 18px !important;
              }

              .home-services-title {
                font-size: 26px !important;
              }

              .home-region-section {
                padding: 20px !important;
              }

              .home-service-grid {
                grid-template-columns: 1fr !important;
              }

              .home-service-card {
                width: 100%;
                overflow-wrap: anywhere !important;
              }
            }

            @media (max-width: 360px) {
              .hero-region-buttons {
                grid-template-columns: repeat(2, minmax(0, 1fr));
              }
            }
          `}
        </style>
      </section>
    </>
  );
}
