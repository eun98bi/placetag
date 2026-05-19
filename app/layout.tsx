import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://placetag.kr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "네이버 플레이스 태그 키워드 분석기 | 무료 태그 분석 도구",
    template: "%s | 플레이스 태그 분석기",
  },
  description:
    "경쟁사 네이버 플레이스 URL을 입력하면 자주 쓰이는 태그 키워드를 자동 분석해드립니다. 플레이스 상위노출에 필요한 태그를 무료로 찾아보세요.",
  keywords: [
    "네이버 플레이스 태그",
    "플레이스 태그 키워드",
    "네이버 플레이스 상위노출",
    "플레이스 태그 분석",
    "네이버 플레이스 태그 설정",
    "플레이스 상위노출 방법",
    "네이버 지도 태그",
    "플레이스 태그 추천",
    "네이버 플레이스 최적화",
    "경쟁사 플레이스 분석",
  ],
  openGraph: {
    title: "네이버 플레이스 태그 키워드 분석기 - 무료 태그 분석 도구",
    description:
      "경쟁사 네이버 플레이스 URL을 입력하면 자주 쓰이는 태그 키워드를 자동 분석. 플레이스 상위노출에 필요한 태그를 무료로 찾아보세요.",
    url: siteUrl,
    siteName: "플레이스 태그 분석기",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "네이버 플레이스 태그 키워드 분석기",
    description:
      "경쟁사 네이버 플레이스 URL 입력 시 자주 쓰이는 태그 키워드 자동 분석. 플레이스 상위노출 태그를 무료로 찾아보세요.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "네이버 플레이스 태그 키워드 분석기",
  description:
    "경쟁사 네이버 플레이스 URL을 입력하면 자주 쓰이는 태그 키워드를 자동 분석해주는 무료 도구",
  url: siteUrl,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  inLanguage: "ko",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "KRW",
  },
  featureList: [
    "네이버 플레이스 태그 자동 분석",
    "경쟁사 태그 키워드 순위 제공",
    "상위 5개 태그 원클릭 복사",
    "검색 결과 리스트 URL 지원",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-gray-50 min-h-screen">
        <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-6">
            <Link href="/" className="text-sm font-bold text-gray-900">
              플레이스 태그 분석기
            </Link>
            <Link
              href="/guide"
              className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
            >
              태그 가이드
            </Link>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
