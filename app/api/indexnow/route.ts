const HOST = "demolition-seo-site.vercel.app";
const BASE_URL = `https://${HOST}`;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const INDEXNOW_KEY = "bc69IMStIuNCTX7GMzPqC31tV8HF6Bid";
const MAX_URLS = 10000;

type IndexNowRequestBody = {
  urls?: unknown;
};

function isAllowedUrl(value: unknown): value is string {
  if (typeof value !== "string") {
    return false;
  }

  try {
    const url = new URL(value);

    return url.protocol === "https:" && url.hostname === HOST && url.origin === BASE_URL;
  } catch {
    return false;
  }
}

function jsonResponse(body: Record<string, unknown>, status: number) {
  return Response.json(body, { status });
}

export async function GET() {
  return Response.json({
    ok: true,
    message: "IndexNow API is ready",
  });
}

export async function POST(request: Request) {
  let body: IndexNowRequestBody;

  try {
    body = (await request.json()) as IndexNowRequestBody;
  } catch {
    return jsonResponse({ ok: false, message: "Invalid JSON body" }, 400);
  }

  const urls = body.urls;

  if (!Array.isArray(urls) || urls.length === 0) {
    return jsonResponse({ ok: false, message: "urls must be a non-empty array" }, 400);
  }

  if (urls.length > MAX_URLS) {
    return jsonResponse({ ok: false, message: "A maximum of 10000 URLs is allowed" }, 400);
  }

  if (!urls.every(isAllowedUrl)) {
    return jsonResponse(
      { ok: false, message: `All URLs must belong to ${BASE_URL}` },
      400,
    );
  }

  const indexNowResponse = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  });

  if (!indexNowResponse.ok) {
    return jsonResponse(
      {
        ok: false,
        message: "IndexNow submission failed",
        status: indexNowResponse.status,
      },
      502,
    );
  }

  return Response.json({
    ok: true,
    message: "IndexNow submission accepted",
    submitted: urls.length,
    status: indexNowResponse.status,
  });
}
