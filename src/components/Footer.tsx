import { Facebook, Linkedin, Mail } from "lucide-react";
import logoImage from "../assets/0f9c1b089996acdc17849f2c9c3234b78a2ea0a1.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 py-12">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src={logoImage}
                alt="Waikato Navigate Trust Logo"
                className="h-8 w-auto"
              />
              <div>
                <h3 className="text-white">Navigate Trust</h3>
                <p className="text-sm text-gray-300">Waikato</p>
              </div>
            </div>
            <p className="text-sm text-gray-300">
              Empowering migrants and former refugees to achieve workplace success and contribute to their communities.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors duration-300" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors duration-300" />
              <a
                href="mailto:waikato.navtrust@outlook.com"
                aria-label="Email Waikato Navigate Trust"
              >
                <Mail className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors duration-300" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-white">Services</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Career Preparation</a></li>
              <li><a href="#" className="hover:text-primary">Skills Assessment</a></li>
              <li><a href="#" className="hover:text-primary">Job Matching</a></li>
              <li><a href="#" className="hover:text-primary">Training Programs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-white">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">CV Templates</a></li>
              <li><a href="#" className="hover:text-primary">Interview Tips</a></li>
              <li><a href="#" className="hover:text-primary">Language Support</a></li>
              <li><a href="#" className="hover:text-primary">Workplace Culture</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-white">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Hamilton, Waikato</li>
              <li>New Zealand</li>
              <li>+64 223146756</li>
              <li>waikato.navtrust@outlook.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Waikato Migrant & Former Refugee Navigate Trust. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
