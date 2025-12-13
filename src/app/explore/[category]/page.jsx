// SEO
import {
  siteConfig,
  categorySEO,
  generateCollectionSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo.config";

// Next.js
import Link from "next/link";

// Utils
import { cn } from "@/lib/utils";

// Data
import categories from "@/data/categories.data";

// Components
import JsonLd from "@/components/seo/JsonLd";
import DesignItem from "@/components/ui/DesignItem";
import Breadcrumb from "@/components/ui/Breadcrumb";

// API
import { getDesignsByCategory } from "@/api/design.api";

// Dynamic Metadata Generation
export async function generateMetadata({ params, searchParams }) {
  const { category: currentCategory } = await params;
  const { searchQuery, page } = await searchParams;
  const currentPage = parseInt(page) || 1;

  const categoryData = categorySEO[currentCategory] || categorySEO.all;
  const categoryName =
    categories.find((cat) => cat.slug === currentCategory)?.name || "All";

  let title = categoryData.title;
  let description = categoryData.description;

  // Modify for search queries
  if (searchQuery) {
    title = `Search: "${searchQuery}" in ${categoryName} Designs`;
    description = `Search results for "${searchQuery}" in ${categoryName} category. Find free Figma design resources matching your search.`;
  }

  // Modify for pagination
  if (currentPage > 1) {
    title = `${title} - Page ${currentPage}`;
  }

  const canonicalUrl =
    currentPage > 1
      ? `${siteConfig.url}/explore/${currentCategory}?page=${currentPage}`
      : `${siteConfig.url}/explore/${currentCategory}`;

  return {
    title,
    description,
    keywords: [
      ...categoryData.keywords,
      categoryName,
      "free Figma",
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
    alternates: {
      canonical: canonicalUrl,
    },
    robots:
      currentPage > 1
        ? {
            index: false,
            follow: true,
          }
        : {
            index: true,
            follow: true,
          },
  };
}

const ExplorePage = async ({ params, searchParams }) => {
  const { searchQuery, page } = await searchParams;
  const { category: currentCategory } = await params;
  const currentCategoryName =
    categories.find((cat) => cat.slug === currentCategory)?.name || "All";

  // Fetch designs
  const currentPage = parseInt(page) || 1;
  const { designs, pagination } = await getDesignsByCategory(
    currentCategory,
    searchQuery,
    currentPage,
    24
  );

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/explore/all" },
    currentCategory !== "all" && {
      label: currentCategoryName,
      href: `/explore/${currentCategory}`,
    },
  ].filter(Boolean);

  // Generate schemas
  const categoryData = categorySEO[currentCategory] || categorySEO.all;
  const collectionSchema = generateCollectionSchema(
    designs,
    categoryData.title,
    categoryData.description
  );
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <JsonLd data={collectionSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Categories list */}
      <div className="overflow-x-auto pb-2 sm:pb-0">
        <nav aria-label="Design categories" className="bg-gray-50 min-w-max">
          <ul className="flex gap-1 container">
            {categories.map((category) => {
              const isActive = currentCategory === category.slug;

              const href =
                category.href +
                (searchQuery ? `?searchQuery=${searchQuery}` : "");

              return (
                <li key={category.slug} className="shrink-0">
                  <Link
                    href={href}
                    className={cn(
                      "inline-block px-3 transition-colors duration-200",
                      isActive ? "text-violet-500" : "hover:text-violet-500"
                    )}
                    aria-current={isActive ? "page" : undefined}
                    title={`Browse ${category.name} Figma designs`}
                  >
                    <span
                      className={cn(
                        "inline-block py-3.5 border-b-2 transition-all duration-200",
                        isActive ? "border-b-violet-500" : "border-b-white"
                      )}
                    >
                      {category.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Designs Section */}
      <section className="py-12" aria-labelledby="designs-heading">
        <div className="container space-y-12">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Title */}
          <header>
            <h1 id="designs-heading" className="text-3xl font-medium">
              <span>Free</span>
              {currentCategoryName !== "All" && (
                <span className="text-violet-500"> {currentCategoryName} </span>
              )}
              <span> Figma Designs</span>
            </h1>
            {searchQuery && (
              <p className="mt-2 text-gray-600">
                Search results for: <strong>"{searchQuery}"</strong>
              </p>
            )}
            {pagination.totalCount > 0 && (
              <p className="mt-2 text-gray-500 text-sm">
                Showing {designs.length} of {pagination.totalCount} designs
                {pagination.currentPage > 1 &&
                  ` (Page ${pagination.currentPage} of ${pagination.totalPages})`}
              </p>
            )}
          </header>

          {/* Designs Grid */}
          {designs.length > 0 ? (
            <div className="space-y-12">
              <ul
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                role="list"
              >
                {designs.map((design) => (
                  <DesignItem key={design._id} data={design} />
                ))}
              </ul>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <nav
                  className="flex items-center justify-center gap-2"
                  aria-label="Pagination"
                >
                  {/* Previous Button */}
                  {pagination.hasPrevPage && (
                    <Link
                      href={`/explore/${currentCategory}?page=${
                        pagination.prevPage
                      }${searchQuery ? `&searchQuery=${searchQuery}` : ""}`}
                      className="flex items-center justify-center h-10 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      rel="prev"
                      aria-label="Go to previous page"
                    >
                      <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-4 h-4 mr-1"
                      >
                        <path
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      Previous
                    </Link>
                  )}

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {(() => {
                      const pages = [];
                      const totalPages = pagination.totalPages;
                      const current = pagination.currentPage;

                      // Always show first page
                      pages.push(1);

                      // Show ellipsis after first page if needed
                      if (current > 3) {
                        pages.push("ellipsis-start");
                      }

                      // Show pages around current page
                      for (
                        let i = Math.max(2, current - 1);
                        i <= Math.min(totalPages - 1, current + 1);
                        i++
                      ) {
                        if (!pages.includes(i)) {
                          pages.push(i);
                        }
                      }

                      // Show ellipsis before last page if needed
                      if (current < totalPages - 2) {
                        pages.push("ellipsis-end");
                      }

                      // Always show last page if more than 1 page
                      if (totalPages > 1 && !pages.includes(totalPages)) {
                        pages.push(totalPages);
                      }

                      return pages.map((page, index) => {
                        if (
                          page === "ellipsis-start" ||
                          page === "ellipsis-end"
                        ) {
                          return (
                            <span
                              key={page}
                              className="flex items-center justify-center size-10 text-gray-400"
                            >
                              ...
                            </span>
                          );
                        }

                        const isActive = page === current;
                        return (
                          <Link
                            key={page}
                            href={`/explore/${currentCategory}?page=${page}${
                              searchQuery ? `&searchQuery=${searchQuery}` : ""
                            }`}
                            className={cn(
                              "flex items-center justify-center size-10 rounded-lg transition-colors duration-200",
                              isActive
                                ? "bg-violet-500 text-white"
                                : "border border-gray-200 hover:bg-gray-50 "
                            )}
                            aria-current={isActive ? "page" : undefined}
                            aria-label={`Go to page ${page}`}
                          >
                            {page}
                          </Link>
                        );
                      });
                    })()}
                  </div>

                  {/* Next Button */}
                  {pagination.hasNextPage && (
                    <Link
                      href={`/explore/${currentCategory}?page=${
                        pagination.nextPage
                      }${searchQuery ? `&searchQuery=${searchQuery}` : ""}`}
                      className="flex items-center justify-center h-10 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      rel="next"
                      aria-label="Go to next page"
                    >
                      Next
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  )}
                </nav>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {searchQuery
                  ? `No designs found for "${searchQuery}"`
                  : "No designs available in this category"}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ExplorePage;
