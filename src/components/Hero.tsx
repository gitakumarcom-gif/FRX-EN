import { useState } from 'react';
import { Shield, Users, Crosshair, Copy, Check, ArrowRight, Disc as DiscordIcon } from 'lucide-react';
import frxLogo from '../assets/images/frx_en_logo_1790871220771.jpg';
import ContractDispatcher from './ContractDispatcher';
import { soundFx } from '../utils/audio';

interface HeroProps {
  onCopyInvite: () => void;
  onJoinDiscord: () => void;
  onCopyText: (text: string, label: string) => void;
}

export default function Hero({ onCopyInvite, onJoinDiscord, onCopyText }: HeroProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    soundFx.playSuccess();
    navigator.clipboard.writeText('https://discord.gg/TfHCtNkeDd');
    setCopied(true);
    onCopyInvite();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="home" className="relative pt-12 pb-20 sm:pt-20 sm:pb-32 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-neutral-800/20 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          
          {/* Main Logo Showcase */}
          <div className="relative mb-8 group">
            {/* Glow Aura */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-900 rounded-2xl blur-lg opacity-40 group-hover:opacity-75 transition duration-500" />
            
            {/* Logo Container */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-2xl bg-neutral-900 border border-neutral-700/80 p-2 shadow-2xl flex items-center justify-center overflow-hidden">
              <img
                src={frxLogo}
                alt="FRX EN Community Crest"
                className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Subtitle / Brand Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/50 border border-red-500/30 text-xs font-semibold uppercase tracking-widest text-red-400 mb-4 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Bizz War Contract Community
          </div>

          {/* Main Prominent Heading: FRX EN */}
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white uppercase mb-4">
            FRX <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">EN</span>
          </h1>

          {/* Core Tagline: Contracts. Coordination. Competition. */}
          <p className="font-display text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide text-neutral-200 mb-6">
            Contracts<span className="text-red-500">.</span> Coordination<span className="text-red-500">.</span> Competition<span className="text-red-500">.</span>
          </p>

          {/* Short description */}
          <p className="max-w-2xl text-base sm:text-lg text-neutral-400 leading-relaxed font-normal mb-10 text-balance">
            FRX EN is a Bizz War Contract Community built for organized contracts, competitive events, and strong team coordination.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
            <a
              href="https://discord.gg/TfHCtNkeDd"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                soundFx.playClick();
                onJoinDiscord();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold uppercase tracking-wider text-white bg-red-600 rounded-xl hover:bg-red-500 active:bg-red-700 transition-all duration-200 shadow-[0_0_35px_rgba(239,68,68,0.4)] hover:shadow-[0_0_50px_rgba(239,68,68,0.6)] group"
            >
              <DiscordIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span>JOIN DISCORD</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            <button
              type="button"
              onClick={handleCopyLink}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm font-semibold text-neutral-300 bg-neutral-900/90 hover:bg-neutral-800 hover:text-white border border-neutral-700/80 rounded-xl transition-all duration-150"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Invite Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-neutral-400" />
                  <span>Copy Invite Link</span>
                </>
              )}
            </button>
          </div>

          {/* Three Pillars Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-5xl text-left mb-8">
            <div className="group p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:border-red-500/40 hover:bg-neutral-900 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-red-950/60 border border-red-500/30 flex items-center justify-center mb-4 text-red-400 group-hover:text-red-300">
                <Shield className="w-5 h-5" />
              </div>
              <h2 className="font-display font-bold text-lg text-white mb-2">
                Organized Contracts
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Structured system for managing, claiming, and executing Bizz War contracts without confusion or disruption.
              </p>
            </div>

            <div className="group p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:border-red-500/40 hover:bg-neutral-900 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-neutral-800/80 border border-neutral-700 flex items-center justify-center mb-4 text-neutral-300 group-hover:text-white">
                <Users className="w-5 h-5" />
              </div>
              <h2 className="font-display font-bold text-lg text-white mb-2">
                Team Coordination
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Active squad alignment and verified leadership ensuring high-efficiency operations during heavy combat windows.
              </p>
            </div>

            <div className="group p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:border-red-500/40 hover:bg-neutral-900 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-red-950/60 border border-red-500/30 flex items-center justify-center mb-4 text-red-400 group-hover:text-red-300">
                <Crosshair className="w-5 h-5" />
              </div>
              <h2 className="font-display font-bold text-lg text-white mb-2">
                Competitive Standard
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                A serious, respectful battle ground where skilled participants test their capabilities under fair, clear rules.
              </p>
            </div>
          </div>

          {/* Interactive Contract Dispatch Generator Tool */}
          <ContractDispatcher onCopyText={onCopyText} />

        </div>
      </div>
    </section>
  );
}
