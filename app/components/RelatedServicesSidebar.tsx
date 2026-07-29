import Link from "next/link";
import { COMMON_SERVICES, type CommonService } from "../lib/common-services";
import type { InternalLink } from "../lib/internal-links";

type RelatedServicesSidebarProps = {
  currentServiceSlug?: string;
  links?: InternalLink[];
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
  links,
}: RelatedServicesSidebarProps) {
  const fallbackLinks = priorityServiceSlugs
    .map((slug) => COMMON_SERVICES.find((service) => service.slug === slug))
    .filter(isCommonService)
    .filter((service) => service.slug !== currentServiceSlug)
    .slice(0, 4)
    .map((service) => ({
      href: `/${service.slug}`,
      label: service.title,
    }));
  const relatedLinks = links?.length ? links : fallbackLinks;

  return (
    <aside className="related-services-sidebar" aria-labelledby="related-services-sidebar-title">
      <nav className="related-services-sidebar-nav" aria-label="관련 이동 링크">
        <Link className="home-button home-button-outline" href="/#region-section">
          지역별 철거 선택으로 돌아가기
        </Link>
        <Link className="home-button home-button-accent-soft" href="/#services-section">
          업종별 서비스 전체 보기
        </Link>
      </nav>

      <h2 id="related-services-sidebar-title">관련 서비스</h2>

      <div className="related-services-sidebar-list">
        {relatedLinks.map((link) => (
          <Link
            className="related-services-sidebar-link"
            href={link.href}
            key={link.href}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
