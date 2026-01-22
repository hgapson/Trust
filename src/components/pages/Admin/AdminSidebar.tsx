import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  Users,
  HandHeart,
  Handshake,
  Layers,
  ListChecks,
  Mail,
  Globe,
  Shield,
  Quote,
} from "lucide-react";

type AdminNavItem = {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
};

const items: AdminNavItem[] = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard },

  // workshops
  { label: "Workshops", to: "/admin/workshops", icon: CalendarDays },
  { label: "Registrations", to: "/admin/workshop-registrations", icon: ClipboardList },
  { label: "Support Ways", to: "/admin/support-ways", icon: HandHeart },
  { label: "Who We Serve", to: "/admin/audiences", icon: Globe },
  { label: "Call To Action", to: "/admin/call-to-action", icon: Mail },
  { label: "Mission & Vision", to: "/admin/mission-vision", icon: Layers },
  { label: "Core Values", to: "/admin/values", icon: Shield },
  { label: "Testimonials", to: "/admin/community-stories", icon: Quote },
  { label: "Detailed Services", to: "/admin/detailed-services", icon: Layers },
  // content tables you already have / are building
  { label: "Team", to: "/admin/team", icon: Users },
  { label: "Volunteer Opportunities", to: "/admin/volunteers", icon: HandHeart },
  { label: "Partners & Funders", to: "/admin/partners", icon: Handshake },
  { label: "Services", to: "/admin/services", icon: Layers },
  { label: "Process Steps", to: "/admin/process-steps", icon: ListChecks },

  // contact tables (later)
  { label: "Contact Info", to: "/admin/contact", icon: Mail },
];

export function AdminSidebar() {
  return (
    <aside className="w-full max-w-[280px] p-4 text-slate-100">
      <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="text-xs uppercase tracking-[0.25em] text-teal-200/70">
        </div>
        <div className="mt-1 text-sm text-slate-300">
          Manage website content and registrations
        </div>
      </div>

      <nav className="space-y-1 gradient-bg-values">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
                  isActive
                    ? "bg-teal-500/15 text-teal-100 ring-1 ring-teal-400/30"
                    : "text-slate-200 hover:bg-slate-800/60 hover:text-slate-300"
                ].join(" ")
              }
              end={item.to === "/admin"}
            >
              <Icon className="h-4 w-4 opacity-90" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
