import { ArrowUp, Mail, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-charcoal-border bg-charcoal-base px-6 py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        {/* Top Status & Assurance Bar */}
        <div className="flex flex-col gap-6 border-b border-charcoal-border/70 pb-8 sm:flex-row sm:items-center sm:justify-between">
          {/* Status Beacon */}
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            </span>
            <span className="text-xs font-mono tracking-wide uppercase text-gray-300 sm:text-sm">
              Accepting Audit Requests for Q3 / Q4
            </span>
          </div>

          {/* Confidentiality Notice */}
          <div className="flex items-center gap-2 text-xs text-gray-400 sm:text-sm">
            <ShieldCheck className="h-4 w-4 text-sky-400/80" />
            <span>100% Confidential. We never sell or share operational data.</span>
          </div>
        </div>

        {/* Middle Brand, Navigation & Contact */}
        <div className="flex flex-col justify-between gap-8 py-8 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-sky-400/30 bg-sky-500/10">
                <svg
                  className="h-3.5 w-3.5 text-sky-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="6" cy="6" r="3" />
                  <circle cx="18" cy="6" r="3" />
                  <circle cx="12" cy="18" r="3" />
                  <path d="m8.5 8 4.5 7" />
                  <path d="m15.5 8-4.5 7" />
                  <path d="M9 6h6" />
                </svg>
              </div>
              <span className="text-base font-medium tracking-tight text-white">
                Synthetix<span className="font-light text-gray-400">Ops</span>
              </span>
            </div>
            <p className="mt-2 text-xs text-gray-500 max-w-sm">
              Custom AI workflows and high-leverage process automation for forward-thinking engineering and operations teams.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
            <a
              href="mailto:hello@automationstudio.io"
              className="group flex items-center gap-2 transition-colors hover:text-sky-300"
            >
              <Mail className="h-4 w-4 text-gray-500 transition-colors group-hover:text-sky-400" />
              <span>hello@automationstudio.io</span>
            </a>
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-1.5 rounded-full border border-charcoal-border bg-charcoal-elevated px-3 py-1.5 text-xs text-gray-400 transition-all hover:border-gray-500 hover:text-white"
            >
              <span>Back to top</span>
              <ArrowUp className="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-charcoal-border/50 pt-8 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} SynthetixOps. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#why-us" className="hover:text-gray-400 transition-colors">Why Us</a>
            <a href="#audit-offer" className="hover:text-gray-400 transition-colors">Offer</a>
            <a href="#process" className="hover:text-gray-400 transition-colors">Process</a>
            <a href="#faq" className="hover:text-gray-400 transition-colors">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
