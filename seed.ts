import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin@12345";
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: "Super Admin",
      role: "ADMIN",
    },
  });
  console.log("Admin user created:", admin.email);

  // Create sample event
  const existingEvent = await prisma.event.findFirst();
  if (!existingEvent) {
    const event = await prisma.event.create({
      data: {
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
      },
    });
    console.log("Sample event created:", event.name);
  }

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
