import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://placetag.kr";

export const metadata: Metadata = {
  title: "네이버 플레이스 태그 키워드 잡는 법 완벽 가이드",
  description:
    "네이버 플레이스 태그가 무엇인지, 왜 상위노출에 중요한지, 어떻게 좋은 키워드를 고르는지 실전 방법을 알려드립니다. 경쟁사 분석으로 최적 태그를 찾아보세요.",
  keywords: [
    "네이버 플레이스 태그",
    "플레이스 태그 키워드",
    "네이버 플레이스 상위노출 방법",
    "플레이스 태그 설정",
    "네이버 플레이스 태그 중요성",
    "플레이스 태그 고르는 방법",
    "네이버 지도 태그 설정",
    "플레이스 경쟁사 분석",
  ],
  openGraph: {
    title: "네이버 플레이스 태그 키워드 잡는 법 완벽 가이드",
    description:
      "네이버 플레이스 태그가 왜 중요한지, 어떻게 좋은 키워드를 고르는지 실전 방법을 알려드립니다.",
    url: `${siteUrl}/guide`,
    type: "article",
  },
  alternates: {
    canonical: `${siteUrl}/guide`,
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "네이버 플레이스 태그는 몇 개까지 설정할 수 있나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "네이버 플레이스 태그는 업체당 최대 5개까지 설정할 수 있습니다. 5개의 슬롯을 모두 채우는 것이 검색 노출에 유리합니다.",
      },
    },
    {
      "@type": "Question",
      name: "플레이스 태그를 변경하면 바로 반영되나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "태그 변경 후 네이버 검색 인덱스에 반영되기까지 보통 수일에서 1~2주 정도 소요됩니다. 자주 바꾸기보다는 신중하게 설정하는 것을 권장합니다.",
      },
    },
    {
      "@type": "Question",
      name: "어떤 태그가 좋은 태그인가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "검색 수요가 있고, 내 업종·서비스와 정확히 일치하며, 경쟁 상위 업체들이 공통으로 사용하는 태그가 좋은 태그입니다. 지역+업종 조합(예: '강남맛집', '홍대카페') 태그도 효과적입니다.",
      },
    },
    {
      "@type": "Question",
      name: "태그 분석기를 어떻게 사용하나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "네이버 지도(map.naver.com)에서 업종·지역으로 검색한 뒤 상위 경쟁사 업체의 플레이스 URL을 복사해 분석기에 붙여넣으면 됩니다. 최대 10개 URL을 한 번에 분석할 수 있습니다.",
      },
    },
    {
      "@type": "Question",
      name: "태그와 블로그 리뷰 키워드는 다른가요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "네, 다릅니다. 플레이스 태그는 업체 관리자가 직접 설정하는 키워드이고, 블로그 리뷰 키워드는 방문자가 리뷰에 언급한 내용에서 자동 추출됩니다. 둘 다 검색 노출에 영향을 미칩니다.",
      },
    },
  ],
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "네이버 플레이스 태그 키워드 잡는 법 완벽 가이드",
  description:
    "네이버 플레이스 태그가 무엇인지, 왜 상위노출에 중요한지, 어떻게 좋은 키워드를 고르는지 실전 방법을 알려드립니다.",
  inLanguage: "ko",
  author: {
    "@type": "Organization",
    name: "플레이스 태그 분석기",
    url: siteUrl,
  },
  publisher: {
    "@type": "Organization",
    name: "플레이스 태그 분석기",
    url: siteUrl,
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${siteUrl}/guide`,
  },
};

export default function GuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <main className="max-w-2xl mx-auto px-4 py-10">
        {/* 헤더 */}
        <div className="mb-10">
          <span className="inline-block text-xs font-medium text-green-600 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full mb-3">
            완벽 가이드
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-snug">
            네이버 플레이스 태그 키워드,<br />
            왜 중요하고 어떻게 잡나요?
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            플레이스 태그 하나 차이로 상위노출이 바뀝니다. 경쟁사 분석으로 검색에 걸리는 태그를 찾는 방법을 정리했습니다.
          </p>
        </div>

        {/* 목차 */}
        <nav className="bg-white rounded-xl border border-gray-200 p-5 mb-8 shadow-sm">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">목차</p>
          <ol className="space-y-1.5 text-sm text-gray-700">
            <li><a href="#what-is-tag" className="hover:text-green-600 transition-colors">1. 네이버 플레이스 태그란?</a></li>
            <li><a href="#why-important" className="hover:text-green-600 transition-colors">2. 태그가 상위노출에 중요한 이유</a></li>
            <li><a href="#how-to-choose" className="hover:text-green-600 transition-colors">3. 좋은 태그 키워드 고르는 법</a></li>
            <li><a href="#competitor-analysis" className="hover:text-green-600 transition-colors">4. 경쟁사 분석으로 태그 잡는 법</a></li>
            <li><a href="#faq" className="hover:text-green-600 transition-colors">5. 자주 묻는 질문</a></li>
          </ol>
        </nav>

        {/* 섹션 1: 태그란? */}
        <section id="what-is-tag" className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center shrink-0">1</span>
            네이버 플레이스 태그란?
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-3 text-sm text-gray-600 leading-relaxed">
            <p>
              <strong className="text-gray-900">네이버 플레이스 태그</strong>는 네이버 지도·플레이스에서 업체 정보에 등록하는 <strong className="text-gray-900">해시태그 형태의 키워드</strong>입니다. 업체 관리자가 직접 설정하며, 해당 태그로 검색했을 때 업체가 노출될 수 있습니다.
            </p>
            <p>
              예를 들어 카페를 운영 중이라면 <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-green-700 text-xs">#홍대카페</span> <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-green-700 text-xs">#감성카페</span> <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-green-700 text-xs">#브런치카페</span> 같은 태그를 등록하면, 사용자가 이 키워드로 검색할 때 내 업체가 노출될 가능성이 높아집니다.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mt-2">
              <p className="text-xs font-semibold text-gray-700 mb-2">플레이스 태그 기본 규칙</p>
              <ul className="text-xs text-gray-500 space-y-1 list-disc list-inside">
                <li>업체당 최대 <strong className="text-gray-700">5개</strong> 설정 가능</li>
                <li>태그당 최대 <strong className="text-gray-700">10자</strong> 이내 권장</li>
                <li>네이버 지도 앱 또는 스마트플레이스에서 수정 가능</li>
                <li>변경 후 검색 반영까지 수일~2주 소요</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 섹션 2: 왜 중요한가 */}
        <section id="why-important" className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center shrink-0">2</span>
            태그가 상위노출에 중요한 이유
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4 text-sm text-gray-600 leading-relaxed">
            <p>
              네이버 플레이스 검색 순위는 <strong className="text-gray-900">업체명, 카테고리, 태그, 리뷰 키워드</strong> 등 여러 요소를 종합해 결정됩니다. 이 중 태그는 <strong className="text-gray-900">업체 관리자가 직접 컨트롤할 수 있는 몇 안 되는 요소</strong>라는 점에서 중요합니다.
            </p>

            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-blue-500 text-base">🔍</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-0.5">검색 노출 범위 확장</p>
                  <p className="text-gray-500 text-xs">업체명과 카테고리 외에 태그 키워드로도 검색에 걸립니다. 잘 설정된 태그 5개는 5가지 다른 검색어에서 노출 기회를 만듭니다.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-orange-500 text-base">📍</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-0.5">지역 + 업종 조합으로 맞춤 노출</p>
                  <p className="text-gray-500 text-xs">'강남역 점심', '홍대 조용한카페'처럼 구체적인 검색어에 대응하는 태그를 설정하면 구매 의도가 높은 이용자를 정확히 잡을 수 있습니다.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-green-500 text-base">📈</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-0.5">클릭률(CTR) 향상</p>
                  <p className="text-gray-500 text-xs">검색 결과에서 태그가 노출되면 어떤 업체인지 한눈에 파악되어 클릭률이 높아집니다. 클릭률은 다시 상위노출에 긍정적인 신호가 됩니다.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-purple-500 text-base">🏆</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-0.5">경쟁사 대비 차별화</p>
                  <p className="text-gray-500 text-xs">태그를 아직 제대로 설정하지 않은 경쟁사가 많습니다. 태그를 최적화하는 것만으로도 같은 카테고리에서 상위권을 차지할 수 있습니다.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 섹션 3: 좋은 태그 고르는 법 */}
        <section id="how-to-choose" className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center shrink-0">3</span>
            좋은 태그 키워드 고르는 법
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm text-sm text-gray-600 leading-relaxed space-y-4">
            <p>
              태그 5개를 어떻게 구성하느냐에 따라 결과가 크게 달라집니다. 아래 기준으로 태그를 선정하세요.
            </p>

            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-800 mb-1.5">① 검색 수요가 있는 키워드를 선택하세요</p>
                <p className="text-gray-500 text-xs leading-relaxed">
                  아무도 검색하지 않는 태그는 의미가 없습니다. 네이버 검색창에 키워드를 입력했을 때 자동완성에 뜨거나, 네이버 데이터랩에서 검색량이 확인되는 키워드가 좋습니다.
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-800 mb-1.5">② 내 업종·서비스와 정확히 일치해야 합니다</p>
                <p className="text-gray-500 text-xs leading-relaxed">
                  검색량이 많더라도 내 업체와 관련 없는 태그를 설정하면 반송률만 높아집니다. 업종 + 특징 + 지역을 조합한 태그가 가장 효과적입니다.
                </p>
                <div className="mt-2 bg-gray-50 rounded-lg px-3 py-2.5 text-xs text-gray-500">
                  <p className="font-medium text-gray-700 mb-1">예시 조합</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["강남점심맛집", "혼밥가능", "주차가능", "런치스페셜", "직장인맛집"].map((t) => (
                      <span key={t} className="bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-medium">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <p className="font-semibold text-gray-800 mb-1.5">③ 경쟁 강도를 확인하세요</p>
                <p className="text-gray-500 text-xs leading-relaxed">
                  너무 광범위한 태그(예: <span className="font-mono bg-gray-100 px-1 py-0.5 rounded text-xs">#맛집</span>)는 경쟁이 극심해 신규 업체가 상위에 오르기 어렵습니다. 지역이나 특징을 더해 구체화하면 경쟁이 줄고 의미 있는 유입을 얻을 수 있습니다.
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-800 mb-1.5">④ 상위 경쟁사가 공통으로 쓰는 태그를 참고하세요</p>
                <p className="text-gray-500 text-xs leading-relaxed">
                  검색 결과 상위에 노출된 업체들이 공통으로 사용하는 태그는 이미 검색에서 효과가 검증된 키워드입니다. 경쟁사 분석이 가장 빠르고 확실한 방법입니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 섹션 4: 경쟁사 분석 */}
        <section id="competitor-analysis" className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center shrink-0">4</span>
            경쟁사 분석으로 태그 잡는 법
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm text-sm text-gray-600 leading-relaxed space-y-4">
            <p>
              상위 경쟁사가 어떤 태그를 쓰는지 파악하면 검증된 키워드를 빠르게 수집할 수 있습니다. 수작업으로 하나씩 확인하는 대신, <strong className="text-gray-900">분석 도구</strong>를 사용하면 10개 업체의 태그를 한 번에 비교할 수 있습니다.
            </p>

            <div className="space-y-3">
              <p className="font-semibold text-gray-800">단계별 방법</p>
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <div>
                    <p className="font-medium text-gray-700">네이버 지도에서 경쟁사 검색</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      <a href="https://map.naver.com" target="_blank" rel="noreferrer noopener" className="text-blue-500 underline">map.naver.com</a>에서 '업종 + 지역'으로 검색합니다. (예: 홍대 카페, 강남 헬스장)
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <div>
                    <p className="font-medium text-gray-700">상위 업체 URL 복사</p>
                    <p className="text-xs text-gray-500 mt-0.5">검색 결과 리스트에서 상위 업체 이름을 우클릭 → '링크 주소 복사'. 또는 검색 결과 페이지 URL 자체를 복사해도 됩니다.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <div>
                    <p className="font-medium text-gray-700">분석기에 URL 입력</p>
                    <p className="text-xs text-gray-500 mt-0.5">복사한 URL을 분석기에 붙여넣고 '태그 분석하기'를 클릭합니다. 최대 10개 URL을 한 번에 분석할 수 있습니다.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">4</span>
                  <div>
                    <p className="font-medium text-gray-700">상위 태그 5개 복사해서 적용</p>
                    <p className="text-xs text-gray-500 mt-0.5">분석 결과에서 '상위 5개 복사' 버튼을 클릭하고, 네이버 스마트플레이스에서 내 업체 태그를 수정합니다.</p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 mt-2">
              <p className="text-xs font-semibold text-green-800 mb-1">핵심 포인트</p>
              <p className="text-xs text-green-700">
                분석한 업체 중 <strong>50% 이상</strong>이 공통으로 사용하는 태그일수록 검색에서 효과가 검증된 키워드입니다. 분석 결과 상단에 나타나는 태그를 우선 적용하세요.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
              >
                무료로 태그 분석하기 →
              </Link>
            </div>
          </div>
        </section>

        {/* 섹션 5: FAQ */}
        <section id="faq" className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center shrink-0">5</span>
            자주 묻는 질문
          </h2>
          <div className="space-y-3">
            {[
              {
                q: "네이버 플레이스 태그는 몇 개까지 설정할 수 있나요?",
                a: "업체당 최대 5개까지 설정할 수 있습니다. 5개 슬롯을 모두 채우는 것이 검색 노출에 유리합니다. 빈 슬롯은 기회의 손실이에요.",
              },
              {
                q: "플레이스 태그를 변경하면 바로 반영되나요?",
                a: "태그 변경 후 네이버 검색 인덱스에 반영되기까지 보통 수일에서 1~2주 정도 소요됩니다. 자주 바꾸기보다는 신중하게 설정하고 2~4주 후 결과를 확인하는 것을 권장합니다.",
              },
              {
                q: "어떤 태그가 좋은 태그인가요?",
                a: "검색 수요가 있고, 내 업종·서비스와 정확히 일치하며, 경쟁 상위 업체들이 공통으로 사용하는 태그가 좋은 태그입니다. 지역+업종 조합(예: 강남맛집, 홍대카페) 태그도 효과적입니다.",
              },
              {
                q: "태그 분석기를 어떻게 사용하나요?",
                a: "네이버 지도(map.naver.com)에서 업종·지역으로 검색한 뒤 상위 업체의 플레이스 URL을 복사해 분석기에 붙여넣으면 됩니다. 최대 10개 URL을 한 번에 분석할 수 있으며, 결과에서 상위 5개 태그를 원클릭으로 복사할 수 있습니다.",
              },
              {
                q: "태그와 블로그 리뷰 키워드는 다른가요?",
                a: "네, 다릅니다. 플레이스 태그는 업체 관리자가 직접 설정하는 키워드이고, 리뷰 키워드는 방문자 리뷰에서 자동 추출됩니다. 둘 다 검색 노출에 영향을 주며, 태그는 관리자가 직접 컨트롤할 수 있다는 장점이 있습니다.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
              >
                <p className="text-sm font-semibold text-gray-900 mb-2">
                  Q. {item.q}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-green-500 rounded-2xl p-6 text-center text-white">
          <p className="font-bold text-base mb-1">지금 바로 경쟁사 태그를 분석해보세요</p>
          <p className="text-sm text-green-100 mb-4">무료 · 로그인 불필요 · 30초 완성</p>
          <Link
            href="/"
            className="inline-block bg-white text-green-600 font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-green-50 transition-colors"
          >
            태그 분석하러 가기 →
          </Link>
        </div>

        <p className="mt-8 text-center text-xs text-gray-300">
          네이버 플레이스 공개 정보만 수집합니다.
        </p>
      </main>
    </>
  );
}
