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
  metadataBase: new URL("https://demolition-seo-site.vercel.app"),
  title: "전국 상가철거·원상복구 전문업체 | 더세이브",
  description:
    "상가철거, 식당철거, 사무실철거, 학원철거, 폐업철거와 원상복구 상담을 진행합니다.",
  openGraph: {
    title: "전국 상가철거·원상복구 전문업체 | 더세이브",
    description:
      "상가철거, 식당철거, 사무실철거, 학원철거, 폐업철거와 원상복구 상담을 진행합니다.",
    url: "https://demolition-seo-site.vercel.app",
    siteName: "더세이브",
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
      <body className="min-h-full flex flex-col pb-24 md:pb-0">
        {children}
        <MobileBottomCTA />
      </body>
    </html>
  );
}
