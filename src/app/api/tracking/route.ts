import { NextRequest, NextResponse } from "next/server";

/**
 * Internal tracking API endpoint
 * 
 * Receives events from the client-side trackEvent function
 * and logs them for internal analytics.
 * 
 * Request body:
 * {
 *   event: string,
 *   [key: string]: any,
 *   timestamp: number
 * }
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { event, timestamp, ...params } = body;
    
    // Validate required fields
    if (!event) {
      return NextResponse.json(
        { error: "Event name is required" },
        { status: 400 }
      );
    }
    
    // Log the event (in production, this would save to database)
    // For now, we just log to console and return success
    console.log("[TRACKING]", JSON.stringify({
      event,
      timestamp: timestamp ? new Date(timestamp).toISOString() : new Date().toISOString(),
      params,
    }));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[TRACKING] Error:", error);
    return NextResponse.json(
      { error: "Failed to process tracking event" },
      { status: 500 }
    );
  }
}
