import type { PageData } from "./sheet";

type RegionGroupKey =
  | "centralCommercial"
  | "officeDistrict"
  | "residentialMixed"
  | "academyArea"
  | "marketAlley"
  | "newTown"
  | "industrialMixed"
  | "tourismNight"
  | "largeComplex";

type RegionGroup = {
  name: string;
  intro: string;
  access: string;
  schedule: string;
  waste: string;
  restoration: string;
  consultation: string;
  titleFocus: string;
};

type ServiceSeoData = {
  label: string;
  title: string;
  group: string;
  h1Focus: string;
  equipment: string[];
  precheck: string[];
  waste: string[];
  scope: string[];
  process: string[];
  restoration: string;
  estimate: string;
  caution: string;
  cta: string;
  faq: Array<{
    question: string;
    answer: string;
  }>;
};

const BASE_SITE_NAME = "더세이브";

const REGION_GROUPS: Record<RegionGroupKey, RegionGroup> = {
  centralCommercial: {
    name: "도심 상업지역",
    intro:
      "상가와 업무공간, 오래된 건물이 함께 있는 도심권 현장은 내부 구조와 공용부 사용 조건을 먼저 보는 편이 좋습니다.",
    access:
      "건물 앞 정차가 짧게만 가능한 경우가 있어 폐기물 임시 적치 위치와 계단 반출 가능성을 함께 확인합니다.",
    schedule:
      "주변 영업장과 보행 동선이 겹치면 소음이 큰 공정은 작업 가능 시간대를 따로 조율해야 합니다.",
    waste:
      "혼합 폐기물이 통행로에 오래 머물지 않도록 분류와 상차 순서를 짧게 가져가는 계획이 필요합니다.",
    restoration:
      "오래된 마감재나 벽면 타공 흔적은 임대차 복구 기준과 실제 마감 상태를 비교해 정리합니다.",
    consultation:
      "상담에서는 출입구 폭, 계단 사용, 건물 관리 규정, 주변 영업시간을 함께 확인합니다.",
    titleFocus: "반출 동선과 원상복구 범위",
  },
  officeDistrict: {
    name: "업무시설 밀집지역",
    intro:
      "업무시설이 많은 현장은 엘리베이터 예약, 보안 출입, 관리사무소 작업 규정이 일정에 영향을 줍니다.",
    access:
      "공용부 보호재 설치와 화물 엘리베이터 사용 시간을 먼저 확인해 반출 동선을 정합니다.",
    schedule:
      "평일 업무 시간 소음 제한이나 야간 작업 가능 여부를 관리 기준에 맞춰 조율해야 합니다.",
    waste:
      "집기와 마감재는 공용 복도에 오래 두기 어렵기 때문에 구역별로 정리하고 바로 반출하는 방식이 안정적입니다.",
    restoration:
      "천장, 바닥, 벽면의 고정 흔적과 공용부 손상 여부를 검수 전에 확인합니다.",
    consultation:
      "상담 시 관리사무소 승인 절차, 엘리베이터 예약, 주차장 진입 높이, 보안 출입 조건을 살핍니다.",
    titleFocus: "관리 규정과 작업 시간",
  },
  residentialMixed: {
    name: "주거·상가 혼합지역",
    intro:
      "주거 공간과 상가가 가까운 현장은 작업 시간, 소음, 분진 관리가 상담 초반부터 중요합니다.",
    access:
      "골목 안쪽 매장이나 주거지 인접 현장은 차량 진입과 임시 적재 위치를 현장에 맞춰 확인합니다.",
    schedule:
      "이른 시간이나 늦은 시간 작업이 어려울 수 있어 소음 공정과 반출 시간을 나누어 잡는 편이 좋습니다.",
    waste:
      "생활 동선과 겹치는 폐기물은 분진을 줄이고 빠르게 상차할 수 있도록 포장과 분류 순서를 정합니다.",
    restoration:
      "바닥 단차, 벽면 고정 흔적, 외부 간판 자국처럼 임대인이 확인하기 쉬운 부분을 먼저 정리합니다.",
    consultation:
      "상담에서는 주변 민원 가능성, 주차 위치, 계단 폭, 엘리베이터 사용 가능 여부를 함께 봅니다.",
    titleFocus: "소음 관리와 차량 진입",
  },
  academyArea: {
    name: "학원가",
    intro:
      "학원가나 교육시설 주변 현장은 수업 시간, 학생 이동 동선, 공용 복도 소음 관리가 일정에 영향을 줍니다.",
    access:
      "책상과 칸막이처럼 부피가 큰 폐기물은 복도 폭과 승강기 사용 가능 시간을 확인해 반출합니다.",
    schedule:
      "수업 전후 혼잡한 시간대를 피하고, 소음이 큰 공정은 건물 규정에 맞춰 분리하는 편이 좋습니다.",
    waste:
      "가구와 보드, 칸막이는 한 번에 쌓아두기보다 강의실별로 분류해 통행 방해를 줄입니다.",
    restoration:
      "벽면 보드 고정 흔적, 칸막이 연결부, 천장 마감 손상 여부를 원상복구 기준에 맞춰 확인합니다.",
    consultation:
      "상담에서는 수업 종료일, 주말 작업 가능 여부, 관리실 승인, 공용부 보호 범위를 함께 정리합니다.",
    titleFocus: "수업 일정과 강의실 정리",
  },
  marketAlley: {
    name: "전통시장·골목 상권",
    intro:
      "골목 상권이나 전통시장 인근 현장은 좁은 진입로, 인접 점포 영업, 임시 적재 위치가 핵심 변수입니다.",
    access:
      "폐기물 차량이 바로 붙기 어렵다면 소형 반출과 중간 집하 위치를 먼저 정해야 합니다.",
    schedule:
      "인접 점포 영업시간과 통행량을 고려해 반출 시간을 짧게 나누는 방식이 필요할 수 있습니다.",
    waste:
      "통로가 좁은 현장은 폐기물을 오래 쌓아두지 않도록 철거 순서와 상차 순서를 맞춰야 합니다.",
    restoration:
      "외부 사인물, 셔터 주변, 출입구 바닥처럼 주변 점포와 맞닿은 마감 상태를 확인합니다.",
    consultation:
      "상담에서는 차량 진입 폭, 점포 앞 적재 가능 여부, 인접 점포 민원, 작업 시간 제한을 살핍니다.",
    titleFocus: "골목 반출과 인접 점포 관리",
  },
  newTown: {
    name: "신도시형 상가 지역",
    intro:
      "신도시형 상가나 대로변 매장은 비교적 정돈된 건물 규정 안에서 엘리베이터와 주차장 사용 조건을 확인해야 합니다.",
    access:
      "지하주차장 진입 높이, 화물 엘리베이터 사용 시간, 건물 내 폐기물 이동 동선을 함께 점검합니다.",
    schedule:
      "입점 점포가 많은 건물은 관리사무소 승인과 공용부 보호재 설치 시간이 일정에 반영됩니다.",
    waste:
      "폐기물은 지정 동선과 지정 장소를 따라 이동해야 하는 경우가 있어 분류와 상차 시간을 미리 맞춥니다.",
    restoration:
      "새 마감재가 많은 현장은 바닥, 벽면, 유리, 공용부 보호 상태를 세밀하게 확인합니다.",
    consultation:
      "상담에서는 관리 규정, 주차장 높이, 엘리베이터 예약, 지정 폐기물 반출 위치를 함께 정리합니다.",
    titleFocus: "관리 규정과 공용부 보호",
  },
  industrialMixed: {
    name: "공장·창고 혼합지역",
    intro:
      "공장과 창고, 근린상가가 섞인 지역은 장비 진입, 대형 폐기물 상차, 작업 반경을 먼저 확인합니다.",
    access:
      "화물차 진입은 비교적 검토하기 좋을 수 있지만 출입문 폭과 내부 적재 공간은 현장마다 다릅니다.",
    schedule:
      "주변 사업장 운영 시간과 차량 이동 시간을 고려해 장비 투입과 폐기물 상차 순서를 조율합니다.",
    waste:
      "금속, 목재, 고무, 혼합 마감재처럼 폐기물 종류가 나뉘면 분류 공간과 반출 횟수를 먼저 잡습니다.",
    restoration:
      "바닥 앵커, 배관 절단부, 대형 장비 고정 흔적은 다음 사용에 지장이 없도록 확인합니다.",
    consultation:
      "상담에서는 장비 진입 폭, 상차 위치, 대형 폐기물 크기, 전기 차단 범위를 함께 확인합니다.",
    titleFocus: "장비 진입과 대형 폐기물",
  },
  tourismNight: {
    name: "관광·유흥 상권",
    intro:
      "관광지나 야간 상권 현장은 영업시간이 늦게 끝나는 점포가 많아 소음 공정과 반출 시간을 따로 조율해야 합니다.",
    access:
      "방문객 동선과 차량 정차 가능 시간을 확인해 폐기물 반출이 영업장 앞에 오래 머물지 않도록 계획합니다.",
    schedule:
      "야간 영업장과 숙박시설이 가까우면 늦은 시간 작업 가능 여부를 반드시 확인해야 합니다.",
    waste:
      "조명, 음향, 장식 마감재가 섞인 폐기물은 파손 위험과 부피를 고려해 분류합니다.",
    restoration:
      "외부 간판, 조명 배선, 벽면 장식 철거 흔적은 주변 미관과 임대차 기준을 함께 확인합니다.",
    consultation:
      "상담에서는 인접 영업장 운영 시간, 간판 위치, 차량 정차 가능 시간, 소음 제한을 살핍니다.",
    titleFocus: "영업시간과 간판 정리",
  },
  largeComplex: {
    name: "대형 상가·복합시설 지역",
    intro:
      "복합상가와 대형 건물 현장은 관리사무소 승인, 공용부 보호, 화물 동선 확보가 작업 준비의 중심입니다.",
    access:
      "화물 엘리베이터, 지하주차장, 하역장 사용 조건을 확인한 뒤 폐기물 반출 순서를 정합니다.",
    schedule:
      "건물별 작업 허용 시간이 정해져 있을 수 있어 철거 공정과 상차 공정을 나누어 조율합니다.",
    waste:
      "공용부에 폐기물을 오래 둘 수 없는 경우가 많아 구역별 철거와 즉시 반출 계획이 필요합니다.",
    restoration:
      "공용부 보호 상태, 매장 경계부 마감, 바닥과 천장 연결부를 검수 전에 확인합니다.",
    consultation:
      "상담에서는 관리사무소 제출 서류, 작업자 출입, 승강기 예약, 하역장 사용 가능 시간을 함께 정리합니다.",
    titleFocus: "공용부 보호와 승강기 예약",
  },
};

