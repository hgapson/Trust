import { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

type NavItem = { name: string; href: string };

interface NavLinksProps {
  items: NavItem[];
}

export default function NavLinks({ items }: NavLinksProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [menuTop, setMenuTop] = useState(80); // fallback

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const calculateTop = () => {
    const header = document.getElementById("site-header");
    if (!header) return;

    const rect = header.getBoundingClientRect();
    // rect.bottom = height of sticky header in viewport
    const top = Math.round(rect.bottom) + 12; // +12px gap under header
    setMenuTop(top);
  };

  useLayoutEffect(() => {
    calculateTop();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);

      calculateTop();

      if (desktop) setIsMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // if menu opens, re-measure (header could wrap on small screens)
    if (isMenuOpen) calculateTop();
  }, [isMenuOpen]);

  return (
    <nav className="relative flex items-center">
      {/* Mobile Toggle */}
      {!isDesktop && (
        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex items-center justify-center rounded-md border border-white/20 p-2 text-gray-900 shadow-sm transition hover:bg-white/60 md:hidden"
          aria-label="Toggle navigation"
        >
          <Menu className="h-5 w-5" />
        </button>
      )}

      {/* Mobile Dropdown */}
      {!isDesktop && isMenuOpen && (
        <div
          style={{ top: menuTop }}
          className="
            fixed left-4 right-4
            z-[9999]
            max-h-[calc(100vh-140px)]
            overflow-auto
            rounded-2xl border border-slate-200 bg-white
            p-4 pb-6 shadow-2xl
          "
        >
          <ul className="flex flex-col space-y-2 text-base">
            {items.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 font-medium text-slate-800 transition hover:bg-slate-100"
                >
                  {item.name}
                </Link>
              </li>
            ))}

            <li className="pt-2">
              <Link
                to="/contact#contact-form"
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-center font-semibold text-white shadow-md transition hover:from-blue-700 hover:to-purple-700"
              >
                Get Help Now
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Desktop Menu */}
      {isDesktop && (
        <div className="ml-auto hidden items-center gap-6 md:flex">
          {items.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="font-medium text-slate-800 transition hover:text-blue-700"
            >
              {item.name}
            </Link>
          ))}

          <Link
            to="/contact#contact-form"
            className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 font-semibold text-white shadow-md transition hover:from-blue-700 hover:to-purple-700"
          >
            Get Help Now
          </Link>
        </div>
      )}
    </nav>
  );
}