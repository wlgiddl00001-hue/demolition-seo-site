export const SITE_URL = "https://demolition-seo-site.vercel.app";
export const SITE_NAME = "철거·원상복구";
export const SITE_LANGUAGE = "ko-KR";
export const OG_LOCALE = "ko_KR";
export const PHONE_NUMBER = "010-8286-7620";
export const HOME_OG_IMAGE = `${SITE_URL}/hero-demolition.png`;
export const SERVICE_OG_IMAGE = `${SITE_URL}/service-banner.png`;

type BreadcrumbItem = {
  name: string;
  item: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

export function createOpenGraphMetadata({
  title,
  description,
  url,
  image,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
}) {
  return {
    title,
    description,
    url,
    siteName: SITE_NAME,
    type: "website" as const,
    locale: OG_LOCALE,
    images: image ? [{ url: image }] : undefined,
  };
}

export function createTwitterMetadata({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image?: string;
}) {
  return {
    card: "summary_large_image" as const,
    title,
    description,
    images: image ? [image] : undefined,
  };
}

export function createWebsiteJsonLd(description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: SITE_LANGUAGE,
    description,
  };
}

export function createOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    telephone: PHONE_NUMBER,
  };
}

export function createWebPageJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    inLanguage: SITE_LANGUAGE,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function createBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

export function createFaqPageJsonLd(items: FaqItem[]) {
  const seenQuestions = new Set<string>();
  const mainEntity = items.reduce<Array<Record<string, unknown>>>(
    (questions, item) => {
      const question = item.question.trim();
      const answer = item.answer.trim();

      if (!question || !answer || seenQuestions.has(question)) {
        return questions;
      }

      seenQuestions.add(question);
      questions.push({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      });

      return questions;
    },
    [],
  );

  if (mainEntity.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
}

function stringifyJsonLd(data: unknown) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  JSON.parse(json);

  return json;
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: stringifyJsonLd(data) }}
    />
  );
}
