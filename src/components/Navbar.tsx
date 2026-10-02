import { useState, useEffect } from 'react';
import { Menu, X, Disc as DiscordIcon, ExternalLink, Volume2, VolumeX, Clock } from 'lucide-react';
import frxLogo from '../assets/images/frx_en_logo_1790871220771.jpg';
import { soundFx } from '../utils/audio';

interface NavbarProps {
  onJoinDiscord: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export default function Navbar({ onJoinDiscord, soundEnabled, onToggleSound }: NavbarProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [utcTime, setUtcTime] = useState('');

  // Live UTC Clock for contract synchronization
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      const seconds = String(now.getUTCSeconds()).padStart(2, '0');
      setUtcTime(`${hours}:${minutes}:${seconds} UTC`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'staff', 'rules', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Staff', href: '#staff', id: 'staff' },
    { name: 'Rules', href: '#rules', id: 'rules' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    soundFx.playClick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 border-b ${
        scrolled
          ? 'bg-neutral-950/90 backdrop-blur-md border-white/10 shadow-lg shadow-black/50'
          : 'bg-neutral-950/70 backdrop-blur-sm border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Zone 1: Brand Mark & Wordmark */}
          <a
            href="#home"
            onClick={() => soundFx.playClick()}
            className="group flex items-center gap-3 text-white transition-opacity hover:opacity-90"
            aria-label="FRX EN Home"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden border border-red-500/40 bg-neutral-900 group-hover:border-red-500 transition-colors shadow-[0_0_12px_rgba(239,68,68,0.25)]">
              <img
                src={frxLogo}
                alt="FRX EN Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg sm:text-xl tracking-wider text-white">
                FRX <span className="text-red-500">EN</span>
              </span>
            </div>
          </a>

          {/* Zone 2: Clean Text Navigation Links & UTC Time */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`text-sm font-medium transition-all duration-150 relative py-1 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                  )}
                </a>
              );
            })}

            {/* Tactical Live Clock */}
            <div className="hidden lg:flex items-center gap-1.5 pl-2 font-mono text-[11px] text-neutral-400 border-l border-neutral-800">
              <Clock className="w-3.5 h-3.5 text-red-500" />
              <span className="tabular-nums">{utcTime || '00:00:00 UTC'}</span>
            </div>
          </nav>

          {/* Zone 3: Primary Actions (Audio Toggle + Join Discord) */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Audio Feedback Toggle */}
            <button
              type="button"
              onClick={onToggleSound}
              className={`p-2 rounded-lg border transition-colors ${
                soundEnabled
                  ? 'bg-red-950/40 border-red-500/40 text-red-400 hover:text-red-300'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200'
              }`}
              title={soundEnabled ? 'Mute tactical audio' : 'Enable tactical audio feedback'}
              aria-label="Toggle tactical audio feedback"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <a
              href="https://discord.gg/TfHCtNkeDd"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onJoinDiscord}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-red-600 rounded-lg hover:bg-red-500 active:bg-red-700 transition-all duration-150 shadow-[0_0_20px_rgba(239,68,68,0.35)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] whitespace-nowrap"
            >
              <DiscordIcon className="w-3.5 h-3.5" />
              <span>Join Discord</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>

          {/* Mobile Menu & Audio Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={onToggleSound}
              className="p-1.5 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
              aria-label="Toggle audio"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-red-400" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <a
              href="https://discord.gg/TfHCtNkeDd"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white bg-red-600 rounded-md hover:bg-red-500 transition-colors"
            >
              Discord
            </a>
            
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 text-neutral-400 hover:text-white rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-800 bg-neutral-950/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'text-white bg-red-950/40 border border-red-500/30'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
                }`}
              >
                {link.name}
              </a>
            );
          })}
          <div className="pt-2 flex flex-col gap-2">
            <div className="text-center font-mono text-xs text-neutral-400 py-1">
              Time: {utcTime}
            </div>
            <a
              href="https://discord.gg/TfHCtNkeDd"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                onJoinDiscord();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold uppercase tracking-wider text-white bg-red-600 rounded-lg hover:bg-red-500 transition-colors shadow-[0_0_20px_rgba(239,68,68,0.4)]"
            >
              <DiscordIcon className="w-4 h-4" />
              <span>Join Discord Community</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
