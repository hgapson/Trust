import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import logoImage from "../../assets/Logo.png";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Jobs", href: "/jobs" },
  { name: "Get Involved", href: "/get-involved" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const scrollTimeout = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(false);

      if (scrollTimeout.current) {
        window.clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = window.setTimeout(() => {
        setShowHeader(true);
      }, 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        window.clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return (
    <header
      id="site-header"
      className="
        sticky top-0 z-50 w-full
        border-b border-slate-200
        bg-white
        transition-transform duration-200 ease-out
      "
      style={{
        transform: showHeader ? "translateY(0)" : "translateY(-100%)",
      }}
    >
      <div className="container mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logoImage}
            alt="Navigate Trust Waikato Logo"
            className="h-10 w-auto"
          />
          <div className="hidden sm:block leading-tight">
            <h1 className="text-lg font-semibold text-slate-900">
              Navigate Trust
            </h1>
            <p className="text-sm text-slate-500">Waikato</p>
          </div>
        </Link>

        {/* Navigation */}
        <NavLinks items={navItems} />
      </div>
    </header>
  );
}
