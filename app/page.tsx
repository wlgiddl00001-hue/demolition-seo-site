import HomeRegionExplorer, {
  type PagesByRegion,
} from "./components/HomeRegionExplorer";
import { getPages } from "./lib/sheet";

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
    <main
      style={{
        fontFamily: "Arial, sans-serif",
        lineHeight: 1.6,
        color: "#111827",
      }}
    >
      <HomeRegionExplorer pagesByRegion={pagesByRegion} />
    </main>
  );
}
