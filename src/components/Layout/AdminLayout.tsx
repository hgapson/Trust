import { Outlet, Link } from "react-router-dom";
import useScrollToTop from "../../UseScrollToTop";

export default function AdminLayout() {
  useScrollToTop();

  return (
    <div className="relative min-h-screen">

      {/* ===== Background glow ===== */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.35),_transparent_60%)]" />

      {/* ===== Header ===== */}
      <header className="sticky top-0 z-40 border-b gradient-bg-values border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-4">

          {/* Brand */}
          <div className="flex items-center gap-4">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-500/20 text-teal-200 ring-1 ring-white/10 shadow-inner">
              <img
                src="/logo192.png"
                alt="Logo"
                className="h-7 w-7 object-contain"
              />
            </span>

            <div className="leading-tight">
              <div className="text-lg font-semibold tracking-tight">
                Admin Console
              </div>
              <div className="text-xs uppercase tracking-[0.25em] text-teal-200/70">
                Navigate Trust
              </div>
            </div>
          </div>

          {/* Back button */}
          <Link
            to="/"
            className="rounded-full border border-white/15 gradient-bg-values px-4 py-2 text-sm font-medium text-white/80 shadow-sm transition-all
                       hover:border-white/30 hover:bg-white/10 hover:text-white"
          >
            ← Back to site
          </Link>
        </div>
      </header>

      {/* ===== Main content ===== */}
      <main className="relative mx-auto gradient-bg-values max-w-screen-xl px-4 py-12">
        <div className="rounded-3xl bg-white/95 p-6 text-slate-900 shadow-[0_30px_80px_rgba(0,0,0,0.35)] md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}