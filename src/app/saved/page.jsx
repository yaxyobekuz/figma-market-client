"use client";

// Icons
import { Heart } from "lucide-react";

// Components
import DesignItem from "@/components/ui/DesignItem";
import Breadcrumb from "@/components/ui/Breadcrumb";

// Context
import { useSavedDesigns } from "@/context/SavedDesignsContext";

const Saved = () => {
  const { savedDesigns, isLoaded } = useSavedDesigns();

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Saved Designs", href: "/saved" },
  ];

  return (
    <section className="py-12" aria-labelledby="saved-heading">
      <div className="container space-y-12">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Title */}
        <h1 id="saved-heading" className="text-3xl font-medium">
          Saved Designs
        </h1>

        {/* Content */}
        {!isLoaded ? (
          <div
            aria-label="Loading saved designs"
            className="flex items-center justify-center py-20"
          >
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500"></div>
          </div>
        ) : savedDesigns.length > 0 ? (
          <ul
            role="list"
            aria-label="Saved designs list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {savedDesigns.map((design) => (
              <DesignItem key={design._id} data={design} />
            ))}
          </ul>
        ) : (
          <div
            role="status"
            className="flex flex-col items-center justify-center py-20 text-gray-500"
          >
            <Heart
              size={48}
              strokeWidth={1.5}
              className="mb-4"
              aria-hidden="true"
            />
            <p className="text-lg">No saved designs yet</p>
            <p className="text-sm">Designs you save will appear here</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Saved;
