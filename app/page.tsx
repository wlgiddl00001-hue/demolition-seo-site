import HomeRegionExplorer, {
  type PagesByRegion,
} from "./components/HomeRegionExplorer";
import { getPages } from "./lib/sheet";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "전국 상가철거·원상복구 전문업체 | 더세이브",
  description:
    "상가철거, 식당철거, 사무실철거, 학원철거, 폐업철거와 원상복구 상담을 진행합니다. 현장 확인부터 철거, 폐기물 정리, 마무리 작업까지 안내합니다.",
  alternates: {
    canonical: "https://demolition-seo-site.vercel.app",
  },
  openGraph: {
    title: "전국 상가철거·원상복구 전문업체 | 더세이브",
    description:
      "상가철거, 식당철거, 사무실철거, 학원철거, 폐업철거와 원상복구 상담을 진행합니다. 현장 확인부터 철거, 폐기물 정리, 마무리 작업까지 안내합니다.",
    url: "https://demolition-seo-site.vercel.app",
    siteName: "더세이브",
    type: "website",
  },
};

export default async function Home() {
  const pages = await getPages();
  const pagesByRegion = pages.reduce<PagesByRegion>((groups, page) => {
    const region = page.지역.trim() || "기타 지역";
    const group = groups.find((item) => item.region === region);
    const servicePage = {
      URL슬러그: page.URL슬러그,
      페이지제목: page.페이지제목,
    };

    if (group) {
      group.pages.push(servicePage);
    } else {
      groups.push({ region, pages: [servicePage] });
    }

    return groups;
  }, []);

  return (
    <main className="home-main">
      <HomeRegionExplorer pagesByRegion={pagesByRegion} />
    </main>
  );
}
