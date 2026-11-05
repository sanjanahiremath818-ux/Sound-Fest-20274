const days = [
  {
    day: "Day 1",
    date: "15 March 2026",
    sessions: [
      { time: "09:00 – 10:00", title: "Registration & Welcome Coffee", type: "General" },
      { time: "10:00 – 11:00", title: "Opening Keynote: The Future of AI", type: "Keynote" },
      { time: "11:30 – 13:00", title: "Workshop: Building with Next.js", type: "Workshop" },
      { time: "14:00 – 15:30", title: "Panel: Startup Life After College", type: "Panel" },
      { time: "16:00 – 18:00", title: "Hackathon Kickoff", type: "Competition" },
    ],
  },
  {
    day: "Day 2",
    date: "16 March 2026",
    sessions: [
      { time: "09:30 – 10:30", title: "Keynote: Design Systems at Scale", type: "Keynote" },
      { time: "11:00 – 12:30", title: "Workshop: Prompt Engineering", type: "Workshop" },
      { time: "14:00 – 16:00", title: "Pitch Battle Finals", type: "Competition" },
      { time: "17:00 – 19:00", title: "Cultural Evening & Performances", type: "Cultural" },
    ],
  },
  {
    day: "Day 3",
    date: "17 March 2026",
    sessions: [
      { time: "10:00 – 11:00", title: "Closing Keynote", type: "Keynote" },
      { time: "11:30 – 13:00", title: "Award Ceremony", type: "Ceremony" },
      { time: "14:00 – 16:00", title: "Networking Fair & Stalls", type: "Networking" },
      { time: "16:30 – 17:30", title: "Closing Notes & Group Photo", type: "General" },
    ],
  },
];

const typeColors: Record<string, string> = {
  Keynote: "bg-sky-100 text-sky-700",
  Workshop: "bg-amber-100 text-amber-700",
  Panel: "bg-violet-100 text-violet-700",
  Competition: "bg-rose-100 text-rose-700",
  Cultural: "bg-emerald-100 text-emerald-700",
  Ceremony: "bg-indigo-100 text-indigo-700",
  Networking: "bg-teal-100 text-teal-700",
  General: "bg-slate-100 text-slate-700",
};

export default function AgendaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-bold text-slate-900 mb-2">Event Agenda</h1>
      <p className="text-slate-500 mb-12">Full schedule for TechVista 2026</p>

      <div className="space-y-12">
        {days.map((day) => (
          <div key={day.day}>
            <div className="flex items-baseline gap-3 mb-6">
              <h2 className="text-2xl font-bold text-slate-900">{day.day}</h2>
              <span className="text-slate-500">{day.date}</span>
            </div>
            <div className="space-y-3">
              {day.sessions.map((session, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-4 bg-white border border-slate-200 rounded-xl"
                >
                  <div className="text-sm font-medium text-slate-500 w-36 shrink-0">
                    {session.time}
                  </div>
                  <div className="flex-1 font-semibold text-slate-900">
                    {session.title}
                  </div>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      typeColors[session.type] || typeColors.General
                    }`}
                  >
                    {session.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
