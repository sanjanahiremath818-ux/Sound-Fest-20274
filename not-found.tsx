import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-slate-300 mb-4">404</h1>
        <p className="text-xl text-slate-600 mb-6">Page not found</p>
        <Link
          href="/"
          className="inline-flex px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
