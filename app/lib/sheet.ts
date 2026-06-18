import Papa from "papaparse";

export const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1tLIZmInSrdBrRsQHesxVlkarb8IwiKNvoYg5YYVOVEE/gviz/tq?tqx=out:csv&sheet=페이지생성";

export type PageData = {
  지역: string;
  서비스: string;
  메인키워드: string;
  URL슬러그: string;
  페이지제목: string;
  H1: string;
  메타설명: string;
  본문요약: string;
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

  return result.data;
}