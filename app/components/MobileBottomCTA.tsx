const phoneHref = "tel:010-8286-7620";

const buttonClass =
  "flex h-12 flex-1 items-center justify-center rounded-lg px-3 text-center text-[15px] font-bold tracking-normal shadow-sm transition active:scale-[0.98]";

export default function MobileBottomCTA() {
  return (
    <nav
      aria-label="모바일 상담 바로가기"
      className="fixed inset-x-0 bottom-0 z-[1000] border-t border-emerald-300/20 bg-slate-950/95 px-3 pt-3 shadow-[0_-10px_30px_rgba(15,23,42,0.35)] backdrop-blur md:hidden"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 12px)" }}
    >
      <div className="mx-auto flex max-w-md gap-2">
        <a
          href={phoneHref}
          className={`${buttonClass} bg-emerald-500 text-white hover:bg-emerald-400`}
        >
          전화 상담
        </a>
        <a
          href={phoneHref}
          className={`${buttonClass} border border-emerald-300/70 bg-white text-slate-950 hover:bg-emerald-50`}
        >
          무료 견적 문의
        </a>
      </div>
    </nav>
  );
}
