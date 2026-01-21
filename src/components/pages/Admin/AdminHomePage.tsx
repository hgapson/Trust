import { Link } from "react-router-dom";

export default function AdminHomePage() {
  const cards = [
    { title: "Workshops", to: "/admin/workshops", desc: "Create/edit workshops and schedules." },
    { title: "Registrations", to: "/admin/workshop-registrations", desc: "View and manage workshop registrations." },
    { title: "Volunteer Opportunities", to: "/admin/volunteers", desc: "Manage volunteering content shown on the site." },
    { title: "Partners & Funders", to: "/admin/partners", desc: "Update partner/funder logos and ordering." },
  ];

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white shadow-2xl">
        <p className="mt-2 text-slate-300">
          Choose a section to manage website content and registrations.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-xl transition hover:bg-white/10"
          >
            <div className="text-xl font-semibold">{c.title}</div>
            <div className="mt-2 text-sm text-slate-300">{c.desc}</div>
            <div className="mt-4 text-sm font-medium text-teal-200">Open →</div>
          </Link>
        ))}
      </div>
    </section>
  );
}