import { useState, useEffect, useRef } from 'react';
import { Search, ShieldAlert, Check, Copy, Quote, CheckCircle2 } from 'lucide-react';
import { RuleItem } from '../types';
import { soundFx } from '../utils/audio';

interface RulesProps {
  onCopyRule: (text: string) => void;
}

export default function Rules({ onCopyRule }: RulesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [quotedId, setQuotedId] = useState<number | null>(null);
  const [acknowledged, setAcknowledged] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Load acknowledgement status from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('frx_rules_acknowledged');
    if (saved === 'true') {
      setAcknowledged(true);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleAcknowledge = () => {
    soundFx.playSuccess();
    const nextState = !acknowledged;
    setAcknowledged(nextState);
    localStorage.setItem('frx_rules_acknowledged', String(nextState));
  };

  const rules: RuleItem[] = [
    {
      id: 1,
      title: 'Respect all members and staff.',
      category: 'Community Conduct',
      details: 'Treat everyone with fundamental courtesy. Toxicity, hateful remarks, and hostility are not tolerated in public or private channels.',
    },
    {
      id: 2,
      title: 'No spam, harassment, or unnecessary arguments.',
      category: 'Community Conduct',
      details: 'Avoid flood messages, tagging staff repeatedly without reason, personal harassment, or instigating server drama.',
    },
    {
      id: 3,
      title: 'Follow staff instructions and server procedures.',
      category: 'Administration',
      details: 'Directives from Community Owner Alford and Curator Ranveer must be adhered to promptly without disruption.',
    },
    {
      id: 4,
      title: 'Keep contracts and related activities organized.',
      category: 'Contract Integrity',
      details: 'Post contracts in designated channels with complete details, clear terms, timestamps, and roster rosters.',
    },
    {
      id: 5,
      title: 'Do not intentionally disrupt ongoing contracts.',
      category: 'Contract Integrity',
      details: 'Sabotaging active Bizz War activities, griefing contracted parties, or intentional contract abandonment will lead to severe sanctions.',
    },
    {
      id: 6,
      title: 'No scams, fake contracts, or misleading information.',
      category: 'Contract Integrity',
      details: 'Fraudulent payouts, altered screenshots, forged agreements, or bait contracts result in an immediate permanent ban.',
    },
    {
      id: 7,
      title: 'Use channels for their intended purposes.',
      category: 'Administration',
      details: 'Keep general discussion, contract listings, war reports, and media in their designated Discord categories.',
    },
    {
      id: 8,
      title: "Follow Discord's Terms of Service.",
      category: 'Compliance',
      details: 'All community interactions must strictly adhere to Discord Community Guidelines and Terms of Service.',
    },
    {
      id: 9,
      title: 'Respect staff decisions.',
      category: 'Administration',
      details: 'Moderator rulings and curator decisions are final. Appeals should be made through official Discord tickets, not public chat.',
    },
    {
      id: 10,
      title: 'Violations may result in warnings, restrictions, or removal from the community.',
      category: 'Compliance',
      details: 'Staff reserves the right to issue warnings, temporary contract restrictions, or permanent removal based on severity.',
    },
  ];

  const categories = ['All', 'Contract Integrity', 'Community Conduct', 'Administration', 'Compliance'];

  const filteredRules = rules.filter((rule) => {
    const matchesCategory = selectedCategory === 'All' || rule.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;
    const matchesSearch =
      rule.title.toLowerCase().includes(query) ||
      rule.category.toLowerCase().includes(query) ||
      (rule.details && rule.details.toLowerCase().includes(query)) ||
      rule.id.toString() === query;
    return matchesCategory && matchesSearch;
  });

  const handleCopyRule = (rule: RuleItem) => {
    soundFx.playSuccess();
    const textToCopy = `Rule ${rule.id}: ${rule.title}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(rule.id);
    onCopyRule(textToCopy);
    setTimeout(() => {
      setCopiedId((prev) => (prev === rule.id ? null : prev));
    }, 2000);
  };

  const handleQuoteDiscord = (rule: RuleItem) => {
    soundFx.playSuccess();
    const discordQuote = `> ⚖️ **FRX EN Server Rule #${rule.id}**: *${rule.title}*\n> *Category: ${rule.category} | Official Discord: <https://discord.gg/TfHCtNkeDd>*`;
    navigator.clipboard.writeText(discordQuote);
    setQuotedId(rule.id);
    onCopyRule(`Discord quote for Rule #${rule.id}`);
    setTimeout(() => {
      setQuotedId((prev) => (prev === rule.id ? null : prev));
    }, 2000);
  };

  return (
    <section id="rules" className="py-20 sm:py-28 relative">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-red-500 font-semibold mb-2 block">
            Guidelines & Standards
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase">
            Community <span className="text-red-500">Rules</span>
          </h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-sm sm:text-base text-neutral-400">
            Adherence to these standards is strictly mandatory for all members and contract participants.
          </p>
        </div>

        {/* Tactical Search & Category Filters */}
        <div className="max-w-4xl mx-auto mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search rules (press '/' to focus)..."
                className="w-full pl-10 pr-16 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700 pointer-events-none">
                /
              </span>
            </div>

            {/* Acknowledgment Interactive Toggle */}
            <button
              type="button"
              onClick={handleToggleAcknowledge}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-mono transition-all duration-200 whitespace-nowrap ${
                acknowledged
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 ${acknowledged ? 'text-emerald-400' : 'text-neutral-500'}`} />
              <span>{acknowledged ? 'Protocol Acknowledged' : 'Acknowledge Rules'}</span>
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedCategory(cat);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                    isSelected
                      ? 'bg-red-600 text-white font-semibold shadow-sm'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-850'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Numbered Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {filteredRules.map((rule) => {
            const isCopied = copiedId === rule.id;
            const isQuoted = quotedId === rule.id;
            const formattedIndex = rule.id < 10 ? `0${rule.id}` : `${rule.id}`;

            return (
              <div
                key={rule.id}
                className="group relative rounded-2xl bg-neutral-900/80 border border-neutral-800/90 hover:border-red-500/40 p-6 sm:p-7 transition-all duration-200 hover:bg-neutral-900 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className="font-mono tabular-nums text-2xl sm:text-3xl font-extrabold text-red-500 tracking-tight">
                      {formattedIndex}
                    </span>
                    
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 pr-1">
                        {rule.category}
                      </span>

                      {/* Quote for Discord */}
                      <button
                        type="button"
                        onClick={() => handleQuoteDiscord(rule)}
                        className="p-1.5 rounded-lg bg-neutral-950 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                        title="Copy Discord Markdown quote"
                        aria-label={`Copy Discord quote for rule ${rule.id}`}
                      >
                        {isQuoted ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Quote className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {/* Copy Rule Title */}
                      <button
                        type="button"
                        onClick={() => handleCopyRule(rule)}
                        className="p-1.5 rounded-lg bg-neutral-950 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                        title="Copy rule to clipboard"
                        aria-label={`Copy rule ${rule.id}`}
                      >
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white leading-snug mb-2 group-hover:text-red-50 transition-colors">
                    {rule.title}
                  </h3>

                  {rule.details && (
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                      {rule.details}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                  <span>Enforced by Staff</span>
                  <span className="text-red-500/80">Section {rule.id}</span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredRules.length === 0 && (
          <div className="text-center py-12 bg-neutral-900/40 rounded-2xl border border-neutral-800 max-w-md mx-auto">
            <ShieldAlert className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
            <p className="text-neutral-300 font-medium text-sm">No rules match "{searchQuery}"</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-3 text-xs text-red-400 hover:text-red-300 underline"
            >
              Reset search filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
