"use client";

import { useMemo, useState } from "react";
import { COMMON_SERVICES } from "../lib/common-services";
import type { InternalLink } from "../lib/internal-links";
import { getServiceCardsForPages } from "../lib/service-cards";
import ConsultationChecklist from "./ConsultationChecklist";
import ConsultationSection from "./ConsultationSection";

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
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
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
  울산: [
    "울산중구",
    "울산남구",
    "울산동구",
    "울산북구",
    "울산울주군",
  ],
  세종: ["세종시"],
  충북: ["청주", "충주", "제천", "음성", "진천"],
  충남: ["천안", "아산", "당진", "서산", "논산"],
  전북: ["전주", "익산", "군산", "정읍", "김제"],
  전남: ["순천", "여수", "목포", "광양", "나주"],
  경북: ["포항", "구미", "경산", "경주", "안동"],
  경남: ["창원", "김해", "진주", "양산", "거제"],
};

const pendingMessage = "해당 지역 정보는 순차적으로 추가될 예정입니다.";

const strengths = [
  "현장 상황에 맞춘 견적 안내",
  "철거부터 폐기물 정리까지",
  "일정에 맞춘 작업 진행",
  "작업 후 깔끔한 마무리",
  "업종별 철거 범위 확인",
  "전화 상담부터 현장 확인까지",
];

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

function getDisplayRegionName(region: string) {
  return region
    .replace(/부산부산진구/g, "부산진구")
    .replace(/대구(달서구|수성구|북구|동구|중구|달성군|서구|남구)/g, "$1")
    .replace(/대전(동구|중구|서구|유성구|대덕구)/g, "$1")
    .replace(/광주(동구|서구|남구|북구|광산구)/g, "$1")
    .replace(/울산(중구|남구|동구|북구|울주군)/g, "$1");
}

function createAnchorSlug(region: Region, district: string, index: number) {
  return `${region}-${normalizeRegionName(district)}-${index}`;
}

function getRegionGroups(pagesByRegion: PagesByRegion, selectedRegion: Region) {
  return districtsByRegion[selectedRegion].flatMap<VisibleRegionGroup>(
    (district, index) => {
      const regionPages = findRegionPages(pagesByRegion, district);

      if (!regionPages) {
        return [];
      }

      return [
        {
          anchorSlug: createAnchorSlug(selectedRegion, district, index),
          district,
          region: regionPages.region,
          pages: getRouteResolvablePages(regionPages.pages),
        },
      ];
    },
  );
}