const REGION_GROUP_BY_SLUG: Partial<Record<string, RegionGroupKey>> = {
  jongno: "centralCommercial",
  yongsan: "tourismNight",
  seongdong: "officeDistrict",
  gwangjin: "residentialMixed",
  dongdaemun: "marketAlley",
  jungnang: "marketAlley",
  seongbuk: "residentialMixed",
  gangbuk: "academyArea",
  dobong: "residentialMixed",
  nowon: "academyArea",
  eunpyeong: "residentialMixed",
  seodaemun: "academyArea",
  mapo: "tourismNight",
  yangcheon: "academyArea",
  gangseo: "newTown",
  guro: "industrialMixed",
  geumcheon: "industrialMixed",
  yeongdeungpo: "officeDistrict",
  dongjak: "residentialMixed",
  gwanak: "academyArea",
  seocho: "officeDistrict",
  gangnam: "officeDistrict",
  songpa: "largeComplex",
  gangdong: "residentialMixed",
  suwon: "largeComplex",
  seongnam: "officeDistrict",
  goyang: "newTown",
  yongin: "newTown",
  bucheon: "residentialMixed",
  ansan: "industrialMixed",
  anyang: "officeDistrict",
  namyangju: "residentialMixed",
  hwaseong: "industrialMixed",
  pyeongtaek: "industrialMixed",
  uijeongbu: "residentialMixed",
  siheung: "industrialMixed",
  paju: "industrialMixed",
  gimpo: "newTown",
  gwangmyeong: "largeComplex",
  "gwangju-gyeonggi": "residentialMixed",
  hanam: "newTown",
  gunpo: "industrialMixed",
  uiwang: "newTown",
  osan: "residentialMixed",
  icheon: "industrialMixed",
  jung: "centralCommercial",
  dong: "marketAlley",
  michuhol: "marketAlley",
  yeonsu: "newTown",
  namdong: "industrialMixed",
  bupyeong: "residentialMixed",
  gyeyang: "residentialMixed",
  seo: "industrialMixed",
  yeongdo: "marketAlley",
  busanjin: "centralCommercial",
  dongnae: "residentialMixed",
  "busan-nam": "residentialMixed",
  "busan-buk": "residentialMixed",
  haeundae: "tourismNight",
  saha: "industrialMixed",
  geumjeong: "academyArea",
  "busan-gangseo": "industrialMixed",
  yeonje: "officeDistrict",
  suyeong: "tourismNight",
  sasang: "industrialMixed",
  gijang: "newTown",
  "daegu-dalseo": "residentialMixed",
  "daegu-suseong": "academyArea",
  "daegu-buk": "marketAlley",
  "daegu-dong": "newTown",
  "daegu-jung": "centralCommercial",
  "daegu-dalseong": "industrialMixed",
  "daegu-seo": "industrialMixed",
  "daegu-nam": "residentialMixed",
  "daejeon-dong": "marketAlley",
  "daejeon-jung": "centralCommercial",
  "daejeon-seo": "officeDistrict",
  "daejeon-yuseong": "newTown",
  "daejeon-daedeok": "industrialMixed",
  "gwangju-dong": "centralCommercial",
  "gwangju-seo": "officeDistrict",
  "gwangju-nam": "residentialMixed",
  "gwangju-buk": "academyArea",
  "gwangju-gwangsan": "industrialMixed",
  "ulsan-jung": "centralCommercial",
  "ulsan-nam": "officeDistrict",
  "ulsan-dong": "industrialMixed",
  "ulsan-buk": "industrialMixed",
  "ulsan-ulju": "industrialMixed",
  sejong: "newTown",
  cheongju: "largeComplex",
  chungju: "residentialMixed",
  jecheon: "residentialMixed",
  eumseong: "industrialMixed",
  jincheon: "industrialMixed",
  cheonan: "largeComplex",
  asan: "industrialMixed",
  dangjin: "industrialMixed",
  seosan: "industrialMixed",
  nonsan: "residentialMixed",
  jeonju: "centralCommercial",
  iksan: "residentialMixed",
  gunsan: "industrialMixed",
  jeongeup: "marketAlley",
  gimje: "industrialMixed",
  suncheon: "residentialMixed",
  yeosu: "tourismNight",
  mokpo: "marketAlley",
  gwangyang: "industrialMixed",
  naju: "newTown",
  pohang: "industrialMixed",
  gumi: "industrialMixed",
  gyeongsan: "academyArea",
  gyeongju: "tourismNight",
  andong: "marketAlley",
  changwon: "industrialMixed",
  gimhae: "industrialMixed",
  jinju: "academyArea",
  yangsan: "newTown",
  geoje: "industrialMixed",
};

