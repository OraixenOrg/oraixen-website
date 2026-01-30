import { Link } from 'react-router-dom';
import { Linkedin, Github, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
export function Footer() {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-inkblack border-t border-white/10 pt-20 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div>
            <Link to="/" className="text-2xl font-bold tracking-tighter text-white mb-6 block hover:text-skyblue transition-colors">
              ORAIXEN
            </Link>
            <p className="text-gray-400 mb-8 max-w-xs leading-relaxed">
              Premium technology solutions for forward-thinking businesses.
              Innovation meets precision.
            </p>
            <div className="flex flex-wrap gap-3">
              <a 
                href="https://linkedin.com/company/oraixen" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-skyblue hover:bg-skyblue/10 hover:border-skyblue/30 transition-all" 
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="https://github.com/oraixen" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-skyblue hover:bg-skyblue/10 hover:border-skyblue/30 transition-all" 
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a 
                href="https://facebook.com/oraixen" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-skyblue hover:bg-skyblue/10 hover:border-skyblue/30 transition-all" 
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://instagram.com/oraixen" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-skyblue hover:bg-skyblue/10 hover:border-skyblue/30 transition-all" 
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/process" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Process
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">
              Services
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Mobile Development
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Corporate Software
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Hardware & AI
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start text-gray-400 text-sm">
                <MapPin size={18} className="mr-3 mt-0.5 text-skyblue shrink-0" />
                <span>
                  Toronto, ON, Canada, Ontario
                </span>
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <Phone size={18} className="mr-3 text-skyblue shrink-0" />
                <a href="tel:+13134820813" className="hover:text-white transition-colors">
                  +13134820813
                </a>
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <Mail size={18} className="mr-3 text-skyblue shrink-0" />
                <a href="mailto:support@oraixen.com" className="hover:text-white transition-colors">
                  support@oraixen.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {currentYear} Oraixen Inc. All rights reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>;
}