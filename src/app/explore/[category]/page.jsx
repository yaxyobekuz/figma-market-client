// Next.js
import Link from "next/link";

// Utils
import { cn } from "@/lib/utils";

// Data
import categories from "@/data/categories.data";

// Components
import DesignItem from "@/components/ui/DesignItem";

const ExplorePage = async ({ params, searchParams }) => {
  const { searchQuery } = await searchParams;
  const { category: currentCategory } = await params;
  const currentCategoryName =
    categories.find((cat) => cat.slug === currentCategory)?.name || "All";

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
          {/* Title */}
          <h1 className="text-3xl font-medium">
            <span>Free</span>
            {currentCategoryName !== "All" && (
              <span className="text-violet-500"> {currentCategoryName} </span>
            )}
            <span> Figma Designs</span>
          </h1>

          {/* Designs Grid */}
          <div className="space-y-12">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 12 }).map((_, index) => (
                <DesignItem key={index} />
              ))}
            </ul>

            {/* Load More Button */}
            <div className="flex justify-center">
              <button className="flex items-center h-11 px-10 bg-violet-500 text-white rounded-full transition-colors duration-200 hover:bg-violet-700">
                Load More
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExplorePage;