const SERVICE_DATA: Record<string, ServiceSeoData> = {
  "restaurant-demolition-company": {
    label: "식당",
    title: "식당 철거업체",
    group: "food",
    h1Focus: "주방 설비와 바닥 오염",
    equipment: ["주방 집기", "후드와 덕트", "가스 배관", "급배수", "기름 오염 바닥", "냉장·냉동고"],
    precheck: ["가스 차단", "배수 트렌치", "외부 배기 라인", "주방 방수층"],
    waste: ["기름이 묻은 마감재", "금속 주방 집기", "타일 잔재", "대형 냉장 장비"],
    scope: ["홀 집기 반출", "주방 설비 분리", "덕트 철거", "바닥 타일과 방수층 확인"],
    process: ["가스와 전기 차단 확인", "냉장 장비와 주방 집기 반출", "후드·덕트 분리", "바닥 오염 구간 정리"],
    restoration:
      "주방 바닥 오염, 벽면 타공, 배기 라인 철거 흔적과 배수구 마감 상태를 원상복구 기준에 맞춰 확인합니다.",
    estimate:
      "후드 길이, 덕트 위치, 주방 집기 수량, 바닥 오염 정도, 냉장 장비 반출 난이도가 견적에 영향을 줍니다.",
    caution:
      "가스와 배기 설비를 임의로 분리하면 안전 문제가 생길 수 있어 차단 여부와 철거 범위를 먼저 확인해야 합니다.",
    cta: "주방 설비와 홀 정리 범위를 사진으로 보내주시면 상담이 빠릅니다.",
    faq: [
      { question: "후드와 덕트도 철거 범위에 포함되나요?", answer: "외부 배기 라인과 건물 기준을 확인한 뒤 철거 가능한 구간과 남겨야 할 구간을 나눠 안내합니다." },
      { question: "가스 배관은 철거 전에 무엇을 확인해야 하나요?", answer: "차단 여부와 연결 장비를 먼저 확인해야 하며, 안전 기준에 맞춰 작업 범위를 정리합니다." },
      { question: "냉장고와 주방 집기도 함께 반출할 수 있나요?", answer: "장비 크기, 출입구 폭, 엘리베이터 사용 가능 여부를 보고 반출 순서를 잡습니다." },
      { question: "기름 오염이 있는 바닥도 원상복구가 가능한가요?", answer: "오염 범위와 바닥 마감재 상태를 확인해 철거와 보완 마감이 필요한 부분을 구분합니다." },
    ],
  },
  "cafe-demolition-company": {
    label: "카페",
    title: "카페 철거업체",
    group: "beverage",
    h1Focus: "카운터와 급배수 정리",
    equipment: ["카운터", "쇼케이스", "커피머신 급배수", "싱크대", "벽면 인테리어", "간판"],
    precheck: ["바닥 배수 위치", "전기 증설 흔적", "간판 고정 방식", "붙박이 가구 연결부"],
    waste: ["목재 카운터", "유리 쇼케이스", "배관 잔재", "간판과 조명 폐기물"],
    scope: ["카운터 해체", "쇼케이스 반출", "싱크대와 급배수 정리", "벽면 마감재와 간판 철거"],
    process: ["카운터 내부 설비 확인", "쇼케이스와 집기 반출", "급배수 마감", "간판과 벽면 흔적 정리"],
    restoration:
      "카페 원상복구는 바닥 배관 구멍, 카운터 고정 흔적, 벽면 타공과 간판 철거 후 외부 마감을 함께 봅니다.",
    estimate:
      "카운터 크기, 쇼케이스 수량, 급배수 복구 범위, 간판 위치와 벽면 마감재 종류가 견적 기준이 됩니다.",
    caution:
      "급배수와 전기 증설 흔적을 남겨두면 검수에서 보완이 필요할 수 있어 철거 전 복구 수준을 정해야 합니다.",
    cta: "카운터와 쇼케이스 사진, 간판 위치를 알려주시면 철거 범위를 더 정확히 안내합니다.",
    faq: [
      { question: "커피머신 급배수도 철거 범위에 포함되나요?", answer: "배관 위치와 임대차 복구 기준을 확인해 막음 처리나 노출부 정리 범위를 안내합니다." },
      { question: "카운터와 쇼케이스만 먼저 철거할 수 있나요?", answer: "가능합니다. 다만 전기와 급배수 연결 상태를 확인한 뒤 부분 철거 순서를 잡는 것이 좋습니다." },
      { question: "간판 철거와 외벽 마감도 상담할 수 있나요?", answer: "건물 규정과 설치 위치를 확인해 외부 사인물 철거와 마감 범위를 함께 정리합니다." },
      { question: "바닥 배관을 철거한 뒤 원상복구는 어떻게 하나요?", answer: "배관 구멍, 바닥 단차, 마감재 손상 여부를 확인해 필요한 보완 작업을 구분합니다." },
    ],
  },
  "pc-room-demolition-company": {
    label: "PC방",
    title: "PC방 철거업체",
    group: "tech",
    h1Focus: "좌석 배선과 통신선",
    equipment: ["전기 배선", "통신선", "컴퓨터 책상", "칸막이", "냉난방 설비", "서버 주변 장비"],
    precheck: ["전원 차단 계획", "통신 장비 보존 여부", "바닥 배선 구조", "좌석별 칸막이 고정 방식"],
    waste: ["책상과 칸막이", "전선류", "네트워크 장비 포장재", "바닥재 잔재"],
    scope: ["좌석 칸막이 철거", "전기·통신선 정리", "책상 반출", "바닥 배선 흔적 확인"],
    process: ["장비 보존 대상을 표시", "전원과 통신선을 분리", "좌석과 칸막이 해체", "바닥과 천장 마감 확인"],
    restoration:
      "PC방 원상복구는 바닥 배선 구멍, 벽면 타공, 천장 배선 잔여물과 냉난방 설비 주변 마감을 확인합니다.",
    estimate:
      "좌석 수, 배선 밀도, 칸막이 구조, 컴퓨터 책상 반출량, 통신 장비 보존 여부가 견적에 반영됩니다.",
    caution:
      "전기와 통신선이 얽힌 현장은 선을 무리하게 절단하지 않고 남길 장비와 철거할 배선을 먼저 구분해야 합니다.",
    cta: "좌석 수와 배선 상태를 알려주시면 PC방 철거 순서를 맞춰 상담합니다.",
    faq: [
      { question: "컴퓨터 책상과 칸막이도 함께 반출하나요?", answer: "수량과 고정 방식을 확인해 좌석별 해체와 반출 순서를 정합니다." },
      { question: "인터넷 통신선 정리도 가능한가요?", answer: "남겨야 할 회선과 제거할 선을 구분해 배선 정리 범위를 안내합니다." },
      { question: "서버 장비는 보존하면서 철거할 수 있나요?", answer: "장비 위치와 전원 차단 계획을 확인해 보존 장비를 먼저 표시한 뒤 진행합니다." },
      { question: "바닥 배선 철거 후 마감은 어떻게 확인하나요?", answer: "배선 구멍, 바닥재 들뜸, 접착 흔적을 확인해 원상복구 범위를 정리합니다." },
    ],
  },
  "karaoke-room-demolition-company": {
    label: "노래방",
    title: "노래방 철거업체",
    group: "soundRoom",
    h1Focus: "룸 칸막이와 방음재",
    equipment: ["방음재", "흡음재", "룸 칸막이", "음향 배선", "소방설비 주변 마감", "천장 구조"],
    precheck: ["룸 개수", "방음재 두께", "소방설비 유지 범위", "지하층 반출 동선"],
    waste: ["방음재 폐기물", "목재 칸막이", "음향 배선", "천장 마감재"],
    scope: ["룸 칸막이 해체", "방음재 분리", "음향 장비 주변 정리", "폐기물 부피별 반출"],
    process: ["소방설비 위치 확인", "음향 장비와 배선 분리", "룸별 칸막이 철거", "방음재와 천장 마감재 반출"],
    restoration:
      "노래방 원상복구는 룸 철거 후 벽체와 천장 연결부, 소방설비 주변 손상, 바닥 단차를 함께 확인합니다.",
    estimate:
      "룸 수, 방음재 양, 지하층 여부, 음향 배선 범위, 폐기물 부피가 견적과 작업 기간에 영향을 줍니다.",
    caution:
      "소방설비와 방음 구조가 얽혀 있으면 유지해야 할 설비를 먼저 표시한 뒤 철거 범위를 나눠야 합니다.",
    cta: "룸 수와 지하 여부, 방음재 상태를 알려주시면 반출 계획까지 상담합니다.",
    faq: [
      { question: "방음재와 흡음재도 모두 철거할 수 있나요?", answer: "룸 구조와 폐기물 양을 확인해 철거 범위와 반출 순서를 안내합니다." },
      { question: "소방설비는 유지해야 하나요?", answer: "건물 기준에 따라 유지할 설비가 있을 수 있어 위치와 연결 상태를 먼저 확인합니다." },
      { question: "지하 노래방도 반출 상담이 가능한가요?", answer: "계단 폭, 엘리베이터 사용 가능 여부, 차량 정차 위치를 확인해 반출 계획을 세웁니다." },
      { question: "음향 배선과 조명도 정리하나요?", answer: "남길 회로와 철거할 배선을 구분해 안전하게 정리하는 방향으로 안내합니다." },
    ],
  },
  "karaoke-demolition-company": {
    label: "노래방",
    title: "노래방 철거업체",
    group: "soundRoom",
    h1Focus: "룸 칸막이와 방음재",
    equipment: ["방음재", "흡음재", "룸 칸막이", "음향 배선", "소방설비 주변 마감", "천장 구조"],
    precheck: ["룸 개수", "방음재 두께", "소방설비 유지 범위", "지하층 반출 동선"],
    waste: ["방음재 폐기물", "목재 칸막이", "음향 배선", "천장 마감재"],
    scope: ["룸 칸막이 해체", "방음재 분리", "음향 장비 주변 정리", "폐기물 부피별 반출"],
    process: ["소방설비 위치 확인", "음향 장비와 배선 분리", "룸별 칸막이 철거", "방음재와 천장 마감재 반출"],
    restoration:
      "노래방 원상복구는 룸 철거 후 벽체와 천장 연결부, 소방설비 주변 손상, 바닥 단차를 함께 확인합니다.",
    estimate:
      "룸 수, 방음재 양, 지하층 여부, 음향 배선 범위, 폐기물 부피가 견적과 작업 기간에 영향을 줍니다.",
    caution:
      "소방설비와 방음 구조가 얽혀 있으면 유지해야 할 설비를 먼저 표시한 뒤 철거 범위를 나눠야 합니다.",
    cta: "룸 수와 지하 여부, 방음재 상태를 알려주시면 반출 계획까지 상담합니다.",
    faq: [
      { question: "방음재와 흡음재도 모두 철거할 수 있나요?", answer: "룸 구조와 폐기물 양을 확인해 철거 범위와 반출 순서를 안내합니다." },
      { question: "소방설비는 유지해야 하나요?", answer: "건물 기준에 따라 유지할 설비가 있을 수 있어 위치와 연결 상태를 먼저 확인합니다." },
      { question: "지하 노래방도 반출 상담이 가능한가요?", answer: "계단 폭, 엘리베이터 사용 가능 여부, 차량 정차 위치를 확인해 반출 계획을 세웁니다." },
      { question: "음향 배선과 조명도 정리하나요?", answer: "남길 회로와 철거할 배선을 구분해 안전하게 정리하는 방향으로 안내합니다." },
    ],
  },
  "beer-pub-demolition-company": {
    label: "호프집",
    title: "호프집 철거업체",
    group: "food",
    h1Focus: "냉장 장비와 홀 정리",
    equipment: ["홀 테이블", "냉장고", "맥주 라인", "주방 설비", "간판", "조명"],
    precheck: ["냉장 장비 반출 동선", "맥주 라인 철거 여부", "배수와 전기 연결", "간판 철거 기준"],
    waste: ["대형 냉장 장비", "목재 집기", "주방 금속류", "간판 폐기물"],
    scope: ["홀 집기 철거", "냉장 장비 반출", "주방 설비 분리", "간판과 외부 사인 정리"],
    process: ["냉장 장비와 맥주 라인 확인", "홀 집기 반출", "주방 설비 분리", "간판 흔적과 바닥 오염 정리"],
    restoration:
      "호프집 원상복구는 냉장 장비 고정 흔적, 바닥 오염, 벽면 장식과 간판 철거 후 외부 마감을 확인합니다.",
    estimate:
      "냉장 장비 수량, 홀 집기 양, 주방 설비 범위, 간판 위치와 폐기물 부피가 견적에 반영됩니다.",
    caution:
      "영업 종료 직후 철거가 필요하면 냉장 장비 내부 정리와 반출 시간을 먼저 맞춰야 합니다.",
    cta: "폐업 일정과 냉장 장비 수량을 알려주시면 호프집 철거 범위를 정리해드립니다.",
    faq: [
      { question: "냉장고와 맥주 라인도 철거하나요?", answer: "장비 연결 상태와 반출 동선을 확인해 분리 범위를 안내합니다." },
      { question: "영업 종료 직후 바로 작업할 수 있나요?", answer: "건물 작업 가능 시간과 폐기물 상차 조건을 확인해 일정을 조율합니다." },
      { question: "간판 철거도 함께 상담할 수 있나요?", answer: "간판 위치와 외벽 마감 상태를 확인해 내부 철거와 함께 범위를 잡습니다." },
      { question: "홀 집기만 먼저 반출할 수 있나요?", answer: "가능합니다. 다만 냉장 장비와 주방 설비 분리 일정도 함께 정리하면 전체 작업이 안정적입니다." },
    ],
  },
  "bar-demolition-company": {
    label: "술집",
    title: "술집 철거업체",
    group: "night",
    h1Focus: "바 테이블과 조명 설비",
    equipment: ["바 테이블", "무드 조명", "음향 장비", "벽면 장식", "주방 또는 세척 공간", "간판"],
    precheck: ["조명 배선", "바 테이블 고정 상태", "음향 장비 보존 여부", "외부 사인물 처리"],
    waste: ["장식 마감재", "조명 폐기물", "목재 바 구조물", "유리와 금속 집기"],
    scope: ["바 테이블 해체", "조명과 음향 배선 정리", "벽면 장식 철거", "간판과 바닥 마감 확인"],
    process: ["조명과 음향 배선 확인", "바 구조물 해체", "장식 마감재 제거", "외부 사인물과 바닥 흔적 확인"],
    restoration:
      "술집 원상복구는 조명 배선, 벽면 장식 철거 흔적, 바닥 접착제와 간판 제거 후 외부 마감 상태를 봅니다.",
    estimate:
      "인테리어 마감재 종류, 조명 배선 범위, 바 구조물 규모, 야간 작업 가능 여부가 견적에 영향을 줍니다.",
    caution:
      "조명과 음향 장비가 복잡한 현장은 전원 차단과 보존 장비 표시가 먼저 필요합니다.",
    cta: "바 테이블 구조와 조명 상태를 알려주시면 술집 철거 범위를 안내합니다.",
    faq: [
      { question: "바 테이블만 부분 철거할 수 있나요?", answer: "고정 방식과 전기 연결 상태를 확인한 뒤 부분 철거 가능 범위를 안내합니다." },
      { question: "조명과 음향 장비도 철거 범위에 들어가나요?", answer: "보존할 장비와 폐기할 장비를 구분해 배선 정리까지 상담할 수 있습니다." },
      { question: "야간 영업장 주변에서도 작업이 가능한가요?", answer: "주변 영업시간과 건물 규정을 확인해 소음 공정 시간을 조율합니다." },
      { question: "벽면 장식 철거 후 복구는 어떻게 하나요?", answer: "타공, 접착제, 도장 손상 범위를 확인해 필요한 마감 보완을 정리합니다." },
    ],
  },
  "bowling-alley-demolition-company": {
    label: "볼링장",
    title: "볼링장 철거업체",
    group: "largeFacility",
    h1Focus: "레인과 대형 장비 반출",
    equipment: ["볼링 레인", "핀 세터", "기계실 장비", "대기석", "카운터", "바닥 구조물"],
    precheck: ["레인 수", "장비 분해 방식", "화물차 진입 조건", "층고와 출입구 폭"],
    waste: ["레인 구조물", "대형 장비", "목재와 금속 폐기물", "바닥 잔재물"],
    scope: ["레인 해체", "기계실 장비 분리", "대형 폐기물 반출", "바닥 앵커와 잔재물 확인"],
    process: ["대형 장비 반출 동선 확인", "기계실 장비 분리", "레인 구조물 해체", "바닥 고정 흔적 정리"],
    restoration:
      "볼링장 철거 후에는 레인 고정 앵커, 바닥 레벨, 기계실 잔재물과 다음 공정에 필요한 정리 상태를 확인합니다.",
    estimate:
      "레인 수, 기계실 장비 규모, 장비 투입 필요 여부, 폐기물 부피와 작업 기간이 견적에 크게 반영됩니다.",
    caution:
      "대형 구조물은 반출 동선과 하중 조건을 먼저 확인해야 하며, 임시 적재 공간도 함께 잡아야 합니다.",
    cta: "레인 수와 장비 반출 동선을 알려주시면 대형 철거 계획을 상담합니다.",
    faq: [
      { question: "볼링 레인 철거는 어떤 순서로 진행하나요?", answer: "장비 반출 동선을 확인한 뒤 기계실과 레인 구조물을 단계적으로 분리합니다." },
      { question: "핀 세터 같은 대형 장비도 반출하나요?", answer: "장비 크기와 출입구 폭, 차량 진입 조건을 확인해 반출 방법을 정합니다." },
      { question: "바닥 고정 앵커도 정리할 수 있나요?", answer: "철거 후 바닥 상태를 확인해 다음 공정에 필요한 정리 범위를 안내합니다." },
      { question: "작업 기간은 왜 현장마다 크게 달라지나요?", answer: "레인 수, 장비 규모, 폐기물 상차 조건이 달라 현장 확인 후 일정 산정이 필요합니다." },
    ],
  },
  "screen-golf-demolition-company": {
    label: "스크린골프장",
    title: "스크린골프장 철거업체",
    group: "soundRoom",
    h1Focus: "타석과 방음 구조",
    equipment: ["타석 구조물", "스크린", "센서 주변 설비", "방음재", "전기·통신 배선", "천장 마감"],
    precheck: ["장비 보존 여부", "타석 수", "방음재 철거 범위", "배선 정리 기준"],
    waste: ["방음재", "타석 목재", "스크린 주변 구조물", "배선과 마감재"],
    scope: ["타석 해체", "스크린 주변 구조물 철거", "방음재 정리", "전기·통신 배선 확인"],
    process: ["보존 장비 표시", "전기·통신선 분리", "타석과 스크린 구조물 해체", "방음재와 바닥 단차 확인"],
    restoration:
      "스크린골프장 원상복구는 방음 구조 철거 후 벽체와 천장, 타석 바닥 단차, 배선 잔여 상태를 확인합니다.",
    estimate:
      "타석 수, 방음재 양, 장비 분리 범위, 배선 밀도와 폐기물 부피가 견적에 영향을 줍니다.",
    caution:
      "센서와 스크린 장비를 보존할 계획이라면 철거 전 분리 방식과 포장 위치를 먼저 정해야 합니다.",
    cta: "타석 수와 장비 보존 여부를 알려주시면 스크린골프장 철거 범위를 정리합니다.",
    faq: [
      { question: "스크린 장비를 보존하면서 철거할 수 있나요?", answer: "장비 고정 방식과 배선을 확인해 보존 분리 가능 여부를 안내합니다." },
      { question: "타석만 먼저 철거할 수 있나요?", answer: "가능 여부는 타석 구조와 전기·통신 연결 상태를 본 뒤 판단합니다." },
      { question: "방음재 폐기물이 많아도 반출 가능한가요?", answer: "폐기물 부피와 반출 동선을 확인해 구역별 상차 계획을 세웁니다." },
      { question: "바닥 단차는 원상복구에서 어떻게 보나요?", answer: "타석 철거 후 단차와 접착 흔적을 확인해 보완이 필요한 범위를 정리합니다." },
    ],
  },
  "office-demolition-company": {
    label: "사무실",
    title: "사무실 철거업체",
    group: "office",
    h1Focus: "파티션과 OA 바닥",
    equipment: ["파티션", "OA 바닥", "전기·통신 배선", "천장 마감", "유리 칸막이", "서버실"],
    precheck: ["빌딩 작업 가능 시간", "엘리베이터 예약", "네트워크 장비 보존 여부", "공용부 보호 범위"],
    waste: ["파티션", "카펫과 바닥재", "유리 칸막이", "전선류와 사무 집기"],
    scope: ["파티션 해체", "OA 바닥과 카펫 철거", "전기·통신선 정리", "회의실과 서버실 정리"],
    process: ["관리사무소 규정 확인", "보존 장비 표시", "파티션과 유리벽 해체", "바닥과 천장 마감 확인"],
    restoration:
      "사무실 원상복구는 파티션 고정 흔적, OA 바닥 접착 상태, 천장 타공과 배선 잔여물을 중심으로 확인합니다.",
    estimate:
      "면적, 파티션 수, OA 바닥 여부, 서버실 장비, 야간 작업 조건과 엘리베이터 사용 시간이 견적에 반영됩니다.",
    caution:
      "업무시설은 보안 출입과 공용부 보호 기준이 있으므로 관리사무소 승인 절차를 먼저 확인해야 합니다.",
    cta: "도면이나 파티션 배치 사진을 보내주시면 사무실 철거 범위를 빠르게 정리합니다.",
    faq: [
      { question: "파티션과 유리벽만 철거할 수 있나요?", answer: "고정 방식과 천장·바닥 연결부를 확인해 부분 철거 범위를 안내합니다." },
      { question: "인터넷과 통신선 정리도 가능한가요?", answer: "남길 장비와 제거할 배선을 구분해 네트워크 설비 정리 범위를 잡습니다." },
      { question: "업무시설 엘리베이터 사용 시간에 맞춰 작업할 수 있나요?", answer: "관리사무소 예약 가능 시간과 반출 물량을 확인해 일정을 조율합니다." },
      { question: "OA 바닥 철거 후 마감은 어떻게 하나요?", answer: "바닥재 접착 상태와 단차를 확인해 원상복구에 필요한 정리 범위를 안내합니다." },
    ],
  },
  "daycare-center-demolition-company": {
    label: "어린이집",
    title: "어린이집 철거업체",
    group: "education",
    h1Focus: "놀이시설과 안전 마감재",
    equipment: ["교실 칸막이", "놀이시설", "쿠션 바닥재", "수납장", "급식 공간 설비", "벽 보호재"],
    precheck: ["안전 마감재 철거 범위", "붙박이 시설 고정 방식", "급식 공간 설비", "폐기물 반출 시간"],
    waste: ["놀이시설", "쿠션 바닥재", "수납장", "벽 보호재와 교구"],
    scope: ["교실 구조물 철거", "놀이시설 분리", "쿠션 바닥재 제거", "급식 공간 마감 확인"],
    process: ["보존 교구와 폐기 시설 구분", "놀이시설 분리", "바닥 쿠션재 제거", "벽 보호재와 수납장 흔적 확인"],
    restoration:
      "어린이집 원상복구는 벽 보호재 제거 흔적, 바닥 접착제, 수납장 고정부와 급식 공간 설비 마감 상태를 확인합니다.",
    estimate:
      "교실 수, 놀이시설 부피, 쿠션 바닥재 면적, 붙박이 가구 수량과 폐기물 양이 견적에 영향을 줍니다.",
    caution:
      "안전 마감재와 놀이시설은 부피가 커 반출 시간이 길어질 수 있어 공용부 사용 조건을 먼저 봐야 합니다.",
    cta: "교실 수와 놀이시설 사진을 알려주시면 어린이집 철거 범위를 안내합니다.",
    faq: [
      { question: "놀이시설 폐기물도 처리할 수 있나요?", answer: "시설 크기와 재질을 확인해 분리와 반출 계획을 안내합니다." },
      { question: "쿠션 바닥재 제거가 필요한가요?", answer: "임대차 복구 기준과 다음 사용 목적에 따라 제거 여부를 정합니다." },
      { question: "수납장과 교구장만 먼저 철거할 수 있나요?", answer: "고정 방식과 반출 동선을 확인하면 부분 철거 상담이 가능합니다." },
      { question: "급식 공간 설비도 함께 확인하나요?", answer: "싱크대, 배수, 벽면 마감 상태를 확인해 복구 범위를 안내합니다." },
    ],
  },
  "convenience-store-demolition-company": {
    label: "편의점",
    title: "편의점 철거업체",
    group: "retail",
    h1Focus: "진열대와 냉장 쇼케이스",
    equipment: ["진열대", "냉장·냉동 쇼케이스", "계산대", "간판", "조명", "바닥 마감재"],
    precheck: ["브랜드 시설 반납 여부", "냉장 설비 반출 동선", "전기 용량과 차단", "간판 철거 기준"],
    waste: ["진열 집기", "냉장 장비", "간판", "바닥재와 조명 폐기물"],
    scope: ["진열대 철거", "냉장 쇼케이스 반출", "계산대 정리", "간판과 바닥 마감 확인"],
    process: ["반납 집기와 폐기 집기 구분", "냉장 장비 전원 차단", "진열대와 계산대 반출", "간판과 바닥 흔적 확인"],
    restoration:
      "편의점 원상복구는 냉장 설비 고정 흔적, 전기 배선, 바닥 마감재와 간판 철거 후 외부 마감을 확인합니다.",
    estimate:
      "냉장 쇼케이스 크기, 진열대 수량, 브랜드 시설 보존 여부, 간판 위치와 폐기물 양이 견적에 반영됩니다.",
    caution:
      "브랜드 반납 대상 집기를 폐기물과 섞지 않도록 작업 전 목록을 구분하는 것이 중요합니다.",
    cta: "진열대와 냉장 장비 수량을 알려주시면 편의점 폐점 철거를 상담합니다.",
    faq: [
      { question: "브랜드 집기는 어떻게 처리하나요?", answer: "반납 대상과 폐기 대상을 먼저 구분한 뒤 철거 범위를 정리합니다." },
      { question: "냉장 쇼케이스 반출이 어려운 경우도 있나요?", answer: "출입구 폭과 장비 크기에 따라 분해나 별도 반출 계획이 필요할 수 있습니다." },
      { question: "간판 철거도 함께 가능한가요?", answer: "건물 규정과 외부 마감 상태를 확인해 내부 철거와 함께 상담합니다." },
      { question: "진열대만 먼저 철거할 수 있나요?", answer: "가능합니다. 전기 연결과 보존 집기 여부를 확인하면 부분 작업 범위를 잡을 수 있습니다." },
    ],
  },
  "hair-salon-demolition-company": {
    label: "미용실",
    title: "미용실 철거업체",
    group: "beauty",
    h1Focus: "샴푸대와 배관 마감",
    equipment: ["샴푸대", "급배수 배관", "거울", "붙박이 가구", "전기 설비", "온수기"],
    precheck: ["급배수 차단", "거울 고정 방식", "바닥 배관 흔적", "의자와 집기 반출량"],
    waste: ["거울", "샴푸대", "붙박이 가구", "배관 잔재와 바닥재"],
    scope: ["샴푸대 분리", "거울과 작업대 철거", "붙박이 가구 해체", "배관과 바닥 마감 확인"],
    process: ["급배수 차단 확인", "샴푸대와 온수기 분리", "거울과 가구 철거", "배관 구멍과 벽면 흔적 확인"],
    restoration:
      "미용실 원상복구는 샴푸대 제거 후 배관 마감, 벽면 타공, 거울 접착 흔적과 바닥 배관 자리를 확인합니다.",
    estimate:
      "샴푸대 수량, 배관 처리 범위, 거울 크기, 붙박이 가구와 바닥 마감 상태가 견적 기준이 됩니다.",
    caution:
      "샴푸대 배관을 대충 막으면 누수나 냄새 문제가 생길 수 있어 철거 전 마감 방식을 정해야 합니다.",
    cta: "샴푸대 수량과 거울 고정 상태를 알려주시면 미용실 철거 범위를 안내합니다.",
    faq: [
      { question: "샴푸대 배관도 정리하나요?", answer: "배관 위치와 복구 기준을 확인해 막음 처리와 바닥 마감 범위를 안내합니다." },
      { question: "거울 철거는 위험하지 않나요?", answer: "고정 방식과 크기를 확인해 파손과 안전에 유의해 분리합니다." },
      { question: "붙박이 가구만 먼저 철거할 수 있나요?", answer: "고정 방식과 벽면 손상 가능성을 확인한 뒤 부분 철거를 상담할 수 있습니다." },
      { question: "바닥 배관 흔적은 어떻게 복구하나요?", answer: "배관 절단부, 구멍, 바닥 마감재 상태를 확인해 필요한 보완 범위를 정합니다." },
    ],
  },
  "nail-salon-demolition-company": {
    label: "네일샵",
    title: "네일샵 철거업체",
    group: "beauty",
    h1Focus: "작업대와 소형 집기",
    equipment: ["네일 작업대", "수납장", "진열장", "조명", "콘센트 증설부", "벽면 장식"],
    precheck: ["붙박이 가구 고정 방식", "전기 콘센트 증설 여부", "소형 폐기물 분류", "원상복구 기준"],
    waste: ["작업대", "수납장", "조명", "장식 마감재"],
    scope: ["작업대 철거", "수납장과 진열장 반출", "조명 분리", "벽면 장식과 바닥 접착 흔적 확인"],
    process: ["소형 집기와 보존 물품 구분", "작업대와 수납장 반출", "조명과 콘센트 정리", "벽면 장식 흔적 확인"],
    restoration:
      "네일샵 원상복구는 벽면 타공, 수납장 고정 흔적, 전기 증설 흔적과 바닥 접착 상태를 확인합니다.",
    estimate:
      "붙박이 가구 수량, 장식 마감재 종류, 조명과 콘센트 증설 범위, 폐기물 양이 견적에 영향을 줍니다.",
    caution:
      "작은 매장이라도 장식 마감재와 붙박이 가구가 많으면 폐기물 분류와 벽면 보완이 필요할 수 있습니다.",
    cta: "작업대와 수납장 사진을 보내주시면 네일샵 철거 범위를 안내합니다.",
    faq: [
      { question: "소형 매장도 현장 확인이 필요한가요?", answer: "사진 상담이 가능한 경우도 있지만 복구 기준이 까다로우면 현장 확인이 도움이 됩니다." },
      { question: "작업대와 수납장은 폐기할 수 있나요?", answer: "재사용 여부와 폐기물 종류를 확인해 정리 방향을 안내합니다." },
      { question: "조명과 콘센트 증설부도 정리하나요?", answer: "전기 연결 상태를 확인해 남길 부분과 철거할 부분을 구분합니다." },
      { question: "벽면 장식 철거 후 도장 복구가 필요한가요?", answer: "타공과 접착 흔적을 확인해 임대차 기준에 맞는 보완 범위를 정합니다." },
    ],
  },
  "nail-shop-demolition-company": {
    label: "네일샵",
    title: "네일샵 철거업체",
    group: "beauty",
    h1Focus: "작업대와 소형 집기",
    equipment: ["네일 작업대", "수납장", "진열장", "조명", "콘센트 증설부", "벽면 장식"],
    precheck: ["붙박이 가구 고정 방식", "전기 콘센트 증설 여부", "소형 폐기물 분류", "원상복구 기준"],
    waste: ["작업대", "수납장", "조명", "장식 마감재"],
    scope: ["작업대 철거", "수납장과 진열장 반출", "조명 분리", "벽면 장식과 바닥 접착 흔적 확인"],
    process: ["소형 집기와 보존 물품 구분", "작업대와 수납장 반출", "조명과 콘센트 정리", "벽면 장식 흔적 확인"],
    restoration:
      "네일샵 원상복구는 벽면 타공, 수납장 고정 흔적, 전기 증설 흔적과 바닥 접착 상태를 확인합니다.",
    estimate:
      "붙박이 가구 수량, 장식 마감재 종류, 조명과 콘센트 증설 범위, 폐기물 양이 견적에 영향을 줍니다.",
    caution:
      "작은 매장이라도 장식 마감재와 붙박이 가구가 많으면 폐기물 분류와 벽면 보완이 필요할 수 있습니다.",
    cta: "작업대와 수납장 사진을 보내주시면 네일샵 철거 범위를 안내합니다.",
    faq: [
      { question: "소형 매장도 현장 확인이 필요한가요?", answer: "사진 상담이 가능한 경우도 있지만 복구 기준이 까다로우면 현장 확인이 도움이 됩니다." },
      { question: "작업대와 수납장은 폐기할 수 있나요?", answer: "재사용 여부와 폐기물 종류를 확인해 정리 방향을 안내합니다." },
      { question: "조명과 콘센트 증설부도 정리하나요?", answer: "전기 연결 상태를 확인해 남길 부분과 철거할 부분을 구분합니다." },
      { question: "벽면 장식 철거 후 도장 복구가 필요한가요?", answer: "타공과 접착 흔적을 확인해 임대차 기준에 맞는 보완 범위를 정합니다." },
    ],
  },
  "gym-demolition-company": {
    label: "헬스장",
    title: "헬스장 철거업체",
    group: "largeFacility",
    h1Focus: "운동기구와 고무 바닥",
    equipment: ["운동기구", "고무 바닥재", "샤워실", "탈의실", "거울", "방음재"],
    precheck: ["대형 장비 반출 동선", "바닥재 접착 상태", "샤워실 급배수", "엘리베이터 하중과 예약"],
    waste: ["고무 바닥재", "운동기구", "거울", "샤워실 설비 폐기물"],
    scope: ["운동기구 분리", "고무 바닥재 제거", "샤워실과 탈의실 철거", "거울과 벽면 흔적 확인"],
    process: ["재사용 장비와 폐기 장비 구분", "대형 운동기구 반출", "고무 바닥재 제거", "샤워실 배관과 거울 흔적 확인"],
    restoration:
      "헬스장 원상복구는 고무 바닥 접착제, 샤워실 배관 마감, 거울 고정 흔적과 벽면 손상 여부를 확인합니다.",
    estimate:
      "운동기구 수량과 무게, 바닥재 면적, 샤워실 철거 범위, 반출 장비 필요 여부가 견적에 반영됩니다.",
    caution:
      "무거운 운동기구는 바닥과 공용부 손상을 줄이기 위해 반출 경로와 보호재 설치를 먼저 정해야 합니다.",
    cta: "운동기구 목록과 바닥재 사진을 보내주시면 헬스장 철거 범위를 상담합니다.",
    faq: [
      { question: "운동기구를 재사용하려면 어떻게 하나요?", answer: "재사용 장비와 폐기 장비를 구분해 분리, 포장, 반출 순서를 정하는 것이 좋습니다." },
      { question: "고무 바닥재 제거가 어려운가요?", answer: "접착 상태와 면적에 따라 작업 시간이 달라질 수 있어 현장 확인이 필요합니다." },
      { question: "샤워실과 탈의실도 철거 범위에 포함되나요?", answer: "급배수와 마감재 상태를 확인해 철거와 복구 범위를 안내합니다." },
      { question: "대형 장비 반출 때 엘리베이터를 사용할 수 있나요?", answer: "하중, 크기, 사용 가능 시간을 확인한 뒤 반출 방법을 정합니다." },
    ],
  },
  "academy-demolition-company": {
    label: "학원",
    title: "학원 철거업체",
    group: "education",
    h1Focus: "강의실 칸막이와 보드",
    equipment: ["강의실 칸막이", "책상과 수납장", "보드", "전기·통신 배선", "천장형 냉난방", "소방시설 주변 마감"],
    precheck: ["강의실 수", "수업 종료 일정", "보드 고정 방식", "소방설비 유지 범위"],
    waste: ["책상과 의자", "칸막이", "보드", "전선류와 천장 마감재"],
    scope: ["강의실 칸막이 철거", "책상과 집기 반출", "보드와 벽면 정리", "전기·통신선 확인"],
    process: ["수업 종료 일정 확인", "가구와 보드 반출", "칸막이 해체", "전기·통신선과 소방설비 주변 마감 확인"],
    restoration:
      "학원 원상복구는 칸막이 철거 후 천장과 바닥 연결부, 벽면 보드 타공 흔적과 배선 잔여 상태를 확인합니다.",
    estimate:
      "강의실 수, 칸막이 길이, 책상과 의자 수량, 보드 고정 방식, 작업 시간 제한이 견적에 영향을 줍니다.",
    caution:
      "소방설비와 통신선이 강의실 칸막이와 맞물린 경우가 있어 유지할 설비를 먼저 표시해야 합니다.",
    cta: "강의실 수와 칸막이 사진을 알려주시면 학원 철거 일정을 함께 조율합니다.",
    faq: [
      { question: "강의실 칸막이만 철거할 수 있나요?", answer: "천장과 바닥 연결부, 전기·통신선 위치를 확인한 뒤 부분 철거 범위를 안내합니다." },
      { question: "책상과 집기 반출도 함께 가능한가요?", answer: "수량과 반출 동선을 확인해 철거 일정에 포함할 수 있습니다." },
      { question: "소방설비는 유지해야 하나요?", answer: "건물 기준에 따라 유지해야 할 수 있어 설비 위치와 연결 상태를 먼저 확인합니다." },
      { question: "보드와 벽면 철거 후 도장 복구가 가능한가요?", answer: "타공과 접착 흔적을 확인해 원상복구에 필요한 보완 범위를 정리합니다." },
    ],
  },
};

