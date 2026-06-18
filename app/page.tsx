import { getPages } from "./lib/sheet";

export default async function Home() {
  const pages = await getPages();
  const pagesByRegion = pages.reduce<
    Array<{ region: string; pages: typeof pages }>
  >((groups, page) => {
    const region = page.지역.trim() || "기타 지역";
    const group = groups.find((item) => item.region === region);

    if (group) {
      group.pages.push(page);
    } else {
      groups.push({ region, pages: [page] });
    }

    return groups;
  }, []);

  function toPageHref(slug: string) {
    return `/${slug.replace(/^\/+/, "")}`;
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

      <section style={{ padding: "48px 24px", background: "#fafafa" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "28px" }}>
            <h2
              style={{
                margin: "0 0 10px",
                fontSize: "30px",
                lineHeight: 1.25,
                fontWeight: 800,
                wordBreak: "keep-all",
                overflowWrap: "break-word",
              }}
            >
              지역별 철거 서비스 바로가기
            </h2>

            <p
              style={{
                margin: 0,
                maxWidth: "720px",
                color: "#6b7280",
                fontSize: "16px",
                lineHeight: 1.7,
                wordBreak: "keep-all",
                overflowWrap: "break-word",
              }}
            >
              아래에서 원하는 지역과 철거 서비스를 선택하면 해당 상담 안내 페이지로 이동할 수 있습니다.
            </p>
          </div>

          <style>
            {`
              .home-service-card:hover {
                border-color: #9ca3af;
                background: #f9fafb;
                transform: translateY(-1px);
              }

              .home-region-section:hover {
                border-color: #d1d5db;
                box-shadow: 0 14px 34px rgba(15, 23, 42, 0.07);
              }
            `}
          </style>

          <div
            style={{
              display: "grid",
              gap: "20px",
            }}
          >
            {pagesByRegion.map(({ region, pages: regionPages }) => (
              <section
                className="home-region-section"
                key={region}
                style={{
                  padding: "24px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  background: "white",
                  boxSizing: "border-box",
                  transition: "border-color 160ms ease, box-shadow 160ms ease",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 16px",
                    fontSize: "22px",
                    lineHeight: 1.35,
                    fontWeight: 800,
                    wordBreak: "keep-all",
                    overflowWrap: "break-word",
                  }}
                >
                  {region}
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
                    gap: "12px",
                  }}
                >
                  {regionPages.map((page) => (
                    <a
                      className="home-service-card"
                      key={page.URL슬러그}
                      href={toPageHref(page.URL슬러그)}
                      style={{
                        display: "flex",
                        minHeight: "64px",
                        alignItems: "center",
                        padding: "14px 16px",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        textDecoration: "none",
                        color: "#111827",
                        background: "#ffffff",
                        boxSizing: "border-box",
                        fontSize: "15px",
                        fontWeight: 800,
                        lineHeight: 1.45,
                        wordBreak: "keep-all",
                        overflowWrap: "break-word",
                        transition:
                          "border-color 160ms ease, background 160ms ease, transform 160ms ease",
                      }}
                    >
                      {page.페이지제목}
                    </a>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
