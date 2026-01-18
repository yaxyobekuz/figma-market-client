// Next.js
import Link from "next/link";

// API
import { getBlogs } from "@/api/blog.api";

// SEO
import { siteConfig } from "@/lib/seo.config";

// Components
import JsonLd from "@/components/seo/JsonLd";
import BlogItem from "@/components/ui/BlogItem";
import Breadcrumb from "@/components/ui/Breadcrumb";

// Dynamic Metadata Generation
export async function generateMetadata({ searchParams }) {
  const { page } = await searchParams;
  const currentPage = parseInt(page) || 1;

  let title = "Blog - Design Tips, Tutorials & Resources";
  let description =
    "Explore our blog for design tips, Figma tutorials, UI/UX best practices, and the latest trends in web and mobile design.";

  if (currentPage > 1) {
    title = `${title} - Page ${currentPage}`;
  }

  const canonicalUrl =
    currentPage > 1
      ? `${siteConfig.url}/blog?page=${currentPage}`
      : `${siteConfig.url}/blog`;

  return {
    title,
    description,
    keywords: [
      "design blog",
      "Figma tutorials",
      "UI/UX tips",
      "web design",
      "mobile design",
      "design resources",
    ],
    openGraph: {
      title: `${title} | Figma Market`,
      description,
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Figma Market`,
      description,
      images: [siteConfig.ogImage],
    },
    alternates: { canonical: canonicalUrl },
  };
}

const BlogPage = async ({ searchParams }) => {
  const { page, search } = await searchParams;
  const currentPage = parseInt(page) || 1;

  // Fetch blogs
  const { blogs, pagination } = await getBlogs(currentPage, 12, search);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
  ];

  // Generate blog list schema
  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Figma Market Blog",
    description:
      "Design tips, Figma tutorials, and resources for designers and developers",
    url: `${siteConfig.url}/blog`,
    blogPost: blogs.map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.description,
      datePublished: blog.createdAt,
      author: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    })),
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <JsonLd data={blogListSchema} />

      <div className="py-8">
        <div className="container space-y-8">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h1 className="text-3xl font-bold">Blog</h1>
            <p className="text-gray-600">
              Design tips, Figma tutorials, UI/UX best practices, and the latest
              trends in web and mobile design.
            </p>
          </div>

          {/* Blog list */}
          {blogs.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {blogs.map((blog, index) => (
                <BlogItem key={blog._id} data={blog} priority={index < 6} />
              ))}
            </ul>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500">
                {search
                  ? `No articles found for "${search}"`
                  : "No articles available yet. Check back soon!"}
              </p>
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <nav
              className="flex items-center justify-center gap-2 pt-8"
              aria-label="Blog pagination"
            >
              {/* Previous button */}
              {pagination.hasPrevPage ? (
                <Link
                  href={`/blog?page=${currentPage - 1}`}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Previous
                </Link>
              ) : (
                <span className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded-lg cursor-not-allowed">
                  Previous
                </span>
              )}

              {/* Page numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                  .filter((p) => {
                    return (
                      p === 1 ||
                      p === pagination.totalPages ||
                      Math.abs(p - currentPage) <= 1
                    );
                  })
                  .map((pageNum, idx, arr) => (
                    <span key={pageNum} className="flex items-center">
                      {idx > 0 && arr[idx - 1] !== pageNum - 1 && (
                        <span className="px-2 text-gray-400">...</span>
                      )}
                      <Link
                        href={`/blog?page=${pageNum}`}
                        className={`min-w-[40px] h-10 flex items-center justify-center text-sm font-medium rounded-lg transition-colors ${
                          pageNum === currentPage
                            ? "bg-violet-500 text-white"
                            : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </Link>
                    </span>
                  ))}
              </div>

              {/* Next button */}
              {pagination.hasNextPage ? (
                <Link
                  href={`/blog?page=${currentPage + 1}`}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Next
                </Link>
              ) : (
                <span className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded-lg cursor-not-allowed">
                  Next
                </span>
              )}
            </nav>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPage;
