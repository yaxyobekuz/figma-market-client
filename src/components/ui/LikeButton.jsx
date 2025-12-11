"use client";

// React
import { cn } from "@/lib/utils";

// Icons
import { Heart } from "lucide-react";

// Context
import { useSavedDesigns } from "@/context/SavedDesignsContext";

const LikeButton = ({ design, className, size = 20 }) => {
  const { isDesignSaved, toggleSaveDesign } = useSavedDesigns();

  if (!design || !design._id) return null;

  const isSaved = isDesignSaved(design._id);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaveDesign(design);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={isSaved ? "Remove from saved" : "Save design"}
      className={cn(
        "bg-white p-2.5 rounded-full transition-colors",
        isSaved
          ? "text-violet-500 hover:text-violet-600"
          : "text-gray-600 hover:text-violet-500",
        className
      )}
    >
      <Heart
        size={size}
        strokeWidth={1.5}
        fill={isSaved ? "currentColor" : "none"}
      />
    </button>
  );
};

export default LikeButton;
