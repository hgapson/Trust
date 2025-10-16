import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import logoImage from "../assets/0f9c1b089996acdc17849f2c9c3234b78a2ea0a1.png";

export function Header() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Get Involved", href: "/get-involved" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b glass-effect supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <img
            src={logoImage}
            alt="Waikato Navigate Trust Logo"
            className="h-10 w-auto"
          />
          <div className="hidden sm:block">
            <h1 className="text-lg">Navigate Trust</h1>
            <p className="text-sm text-muted-foreground">Waikato</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="transition-colors hover:text-primary"
            >
              {item.name}
            </a>
          ))}
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-300">
            Get Help Now
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col space-y-4 mt-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-2 py-1 transition-colors hover:text-primary"
                >
                  {item.name}
                </a>
              ))}
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-300 mt-4">
                Get Help Now
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
