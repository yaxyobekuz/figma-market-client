import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes
 */
export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};
  