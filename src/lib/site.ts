const DEFAULT_SITE_URL = "https://leadslemonade.com";
export const SITE_IMAGE_PATH = "/thumbnail.png";

/** The canonical public origin used by metadata, sitemap, and robots. */
export function getSiteUrl(): URL {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  try {
    const url = new URL(configured || DEFAULT_SITE_URL);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      throw new Error("Site URL must use HTTP or HTTPS");
    }
    return url;
  } catch {
    return new URL(DEFAULT_SITE_URL);
  }
}

export function getSiteUrlString(path = ""): string {
  return new URL(path, getSiteUrl()).toString().replace(/\/$/, "");
}

export function getSiteImageUrl(): string {
  return getSiteUrlString(SITE_IMAGE_PATH);
}

/** Accept only absolute HTTP(S) image URLs from the API. */
export function isValidImageUrl(value: string | null | undefined): value is string {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}