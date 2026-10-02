import { useState } from 'react';
import { Copy, Check, Disc as DiscordIcon, ExternalLink, ShieldCheck, Send, FileText } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface ContactProps {
  onCopyContact: (text: string) => void;
  onJoinDiscord: () => void;
}

export default function Contact({ onCopyContact, onJoinDiscord }: ContactProps) {
  const [copied, setCopied] = useState(false);
  const [inquiryType, setInquiryType] = useState('Contract Registration');
  const [senderDiscord, setSenderDiscord] = useState('');
  const [inquiryText, setInquiryText] = useState('');
  const [messageCopied, setMessageCopied] = useState(false);

  const handleCopyDiscord = () => {
    soundFx.playSuccess();
    navigator.clipboard.writeText('cecilekappel');
    setCopied(true);
    onCopyContact('cecilekappel');
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedInquiry = `**[FRX EN OFFICIAL INQUIRY]**
TO: Curator Ranveer (@cecilekappel)
FROM: ${senderDiscord || '[Pending Discord Tag]'}
TYPE: ${inquiryType}
MESSAGE: ${inquiryText || 'Requesting contract registration / coordination assistance under FRX EN guidelines.'}
STATUS: Awaiting Discord Dispatch`;

  const handleCopyInquiry = () => {
    soundFx.playSuccess();
    navigator.clipboard.writeText(formattedInquiry);
    setMessageCopied(true);
    onCopyContact('Formatted Discord Inquiry');
    setTimeout(() => setMessageCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 relative border-t border-neutral-900 bg-neutral-950/60">
      {/* Red ambient spotlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-red-500 font-semibold mb-2 block">
            Official Inquiries
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase">
            Get in <span className="text-red-500">Touch</span>
          </h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto">
            For support, contracts, or general inquiries, contact the FRX EN Staff Team through Discord.
          </p>
        </div>

        {/* Contact Showcase Card */}
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl bg-neutral-900/90 border border-neutral-800 p-8 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-neutral-800" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Direct Staff Contact */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-red-400 mb-2">
                    <ShieldCheck className="w-4 h-4" />
                    Primary Inquiries Officer
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Ranveer
                  </h3>
                  <p className="text-sm text-neutral-400">
                    FRX EN Curator & Support Coordinator
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-neutral-400">
                      Discord Handle
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyDiscord}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-300 hover:text-white transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-neutral-400" />
                          <span>Copy Handle</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <DiscordIcon className="w-5 h-5 text-[#5865F2]" />
                    <span className="font-mono text-base font-bold text-white select-all">
                      cecilekappel
                    </span>
                  </div>
                </div>

                {/* Direct Discord Server Card */}
                <div className="p-5 rounded-xl bg-neutral-950/70 border border-neutral-800 text-center sm:text-left">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500">
                      <DiscordIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-white">
                        FRX EN Community
                      </h4>
                      <p className="text-xs text-neutral-400">
                        Official Server Hub
                      </p>
                    </div>
                  </div>

                  <a
                    href="https://discord.gg/TfHCtNkeDd"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      soundFx.playClick();
                      onJoinDiscord();
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white bg-red-600 rounded-xl hover:bg-red-500 active:bg-red-700 transition-all duration-200 shadow-[0_0_20px_rgba(239,68,68,0.35)]"
                  >
                    <DiscordIcon className="w-4 h-4" />
                    <span>JOIN DISCORD</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>
                </div>
              </div>

              {/* Right Column: Interactive Dispatch Inquiry Formatter */}
              <div className="lg:col-span-7 p-6 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-red-500" />
                    Inquiry Message Formatter
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    Format & DM Ranveer
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => {
                        soundFx.playClick();
                        setInquiryType(e.target.value);
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-red-500"
                    >
                      <option value="Contract Registration">Contract Registration</option>
                      <option value="Bizz War Dispute">Bizz War Dispute / Rule Review</option>
                      <option value="Staff Inquiry">Staff Inquiry</option>
                      <option value="General Support">General Community Support</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                      Your Discord Tag
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. username#0000"
                      value={senderDiscord}
                      onChange={(e) => setSenderDiscord(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                    Inquiry Message / Details
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Brief description of your contract or support query..."
                    value={inquiryText}
                    onChange={(e) => setInquiryText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                {/* Formatted Output */}
                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                    Live Formatted Output
                  </label>
                  <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 font-mono text-[11px] text-neutral-300 leading-relaxed whitespace-pre-wrap select-all">
                    {formattedInquiry}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCopyInquiry}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold uppercase tracking-wider text-white transition-colors shadow-sm"
                  >
                    {messageCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{messageCopied ? 'Inquiry Copied!' : 'Copy Formatted Inquiry'}</span>
                  </button>

                  <a
                    href="https://discord.gg/TfHCtNkeDd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold text-neutral-300 hover:text-white transition-colors"
                  >
                    <Send className="w-3.5 h-3.5 text-[#5865F2]" />
                    <span>Send in Discord</span>
                  </a>
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
