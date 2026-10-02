import { useState } from 'react';
import { Terminal, Copy, Check, RefreshCw, FileText, Send } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface ContractDispatcherProps {
  onCopyText: (text: string, label: string) => void;
}

export default function ContractDispatcher({ onCopyText }: ContractDispatcherProps) {
  const [contractType, setContractType] = useState('Territory Defense');
  const [clientFaction, setClientFaction] = useState('FRX Vanguard');
  const [targetFaction, setTargetFaction] = useState('Syndicate');
  const [squadSize, setSquadSize] = useState('6 Operators');
  const [bounty, setBounty] = useState('500,000 Credits / High Yield');
  const [executionWindow, setExecutionWindow] = useState('20:00 UTC - 22:00 UTC');
  const [rulesPreset, setRulesPreset] = useState('FRX Standard Rules (No Griefing)');
  const [copied, setCopied] = useState(false);

  // Generate deterministic contract ID
  const generateRandomId = () => {
    const chars = '0123456789ABCDEF';
    let result = 'FRX-CW-';
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const [contractId, setContractId] = useState('FRX-CW-9418');

  const handleRegenerateId = () => {
    soundFx.playClick();
    setContractId(generateRandomId());
  };

  const formattedDiscordMarkdown = `\`\`\`arm
[ FRX EN - BIZZ WAR CONTRACT BRIEFING ]
=====================================================
CONTRACT ID   : ${contractId}
OPERATION     : ${contractType.toUpperCase()}
CONTRACTOR    : ${clientFaction}
TARGET/OPFOR  : ${targetFaction}
DEPLOYMENT    : ${squadSize}
WINDOW (UTC)  : ${executionWindow}
BOUNTY/STAKES : ${bounty}
RULES PROTOCOL: ${rulesPreset}
STATUS        : READY FOR DISPATCH / PENDING SQUAD
=====================================================
Direct disputes & coordination to Curator Ranveer (@cecilekappel)
Official Server: https://discord.gg/TfHCtNkeDd
\`\`\``;

  const handleCopyDiscordBlock = () => {
    soundFx.playSuccess();
    navigator.clipboard.writeText(formattedDiscordMarkdown);
    setCopied(true);
    onCopyText(formattedDiscordMarkdown, 'Contract Discord Brief');
    setTimeout(() => setCopied(false), 2200);
  };

  const handlePresetSelect = (type: string, client: string, target: string, size: string) => {
    soundFx.playClick();
    setContractType(type);
    setClientFaction(client);
    setTargetFaction(target);
    setSquadSize(size);
    setContractId(generateRandomId());
  };

  return (
    <div className="mt-14 max-w-5xl mx-auto">
      <div className="rounded-2xl bg-neutral-900/90 border border-neutral-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-neutral-800 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-500/40 flex items-center justify-center text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
                Contract Dispatch Generator
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-red-400 border border-neutral-700">
                  DISCORD TOOL
                </span>
              </h3>
              <p className="text-xs text-neutral-400">
                Format structured Bizz War contracts formatted for official FRX EN Discord channels
              </p>
            </div>
          </div>

          {/* Quick presets */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="text-neutral-400 font-mono text-[11px]">Presets:</span>
            <button
              type="button"
              onClick={() => handlePresetSelect('Territory Defense', 'FRX Defense', 'Rival Cartel', '6 Operators')}
              className="px-2.5 py-1 rounded-md bg-neutral-950 border border-neutral-800 hover:border-red-500/40 text-neutral-300 hover:text-white transition-colors"
            >
              Defense
            </button>
            <button
              type="button"
              onClick={() => handlePresetSelect('Siege Assault', 'FRX Strike Team', 'Bizz Headquarters', '10 Operators')}
              className="px-2.5 py-1 rounded-md bg-neutral-950 border border-neutral-800 hover:border-red-500/40 text-neutral-300 hover:text-white transition-colors"
            >
              Siege
            </button>
            <button
              type="button"
              onClick={() => handlePresetSelect('Resource Escort', 'FRX Logistics', 'Neutral Zone', '4 Operators')}
              className="px-2.5 py-1 rounded-md bg-neutral-950 border border-neutral-800 hover:border-red-500/40 text-neutral-300 hover:text-white transition-colors"
            >
              Escort
            </button>
          </div>
        </div>

        {/* Two-column layout: Configuration + Discord Output */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                Contract Type / Objective
              </label>
              <select
                value={contractType}
                onChange={(e) => {
                  soundFx.playClick();
                  setContractType(e.target.value);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
              >
                <option value="Territory Defense">Territory Defense</option>
                <option value="Siege Assault">Siege Assault</option>
                <option value="VIP Asset Extraction">VIP Asset Extraction</option>
                <option value="Resource Interception">Resource Interception</option>
                <option value="Competitive Skirmish">Competitive Skirmish</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                  Contractor Faction
                </label>
                <input
                  type="text"
                  value={clientFaction}
                  onChange={(e) => setClientFaction(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                  Target / Opponent
                </label>
                <input
                  type="text"
                  value={targetFaction}
                  onChange={(e) => setTargetFaction(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                  Squad Size
                </label>
                <select
                  value={squadSize}
                  onChange={(e) => {
                    soundFx.playClick();
                    setSquadSize(e.target.value);
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
                >
                  <option value="4 Operators">4 Operators</option>
                  <option value="6 Operators">6 Operators</option>
                  <option value="8 Operators">8 Operators</option>
                  <option value="10 Operators">10 Operators</option>
                  <option value="Open Squad">Open Squad</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                  Contract Code
                </label>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={contractId}
                    readOnly
                    className="w-full px-2.5 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono text-red-400"
                  />
                  <button
                    type="button"
                    onClick={handleRegenerateId}
                    className="p-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white transition-colors shrink-0"
                    title="Generate new ID"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                Window (UTC) & Stakes
              </label>
              <input
                type="text"
                value={executionWindow}
                onChange={(e) => setExecutionWindow(e.target.value)}
                placeholder="e.g. 20:00 UTC - 22:00 UTC"
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500 transition-colors mb-2"
              />
              <input
                type="text"
                value={bounty}
                onChange={(e) => setBounty(e.target.value)}
                placeholder="Stakes / Payout"
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>
          </div>

          {/* Live Discord Markdown Preview Column */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-red-500" />
                  Discord Markdown Preview
                </span>
                <span className="text-[11px] font-mono text-emerald-400">
                  Ready to paste into Discord
                </span>
              </div>

              {/* Code Box */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300 leading-relaxed overflow-x-auto whitespace-pre select-all">
                {formattedDiscordMarkdown}
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-4 pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-neutral-400 text-center sm:text-left">
                Adheres strictly to FRX EN Rule #4 & Rule #5
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleCopyDiscordBlock}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-red-600 rounded-xl hover:bg-red-500 active:bg-red-700 transition-all duration-150 shadow-[0_0_20px_rgba(239,68,68,0.35)]"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>COPIED TO CLIPBOARD!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY DISCORD BRIEF</span>
                    </>
                  )}
                </button>

                <a
                  href="https://discord.gg/TfHCtNkeDd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition-colors"
                  title="Open Discord Contracts Channel"
                >
                  <Send className="w-4 h-4 text-[#5865F2]" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
