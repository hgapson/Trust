import { Outlet, Link } from "react-router-dom";
import useScrollToTop from "../../UseScrollToTop";

export default function AdminLayout() {
  useScrollToTop();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-4">
          <div className="text-lg font-semibold text-slate-900">Admin</div>
          <Link
            to="/"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Back to site
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-screen-xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
