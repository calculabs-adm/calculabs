import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    // Check for secret key in header or query param
    const authHeader = request.headers.get("x-seed-key");
    const { searchParams } = new URL(request.url);
    const queryKey = searchParams.get("key");
    const secretKey = process.env.SEED_SECRET_KEY || "calculabs-seed-2024";

    if (authHeader !== secretKey && queryKey !== secretKey) {
      return NextResponse.json(
        { error: "Unauthorized. Invalid or missing seed key." },
        { status: 401 }
      );
    }

    // Run the seed script using bun
    const { stdout, stderr } = await execAsync("bun src/db/seed.ts", {
      cwd: process.cwd(),
      timeout: 60000, // 60 seconds timeout
    });

    if (stderr && !stderr.includes("Already up to date")) {
      console.error("Seed stderr:", stderr);
    }

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
      output: stdout,
      errors: stderr || null,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to seed database",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "Seed API endpoint",
    usage: "Send a POST request with x-seed-key header or ?key= parameter",
    example: "POST /api/seed?key=your-secret-key",
    note: "The secret key can be set via SEED_SECRET_KEY environment variable",
  });
}