export default function HomeRegionExplorer({
  mainRegionLinks,
  pagesByRegion,
}: {
  mainRegionLinks: InternalLink[];
  pagesByRegion: PagesByRegion;
}) {
  const [selectedRegion, setSelectedRegion] = useState<Region>("서울");
  const [selectedDistrict, setSelectedDistrict] = useState("강남구");

  const districts = districtsByRegion[selectedRegion];
  const visibleRegionGroups = useMemo(
    () => getRegionGroups(pagesByRegion, selectedRegion),
    [pagesByRegion, selectedRegion],
  );
  const selectedGroup = visibleRegionGroups.find(
    ({ district }) => district === selectedDistrict,
  );
  const displayedServices = selectedGroup
    ? getServiceCardsForPages(selectedGroup.pages)
    : [];

  const handleRegionSelect = (region: Region) => {
    const firstDistrict = districtsByRegion[region][0] ?? "";
    setSelectedRegion(region);
    setSelectedDistrict(firstDistrict);
  };

  const handleDistrictSelect = (district: string) => {
    setSelectedDistrict(district);

    document.getElementById("selected-region-services")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="home-renewal">
      <section className="home-hero" aria-labelledby="home-hero-title">
        <div className="home-shell home-hero-grid">
          <div className="home-hero-copy">
            <p className="home-eyebrow">더세이브 철거·원상복구 상담</p>
            <h1 id="home-hero-title">
              상가·식당·사무실 철거부터
              <br />
              원상복구까지 한 번에
            </h1>
            <p className="home-hero-description">
              폐업이나 이전을 앞둔 식당, 카페, 사무실, 학원 등 다양한 상업
              공간의 철거 범위와 원상복구 상태를 확인하고, 현장 구조와 폐기물
              양, 장비 진입 조건, 작업 일정에 맞춰 상가철거와 원상복구 견적 및
              진행 절차를 안내합니다.
            </p>
            <div className="home-hero-actions" aria-label="상단 바로가기">
              <a className="home-button home-button-primary" href="#region-section">
                지역별 철거 선택
              </a>
              <a className="home-button home-button-secondary" href="#consultation-section">
                무료 견적 신청
              </a>
              <a className="home-button home-button-secondary" href="tel:010-8286-7620">
                010-8286-7620 전화 상담
              </a>
              <a className="home-button home-button-accent-soft" href="#services-section">
                업종별 서비스
              </a>
            </div>
          </div>
          <ConsultationChecklist
            className="home-hero-checklist"
            titleId="hero-checklist-title"
          />
        </div>
      </section>

      <section
        className="home-section"
        id="services-section"
        aria-labelledby="service-title"
      >
        <div className="home-shell">
          <div className="home-section-header">
            <h2 id="service-title">업종별 서비스</h2>
          </div>
          <div className="home-card-grid home-card-grid-4">
            {COMMON_SERVICES.map((service) => (
              <a
                className="home-service-card"
                href={`/${service.slug}`}
                key={service.slug}
              >
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                {service.supportNote ? <small>{service.supportNote}</small> : null}
                <span>자세히 보기</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section
        className="home-section home-section-muted home-main-region-links"
        aria-labelledby="main-region-links-title"
      >
        <div className="home-shell">
          <div className="home-section-header">
            <p className="home-eyebrow">지역별 상담</p>
            <h2 id="main-region-links-title">주요 지역 철거 상담 바로가기</h2>
          </div>
          <div className="home-link-grid">
            {mainRegionLinks.map((link) => (
              <a className="home-service-link" href={link.href} key={link.href}>
                <span>{link.label}</span>
                {link.description ? <small>{link.description}</small> : null}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-section-muted" aria-labelledby="strength-title">
        <div className="home-shell">
          <div className="home-section-header">
            <p className="home-eyebrow">업체 선택 장점</p>
            <h2 id="strength-title">상담부터 마무리까지 차분하게 확인합니다</h2>
          </div>
          <div className="home-card-grid home-card-grid-3">
            {strengths.map((strength) => (
              <article className="home-strength-card" key={strength}>
                <h3>{strength}</h3>
                <p>
                  현장 조건과 일정, 복구 기준을 먼저 살펴 불필요한 작업을 줄이고
                  필요한 부분을 분명하게 안내합니다.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ConsultationSection />

      <section
        className="home-section home-region-consult"
        id="region-section"
        aria-labelledby="region-title"
      >
        <div className="home-shell">
          <div className="home-section-header">
            <p className="home-eyebrow">지역별 철거 서비스</p>
            <h2 id="region-title">
              지역을 선택하면 실제 상세페이지로 이동할 수 있습니다
            </h2>
          </div>

          <div className="home-region-panel">
            <div className="home-region-step">
              <h3>시·도 선택</h3>
              <div className="home-region-group" aria-label="시·도 선택">
                {regions.map((region) => (
                  <button
                    className="home-region-button"
                    key={region}
                    type="button"
                    aria-pressed={selectedRegion === region}
                    onClick={() => handleRegionSelect(region)}
                  >
                    {getDisplayRegionName(region)}
                  </button>
                ))}
              </div>
            </div>

            <div className="home-region-step">
              <h3>구·군 선택</h3>
              <div
                className="home-district-group"
                aria-label={`${selectedRegion} 구·군 선택`}
              >
                {districts.map((district) => (
                  <button
                    className="home-district-button"
                    key={district}
                    type="button"
                    aria-pressed={selectedDistrict === district}
                    onClick={() => handleDistrictSelect(district)}
                  >
                    {getDisplayRegionName(district)}
                  </button>
                ))}
              </div>
            </div>

            <div
              className="home-selected-services"
              id="selected-region-services"
            >
              <div className="home-selected-service-header">
                <h3>{getDisplayRegionName(selectedDistrict)} 철거 서비스</h3>
                <p>
                  {`${getDisplayRegionName(selectedDistrict)}에서 제공되는 업종별 철거 및 원상복구 안내를 확인하세요.`}
                </p>
              </div>

              {displayedServices.length > 0 ? (
                <div className="home-link-grid">
                  {displayedServices.map((service) => (
                    <a
                      className="home-service-link"
                      href={service.href}
                      key={service.slug}
                    >
                      <span>{service.title}</span>
                      <small>{service.description}</small>
                      {service.supportNote ? (
                        <em>{service.supportNote}</em>
                      ) : null}
                    </a>
                  ))}
                </div>
              ) : (
                <div className="home-empty-region" role="status">
                  <h3>
                    {getDisplayRegionName(selectedDistrict)} 상담 페이지 준비 중
                  </h3>
                  <p>
                    {pendingMessage} 전화로 현장 상황을 알려주시면 상담을
                    도와드립니다.
                  </p>
                  <a
                    className="home-button home-button-secondary"
                    href="tel:010-8286-7620"
                  >
                    010-8286-7620 전화 상담
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="home-bottom-cta" aria-labelledby="bottom-cta-title">
        <div className="home-shell home-bottom-cta-inner">
          <div>
            <h2 id="bottom-cta-title">철거 범위와 원상복구 조건이 궁금하신가요?</h2>
            <p>현장 상황을 알려주시면 상담을 도와드립니다.</p>
          </div>
          <a className="home-button home-button-light" href="tel:010-8286-7620">
            010-8286-7620 전화 상담하기
          </a>
        </div>
      </section>
    </div>
  );
}
