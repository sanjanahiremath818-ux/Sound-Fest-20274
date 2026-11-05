import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

/**
 * One-time setup endpoint.
 * Call once after first deploy: POST /api/setup with header x-setup-secret
 * or query ?secret=YOUR_AUTH_SECRET
 *
 * This creates the admin user and sample event if they don't exist.
 */
export async function POST(req: NextRequest) {
  const secret =
    req.headers.get("x-setup-secret") ||
    req.nextUrl.searchParams.get("secret") ||
    "";

  if (!secret || secret !== process.env.AUTH_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Ensure admin exists
    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin@12345";
    const hashed = await bcrypt.hash(adminPassword, 12);

    const admin = await prisma.user.upsert({
      where: { email: adminEmail },
      update: {},
      create: {
        email: adminEmail,
        password: hashed,
        name: "Super Admin",
        role: "ADMIN",
      },
    });

    // Ensure event exists
    let event = await prisma.event.findFirst();
    if (!event) {
      event = await prisma.event.create({
        data: {
          name: "TechVista 2026",
          tagline: "Innovate. Connect. Inspire.",
          description:
            "TechVista 2026 is the premier college technology and cultural festival.",
          category: "College Festival",
          startDate: new Date("2026-03-15T09:00:00"),
          endDate: new Date("2026-03-17T18:00:00"),
          venue: "Main Auditorium & Campus Grounds",
          address: "University Campus, Innovation Road, Tech City",
          organizer: "Student Technical Committee",
          contactEmail: "techvista@college.edu",
          contactPhone: "+91 98765 43210",
          primaryColor: "#0ea5e9",
          secondaryColor: "#f59e0b",
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Setup complete",
      admin: admin.email,
      event: event.name,
    });
  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json(
      { error: "Setup failed", details: String(error) },
      { status: 500 }
    );
  }
}
