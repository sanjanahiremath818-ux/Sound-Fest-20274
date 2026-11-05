import { prisma } from "./prisma";

export async function getEvent() {
  const event = await prisma.event.findFirst({
    orderBy: { createdAt: "desc" },
  });
  return event;
}

export const DEFAULT_EVENT = {
  name: "TechVista 2026",
  tagline: "Innovate. Connect. Inspire.",
  description:
    "TechVista 2026 is the premier college technology and cultural festival bringing together students, innovators, speakers, and industry leaders for three days of learning, competition, and celebration.",
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
};
