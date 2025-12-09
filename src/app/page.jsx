// Next
import Link from "next/link";

// Data
import categories from "@/data/categories.data";

// Components
import DesignItem from "@/components/ui/DesignItem";

// API
import { getPopularDesigns } from "@/api/design.api";

const Home = async () => {
  // Fetch popular designs
  const designs = await getPopularDesigns();

  return (
    <>
      {/* Categories Section */}
      <section className="py-8">
        <div className="container space-y-5">
          {/* Title */}
          <h2 className="text-2xl font-medium">Categories</h2>

          {/* Categories list*/}
          <ul className="flex gap-1">
            {categories.map((category) => (
              <li key={category.slug} className="w-full">
                <Link
                  href={category.href}
                  className="flex items-center justify-center gap-3.5 w-full h-12 bg-gray-50 rounded-xl transition-colors duration-200 hover:bg-gray-100"
                >
                  <category.icon
                    className="w-6 h-6"
                    strokeWidth={1.5}
                    color="#8b5cf6"
                  />
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Popular Designs Section */}
      <section className="py-8">
        <div className="container space-y-5">
          {/* Title */}
          <h2 className="text-2xl font-medium">Popular Designs</h2>

          {/* Popular designs list */}
          {designs.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {designs.map((design) => (
                <DesignItem key={design._id} {...design} />
              ))}
            </ul>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default Home;
