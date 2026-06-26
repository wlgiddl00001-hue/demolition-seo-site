import Papa from "papaparse";
import { normalizeChungbukPageCopy } from "./chungbuk-page-copy";

export const SHEET_CSV_URL =
  
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQOv6fTn3PBHiV5XBAoz824rgYAwRyU1tfd1-aGrl2Gj8MDHnxAlhwT0-h97ZPc-YTRvyYgOaVumN12/pub?gid=2141467093&single=true&output=csv";

export type PageData = {
  지역: string;
  서비스: string;
  메인키워드: string;
  URL슬러그: string;
  페이지제목: string;
  H1: string;
  메타설명: string;
  본문요약: string;
    도입문: string;
  현장특징: string;
  철거범위: string;
  진행절차: string;
  비용안내: string;
  주의사항: string;
  FAQ1질문: string;
  FAQ1답변: string;
  FAQ2질문: string;
  FAQ2답변: string;
  FAQ3질문: string;
  FAQ3답변: string;
};

export async function getPages(): Promise<PageData[]> {
 const response = await fetch(SHEET_CSV_URL, {
  cache: "no-store",
});

  const csvText = await response.text();

  const result = Papa.parse<PageData>(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  return result.data.map(normalizeChungbukPageCopy);
}
