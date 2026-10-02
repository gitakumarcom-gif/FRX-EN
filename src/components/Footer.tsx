import { Disc as DiscordIcon, ArrowUp } from 'lucide-react';
import frxLogo from '../assets/images/frx_en_logo_1790871220771.jpg';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Staff', href: '#staff' },
    { name: 'Rules', href: '#rules' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="border-t border-neutral-900 bg-neutral-950 text-neutral-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-900">
          
          {/* Brand mark */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-red-500/40 bg-neutral-900">
              <img
                src={frxLogo}
                alt="FRX EN"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="font-display font-extrabold text-lg tracking-wider text-white">
                FRX <span className="text-red-500">EN</span>
              </span>
              <p className="text-xs text-neutral-400">
                Contracts. Coordination. Competition.
              </p>
            </div>
          </div>

          {/* Nav mirror */}
          <nav className="flex flex-wrap justify-center items-center gap-6 text-xs sm:text-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Discord CTA & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href="https://discord.gg/TfHCtNkeDd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-xs font-semibold text-neutral-200 hover:text-white border border-neutral-800 transition-colors"
            >
              <DiscordIcon className="w-3.5 h-3.5 text-[#5865F2]" />
              <span>Discord</span>
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 transition-colors"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-3">
          <p>
            © {new Date().getFullYear()} FRX EN. Bizz War Contract Community. All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            Independent gaming organization. Not affiliated with Discord Inc.
          </p>
        </div>

      </div>
    </footer>
  );
}
