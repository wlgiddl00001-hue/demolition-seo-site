"use client";

export default function StickyTopCTA() {
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="sticky-top-cta">
      <div className="sticky-top-cta-inner">
        <button
          type="button"
          className="sticky-top-cta-button sticky-top-cta-region"
          onClick={() => scrollToId("region-section")}
        >
          지역별 철거 선택
        </button>

        <button
          type="button"
          className="sticky-top-cta-button sticky-top-cta-primary"
          onClick={() => scrollToId("consultation-section")}
        >
          무료 견적 신청
        </button>

        <a
          href="tel:01082867620"
          className="sticky-top-cta-button sticky-top-cta-phone"
        >
          010-8286-7620 전화 상담
        </a>

        <button
          type="button"
          className="sticky-top-cta-button sticky-top-cta-service"
          onClick={() => scrollToId("services-section")}
        >
          업종별 서비스
        </button>
      </div>
    </div>
  );
}