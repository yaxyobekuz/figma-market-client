import { trackDesignView } from "@/app/actions/design.actions";
import { NextResponse } from "next/server";

/**
 * API Route: Track Design View
 * POST /api/track-view/[designId]
 * 
 * This endpoint is called by the ViewTracker component after bot detection.
 * It proxies the request to the backend server.
 */
export async function POST(request, { params }) {
  try {
    const { designId } = await params;
    
    if (!designId) {
      return NextResponse.json(
        { success: false, message: "Design ID is required" },
        { status: 400 }
      );
    }

    // Call the server action to track view
    const result = await trackDesignView(designId);

    if (result.success) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, message: "Failed to track view" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Error in track-view API route:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
