export default function CoupangPartnersAd() {
  return (
    <footer className="max-w-[720px] mx-auto px-4 pb-10">
      <div className="flex flex-col items-center gap-2">
        <div className="w-full max-w-[680px] min-h-[140px] overflow-hidden text-center">
          <iframe
            title="Coupang Partners advertisement"
            src="/coupang-partners-ad.html"
            width="680"
            height="140"
            scrolling="no"
            className="block w-[680px] max-w-full border-0"
          />
        </div>
        <p className="text-center text-[11px] leading-relaxed text-gray-400">
          이 배너는 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
        </p>
      </div>
    </footer>
  );
}
