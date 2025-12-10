import { API_URL } from "@/lib/constants";

/**
 * Get full image URL
 */
const getApiImageUrl = (path) => {
  if (!path) return null;
  // Remove leading slash if present
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${API_URL.slice(0, -4)}/${cleanPath}`;
};

/**
 * Get full API URL
 */
const getApiFullUrl = (path) => {
  if (!path) return null;
  return `${API_URL}/${path.startsWith("/") ? path.slice(1) : path}`;
};

export { getApiImageUrl, getApiFullUrl };
