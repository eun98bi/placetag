import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

interface AnalyzeResult {
  rankings: { tag: string; count: number }[];
  skipped: string[];
  totalAnalyzed: number;
}

const FETCH_HEADERS: HeadersInit = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8",
  Referer: "https://map.naver.com/",
};

function isListUrl(url: string): boolean {
  return /place\.naver\.com\/place\/list/.test(url);
}

function extractPlaceId(url: string): string | null {
  // pcmap.place.naver.com/place/12345678
  const pcmapMatch = url.match(/pcmap\.place\.naver\.com\/place\/(\d+)/);
  if (pcmapMatch) return pcmapMatch[1];

  // m.place.naver.com/place/12345678
  const mobileMatch = url.match(/m\.place\.naver\.com\/place\/(\d+)/);
  if (mobileMatch) return mobileMatch[1];

  // place.naver.com/restaurant/12345678 등
  const generalMatch = url.match(/place\.naver\.com\/[^/]+\/(\d+)/);
  if (generalMatch) return generalMatch[1];

  // 숫자만 입력한 경우
  const idOnlyMatch = url.trim().match(/^(\d+)$/);
  if (idOnlyMatch) return idOnlyMatch[1];

  return null;
}

// 리스트 페이지에서 업체 ID 목록 추출
async function fetchPlaceIdsFromList(listUrl: string): Promise<string[]> {
  try {
    // hash(#) 제거 후 fetch
    const cleanUrl = listUrl.split("#")[0];
    const res = await fetch(cleanUrl, { headers: FETCH_HEADERS, cache: "no-store" });
    if (!res.ok) return [];

    const html = await res.text();

    // HTML 안에 임베드된 JSON에서 place id 패턴 추출
    // 패턴1: "id":"1234567890"
    // 패턴2: /place/1234567890 형태의 href
    const idSet = new Set<string>();

    for (const match of html.matchAll(/"id"\s*:\s*"(\d{7,14})"/g)) {
      idSet.add(match[1]);
    }
    for (const match of html.matchAll(/\/place\/(\d{7,14})(?:\/|"|'|\s)/g)) {
      idSet.add(match[1]);
    }

    return [...idSet].slice(0, 10);
  } catch {
    return [];
  }
}

async function fetchKeywords(placeId: string): Promise<string[] | null> {
  const targetUrl = `https://pcmap.place.naver.com/place/${placeId}/home`;

  try {
    const res = await fetch(targetUrl, { headers: FETCH_HEADERS, cache: "no-store" });
    if (!res.ok) return null;

    const html = await res.text();

    const match = html.match(/"keywordList"\s*:\s*(\[[^\]]*\])/);
    if (!match) return null;

    const parsed: unknown = JSON.parse(match[1]);
    if (!Array.isArray(parsed)) return null;

    return parsed.filter((v): v is string => typeof v === "string");
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  let urls: string[];
  try {
    const body = await req.json();
    urls = body.urls;
    if (!Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: "urls 배열이 필요합니다." }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const validUrls = urls.filter((u) => u.trim() !== "");
  const skipped: string[] = [];
  const tagCounts: Record<string, number> = {};
  let totalAnalyzed = 0;

  // URL별로 처리 (리스트 URL이면 업체 ID 목록으로 확장)
  const placeIds: string[] = [];

  for (const url of validUrls) {
    if (isListUrl(url)) {
      const ids = await fetchPlaceIdsFromList(url);
      if (ids.length === 0) {
        skipped.push(url);
      } else {
        placeIds.push(...ids);
      }
    } else {
      const id = extractPlaceId(url);
      if (!id) {
        skipped.push(url);
      } else {
        placeIds.push(id);
      }
    }
  }

  // 중복 제거 후 최대 10개
  const uniqueIds = [...new Set(placeIds)].slice(0, 10);

  for (const placeId of uniqueIds) {
    const keywords = await fetchKeywords(placeId);
    if (!keywords || keywords.length === 0) {
      skipped.push(placeId);
      continue;
    }

    totalAnalyzed++;
    for (const tag of keywords) {
      tagCounts[tag] = (tagCounts[tag] ?? 0) + 1;
    }

    await new Promise((r) => setTimeout(r, 300));
  }

  const rankings = Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));

  const result: AnalyzeResult = { rankings, skipped, totalAnalyzed };
  return NextResponse.json(result);
}
