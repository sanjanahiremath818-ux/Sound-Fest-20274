import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white font-bold">
                T
              </div>
              <span className="font-bold text-white text-lg">TechVista 2026</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              The premier college technology and cultural festival. Innovate. Connect. Inspire.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-sky-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/agenda" className="hover:text-sky-400 transition-colors">
                  Agenda
                </Link>
              </li>
              <li>
                <Link href="/speakers" className="hover:text-sky-400 transition-colors">
                  Speakers
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-sky-400 transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>techvista@college.edu</li>
              <li>+91 98765 43210</li>
              <li>University Campus, Tech City</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 text-center text-sm text-slate-500">
          © 2026 TechVista. Built for student events.
        </div>
      </div>
    </footer>
  );
}
