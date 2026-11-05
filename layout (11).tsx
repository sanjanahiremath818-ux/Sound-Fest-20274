import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TechVista 2026 | College Tech & Cultural Festival",
  description: "Innovate. Connect. Inspire. Join the premier college festival.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
