import { Target, Compass, Flame, ShieldAlert } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28 relative">
      {/* Ambient background accent */}
      <div className="absolute top-1/2 -left-20 w-96 h-96 bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-red-500 font-semibold mb-2 block">
            About The Community
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase">
            Built For <span className="text-red-500">Bizz War</span>
          </h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Content Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Card 1: What is FRX EN about? */}
          <div className="relative rounded-2xl bg-neutral-900/80 border border-neutral-800 p-8 sm:p-10 transition-all duration-300 hover:border-red-500/50 hover:bg-neutral-900 group shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-red-950/70 border border-red-500/40 flex items-center justify-center mb-6 text-red-400 group-hover:scale-105 transition-transform duration-200">
              <Target className="w-6 h-6" />
            </div>
            
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
              What is FRX EN about?
            </h3>
            
            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed font-normal">
              FRX EN is a Bizz War Contract Community focused on organizing contracts, coordinating teams, and participating in competitive Bizz War activities.
            </p>

            <div className="mt-8 pt-6 border-t border-neutral-800/80 flex items-center gap-4 text-xs font-mono text-neutral-400">
              <span className="inline-flex items-center gap-1.5 text-red-400">
                <Flame className="w-3.5 h-3.5" /> Direct Contract Routing
              </span>
              <span>·</span>
              <span>Squad Synchronization</span>
            </div>
          </div>

          {/* Card 2: Community Purpose */}
          <div className="relative rounded-2xl bg-neutral-900/80 border border-neutral-800 p-8 sm:p-10 transition-all duration-300 hover:border-red-500/50 hover:bg-neutral-900 group shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center mb-6 text-neutral-200 group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-6 h-6" />
            </div>
            
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
              Community Purpose
            </h3>
            
            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed font-normal">
              Our purpose is to build an active, organized, and competitive community where members can find contracts, work together, and take part in events and activities.
            </p>

            <div className="mt-8 pt-6 border-t border-neutral-800/80 flex items-center gap-4 text-xs font-mono text-neutral-400">
              <span className="inline-flex items-center gap-1.5 text-white">
                <ShieldAlert className="w-3.5 h-3.5 text-red-500" /> Transparent Protocol
              </span>
              <span>·</span>
              <span>Zero Disruption</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
