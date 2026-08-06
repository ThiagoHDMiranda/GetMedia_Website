import { NextResponse } from "next/server";

const GITHUB_API_URL =
  "https://api.github.com/repos/ThiagoHDMiranda/GetMedia_Desktop/releases/latest";

interface GitHubAsset {
  name?: string;
  size?: number;
  browser_download_url?: string;
}

interface GitHubRelease {
  tag_name?: string;
  published_at?: string;
  assets?: GitHubAsset[];
}

/**
 * GET /api/latest-release
 *
 * Proxies the GitHub API "latest release" request so the authenticated token
 * (GITHUB_API_TOKEN in .env.local) never reaches the browser. The GitHub
 * response is cached for 1h via the fetch revalidate option, so we hit the API
 * at most once per hour regardless of page traffic.
 */
export async function GET() {
  try {
    const res = await fetch(GITHUB_API_URL, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "getmedia-web",
        ...(process.env.GITHUB_API_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}` }
          : {}),
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `GitHub API responded with ${res.status}` },
        { status: 502 }
      );
    }

    const data = (await res.json()) as GitHubRelease;
    const asset = data.assets?.find(
      (a) =>
        typeof a.name === "string" &&
        a.name.endsWith(".exe") &&
        typeof a.browser_download_url === "string"
    );

    if (!asset || typeof data.tag_name !== "string") {
      return NextResponse.json({ error: "No exe asset found" }, { status: 404 });
    }

    return NextResponse.json({
      url: asset.browser_download_url,
      size: typeof asset.size === "number" ? asset.size : 0,
      version: data.tag_name,
      createdAt: typeof data.published_at === "string" ? data.published_at : null,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch latest release" },
      { status: 502 }
    );
  }
}