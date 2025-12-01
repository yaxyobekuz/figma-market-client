export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";
export const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || "";

export const ROUTES = {
  HOME: "/",
  EXPLORE: "/explore",
  CATEGORIES: "/categories",

  // Auth
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FORGOT_PASSWORD: "/auth/forgot-password",

  // Designs
  DESIGNS: "/designs",
  DESIGN_DETAIL: (slug) => `/designs/${slug}`,
  DESIGN_CREATE: "/designs/create",
  DESIGN_EDIT: (id) => `/designs/${id}/edit`,

  // User
  PROFILE: (username) => `/profile/${username}`,
  SETTINGS: "/settings",
  MY_DESIGNS: "/my-designs",
  MY_DOWNLOADS: "/my-downloads",
  MY_LIKES: "/my-likes",

  // Admin
  DASHBOARD: "/dashboard",
  ADMIN_DESIGNS: "/dashboard/designs",
  ADMIN_USERS: "/dashboard/users",
  ADMIN_CATEGORIES: "/dashboard/categories",
};

export const USER_ROLES = {
  USER: "user",
  ADMIN: "admin",
  OWNER: "owner",
};

export const DESIGN_SORT_OPTIONS = [
  { label: "Latest", value: "latest" },
  { label: "Popular", value: "popular" },
  { label: "Most Downloaded", value: "downloads" },
  { label: "Most Liked", value: "likes" },
];

export const ITEMS_PER_PAGE = {
  DESIGNS: 12,
  CATEGORIES: 20,
  USERS: 20,
  COMMENTS: 10,
};

export const FILE_UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ACCEPTED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  ACCEPTED_FIGMA_TYPES: [".fig", "application/octet-stream"],
};
