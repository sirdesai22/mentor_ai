// Component: Navigation Bar
import { useState } from 'react';
import { Sparkles, ArrowRight, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
    const navLinks = [
      { href: '#how-it-works', label: 'How It Works' },
      { href: '#features', label: 'Features' },
      { href: '#early-access', label: 'Get Started' },
    ];
  
    return (
      <nav className="bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="#" className="text-3xl font-bold flex items-center">
                <Sparkles className="h-8 w-8 mr-2 text-blue-500" />
                MENTOR <span className="text-blue-500">AI</span>
              </a>
            </div>
  
            {/* Desktop Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            
            {/* Desktop CTA */}
            <div className="hidden md:block">
              <a
                href="#early-access"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center"
              >
                Sign Up <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
  
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-300 hover:text-white focus:outline-none p-2 rounded-md hover:bg-gray-700"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
  
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="pb-3 px-2">
               <a
                href="#early-access"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                Sign Up <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        )}
      </nav>
    );
  };

  export default Navbar;