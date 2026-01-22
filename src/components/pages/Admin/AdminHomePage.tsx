import { Link } from "react-router-dom";

export default function AdminHomePage() {
  const cards = [
    { title: "Workshops", to: "/admin/workshops", desc: "Create/edit workshops and schedules." },
    { title: "Registrations", to: "/admin/workshop-registrations", desc: "View and manage workshop registrations." },
    { title: "Who We Serve", to: "/admin/audiences", desc: "Manage the audience cards on the home page." },
    { title: "Call To Action", to: "/admin/call-to-action", desc: "Update the CTA block shown on the home page." },
    { title: "Mission & Vision", to: "/admin/mission-vision", desc: "Update the mission and vision section on the About page." },
    { title: "Core Values", to: "/admin/values", desc: "Manage the core values cards on the About page." },
    { title: "Testimonials", to: "/admin/community-stories", desc: "Manage community impact stories (testimonials)." },
    { title: "Detailed Services", to: "/admin/detailed-services", desc: "Manage detailed services shown on the Services page." },
    { title: "Additional Services", to: "/admin/additional-services", desc: "Manage additional support services on the Services page." },
    { title: "Approach Steps", to: "/admin/approach-steps", desc: "Manage the approach steps shown on the home page." },
    { title: "Process Steps", to: "/admin/process-steps", desc: "Manage the process timeline shown on the Services page." },
    { title: "Volunteer Opportunities", to: "/admin/volunteers", desc: "Manage volunteering content shown on the site." },
    { title: "Partners & Funders", to: "/admin/partners", desc: "Update partner/funder logos and ordering." },
  ];

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
        <p className="mt-2 text-slate-300">
          Choose a section to manage website content.
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
