export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-bold text-slate-900 mb-6">About TechVista 2026</h1>
      <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">
        <p className="text-lg">
          TechVista is the flagship annual technology and cultural festival of our
          university. Now in its 8th edition, it has grown into one of the most
          anticipated student-run events in the region.
        </p>
        <p>
          Over three days we host keynote sessions by industry leaders, hands-on
          workshops, coding competitions, startup pitch battles, cultural
          performances, art exhibitions, and late-night networking.
        </p>
        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Our Vision</h2>
        <p>
          To create a space where curiosity meets craftsmanship — where students
          can learn from the best, showcase their work, and form lasting
          connections that go beyond campus.
        </p>
        <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Who Should Attend</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Students from any college (technical & non-technical)</li>
          <li>Young professionals and early-stage founders</li>
          <li>Designers, developers, and makers</li>
          <li>Artists, performers, and cultural enthusiasts</li>
          <li>Anyone who loves learning and good conversations</li>
        </ul>
      </div>
    </div>
  );
}
