import { getApiFullUrl } from ".";

/**
 * Fetch popular designs from API
 */
const getPopularDesigns = async (limit = 39) => {
  try {
    const response = await fetch(
      getApiFullUrl(`/designs/popular?limit=${limit}`),
      {
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch popular designs: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      return data.designs;
    }

    throw new Error(data.message || "Failed to fetch designs");
  } catch (error) {
    console.error("Error fetching popular designs:", error);
    return [];
  }
};

/**
 * Fetch design by ID from API
 */
const getDesignById = async (id) => {
  try {
    const response = await fetch(getApiFullUrl(`/designs/${id}`), {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch design: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      return data.design;
    }

    throw new Error(data.message || "Failed to fetch design");
  } catch (error) {
    console.error("Error fetching design:", error);
    return null;
  }
};

/**
 * Fetch designs by category from API
 */
const getDesignsByCategory = async (
  category,
  searchQuery = "",
  page = 1,
  limit = 12
) => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (category && category !== "all") {
      params.append("category", category);
    }

    if (searchQuery) {
      params.append("search", searchQuery);
    }

    const response = await fetch(
      getApiFullUrl(`/designs?${params.toString()}`)
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch designs: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      return {
        designs: data.designs || [],
        pagination: data.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalCount: 0,
          limit: 12,
          hasNextPage: false,
          hasPrevPage: false,
          nextPage: null,
          prevPage: null,
        },
      };
    }

    throw new Error(data.message || "Failed to fetch designs");
  } catch (error) {
    console.error("Error fetching designs:", error);
    return {
      designs: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        limit: 12,
        hasNextPage: false,
        hasPrevPage: false,
        nextPage: null,
        prevPage: null,
      },
    };
  }
};

export {
  getDesignById,
  getPopularDesigns,
  getDesignsByCategory,
};
