import Link from "next/link";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-900/40 via-slate-950 to-slate-950" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 sm:py-32">
          <div className="max-w-3xl">
            <p className="text-sky-400 font-semibold tracking-wide text-sm uppercase mb-4">
              15 – 17 March 2026
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
              TechVista <span className="text-sky-400">2026</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 font-medium mb-4">
              Innovate. Connect. Inspire.
            </p>
            <p className="text-lg text-slate-400 max-w-2xl mb-10 leading-relaxed">
              The premier college technology and cultural festival. Three days of
              keynotes, workshops, competitions, performances, and unforgettable
              connections.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-xl transition-colors"
              >
                Register Now
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/agenda"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl border border-white/20 transition-colors"
              >
                View Agenda
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick info */}
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-sky-50 text-sky-600">
                <Calendar size={22} />
              </div>
              <div>
                <p className="font-semibold text-slate-900">15–17 March 2026</p>
                <p className="text-sm text-slate-500">Three full days</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-amber-50 text-amber-600">
                <MapPin size={22} />
              </div>
              <div>
                <p className="font-semibold text-slate-900">University Campus</p>
                <p className="text-sm text-slate-500">Main Auditorium & Grounds</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600">
                <Users size={22} />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Open to All</p>
                <p className="text-sm text-slate-500">Students & professionals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Why TechVista?
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                TechVista brings together the brightest minds from across colleges
                for a carefully curated mix of technical talks, hands-on workshops,
                cultural performances, and networking. Whether you are a developer,
                designer, founder, or performer — there is a place for you.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sky-600 font-semibold hover:text-sky-700"
              >
                Learn more about the event
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Keynotes", value: "12+" },
                { label: "Workshops", value: "25+" },
                { label: "Speakers", value: "40+" },
                { label: "Expected Attendees", value: "2000+" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
                >
                  <p className="text-3xl font-bold text-sky-600">{item.value}</p>
                  <p className="text-sm text-slate-500 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-sky-500">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to be part of TechVista?
          </h2>
          <p className="text-sky-100 text-lg mb-8">
            Registration is open. Secure your spot and receive your digital ticket
            with QR code instantly.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-sky-600 font-bold rounded-xl hover:bg-sky-50 transition-colors"
          >
            Register Free
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
