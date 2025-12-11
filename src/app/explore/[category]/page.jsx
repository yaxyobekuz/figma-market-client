// Next.js
import Link from "next/link";

// Utils
import { cn } from "@/lib/utils";

// Data
import categories from "@/data/categories.data";

// Components
import DesignItem from "@/components/ui/DesignItem";
import Breadcrumb from "@/components/ui/Breadcrumb";

// API
import { getDesignsByCategory } from "@/api/design.api";

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
    currentPage
  );

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/explore/all" },
    currentCategory !== "all" && {
      label: currentCategoryName,
      href: `/explore/${currentCategory}`,
    },
  ];

  return (
    <>
      {/* Categories list */}
      <div className="bg-gray-50">
        <ul className="flex gap-1 container">
          {categories.map((category) => {
            const isActive = currentCategory === category.slug;

            const href =
              category.href +
              (searchQuery ? `?searchQuery=${searchQuery}` : "");

            return (
              <li key={category.slug}>
                <Link
                  href={href}
                  className={cn(
                    "inline-block px-3 transition-colors duration-200",
                    isActive ? "text-violet-500" : "hover:text-violet-500"
                  )}
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
      </div>

      {/* Designs Section */}
      <div className="py-12">
        <div className="container space-y-12">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems.filter(Boolean)} />

          {/* Title */}
          <h1 className="text-3xl font-medium">
            <span>Free</span>
            {currentCategoryName !== "All" && (
              <span className="text-violet-500"> {currentCategoryName} </span>
            )}
            <span> Figma Designs</span>
          </h1>

          {/* Designs Grid */}
          {designs.length > 0 ? (
            <div className="space-y-12">
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {designs.map((design) => (
                  <DesignItem key={design._id} data={design} />
                ))}
              </ul>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  {/* Previous Button */}
                  {currentPage > 1 && (
                    <Link
                      href={`/explore/${currentCategory}?page=${
                        currentPage - 1
                      }${searchQuery ? `&searchQuery=${searchQuery}` : ""}`}
                      className="flex items-center justify-center h-10 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Previous
                    </Link>
                  )}

                  {/* Page Numbers */}
                  <div className="flex items-center gap-2">
                    {Array.from(
                      { length: pagination.pages },
                      (_, i) => i + 1
                    ).map((pageNum) => {
                      const isActive = pageNum === currentPage;

                      // Show first, last, current, and surrounding pages
                      if (
                        pageNum === 1 ||
                        pageNum === pagination.pages ||
                        (pageNum >= currentPage - 1 &&
                          pageNum <= currentPage + 1)
                      ) {
                        return (
                          <Link
                            key={pageNum}
                            href={`/explore/${currentCategory}?page=${pageNum}${
                              searchQuery ? `&searchQuery=${searchQuery}` : ""
                            }`}
                            className={cn(
                              "flex items-center justify-center size-10 rounded-lg transition-colors",
                              isActive
                                ? "bg-violet-500 text-white"
                                : "border border-gray-200 hover:bg-gray-50"
                            )}
                          >
                            {pageNum}
                          </Link>
                        );
                      } else if (
                        pageNum === currentPage - 2 ||
                        pageNum === currentPage + 2
                      ) {
                        return (
                          <span key={pageNum} className="px-2">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>

                  {/* Next Button */}
                  {currentPage < pagination.pages && (
                    <Link
                      href={`/explore/${currentCategory}?page=${
                        currentPage + 1
                      }${searchQuery ? `&searchQuery=${searchQuery}` : ""}`}
                      className="flex items-center justify-center h-10 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Next
                    </Link>
                  )}
                </div>
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
      </div>
    </>
  );
};

export default ExplorePage;
