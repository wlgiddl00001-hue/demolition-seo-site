import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
  description: "요청하신 철거·원상복구 페이지를 찾을 수 없습니다.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="home-shell not-found-page-inner">
        <p className="home-eyebrow">404</p>
        <h1>페이지를 찾을 수 없습니다</h1>
        <p>요청하신 철거·원상복구 페이지를 찾을 수 없습니다.</p>
        <Link className="home-button home-button-primary" href="/">
          메인으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
