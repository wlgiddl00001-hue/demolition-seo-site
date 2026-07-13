import { COMMON_SERVICES, type CommonService } from "../lib/common-services";

type RelatedServicesSidebarProps = {
  currentServiceSlug?: string;
};

const priorityServiceSlugs = [
  "store-demolition-company",
  "building-demolition",
  "restaurant-demolition-company",
  "cafe-demolition-company",
  "pc-room-demolition-company",
  "office-demolition-company",
  "restoration",
  "business-closure-demolition",
];

function isCommonService(service: CommonService | undefined): service is CommonService {
  return Boolean(service);
}

export default function RelatedServicesSidebar({
  currentServiceSlug,
}: RelatedServicesSidebarProps) {
  const relatedServices = priorityServiceSlugs
    .map((slug) => COMMON_SERVICES.find((service) => service.slug === slug))
    .filter(isCommonService)
    .filter((service) => service.slug !== currentServiceSlug)
    .slice(0, 4);

  return (
    <aside className="related-services-sidebar" aria-labelledby="related-services-sidebar-title">
      <nav className="related-services-sidebar-nav" aria-label="관련 이동 링크">
        <a className="home-button home-button-outline" href="/#region-section">
          지역별 철거 선택으로 돌아가기
        </a>
        <a className="home-button home-button-accent-soft" href="/#services-section">
          업종별 서비스 전체 보기
        </a>
      </nav>

      <h2 id="related-services-sidebar-title">관련 서비스</h2>

      <div className="related-services-sidebar-list">
        {relatedServices.map((service) => (
          <a
            className="related-services-sidebar-link"
            href={`/${service.slug}`}
            key={service.slug}
          >
            {service.title}
          </a>
        ))}
      </div>
    </aside>
  );
}
