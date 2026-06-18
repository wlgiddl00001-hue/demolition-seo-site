import { getPages } from "./lib/sheet";

export default async function Home() {
  const pages = await getPages();
  const samplePages = pages.slice(0, 24);

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
          padding: "72px 24px",
          background: "#f3f4f6",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <p style={{ color: "#6b7280", marginBottom: "12px" }}>
            철거 · 원상복구 · 폐기물 처리
          </p>

          <h1
            style={{
              fontSize: "42px",
              lineHeight: 1.2,
              margin: "0 0 16px",
            }}
          >
            서울 철거 · 원상복구 전문 상담
          </h1>

          <p style={{ margin: "0 auto", fontSize: "18px", maxWidth: "760px" }}>
            서울 주요 지역의 철거, 원상복구, 폐기물 처리 상담 정보를 확인해보세요.
          </p>

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
        </div>
      </section>

      <section style={{ padding: "48px 24px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <h2>서울 지역 철거 서비스</h2>

          <p>원하시는 지역과 철거 서비스를 선택해 상담 안내 페이지를 확인해보세요</p>

          <style>
            {`
              .home-service-card:hover {
                border-color: #cbd5e1;
                box-shadow: 0 14px 30px rgba(15, 23, 42, 0.08);
                transform: translateY(-2px);
              }
            `}
          </style>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "16px",
              marginTop: "24px",
            }}
          >
            {samplePages.map((page) => (
              <a
                className="home-service-card"
                key={page.URL슬러그}
                href={`/${page.URL슬러그}`}
                style={{
                  display: "block",
                  minHeight: "120px",
                  padding: "22px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  textDecoration: "none",
                  color: "#111827",
                  background: "white",
                  boxSizing: "border-box",
                  boxShadow: "0 8px 18px rgba(15, 23, 42, 0.04)",
                  transition:
                    "border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease",
                }}
              >
                <strong
                  style={{
                    display: "block",
                    fontSize: "16px",
                    lineHeight: 1.5,
                    fontWeight: 800,
                    wordBreak: "keep-all",
                    overflowWrap: "break-word",
                  }}
                >
                  {page.페이지제목}
                </strong>

                <span
                  style={{
                    display: "inline-block",
                    marginTop: "14px",
                    padding: "5px 10px",
                    borderRadius: "999px",
                    background: "#f3f4f6",
                    color: "#4b5563",
                    fontSize: "13px",
                    fontWeight: 700,
                  }}
                >
                  {page.지역} · {page.서비스}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
