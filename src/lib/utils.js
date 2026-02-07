import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes
 */
export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};

/**
 * Generate URL-friendly slug from title
 */
export const generateSlug = (title) => {
  if (!title) return "";
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

/**
 * Extract MongoDB ObjectId from URL param (first 24 hex characters)
 */
export const extractDesignId = (param) => {
  if (!param) return null;
  const match = param.match(/^([0-9a-fA-F]{24})/);
  return match ? match[1] : null;
};

/**
 * Generate design URL in {id}-{slug} format
 */
export const generateDesignUrl = (id, title) => {
  const slug = generateSlug(title);
  return slug ? `${id}-${slug}` : `${id}`;
};
