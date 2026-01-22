import { useEffect, useLayoutEffect, useState } from "react";
import { Mail, Menu, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useContactMethodLinks } from "../pages/contact/contactMethods";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type NavItem = { name: string; href: string };

interface NavLinksProps {
  items: NavItem[];
}

export default function NavLinks({ items }: NavLinksProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [menuTop, setMenuTop] = useState(80); // fallback
  const { phoneHref, emailHref } = useContactMethodLinks();
  const hasContact = Boolean(phoneHref || emailHref);

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
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-center font-semibold text-white shadow-md transition hover:from-blue-700 hover:to-purple-700"
                    disabled={!hasContact}
                  >
                    Get Help Now
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="center"
                  sideOffset={8}
                  className="w-72 space-y-3 rounded-xl border border-slate-200 bg-white shadow-2xl"
                >
                  <p className="text-sm font-semibold text-slate-700">
                    Choose how you want to reach us
                  </p>
                  <div className="flex flex-col gap-2">
                    {phoneHref ? (
                      <a
                        href={phoneHref}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-slate-900 transition hover:-translate-y-[1px] hover:border-blue-200 hover:bg-blue-50 hover:shadow-sm"
                      >
                        <span className="flex items-center gap-2 font-semibold">
                          <Phone className="h-4 w-4 text-blue-600" />
                          Call us
                        </span>
                      </a>
                    ) : (
                      <span className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-slate-400">
                        <span className="flex items-center gap-2 font-semibold">
                          <Phone className="h-4 w-4 text-blue-300" />
                          Call us
                        </span>
                      </span>
                    )}

                    {emailHref ? (
                      <a
                        href={emailHref}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-slate-900 transition hover:-translate-y-[1px] hover:border-purple-200 hover:bg-purple-50 hover:shadow-sm"
                      >
                        <span className="flex items-center gap-2 font-semibold">
                          <Mail className="h-4 w-4 text-purple-600" />
                          Email us
                        </span>
                      </a>
                    ) : (
                      <span className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-slate-400">
                        <span className="flex items-center gap-2 font-semibold">
                          <Mail className="h-4 w-4 text-purple-300" />
                          Email us
                        </span>
                      </span>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
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

          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 font-semibold text-white shadow-md transition hover:from-blue-700 hover:to-purple-700"
                disabled={!hasContact}
              >
                Get Help Now
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              sideOffset={8}
              className="w-72 space-y-3 rounded-xl border border-slate-200 bg-white shadow-2xl"
            >
              <p className="text-sm font-semibold text-slate-700">
                Choose how you want to reach us
              </p>
              <div className="flex flex-col gap-2">
                {phoneHref ? (
                  <a
                    href={phoneHref}
                    className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-slate-900 transition hover:-translate-y-[1px] hover:border-blue-200 hover:bg-blue-50 hover:shadow-sm"
                  >
                    <span className="flex items-center gap-2 font-semibold">
                      <Phone className="h-4 w-4 text-blue-600" />
                      Call us
                    </span>
                  </a>
                ) : (
                  <span className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-slate-400">
                    <span className="flex items-center gap-2 font-semibold">
                      <Phone className="h-4 w-4 text-blue-300" />
                      Call us
                    </span>
                  </span>
                )}

                {emailHref ? (
                  <a
                    href={emailHref}
                    className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-slate-900 transition hover:-translate-y-[1px] hover:border-purple-200 hover:bg-purple-50 hover:shadow-sm"
                  >
                    <span className="flex items-center gap-2 font-semibold">
                      <Mail className="h-4 w-4 text-purple-600" />
                      Email us
                    </span>
                  </a>
                ) : (
                  <span className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-slate-400">
                    <span className="flex items-center gap-2 font-semibold">
                      <Mail className="h-4 w-4 text-purple-300" />
                      Email us
                    </span>
                  </span>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </nav>
  );
}