function getSlugSegments(urlSlug: string) {
  return urlSlug.trim().replace(/^\/+|\/+$/g, "").split("/");
}

function stableIndex(seed: string, modulo: number) {
  const value = Array.from(seed).reduce(
    (total, char, index) => total + char.charCodeAt(0) * (index + 3),
    0,
  );

  return value % modulo;
}

function normalizeSpaces(text: string) {
  return text
    .replace(/\s+/g, " ")
    .replace(/\s+(에서|에게|으로|로|을|를|은|는|이|가|에|와|과|도|만|까지|부터|처럼|보다|마다)(?=\s|[,.!?]|$)/g, "$1")
    .replace(/\s+([,.!?])/g, "$1")
    .trim();
}

function hasFinalConsonant(text: string) {
  const last = Array.from(text.trim()).reverse().find((char) => /[가-힣]/.test(char));

  if (!last) {
    return false;
  }

  const code = last.charCodeAt(0) - 0xac00;

  return code >= 0 && code <= 11171 && code % 28 !== 0;
}

function withObjectParticle(text: string) {
  return `${text}${hasFinalConsonant(text) ? "을" : "를"}`;
}

function withAndParticle(text: string) {
  return `${text}${hasFinalConsonant(text) ? "과" : "와"}`;
}

function joinItems(items: string[], count = 3) {
  return items.slice(0, count).join(", ");
}

