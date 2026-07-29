import HomeRegionExplorer, {
  type PagesByRegion,
} from "./components/HomeRegionExplorer";
import { getMainRegionLinks } from "./lib/internal-links";
import { getPages } from "./lib/sheet";
import {
  createOpenGraphMetadata,
  createOrganizationJsonLd,
  createTwitterMetadata,
  createWebsiteJsonLd,
  HOME_OG_IMAGE,
  JsonLd,
  SITE_URL,
} from "./lib/seo";
import type { Metadata } from "next";

const HOME_TITLE = "전국 상가철거·원상복구 전문업체 | 더세이브";
const HOME_DESCRIPTION =
  "상가철거, 식당철거, 사무실철거, 학원철거, 폐업철거와 원상복구 상담을 진행합니다. 현장 확인부터 철거, 폐기물 정리, 마무리 작업까지 안내합니다.";

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: createOpenGraphMetadata({
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: SITE_URL,
    image: HOME_OG_IMAGE,
  }),
  twitter: createTwitterMetadata({
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    image: HOME_OG_IMAGE,
  }),
  robots: {
    index: true,
    follow: true,
  },
};

export default async function Home() {
  const pages = await getPages();
  const mainRegionLinks = getMainRegionLinks(pages, 12);
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
    <>
      <JsonLd
        data={[
          createWebsiteJsonLd(HOME_DESCRIPTION),
          createOrganizationJsonLd(),
        ]}
      />
      <main className="home-main">
        <HomeRegionExplorer
          mainRegionLinks={mainRegionLinks}
          pagesByRegion={pagesByRegion}
        />
      </main>
    </>
  );
}
