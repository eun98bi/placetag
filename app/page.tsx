"use client";

import { useState, useRef } from "react";

interface TagRank {
  tag: string;
  count: number;
}

interface AnalyzeResult {
  rankings: TagRank[];
  skipped: string[];
  totalAnalyzed: number;
}

const MAX_URLS = 10;

function isListUrl(url: string) {
  return /pcmap\.place\.naver\.com\/[^/?]+\/list/.test(url);
}

function UrlGuide() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-4 rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-left"
      >
        <span className="text-sm font-semibold text-gray-700">URL 어디서 복사하나요?</span>
        <span className="text-gray-400 text-lg leading-none">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-gray-100">
          <div className="pt-4">
            <ol className="text-xs text-gray-500 space-y-1 list-decimal list-inside">
              <li><a href="https://map.naver.com" target="_blank" rel="noreferrer" className="text-blue-500 underline">map.naver.com</a> 에서 업종·지역 검색 <span className="text-gray-400">(예: 대구 변호사)</span></li>
              <li>리스트가 뜬 상태에서 상위 업체 이름 우클릭 → 링크 주소 복사</li>
            </ol>
            <div className="mt-2 bg-gray-50 rounded-lg px-3 py-2 text-xs font-mono text-gray-400 break-all">
              https://pcmap.place.naver.com/place/<span className="text-blue-600 font-bold">list?query=대구 변호사</span>&amp;x=...
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [urlInputs, setUrlInputs] = useState<string[]>(Array(3).fill(""));
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const totalUrls = urlInputs.length;

  function handleUrlChange(index: number, value: string) {
    const next = [...urlInputs];
    next[index] = value;
    setUrlInputs(next);
  }

  function addUrl() {
    if (urlInputs.length < MAX_URLS) {
      setUrlInputs([...urlInputs, ""]);
    }
  }

  function removeUrl(index: number) {
    if (urlInputs.length <= 1) return;
    setUrlInputs(urlInputs.filter((_, i) => i !== index));
  }

  async function handleAnalyze() {
    const urls = urlInputs.filter((u) => u.trim() !== "");
    if (urls.length === 0) {
      setError("최소 1개의 URL을 입력해주세요.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "서버 오류가 발생했습니다.");
      }

      const data: AnalyzeResult = await res.json();
      setResult(data);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (e) {
      setError(e instanceof Error ? e.message : "알 수 없는 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  function handleCopyTop5() {
    if (!result) return;
    const top5 = result.rankings
      .slice(0, 5)
      .map((r) => r.tag)
      .join(", ");
    navigator.clipboard.writeText(top5).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const maxCount = result?.rankings[0]?.count ?? 1;
  const hasListUrl = urlInputs.some((u) => isListUrl(u));

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      {/* 헤더 */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          플레이스 태그 키워드 분석
        </h1>
        <p className="text-sm text-gray-500">
          경쟁사 네이버 플레이스 URL을 입력하면 가장 많이 쓰인 태그를 분석해드립니다.
        </p>
      </div>

      <UrlGuide />

      {/* URL 입력 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-4">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-semibold text-gray-700">
            경쟁사 플레이스 URL 입력{" "}
            <span className="font-normal text-gray-400">({totalUrls}/{MAX_URLS})</span>
          </h2>
        </div>

        {/* 입력 가이드 */}
        <p className="text-xs text-gray-400 mb-4">
          개별 업체 URL 또는{" "}
          <span className="text-blue-400 font-medium">검색 결과 리스트 URL</span> 모두 지원합니다.
        </p>

        <div className="space-y-2">
          {urlInputs.map((url, i) => {
            const isList = isListUrl(url);
            return (
              <div key={i} className="flex gap-2 items-center">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => handleUrlChange(i, e.target.value)}
                    placeholder="https://pcmap.place.naver.com/place/..."
                    className={`w-full text-sm border rounded-lg px-3 py-2 pr-20 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent placeholder-gray-300 ${
                      isList ? "border-blue-300 bg-blue-50" : "border-gray-200"
                    }`}
                  />
                  {isList && (
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded font-medium">
                      리스트
                    </span>
                  )}
                </div>
                <button
                  onClick={() => removeUrl(i)}
                  disabled={urlInputs.length <= 1}
                  className="text-gray-300 hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed px-1 transition-colors shrink-0"
                  aria-label="삭제"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>

        {urlInputs.length < MAX_URLS && (
          <button
            onClick={addUrl}
            className="mt-3 text-xs text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
          >
            <span className="text-base leading-none">+</span> URL 추가
          </button>
        )}

        {/* 리스트 URL 감지 안내 */}
        {hasListUrl && (
          <div className="mt-3 text-xs text-blue-600 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
            검색 결과 리스트 URL이 감지됐습니다. 리스트에서 업체를 자동으로 추출해 분석합니다. (최대 10개)
          </div>
        )}
      </div>

      {/* 에러 */}
      {error && (
        <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {/* 분석 버튼 */}
      <button
        onClick={handleAnalyze}
        disabled={loading || urlInputs.every((u) => u.trim() === "")}
        className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors text-sm"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            분석 중... (약 10초 소요)
          </span>
        ) : (
          "태그 분석하기 · 약 10초 소요"
        )}
      </button>

      {/* 결과 */}
      {result && (
        <div ref={resultRef} className="mt-8">
          {/* 스킵된 URL 안내 */}
          {result.skipped.length > 0 && (
            <div className="mb-4 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
              <span className="font-semibold">파싱 실패 {result.skipped.length}건:</span>{" "}
              일부 업체는 태그 정보를 가져오지 못했습니다.
            </div>
          )}

          {result.rankings.length === 0 ? (
            <div className="text-center text-gray-400 py-10 text-sm">
              태그를 찾을 수 없습니다. URL을 확인해주세요.
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-semibold text-gray-700">
                  태그 랭킹{" "}
                  <span className="font-normal text-gray-400">
                    ({result.rankings.length}개 태그 · {result.totalAnalyzed}개 업체 분석)
                  </span>
                </h2>
                <button
                  onClick={handleCopyTop5}
                  className="text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
                >
                  {copied ? "복사 완료!" : "상위 5개 복사"}
                </button>
              </div>

              <div className="space-y-3">
                {result.rankings.map((item, i) => (
                  <div key={item.tag} className="flex items-center gap-3">
                    <span
                      className={`text-xs font-bold w-5 text-right shrink-0 ${
                        i === 0
                          ? "text-yellow-500"
                          : i === 1
                          ? "text-gray-400"
                          : i === 2
                          ? "text-orange-400"
                          : "text-gray-300"
                      }`}
                    >
                      {i + 1}
                    </span>

                    <span className="text-sm text-gray-800 flex-1 min-w-0 break-keep">
                      {item.tag}
                    </span>

                    <div className="w-20 shrink-0 bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          i < 5 ? "bg-green-400" : "bg-gray-300"
                        }`}
                        style={{ width: `${(item.count / maxCount) * 100}%` }}
                      />
                    </div>

                    <span className="text-xs text-gray-500 shrink-0 w-14 text-right">
                      {item.count}/{result.totalAnalyzed}업체
                    </span>
                  </div>
                ))}
              </div>

              {result.rankings.length > 0 && (
                <div className="mt-6 pt-5 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-2">추천 태그 (상위 5개)</p>
                  <div className="flex flex-wrap gap-2">
                    {result.rankings.slice(0, 5).map((item) => (
                      <span
                        key={item.tag}
                        className="text-xs bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full font-medium"
                      >
                        #{item.tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <p className="mt-10 text-center text-xs text-gray-300">
        네이버 플레이스 공개 정보만 수집합니다.
      </p>
    </main>
  );
}
