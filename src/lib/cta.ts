export const PRIMARY_CTA_HREF = "/maintenance";

export function ctaHref(source: string, extra?: Record<string, string | number>) {
  const params = new URLSearchParams({
    source,
    ...Object.fromEntries(
      Object.entries(extra ?? {}).map(([k, v]) => [k, String(v)])
    ),
  });
  return `${PRIMARY_CTA_HREF}?${params.toString()}`;
}
