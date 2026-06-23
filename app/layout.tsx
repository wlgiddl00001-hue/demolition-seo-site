import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import MobileBottomCTA from "./components/MobileBottomCTA";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "더세이브 철거 원상복구",
  description: "서울 지역 철거, 원상복구, 폐기물 처리 상담 안내",
  openGraph: {
    title: "더세이브 철거 원상복구",
    description: "서울 지역 철거, 원상복구, 폐기물 처리 상담 안내",
    url: "https://thesave-demolition.netlify.app",
    siteName: "더세이브 철거 원상복구",
    type: "website",
  },
  verification: {
    other: {
      "naver-site-verification":
        "cb15b83f5c7e89d843b9dbba7b718b6cbc2b7dae",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta property="og:title" content="더세이브 철거 원상복구" />
        <meta
          property="og:description"
          content="서울 지역 철거, 원상복구, 폐기물 처리 상담 안내"
        />
        <meta
          property="og:url"
          content="https://thesave-demolition.netlify.app"
        />
        <meta property="og:site_name" content="더세이브 철거 원상복구" />
        <meta property="og:type" content="website" />
      </head>
      <body className="min-h-full flex flex-col pb-24 md:pb-0">
        {children}
        <MobileBottomCTA />
      </body>
    </html>
  );
}
