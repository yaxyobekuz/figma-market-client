"use client";

// Components
import DesignItem from "./DesignItem";

import { useState, useEffect } from "react";

// Server Action
import { fetchRelatedDesigns } from "@/app/actions/design.actions";

const INITIAL_LIMIT = 6;
const LOAD_MORE_LIMIT = 6;

const RelatedDesigns = ({ designId }) => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const loadRelatedDesigns = async () => {
      try {
        setLoading(true);
        const result = await fetchRelatedDesigns(designId, INITIAL_LIMIT + 1);

        if (result.success) {
          const fetchedDesigns = result.designs || [];
          // Check if there are more designs
          if (fetchedDesigns.length > INITIAL_LIMIT) {
            setDesigns(fetchedDesigns.slice(0, INITIAL_LIMIT));
            setHasMore(true);
          } else {
            setDesigns(fetchedDesigns);
            setHasMore(false);
          }
        }
      } catch (error) {
        console.error("Error loading related designs:", error);
        setDesigns([]);
      } finally {
        setLoading(false);
      }
    };

    if (designId) loadRelatedDesigns();
  }, [designId]);

  const handleShowMore = async () => {
    try {
      setLoadingMore(true);
      const currentCount = designs.length;
      const result = await fetchRelatedDesigns(
        designId,
        currentCount + LOAD_MORE_LIMIT + 1
      );

      if (result.success) {
        const fetchedDesigns = result.designs || [];
        // Check if there are more designs beyond what we're showing
        if (fetchedDesigns.length > currentCount + LOAD_MORE_LIMIT) {
          setDesigns(fetchedDesigns.slice(0, currentCount + LOAD_MORE_LIMIT));
          setHasMore(true);
        } else {
          setDesigns(fetchedDesigns);
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error("Error loading more designs:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <section className="pt-6 space-y-6 sm:pt-8">
        {/* Title */}
        <h2 className="flex items-center gap-2 text-xl font-semibold sm:text-2xl">
          Related Designs
        </h2>

        {/* Designs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[...Array(6)].map((_, index) => (
            <div key={index}>
              {/* Image */}
              <div className="w-full aspect-[4/3] bg-gray-200 rounded-3xl mb-3.5" />

              {/* Bottom */}
              <div className="flex items-center justify-between p-1.5 pt-1">
                <div className="h-5 bg-gray-200 rounded w-2/3" />
                <div className="h-5 bg-gray-200 rounded w-12" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // No related designs
  if (!designs || designs.length === 0) return null;

  return (
    <section className="pt-6 space-y-6 sm:pt-8">
      {/* Title */}
      <h2 className="flex items-center gap-2 text-xl font-semibold sm:text-2xl">
        Related Designs
      </h2>

      {/* Designs */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {designs.map((design) => (
          <DesignItem key={design._id} data={design} />
        ))}
      </ul>

      {/* Show More Button */}
      {hasMore && (
        <div className="flex justify-center pt-2">
          <button
            onClick={handleShowMore}
            disabled={loadingMore}
            className="flex items-center gap-3 h-11 bg-violet-500 text-white px-5 rounded-full transition-colors duration-200 hover:bg-violet-700 disabled:opacity-70 disabled:hover:bg-violet-500"
          >
            Show More Related Designs{loadingMore && "..."}
          </button>
        </div>
      )}
    </section>
  );
};

export default RelatedDesigns;
