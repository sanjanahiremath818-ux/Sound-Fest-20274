import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateTicketNumber, generateQrToken } from "@/lib/utils";
import { sendRegistrationConfirmation } from "@/lib/email";
import { z } from "zod";
import { format } from "date-fns";

const schema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  organization: z.string().optional(),
  designation: z.string().optional(),
  city: z.string().optional(),
  ticketType: z.string().default("General"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Get the event
    const event = await prisma.event.findFirst({
      orderBy: { createdAt: "desc" },
    });

    if (!event) {
      return NextResponse.json(
        { error: "No event found. Please contact the organizer." },
        { status: 500 }
      );
    }

    // Prevent duplicate email for the same event
    const existing = await prisma.registration.findFirst({
      where: {
        email: data.email.toLowerCase(),
        eventId: event.id,
        status: { not: "CANCELLED" },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "You have already registered with this email." },
        { status: 409 }
      );
    }

    const ticketNumber = generateTicketNumber();
    const qrToken = generateQrToken();

    const registration = await prisma.registration.create({
      data: {
        fullName: data.fullName.trim(),
        email: data.email.toLowerCase().trim(),
        phone: data.phone?.trim() || null,
        organization: data.organization?.trim() || null,
        designation: data.designation?.trim() || null,
        city: data.city?.trim() || null,
        ticketType: data.ticketType,
        ticketNumber,
        qrToken,
        status: "CONFIRMED",
        eventId: event.id,
      },
    });

    // Send confirmation email (non-blocking)
    sendRegistrationConfirmation({
      to: registration.email,
      name: registration.fullName,
      ticketNumber: registration.ticketNumber,
      qrToken: registration.qrToken,
      eventName: event.name,
      eventDate: `${format(new Date(event.startDate), "d MMM")} – ${format(
        new Date(event.endDate),
        "d MMM yyyy"
      )}`,
      venue: event.venue || "TBA",
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      ticketNumber: registration.ticketNumber,
      qrToken: registration.qrToken,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}
