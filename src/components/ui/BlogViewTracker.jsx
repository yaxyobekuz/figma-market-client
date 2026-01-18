"use client";

// React
import { useEffect, useRef } from "react";

// API
import { trackBlogView } from "@/api/blog.api";

// Lib
import { isRealUser } from "@/lib/bot-detection";

const BlogViewTracker = ({ blogId }) => {
  const hasTracked = useRef(false);

  useEffect(() => {
    // Only track once per page load
    if (hasTracked.current) return;

    // Don't track bots
    if (!isRealUser()) return;

    // Track the view
    const trackView = async () => {
      try {
        await trackBlogView(blogId);
        hasTracked.current = true;
      } catch (error) {
        console.error("Failed to track blog view:", error);
      }
    };

    // Delay tracking slightly to ensure real user interaction
    const timer = setTimeout(trackView, 1000);

    return () => clearTimeout(timer);
  }, [blogId]);

  return null;
};

export default BlogViewTracker;