function joinProcessSteps(items: string[]) {
  return items.join(" → ");
}

function getServiceFocus(service: ServiceSeoData) {
  return `${service.equipment[0]}, ${service.equipment[1]}, ${service.precheck[0]}`;
}

function getWasteFocus(service: ServiceSeoData) {
  return `${service.waste[0]}, ${service.waste[1]}`;
}

function getRegionGroup(regionSlug: string) {
  return REGION_GROUPS[REGION_GROUP_BY_SLUG[regionSlug] ?? "residentialMixed"];
}

function getServiceData(serviceSlug: string, fallbackName: string): ServiceSeoData {
  return (
    SERVICE_DATA[serviceSlug] ?? {
      label: fallbackName.replace(/철거업체/g, "").trim() || "상가",
      title: fallbackName.trim() || "상가 철거업체",
      group: "general",
      h1Focus: "철거 범위와 원상복구",
      equipment: ["내부 인테리어", "집기", "간판", "바닥 마감", "벽면 마감", "전기 설비"],
      precheck: ["임대차 복구 기준", "반출 동선", "작업 가능 시간", "폐기물 양"],
      waste: ["목재 집기", "마감재", "혼합 폐기물", "간판 폐기물"],
      scope: ["집기 반출", "내부 마감재 철거", "폐기물 분류", "원상복구 범위 확인"],
      process: ["계약서 기준 확인", "철거 범위 표시", "폐기물 반출", "마감 상태 확인"],
      restoration:
        "원상복구는 바닥, 벽면, 천장, 간판 흔적과 남겨야 할 설비를 기준에 맞춰 확인합니다.",
      estimate:
        "면적, 폐기물 양, 반출 동선, 작업 시간과 복구 범위가 견적에 영향을 줍니다.",
      caution:
        "철거할 부분과 남길 부분을 먼저 구분해야 불필요한 보완 작업을 줄일 수 있습니다.",
      cta: "현장 사진과 철거 범위를 알려주시면 상담을 도와드립니다.",
      faq: [
        { question: "부분 철거도 가능한가요?", answer: "현장 구조와 남겨야 할 설비를 확인해 부분 철거 범위를 안내합니다." },
        { question: "폐기물 반출까지 함께 상담하나요?", answer: "폐기물 종류와 반출 동선을 확인해 정리 계획을 세웁니다." },
        { question: "원상복구 기준은 어떻게 확인하나요?", answer: "임대차 계약서와 관리실 기준, 현장 마감 상태를 함께 비교합니다." },
        { question: "작업 전 어떤 자료가 필요하나요?", answer: "현장 사진, 면적, 철거 희망 범위, 작업 가능 시간을 알려주시면 도움이 됩니다." },
      ],
    }
  );
}

