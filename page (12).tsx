import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import LogoutButton from "@/components/LogoutButton";

export default async function RegistrationsPage() {
  const session = await requireAdmin();
  if (!session) {
    redirect("/admin/login");
  }

  const registrations = await prisma.registration.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-sky-600 hover:text-sky-700 text-sm font-medium">
              ← Dashboard
            </Link>
            <span className="font-bold text-slate-900">All Registrations</span>
          </div>
          <LogoutButton />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">Name</th>
                  <th className="text-left px-4 py-3 font-medium">Email</th>
                  <th className="text-left px-4 py-3 font-medium">Phone</th>
                  <th className="text-left px-4 py-3 font-medium">Ticket #</th>
                  <th className="text-left px-4 py-3 font-medium">Type</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-left px-4 py-3 font-medium">Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {registrations.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">{r.fullName}</td>
                    <td className="px-4 py-3 text-slate-600">{r.email}</td>
                    <td className="px-4 py-3 text-slate-600">{r.phone || "—"}</td>
                    <td className="px-4 py-3 font-mono text-xs">{r.ticketNumber}</td>
                    <td className="px-4 py-3">{r.ticketType}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                          r.status === "CHECKED_IN"
                            ? "bg-emerald-100 text-emerald-700"
                            : r.status === "CANCELLED"
                            ? "bg-red-100 text-red-700"
                            : "bg-sky-100 text-sky-700"
                        }`}
                      >
                        {r.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {format(new Date(r.createdAt), "d MMM yyyy, HH:mm")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
