type RegionalPageCopyTarget = {
  지역: string;
  URL슬러그: string;
  페이지제목: string;
  H1: string;
};

const sheetManagedRegionSlugs = new Set([
  "cheongju",
  "chungju",
  "jecheon",
  "eumseong",
  "jincheon",
  "cheonan",
  "asan",
  "dangjin",
  "seosan",
  "nonsan",
  "jeonju",
  "iksan",
  "gunsan",
  "jeongeup",
  "gimje",
  "suncheon",
  "yeosu",
  "mokpo",
  "gwangyang",
  "naju",
]);

const targetRegionNames: Record<string, string> = {
  cheongju: "청주",
  chungju: "충주",
  jecheon: "제천",
  eumseong: "음성",
  jincheon: "진천",
  cheonan: "천안",
  asan: "아산",
  dangjin: "당진",
  seosan: "서산",
  nonsan: "논산",
  jeonju: "전주",
  iksan: "익산",
  gunsan: "군산",
  jeongeup: "정읍",
  gimje: "김제",
  suncheon: "순천",
  yeosu: "여수",
  mokpo: "목포",
  gwangyang: "광양",
  naju: "나주",
  pohang: "포항",
  gumi: "구미",
  gyeongsan: "경산",
  gyeongju: "경주",
  andong: "안동",
};

const serviceCopy: Record<
  string,
  {
    serviceName: string;
    cardDetail: string;
    h1Detail: string;
  }
> = {
  "restaurant-demolition-company": {
    serviceName: "식당",
    cardDetail: "주방·홀 정리 상담",
    h1Detail: "철거 전 확인해야 할 주방·홀 정리 안내",
  },
  "cafe-demolition-company": {
    serviceName: "카페",
    cardDetail: "인테리어 철거 상담",
    h1Detail: "인테리어 철거와 원상복구 안내",
  },
  "pc-room-demolition-company": {
    serviceName: "PC방",
    cardDetail: "좌석·배선 철거 상담",
    h1Detail: "좌석·배선 정리를 위한 철거 안내",
  },
  "karaoke-demolition-company": {
    serviceName: "노래방",
    cardDetail: "룸 철거 상담",
    h1Detail: "룸 철거와 방음 구조 정리 안내",
  },
  "beer-pub-demolition-company": {
    serviceName: "호프집",
    cardDetail: "영업장 정리 상담",
    h1Detail: "폐업 정리를 위한 철거 안내",
  },
  "bar-demolition-company": {
    serviceName: "술집",
    cardDetail: "내부 철거 상담",
    h1Detail: "내부 철거와 원상복구 안내",
  },
  "bowling-alley-demolition-company": {
    serviceName: "볼링장",
    cardDetail: "대형 시설 철거 상담",
    h1Detail: "대형 시설 철거 안내",
  },
  "screen-golf-demolition-company": {
    serviceName: "스크린골프장",
    cardDetail: "룸 철거 상담",
    h1Detail: "룸 철거와 장비 정리 안내",
  },
  "office-demolition-company": {
    serviceName: "사무실",
    cardDetail: "칸막이·집기 정리 상담",
    h1Detail: "칸막이·집기 철거 안내",
  },
  "daycare-center-demolition-company": {
    serviceName: "어린이집",
    cardDetail: "안전 철거 상담",
    h1Detail: "안전 철거와 원상복구 안내",
  },
  "convenience-store-demolition-company": {
    serviceName: "편의점",
    cardDetail: "집기·진열대 철거 상담",
    h1Detail: "집기·진열대 철거 안내",
  },
  "hair-salon-demolition-company": {
    serviceName: "미용실",
    cardDetail: "설비 철거 상담",
    h1Detail: "설비 철거와 매장 정리 안내",
  },
  "nail-shop-demolition-company": {
    serviceName: "네일샵",
    cardDetail: "소형 매장 정리 상담",
    h1Detail: "소형 매장 철거 안내",
  },
  "gym-demolition-company": {
    serviceName: "헬스장",
    cardDetail: "운동기구·바닥 철거 상담",
    h1Detail: "운동기구·바닥 철거 안내",
  },
  "academy-demolition-company": {
    serviceName: "학원",
    cardDetail: "강의실 원상복구 상담",
    h1Detail: "강의실 철거와 원상복구 안내",
  },
};

function getSlugSegments(urlSlug: string) {
  return urlSlug.trim().replace(/^\/+|\/+$/g, "").split("/");
}

export function normalizeRegionalPageCopy<T extends RegionalPageCopyTarget>(
  page: T,
): T {
  const [regionSlug, serviceSlug] = getSlugSegments(page.URL슬러그);

  if (sheetManagedRegionSlugs.has(regionSlug)) {
    return page;
  }

  const regionName = targetRegionNames[regionSlug];
  const copy = serviceCopy[serviceSlug];

  if (!regionName || !copy) {
    return page;
  }

  return {
    ...page,
    지역: page.지역.trim() || regionName,
    H1: `${regionName} ${copy.serviceName} ${copy.h1Detail}`,
  };
}