function buildH1(regionName: string, service: ServiceSeoData, regionGroup: RegionGroup, seed: string) {
  const templates = [
    `${regionName} ${service.title} ${service.h1Focus} 확인`,
    `${regionName} ${service.label} 철거 전 살펴볼 ${regionGroup.titleFocus}`,
    `${regionName}에서 ${service.label} 철거부터 원상복구 범위까지`,
    `${regionName} ${service.title} 상담과 작업 준비`,
  ];

  return templates[stableIndex(seed, templates.length)];
}

function buildMetaTitle(regionName: string, service: ServiceSeoData, seed: string) {
  const templates = [
    `${regionName} ${service.title} 상담 | ${BASE_SITE_NAME}`,
    `${regionName} ${service.label} 철거·원상복구 확인 | ${BASE_SITE_NAME}`,
    `${regionName} ${service.title} 작업 범위 안내 | ${BASE_SITE_NAME}`,
    `${regionName} ${service.label} 철거 견적 상담 | ${BASE_SITE_NAME}`,
  ];

  return templates[stableIndex(`${seed}:title`, templates.length)];
}

function buildMetaDescription(regionName: string, service: ServiceSeoData, regionGroup: RegionGroup, seed: string) {
  const equipment = joinItems(service.equipment, 2);
  const precheck = service.precheck[stableIndex(`${seed}:precheck`, service.precheck.length)];
  const templates = [
    `${regionName} ${service.label} 철거 상담은 ${equipment} 상태, ${withObjectParticle(regionGroup.titleFocus)} 함께 확인합니다. 폐기물 반출과 원상복구 범위를 정리해 안내합니다.`,
    `${regionName}에서 ${withObjectParticle(service.title)} 찾는다면 ${precheck}, 반출 동선, 작업 가능 시간을 먼저 살펴보세요. 현장 사진 기준으로 무료 상담을 도와드립니다.`,
    `${service.label} 철거는 ${withAndParticle(equipment)} ${service.restoration.replace(/합니다\.$/, "하는 과정")}이 중요합니다. ${regionName} 현장 조건에 맞춰 견적 기준을 안내합니다.`,
    `${regionName} ${service.label} 현장의 ${regionGroup.access} ${withAndParticle(service.precheck[0])} 폐기물 정리 범위를 함께 확인해 상담합니다.`,
  ];

  return normalizeSpaces(templates[stableIndex(`${seed}:description`, templates.length)]);
}

