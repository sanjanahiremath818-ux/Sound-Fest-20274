export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-bold text-slate-900 mb-2">Contact Us</h1>
      <p className="text-slate-500 mb-10">
        Have questions about TechVista 2026? Reach out to the organizing team.
      </p>

      <div className="grid sm:grid-cols-2 gap-8">
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-3">General Enquiries</h3>
          <p className="text-slate-600 text-sm mb-1">Email</p>
          <p className="font-medium text-sky-600 mb-4">techvista@college.edu</p>
          <p className="text-slate-600 text-sm mb-1">Phone</p>
          <p className="font-medium">+91 98765 43210</p>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
          <h3 className="font-semibold text-slate-900 mb-3">Venue</h3>
          <p className="text-slate-600 leading-relaxed">
            Main Auditorium & Campus Grounds
            <br />
            University Campus
            <br />
            Innovation Road, Tech City
          </p>
        </div>
      </div>

      <div className="mt-12 p-6 bg-sky-50 rounded-2xl border border-sky-100">
        <h3 className="font-semibold text-slate-900 mb-2">Organizing Team</h3>
        <p className="text-slate-600 text-sm">
          Student Technical Committee · TechVista Core Team
        </p>
      </div>
    </div>
  );
}
