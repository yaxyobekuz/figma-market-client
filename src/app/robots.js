import { siteConfig } from "@/lib/seo.config";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/saved"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/saved"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/saved"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
