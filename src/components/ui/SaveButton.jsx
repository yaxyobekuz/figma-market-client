"use client";

// Utils
import { cn } from "@/lib/utils";

// Icons
import { Heart } from "lucide-react";

// Context
import { useSavedDesigns } from "@/context/SavedDesignsContext";

const SaveButton = ({ design, className }) => {
  const { isDesignSaved, toggleSaveDesign } = useSavedDesigns();
  if (!design || !design._id) return null;

  const isSaved = isDesignSaved(design._id);
  const handleClick = () => toggleSaveDesign(design);

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex items-center justify-center gap-2 w-full h-12 border border-gray-200 rounded-xl transition-colors duration-200",
        isSaved
          ? "bg-violet-50 text-violet-600 border-violet-200 hover:bg-violet-100"
          : "text-gray-700 hover:bg-gray-50",
        className
      )}
    >
      <Heart size={20} strokeWidth={1.5} />
      <span>{isSaved ? "Design Saved" : "Save Design"}</span>
    </button>
  );
};

export default SaveButton;
