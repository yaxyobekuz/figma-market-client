import { getApiFullUrl } from ".";

/**
 * Fetch recent blogs from API (for homepage)
 */
const getRecentBlogs = async (limit = 6) => {
  try {
    const response = await fetch(
      getApiFullUrl(`/blogs/recent?limit=${limit}`),
      {
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch recent blogs: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) return data.blogs || [];

    throw new Error(data.message || "Failed to fetch blogs");
  } catch (error) {
    console.error("Error fetching recent blogs:", error);
    return [];
  }
};

/**
 * Fetch all blogs with pagination
 */
const getBlogs = async (page = 1, limit = 12, search = "") => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (search) {
      params.append("search", search);
    }

    const response = await fetch(getApiFullUrl(`/blogs?${params.toString()}`), {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      return {
        blogs: data.blogs || [],
        pagination: data.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalCount: 0,
          limit: 12,
          hasNextPage: false,
          hasPrevPage: false,
        },
      };
    }

    throw new Error(data.message || "Failed to fetch blogs");
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return {
      blogs: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        limit: 12,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }
};

/**
 * Fetch blog by ID from API
 */
const getBlogById = async (id) => {
  try {
    const response = await fetch(getApiFullUrl(`/blogs/${id}`), {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blog: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      return data.blog;
    }

    throw new Error(data.message || "Failed to fetch blog");
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
};

/**
 * Fetch blog by slug from API
 */
const getBlogBySlug = async (slug) => {
  try {
    const response = await fetch(getApiFullUrl(`/blogs/slug/${slug}`), {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blog: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      return data.blog;
    }

    throw new Error(data.message || "Failed to fetch blog");
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
};

/**
 * Fetch related blogs
 */
const getRelatedBlogs = async (id, limit = 4) => {
  try {
    const response = await fetch(
      getApiFullUrl(`/blogs/${id}/related?limit=${limit}`),
      {
        next: { revalidate: 60 },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch related blogs: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      return data.blogs || [];
    }

    throw new Error(data.message || "Failed to fetch related blogs");
  } catch (error) {
    console.error("Error fetching related blogs:", error);
    return [];
  }
};

/**
 * Track blog view
 */
const trackBlogView = async (id) => {
  try {
    await fetch(getApiFullUrl(`/blogs/${id}/view`), {
      method: "POST",
      cache: "no-store",
    });
  } catch (error) {
    console.error("Error tracking blog view:", error);
  }
};

export {
  getBlogs,
  getBlogById,
  getBlogBySlug,
  trackBlogView,
  getRecentBlogs,
  getRelatedBlogs,
};
