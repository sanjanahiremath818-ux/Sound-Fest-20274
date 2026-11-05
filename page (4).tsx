const speakers = [
  {
    name: "Aisha Rahman",
    role: "Head of AI, Nova Labs",
    topic: "The Future of Applied AI",
    bio: "Leading applied AI research and product teams for the last decade.",
  },
  {
    name: "Rohan Mehta",
    role: "Founder, PixelCraft",
    topic: "Design Systems that Scale",
    bio: "Built design systems used by millions of users across startups and enterprises.",
  },
  {
    name: "Priya Nair",
    role: "Engineering Manager, CloudScale",
    topic: "Building Reliable Systems",
    bio: "Specializes in distributed systems and developer experience.",
  },
  {
    name: "Dev Patel",
    role: "Creator & Educator",
    topic: "From Side Project to Startup",
    bio: "Helps students turn ideas into shipped products and sustainable businesses.",
  },
  {
    name: "Sana Khan",
    role: "Product Designer, Formly",
    topic: "Crafting Delightful Interfaces",
    bio: "Obsessed with accessibility and thoughtful interaction design.",
  },
  {
    name: "Arjun Singh",
    role: "Security Researcher",
    topic: "Practical Cybersecurity",
    bio: "Breaks things so others can build safer systems.",
  },
];

export default function SpeakersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-bold text-slate-900 mb-2">Speakers</h1>
      <p className="text-slate-500 mb-12">
        Meet the industry leaders and educators joining us at TechVista 2026.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {speakers.map((speaker) => (
          <div
            key={speaker.name}
            className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white text-xl font-bold mb-4">
              {speaker.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <h3 className="text-lg font-bold text-slate-900">{speaker.name}</h3>
            <p className="text-sm text-sky-600 font-medium mb-2">{speaker.role}</p>
            <p className="text-sm font-semibold text-slate-700 mb-2">
              {speaker.topic}
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">{speaker.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
