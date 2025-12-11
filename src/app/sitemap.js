// Sitemap generation for Next.js application
import { siteConfig } from "@/lib/seo.config";

// Data
import categories from "@/data/categories.data";

export default async function sitemap() {
  const baseUrl = siteConfig.url;

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/explore/all`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // Category pages
  const categoryPages = categories
    .filter((cat) => cat.slug !== "all")
    .map((category) => ({
      url: `${baseUrl}/explore/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    }));

  // Fetch all designs for sitemap (optional - uncomment if you have an API endpoint)
  // try {
  //   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/designs/sitemap`);
  //   const designs = await response.json();
  //   const designPages = designs.map((design) => ({
  //     url: `${baseUrl}/designs/${design._id}`,
  //     lastModified: new Date(design.updatedAt),
  //     changeFrequency: "weekly",
  //     priority: 0.7,
  //   }));
  //   return [...staticPages, ...categoryPages, ...designPages];
  // } catch (error) {
  //   console.error("Error fetching designs for sitemap:", error);
  // }

  return [...staticPages, ...categoryPages];
}
