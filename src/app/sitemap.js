// Sitemap generation for Next.js application
import { siteConfig } from "@/lib/seo.config";

// Data
import categories from "@/data/categories.data";

export default async function sitemap() {
  const baseUrl = siteConfig.url;
  const currentDate = new Date();

  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/explore/all`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/saved`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  // Category pages
  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/explore/${category.slug}`,
    lastModified: currentDate,
    changeFrequency: "daily",
    priority: category.slug === "all" ? 0.9 : 0.8,
  }));

  // Fetch all designs for sitemap
  let designPages = [];
  // try {
  //   const response = await fetch(
  //     `${
  //       process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"
  //     }/designs?limit=1000`,
  //     {
  //       next: { revalidate: 3600 }
  //     }
  //   );

  //   if (response.ok) {
  //     const data = await response.json();
  //     const designs = data.designs || data.data || [];

  //     designPages = designs.map((design) => ({
  //       url: `${baseUrl}/designs/${design._id || design.id}`,
  //       lastModified: new Date(
  //         design.updatedAt || design.updated_at || currentDate
  //       ),
  //       changeFrequency: "weekly",
  //       priority: 0.7,
  //     }));
  //   }
  // } catch (error) {
  //   console.error("Error fetching designs for sitemap:", error);
  //   // API ishlamasa ham sitemap yaratiladi
  // }

  return [...staticPages, ...categoryPages, ...designPages];
}
