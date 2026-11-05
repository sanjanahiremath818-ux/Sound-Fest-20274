import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import LogoutButton from "@/components/LogoutButton";

export default async function AdminDashboard() {
  const session = await requireAdmin();
  if (!session) {
    redirect("/admin/login");
  }

  const [total, confirmed, checkedIn, cancelled, recent] = await Promise.all([
    prisma.registration.count(),
    prisma.registration.count({ where: { status: "CONFIRMED" } }),
    prisma.registration.count({ where: { status: "CHECKED_IN" } }),
    prisma.registration.count({ where: { status: "CANCELLED" } }),
    prisma.registration.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      include: { event: { select: { name: true } } },
    }),
  ]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white font-bold text-sm">
              T
            </div>
            <span className="font-bold text-slate-900">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500">{session.email}</span>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Overview</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-sm text-slate-500 mb-1">Total Registrations</p>
            <p className="text-3xl font-bold text-slate-900">{total}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-sm text-slate-500 mb-1">Confirmed</p>
            <p className="text-3xl font-bold text-sky-600">{confirmed}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-sm text-slate-500 mb-1">Checked In</p>
            <p className="text-3xl font-bold text-emerald-600">{checkedIn}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-sm text-slate-500 mb-1">Cancelled</p>
            <p className="text-3xl font-bold text-red-600">{cancelled}</p>
          </div>
        </div>

        {/* Recent registrations */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Recent Registrations</h2>
            <Link
              href="/admin/registrations"
              className="text-sm text-sky-600 hover:text-sky-700 font-medium"
            >
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="text-left px-6 py-3 font-medium">Name</th>
                  <th className="text-left px-6 py-3 font-medium">Email</th>
                  <th className="text-left px-6 py-3 font-medium">Ticket</th>
                  <th className="text-left px-6 py-3 font-medium">Type</th>
                  <th className="text-left px-6 py-3 font-medium">Status</th>
                  <th className="text-left px-6 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recent.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                      No registrations yet
                    </td>
                  </tr>
                ) : (
                  recent.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="px-6 py-3 font-medium text-slate-900">
                        {r.fullName}
                      </td>
                      <td className="px-6 py-3 text-slate-600">{r.email}</td>
                      <td className="px-6 py-3 font-mono text-xs">{r.ticketNumber}</td>
                      <td className="px-6 py-3">{r.ticketType}</td>
                      <td className="px-6 py-3">
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
                      <td className="px-6 py-3 text-slate-500">
                        {format(new Date(r.createdAt), "d MMM, HH:mm")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
