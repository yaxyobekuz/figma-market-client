"use client";

import { useEffect, useRef } from "react";
import {
  isRealUser,
  markAsViewed,
  hasViewedInSession,
} from "@/lib/bot-detection";

/**
 * ViewTracker Component
 *
 * Intelligently tracks design views only for real users (not bots).
 * Uses multiple detection strategies to filter out crawlers and fake traffic.
 *
 * Features:
 * - Bot detection (user-agent, browser features, headless detection)
 * - User interaction validation (waits for real user activity)
 * - Session-based deduplication (prevents multiple counts from refreshes)
 * - No duplicate tracking per session
 */
const ViewTracker = ({ designId }) => {
  const tracked = useRef(false);

  useEffect(() => {
    // Only track once per component mount
    if (tracked.current) return;

    // Don't track if already viewed in this session
    if (hasViewedInSession(designId)) return;

    const trackView = async () => {
      try {
        // Wait and check if this is a real user
        const isReal = await isRealUser();

        if (!isReal) {
          console.log("[ViewTracker] Bot detected, skipping view tracking");
          return;
        }

        // Mark as tracked to prevent duplicates
        tracked.current = true;

        // Track the view via API
        const response = await fetch(`/api/track-view/${designId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        // Mark as viewed in session to prevent duplicate tracking
        if (response.ok) {
          markAsViewed(designId);
          console.log("[ViewTracker] View tracked successfully");
        }
      } catch (error) {
        console.error("[ViewTracker] Error tracking view:", error);
      }
    };

    // Start tracking process
    trackView();
  }, [designId]);

  // This component doesn't render anything
  return null;
};

export default ViewTracker;
