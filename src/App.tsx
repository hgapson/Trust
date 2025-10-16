import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/pages/HomePage";
import { AboutPage } from "./components/pages/AboutPage";
import { ServicesPage } from "./components/pages/ServicesPage";
import { GetInvolvedPage } from "./components/pages/GetInvolvedPage";
import { ContactPage } from "./components/pages/ContactPage";

function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle navigation
  useEffect(() => {
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href && link.origin === window.location.origin) {
        e.preventDefault();
        const newPath = new URL(link.href).pathname;
        window.history.pushState({}, '', newPath);
        setCurrentPath(newPath);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage />;
      case '/about':
        return <AboutPage />;
      case '/services':
        return <ServicesPage />;
      case '/get-involved':
        return <GetInvolvedPage />;
      case '/contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return renderPage();
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Router />
      </main>
      <Footer />
    </div>
  );
}