import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

type NavbarProps = {
  onRequestAudit: () => void;
};

export default function Navbar({ onRequestAudit }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-4 inset-x-0 mx-auto z-50 w-[calc(100%-2rem)] max-w-5xl transition-all duration-300 ${
          isScrolled ? 'top-3' : 'top-5'
        }`}
      >
        <div className="relative flex items-center justify-between rounded-full border border-white/10 bg-charcoal-elevated/85 px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-300 sm:px-6">
          {/* Brand Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 rounded-full"
          >
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-sky-400/30 bg-sky-500/10 shadow-[0_0_12px_rgba(56,189,248,0.25)] transition-transform duration-300 group-hover:scale-105">
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <circle cx="6" cy="7" r="2" fill="#38BDF8" />
                <circle cx="18" cy="7" r="2" fill="#818CF8" />
                <circle cx="12" cy="17" r="2" fill="#38BDF8" />
                <path
                  d="M8 7h8M7.5 9l3 6M16.5 9l-3 6"
                  stroke="url(#navIconGrad)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="navIconGrad" x1="6" y1="7" x2="18" y2="17" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#38BDF8" />
                    <stop offset="1" stopColor="#818CF8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="text-sm font-semibold tracking-tight text-gray-100 transition-colors group-hover:text-white">
              AgileFlow <span className="font-light text-sky-400">AI</span>
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-7 md:flex">
            <button
              onClick={() => scrollToSection('why-us')}
              className="text-xs font-medium text-gray-400 transition-colors hover:text-gray-100 focus-visible:outline-none focus-visible:text-sky-400"
            >
              Why Us
            </button>
            <button
              onClick={() => scrollToSection('audit-offer')}
              className="text-xs font-medium text-gray-400 transition-colors hover:text-gray-100 focus-visible:outline-none focus-visible:text-sky-400"
            >
              What's Included
            </button>
            <button
              onClick={() => scrollToSection('process')}
              className="text-xs font-medium text-gray-400 transition-colors hover:text-gray-100 focus-visible:outline-none focus-visible:text-sky-400"
            >
              Process
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-xs font-medium text-gray-400 transition-colors hover:text-gray-100 focus-visible:outline-none focus-visible:text-sky-400"
            >
              FAQ
            </button>
          </nav>

          {/* Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onRequestAudit}
              className="glow-button group hidden items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-medium text-white transition-all hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/50 sm:inline-flex"
            >
              Request Audit
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-charcoal-border bg-charcoal-base text-gray-400 transition-colors hover:text-white md:hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="mt-2 flex flex-col rounded-2xl border border-white/10 bg-charcoal-elevated/95 p-5 shadow-[0_16px_36px_rgba(0,0,0,0.6)] backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col space-y-3.5">
                <button
                  onClick={() => scrollToSection('why-us')}
                  className="text-left text-sm font-medium text-gray-300 transition-colors hover:text-white"
                >
                  Why Us
                </button>
                <button
                  onClick={() => scrollToSection('audit-offer')}
                  className="text-left text-sm font-medium text-gray-300 transition-colors hover:text-white"
                >
                  What's Included
                </button>
                <button
                  onClick={() => scrollToSection('process')}
                  className="text-left text-sm font-medium text-gray-300 transition-colors hover:text-white"
                >
                  Process
                </button>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="text-left text-sm font-medium text-gray-300 transition-colors hover:text-white"
                >
                  FAQ
                </button>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onRequestAudit();
                    }}
                    className="glow-button flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-3 text-sm font-medium text-white"
                  >
                    Request Free Audit
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
