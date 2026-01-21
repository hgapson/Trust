import { Outlet, Link } from "react-router-dom";
import useScrollToTop from "../../UseScrollToTop";
import { AdminSidebar } from "../pages/Admin/AdminSidebar";

export default function AdminLayout() {
  useScrollToTop();

  return (
    <div className="min-h-screen  bg-slate-900">
      <div className="pointer-events-none fixed inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.28),_transparent_55%)]" />

      {/* Top bar */}
      <header className="relative z-10 border-b border-white/10 gradient-bg-values backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div>
              <div className="text-lg font-semibold">Navigate Trust</div>
              <div className="text-lg uppercase tracking-[0.2em] text-teal-200/70">
                Admin Console
              </div>
            </div>
          </div>

          <Link
            to="/"
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/85 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
          >
            Back to site
          </Link>
        </div>
      </header>

      {/* Sidebar + Content */}
      <div className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-1 gap-0 md:grid-cols-[280px_1fr]">
        <AdminSidebar />

        <main className="px-4 py-8 md:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}