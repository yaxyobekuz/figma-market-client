"use server";

/**
 * Track URL click for a design (Server Action)
 * This runs on the server, hiding the API endpoint from client
 */
export async function trackDesignClick(designId) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${apiUrl}/designs/${designId}/click`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return { success: false };
    }

    const data = await response.json();
    return { success: data.success };
  } catch (error) {
    console.error("Error tracking URL click:", error);
    return { success: false };
  }
}
