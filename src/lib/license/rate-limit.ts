import { NextResponse, type NextRequest } from "next/server";

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const windowMs = 10 * 60 * 1000;

function buckets() {
  const global = globalThis as typeof globalThis & {
    __transcriptLicenseRateLimit?: Map<string, RateLimitBucket>;
  };

  global.__transcriptLicenseRateLimit ??= new Map();
  return global.__transcriptLicenseRateLimit;
}

function clientAddress(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const firstForwarded = forwardedFor?.split(",")[0]?.trim();

  return (
    request.headers.get("cf-connecting-ip") ??
    firstForwarded ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

function limitForAction(action: string) {
  switch (action) {
    case "validate":
      return 180;
    case "activate":
    case "deactivate":
      return 30;
    default:
      return 60;
  }
}

export function checkLicenseRateLimit(
  request: NextRequest,
  action: "activate" | "validate" | "deactivate",
) {
  const now = Date.now();
  const key = `${action}:${clientAddress(request)}`;
  const store = buckets();
  const existing = store.get(key);
  const bucket =
    existing && existing.resetAt > now
      ? existing
      : { count: 0, resetAt: now + windowMs };

  bucket.count += 1;
  store.set(key, bucket);

  if (bucket.count <= limitForAction(action)) {
    return null;
  }

  const retryAfterSeconds = Math.max(
    1,
    Math.ceil((bucket.resetAt - now) / 1000),
  );

  return NextResponse.json(
    {
      ok: false,
      error: {
        code: "rate_limited",
        message: "Too many license requests. Try again shortly.",
      },
    },
    {
      status: 429,
      headers: {
        "Retry-After": String(retryAfterSeconds),
      },
    },
  );
}
