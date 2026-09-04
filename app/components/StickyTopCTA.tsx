export default function StickyTopCTA() {
  return (
    <nav className="sticky-top-cta" aria-label="주요 상담 바로가기">
      <div className="sticky-top-cta-inner">
        <a
          className="sticky-top-cta-button sticky-top-cta-region"
          href="/#region-section"
        >
          지역별 철거 선택
        </a>

        <a
          className="sticky-top-cta-button sticky-top-cta-primary"
          href="#consultation-section"
        >
          무료 견적 신청
        </a>

        <a
          href="tel:01082867620"
          className="sticky-top-cta-button sticky-top-cta-phone"
        >
          010-8286-7620 전화 상담
        </a>

        <a
          className="sticky-top-cta-button sticky-top-cta-service"
          href="/#services-section"
        >
          업종별 서비스
        </a>
      </div>
    </nav>
  );
}
