"use server";

/**
 * Track view for a design (Server Action)
 * This runs on the server and proxies to the backend API
 * Only called after client-side bot detection passes
 */
export async function trackDesignView(designId) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${apiUrl}/designs/${designId}/view`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) return { success: false };

    const data = await response.json();
    return { success: data.success };
  } catch (error) {
    console.error("Error tracking view:", error);
    return { success: false };
  }
}

/**
 * Track URL click for a design (Server Action)
 * This runs on the server, hiding the API endpoint from client
 * Only called after client-side bot detection passes
 */
export async function trackDesignClick(designId) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${apiUrl}/designs/${designId}/click`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) return { success: false };

    const data = await response.json();
    return { success: data.success };
  } catch (error) {
    console.error("Error tracking URL click:", error);
    return { success: false };
  }
}

/**
 * Fetch related designs for a design (Server Action)
 * This runs on the server, hiding the API endpoint from client
 */
export async function fetchRelatedDesigns(designId, limit = 6) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(
      `${apiUrl}/designs/${designId}/related?limit=${limit}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) return { success: false, designs: [] };

    const data = await response.json();

    if (data.success) {
      return { success: true, designs: data.designs || [] };
    }

    return { success: false, designs: [] };
  } catch (error) {
    console.error("Error fetching related designs:", error);
    return { success: false, designs: [] };
  }
}
