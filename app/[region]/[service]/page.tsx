import { getPages } from "../../lib/sheet";
import type { Metadata } from "next";

type Props = {
  params: Promise<{
    region: string;
    service: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region, service } = await params;
  const pages = await getPages();

  const slug = `${region}/${service}`;
  const page = pages.find((item) => item.URL슬러그 === slug);

  if (!page) {
    return {
      title: "페이지를 찾을 수 없습니다",
      description: "요청한 철거 페이지를 찾을 수 없습니다.",
    };
  }

  return {
    title: page.페이지제목,
    description: page.메타설명,
  };
}

export default async function ServicePage({ params }: Props) {
  const { region, service } = await params;
  const pages = await getPages();

  const slug = `${region}/${service}`;
  const page = pages.find((item) => item.URL슬러그 === slug);

  if (!page) {
    return (
      <main style={{ padding: "40px" }}>
        <h1>페이지를 찾을 수 없습니다</h1>
        <p>요청한 주소: {slug}</p>
      </main>
    );
  }

  return (
    <main
      style={{
        fontFamily: "Arial, sans-serif",
        lineHeight: 1.6,
        color: "#111827",
      }}
    >
      <section
        style={{
          padding: "64px 24px",
          background: "#f3f4f6",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "960px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <p style={{ marginBottom: "12px", color: "#6b7280" }}>
            {page.지역} · {page.서비스}
          </p>

          <h1
            style={{
              fontSize: "40px",
              lineHeight: 1.2,
              margin: "0 0 16px",
            }}
          >
            {page.H1}
          </h1>

          <p style={{ margin: "0 auto", fontSize: "18px", maxWidth: "760px" }}>
            {page.본문요약}
          </p>

          <img
            src="/hero-demolition.png"
            alt="철거 원상복구 상담 안내"
            style={{
              display: "block",
              margin: "32px auto 0",
              width: "100%",
              maxWidth: "720px",
              boxSizing: "border-box",
              borderRadius: "16px",
              border: "1px solid #e5e7eb",
            }}
          />

          <a
            href="tel:010-8286-7620"
            style={{
              display: "inline-block",
              marginTop: "24px",
              padding: "14px 22px",
              background: "#111827",
              color: "white",
              textDecoration: "none",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            010-8286-7620 전화 상담하기
          </a>
        </div>
      </section>

      <section style={{ padding: "48px 24px" }}>
        <div style={{ width: "100%", maxWidth: "960px", margin: "0 auto" }}>
          <img
            src="/service-banner.png"
            alt="철거 서비스 안내"
            style={{
              display: "block",
              width: "100%",
              maxWidth: "720px",
              margin: "0 auto 32px",
              boxSizing: "border-box",
              borderRadius: "16px",
              border: "1px solid #e5e7eb",
            }}
          />

          <h2 style={{ textAlign: "center" }}>
            {page.메인키워드} 상담 안내
          </h2>

          <p
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            {page.지역}에서 {page.서비스}를 준비 중이라면 현장 사진과 철거
            범위를 먼저 확인하는 것이 중요합니다. 공간 구조, 폐기물 양,
            원상복구 필요 여부에 따라 작업 방식과 견적이 달라질 수 있습니다.
          </p>

          <p
            style={{
              maxWidth: "760px",
              margin: "16px auto 0",
              textAlign: "center",
            }}
          >
            더세이브는 상담을 통해 현재 현장 상황을 확인하고, 필요한 철거
            범위와 원상복구 방향을 안내드립니다. 식당, 상가, 사무실 등 다양한
            공간의 철거 상담을 도와드립니다.
          </p>

          <div style={{ margin: "48px 0" }}>
            <img
              src="/support-package.png"
              alt="폐업 원상복구 지원 안내"
              style={{
                display: "block",
                width: "100%",
                maxWidth: "720px",
                margin: "0 auto 24px",
                boxSizing: "border-box",
                borderRadius: "16px",
                border: "1px solid #e5e7eb",
              }}
            />

            <img
              src="/why-choose-us.png"
              alt="더세이브 철거를 선택해야 하는 이유"
              style={{
                display: "block",
                width: "100%",
                maxWidth: "720px",
                margin: "0 auto 24px",
                boxSizing: "border-box",
                borderRadius: "16px",
                border: "1px solid #e5e7eb",
              }}
            />

            <img
              src="/process-step-1.png"
              alt="철거 진행 절차 1단계 2단계"
              style={{
                display: "block",
                width: "100%",
                maxWidth: "720px",
                margin: "0 auto 24px",
                boxSizing: "border-box",
                borderRadius: "16px",
                border: "1px solid #e5e7eb",
              }}
            />

            <img
              src="/process-step-2.png"
              alt="철거 진행 절차 3단계 5단계"
              style={{
                display: "block",
                width: "100%",
                maxWidth: "720px",
                margin: "0 auto 24px",
                boxSizing: "border-box",
                borderRadius: "16px",
                border: "1px solid #e5e7eb",
              }}
            />

            <img
              src="/process-step-3.png"
              alt="철거 진행 절차 6단계 7단계"
              style={{
                display: "block",
                width: "100%",
                maxWidth: "720px",
                margin: "0 auto 24px",
                boxSizing: "border-box",
                borderRadius: "16px",
                border: "1px solid #e5e7eb",
              }}
            />

            <img
              src="/before-after.png"
              alt="철거 원상복구 전후 비교"
              style={{
                display: "block",
                width: "100%",
                maxWidth: "720px",
                margin: "0 auto 24px",
                boxSizing: "border-box",
                borderRadius: "16px",
                border: "1px solid #e5e7eb",
              }}
            />
          </div>

          <h2>상담 전 확인하면 좋은 사항</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                padding: "20px",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                background: "white",
              }}
            >
              <strong>공간 정보</strong>
              <p style={{ margin: "8px 0 0", color: "#6b7280" }}>
                철거할 공간의 면적과 층수
              </p>
            </div>

            <div
              style={{
                padding: "20px",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                background: "white",
              }}
            >
              <strong>반출 동선</strong>
              <p style={{ margin: "8px 0 0", color: "#6b7280" }}>
                폐기물 양과 반출 동선
              </p>
            </div>

            <div
              style={{
                padding: "20px",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                background: "white",
              }}
            >
              <strong>복구 범위</strong>
              <p style={{ margin: "8px 0 0", color: "#6b7280" }}>
                원상복구 필요 여부
              </p>
            </div>

            <div
              style={{
                padding: "20px",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                background: "white",
              }}
            >
              <strong>일정</strong>
              <p style={{ margin: "8px 0 0", color: "#6b7280" }}>
                작업 가능 날짜와 시간
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: "48px",
              padding: "44px 40px",
              borderRadius: "8px",
              background: "#111827",
              boxSizing: "border-box",
              color: "white",
            }}
          >
            <style>
              {`
                .service-page-call-button:hover {
                  background: #facc15;
                  color: #111827;
                  transform: translateY(-2px);
                  box-shadow: 0 14px 30px rgba(250, 204, 21, 0.28);
                }
              `}
            </style>

            <h2
              style={{
                margin: 0,
                fontSize: "30px",
                lineHeight: 1.25,
                fontWeight: 800,
              }}
            >
              {page.지역} {page.서비스} 상담이 필요하신가요?
            </h2>

            <p
              style={{
                margin: "18px 0 0",
                maxWidth: "680px",
                color: "#d1d5db",
                fontSize: "17px",
                lineHeight: 1.75,
              }}
            >
              현장 사진과 철거 범위를 알려주시면 작업 가능 여부와 상담 안내를
              도와드립니다.
            </p>

            <a
              className="service-page-call-button"
              href="tel:010-8286-7620"
              style={{
                display: "inline-block",
                marginTop: "30px",
                padding: "16px 26px",
                background: "white",
                color: "#111827",
                textDecoration: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                boxShadow: "0 10px 24px rgba(0, 0, 0, 0.25)",
                transition:
                  "background 160ms ease, box-shadow 160ms ease, transform 160ms ease",
              }}
            >
              010-8286-7620 전화 상담하기
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
