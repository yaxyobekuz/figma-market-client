"use client";

// Utils
import {
  markAsClicked,
  isLikelyRealUser,
  hasClickedInSession,
} from "@/lib/bot-detection";

// Icons
import { ExternalLink } from "lucide-react";

// Server Actions
import { trackDesignClick } from "@/app/actions/design.actions";

const ViewDesignButton = ({ design }) => {
  // Track the click in background (don't block navigation)
  const handleClick = async () => {
    const designId = design._id || design.id;

    // Check if already clicked in this session
    if (hasClickedInSession(designId)) {
      console.log(
        "[ViewDesignButton] Already clicked in this session, skipping tracking"
      );
      return;
    }

    // Quick bot check before tracking
    if (!isLikelyRealUser()) {
      console.log("[ViewDesignButton] Bot detected, skipping click tracking");
      return;
    }

    // Track the click
    trackDesignClick(designId);

    // Mark as clicked in session to prevent duplicate tracking
    markAsClicked(designId);
  };

  if (!design.url) return null;

  return (
    <a
      target="_blank"
      href={design.url}
      rel="noopener noreferrer"
      onClick={handleClick}
      className="flex items-center justify-center gap-2 w-full h-12 bg-violet-500 text-white rounded-xl hover:bg-violet-700 transition-colors duration-200"
      aria-label={`View ${design.title} on Figma`}
    >
      <ExternalLink size={20} strokeWidth={1.5} aria-hidden="true" />
      <span>View Design</span>
    </a>
  );
};

export default ViewDesignButton;