function buildSummary(regionName: string, service: ServiceSeoData, regionGroup: RegionGroup, seed: string) {
  const templates = [
    `${regionName} ${service.label} 철거는 ${withObjectParticle(getServiceFocus(service))} 중심으로 범위를 나누고, ${regionGroup.titleFocus}까지 함께 확인하는 방식으로 상담합니다.`,
    `${regionName} ${service.title} 상담은 내부를 비우는 일에서 끝나지 않습니다. ${withAndParticle(joinItems(service.precheck, 2))} 폐기물 반출 방식, 원상복구 기준을 먼저 구분해 작업 순서를 잡습니다.`,
    `${regionName} 현장 조건에 따라 ${joinItems(service.equipment, 3)} 상태와 반출 동선이 달라질 수 있습니다. ${service.label} 작업에서 필요한 철거 범위와 남겨야 할 설비를 먼저 확인합니다.`,
    `${regionName} ${service.label} 매장은 ${getWasteFocus(service)}처럼 폐기물 성격이 갈리는 항목이 있어 분류와 상차 순서를 미리 정하는 편이 안정적입니다.`,
  ];

  return normalizeSpaces(templates[stableIndex(`${seed}:summary`, templates.length)]);
}

function buildIntro(regionName: string, service: ServiceSeoData, regionGroup: RegionGroup, seed: string) {
  const templates = [
    `${regionName} ${service.label} 현장은 ${withObjectParticle(joinItems(service.equipment, 3))} 먼저 살펴야 철거 범위와 원상복구 수준을 무리 없이 나눌 수 있습니다.`,
    `${regionName}에서 ${service.title} 상담을 진행할 때는 ${withAndParticle(service.precheck[0])} ${regionGroup.titleFocus}가 함께 검토됩니다. ${regionName} 현장에서 남길 설비와 철거할 부분을 기준별로 구분합니다.`,
    `${regionName} ${service.label} 철거는 ${joinItems(service.scope, 2)}만으로 끝나지 않습니다. 임대차 기준, 건물 관리 규정, 실제 마감 상태를 비교해 ${service.label} 복구 범위를 확인합니다.`,
    `${regionName} 상담에서는 ${withObjectParticle(regionGroup.titleFocus)} 먼저 보고, ${service.label} 특유의 ${joinItems(service.equipment, 2)} 상태를 함께 확인합니다.`,
  ];

  return normalizeSpaces(templates[stableIndex(`${seed}:intro`, templates.length)]);
}

function buildFeature(regionName: string, service: ServiceSeoData, regionGroup: RegionGroup, seed: string) {
  const templates = [
    `${regionName} ${service.label} 현장에서는 ${joinItems(service.equipment, 4)} 항목을 주요 확인 대상으로 봅니다. 특히 ${withAndParticle(service.precheck[0])} ${service.precheck[1]} 상태가 작업 순서에 영향을 줍니다.`,
    `${regionName} ${service.label} 상담에서는 ${withObjectParticle(service.precheck.join(", "))} 확인해 철거할 설비와 보존할 설비를 나눕니다.`,
    `${regionGroup.consultation} 이후 ${service.label} 특성에 맞춰 ${joinItems(service.scope, 3)} 범위를 정리합니다.`,
    `${regionName} 현장에서 ${service.equipment[0]} 및 ${withObjectParticle(service.equipment[1])} 먼저 확인하면 폐기물 분류, 반출 동선, 원상복구 마감 기준을 더 정확히 나눌 수 있습니다.`,
  ];

  return normalizeSpaces(templates[stableIndex(`${seed}:feature`, templates.length)]);
}

function buildScope(regionName: string, service: ServiceSeoData, regionGroup: RegionGroup, seed: string) {
  const templates = [
    `${regionName} ${service.label} 철거 범위는 ${service.scope.join(", ")} 항목으로 나누어 확인합니다. ${getWasteFocus(service)}는 분류와 반출 방식을 따로 정리합니다.`,
    `${service.label} 전체 철거와 부분 철거는 기준이 다릅니다. ${joinItems(service.scope, 3)} 중 실제로 필요한 범위만 정하고, ${regionName} 현장의 반출 조건에 맞춰 폐기물 순서를 잡습니다.`,
    `${regionName} 현장에서는 ${service.equipment[0]}부터 ${service.equipment[service.equipment.length - 1]}까지 모두 철거 대상이 되는 것은 아닙니다. ${service.label} 현장에서 남길 설비와 임대인 확인이 필요한 마감을 구분합니다.`,
    `${service.label} 철거 범위는 ${withAndParticle(service.precheck[0])} ${withObjectParticle(service.precheck[1])} 확인한 뒤 내부 철거, 폐기물 반출, 원상복구 확인 항목으로 나눕니다.`,
    `${regionGroup.titleFocus}이 중요한 현장에서는 ${withObjectParticle(joinItems(service.scope, 2))} 먼저 정하고 공용부 보호와 상차 시간을 함께 검토합니다.`,
  ];

  return normalizeSpaces(templates[stableIndex(`${seed}:scope`, templates.length)]);
}

function buildProcess(regionName: string, service: ServiceSeoData, regionGroup: RegionGroup, seed: string) {
  const variants = [
    `작업 전에는 ${withObjectParticle(service.precheck.join(", "))} 먼저 확인합니다. 이후 ${joinProcessSteps(service.process)} 순서로 현장에 맞게 조율합니다.`,
    `${regionName} 현장에서는 ${regionGroup.titleFocus} 때문에 반출 계획을 먼저 잡는 경우가 있습니다. 그 다음 ${withObjectParticle(service.process.slice(0, 3).join(", "))} 순서대로 진행합니다.`,
    `${service.label} 철거는 ${service.process[0]} 이후 ${service.process[1]}, ${service.process[2]} 순서로 이어집니다. 세부 공정은 ${withObjectParticle(joinItems(service.precheck, 2))} 확인한 뒤 조정합니다.`,
    `임대차 원상복구 기준을 먼저 확인한 뒤 ${withObjectParticle(service.process.join(", "))} 나눠 진행합니다. ${regionGroup.schedule}`,
    `${service.label} 현장은 설비 차단과 보존 대상 표시가 중요합니다. ${joinProcessSteps(service.process.slice(0, 4))} 흐름으로 정리하고 마지막에 마감 상태를 확인합니다.`,
  ];

  return normalizeSpaces(variants[stableIndex(`${seed}:process`, variants.length)]);
}

function buildEstimate(regionName: string, service: ServiceSeoData, regionGroup: RegionGroup, seed: string) {
  const templates = [
    `${service.estimate} ${regionName} 현장은 ${regionGroup.access}`,
    `견적은 단순 면적보다 ${joinItems(service.precheck, 3)}, 폐기물 양, 작업 가능 시간에 따라 달라집니다. ${regionGroup.schedule}`,
    `${service.label} 철거 비용을 확인할 때는 ${service.equipment[0]} 수량과 ${service.equipment[1]} 상태, 반출 거리, 원상복구 범위를 함께 봅니다. ${regionGroup.titleFocus}도 일정 산정에 반영됩니다.`,
    `${regionName} 현장의 면적, 층수, 엘리베이터 사용 가능 여부, 차량 진입 조건은 ${service.label} 견적에 함께 반영됩니다. ${joinItems(service.scope, 2)} 범위가 넓으면 폐기물 양과 작업 시간이 달라질 수 있습니다.`,
    `${regionName} ${service.label} 견적은 ${joinItems(service.equipment, 2)} 상태만으로 단정하기 어렵습니다. ${regionName} 현장 사진, 반출 거리, 야간·주말 작업 가능 여부, 복구 범위를 같이 확인합니다.`,
  ];

  return normalizeSpaces(templates[stableIndex(`${seed}:estimate`, templates.length)]);
}

function buildCaution(regionName: string, service: ServiceSeoData, regionGroup: RegionGroup, seed: string) {
  const templates = [
    `${service.caution} ${regionGroup.restoration}`,
    `${regionName} ${service.label} 현장의 ${service.waste.join(", ")}처럼 폐기물 성격이 다른 항목은 분류 기준을 먼저 정해야 합니다. ${regionName} 반출 동선과 임시 적치 위치도 함께 확인합니다.`,
    `철거를 급하게 시작하기보다 ${service.precheck[0]}, ${service.precheck[1]}, 원상복구 검수 기준을 먼저 확인하는 편이 좋습니다. ${regionGroup.restoration}`,
    `${regionName} ${service.label} 현장은 남겨야 할 설비와 철거할 설비가 섞여 있을 수 있습니다. 작업 전 사진을 남기고 ${regionName} 관리 기준에 맞춰 바닥·벽·천장 마감 상태를 확인합니다.`,
    `${regionName} 현장에서는 폐기물 상차 시간과 공용부 보호 범위를 미리 맞추는 것이 좋습니다. ${service.waste[0]}와 ${service.waste[1]}는 분리 기준을 현장에서 확인합니다.`,
  ];

  return normalizeSpaces(templates[stableIndex(`${seed}:caution`, templates.length)]);
}

function buildFaq(regionName: string, service: ServiceSeoData, regionGroup: RegionGroup, seed: string) {
  const regionQuestions = [
    {
      question: `${regionName} ${service.label} 철거 견적은 어떤 기준으로 달라지나요?`,
      answer: `면적, ${joinItems(service.precheck, 2)}, 폐기물 양, 반출 동선, 원상복구 범위를 함께 확인해 견적 기준을 정리합니다.`,
    },
    {
      question: `${regionName} 현장은 건물 관리실 협의가 필요한가요?`,
      answer: `${regionName} 현장의 작업 시간, 엘리베이터 사용, 공용부 보호 기준은 건물마다 다를 수 있어 관리 기준을 먼저 확인하는 편이 좋습니다.`,
    },
    {
      question: `${service.label} 폐기물은 어떻게 분류하나요?`,
      answer: `${getWasteFocus(service)}처럼 성격이 다른 항목을 나누고, 반출 동선과 상차 순서를 현장 조건에 맞춰 정리합니다.`,
    },
    {
      question: `${service.label} 원상복구 범위는 어떻게 확인하나요?`,
      answer: `${regionName} ${service.label} 원상복구는 임대차 계약 조건과 관리실 기준을 보고 바닥, 벽, 천장, 설비 마감 중 보완이 필요한 부분을 확인합니다.`,
    },
  ];
  const faq = service.faq.map((item, index) => ({
    ...item,
    question: normalizeSpaces(`${regionName} ${service.label} ${item.question}`),
    answer: normalizeSpaces(
      index % 2 === 0
        ? `${item.answer} ${regionName} 현장의 ${regionGroup.titleFocus}도 함께 확인합니다.`
        : `${item.answer} ${service.label} 작업 전에는 ${withObjectParticle(service.precheck[index % service.precheck.length])} 같이 봅니다.`,
    ),
  }));
  const regionQuestion =
    regionQuestions[stableIndex(`${seed}:regionFaqVariant`, regionQuestions.length)];

  faq.splice(stableIndex(`${seed}:regionFaq`, faq.length + 1), 0, regionQuestion);

  return faq.slice(0, 4);
}

export function enhanceRegionalSeoCopy(page: PageData): PageData {
  const [regionSlug, serviceSlug] = getSlugSegments(page.URL슬러그);

  if (!regionSlug || !serviceSlug) {
    return page;
  }

  const regionName = normalizeSpaces(page.지역 || regionSlug);
  const service = getServiceData(serviceSlug, page.서비스);
  const regionGroup = getRegionGroup(regionSlug);
  const seed = `${regionSlug}:${serviceSlug}:${service.group}`;
  const faq = buildFaq(regionName, service, regionGroup, seed);
  const 메인키워드 = `${regionName} ${service.title}`;

  return {
    ...page,
    지역: regionName,
    서비스: service.title,
    메인키워드,
    페이지제목: buildMetaTitle(regionName, service, seed),
    H1: buildH1(regionName, service, regionGroup, seed),
    메타설명: buildMetaDescription(regionName, service, regionGroup, seed),
    본문요약: buildSummary(regionName, service, regionGroup, seed),
    도입문: buildIntro(regionName, service, regionGroup, seed),
    현장특징: buildFeature(regionName, service, regionGroup, seed),
    철거범위: buildScope(regionName, service, regionGroup, seed),
    진행절차: buildProcess(regionName, service, regionGroup, seed),
    비용안내: buildEstimate(regionName, service, regionGroup, seed),
    주의사항: buildCaution(regionName, service, regionGroup, seed),
    FAQ1질문: normalizeSpaces(faq[0].question),
    FAQ1답변: normalizeSpaces(faq[0].answer),
    FAQ2질문: normalizeSpaces(faq[1].question),
    FAQ2답변: normalizeSpaces(faq[1].answer),
    FAQ3질문: normalizeSpaces(faq[2].question),
    FAQ3답변: normalizeSpaces(faq[2].answer),
    FAQ4질문: normalizeSpaces(faq[3].question),
    FAQ4답변: normalizeSpaces(faq[3].answer),
  };
}
