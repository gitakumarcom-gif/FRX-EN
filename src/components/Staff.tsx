import { useState } from 'react';
import { Crown, Sparkles, Copy, Check, Disc as DiscordIcon, ShieldAlert, MessageSquare, ExternalLink, ShieldCheck } from 'lucide-react';
import { StaffMember } from '../types';
import { soundFx } from '../utils/audio';

interface StaffProps {
  onCopyText: (text: string, label: string) => void;
}

export default function Staff({ onCopyText }: StaffProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeModalMember, setActiveModalMember] = useState<StaffMember | null>(null);
  const [dmSubject, setDmSubject] = useState('Contract Registration');
  const [customNote, setCustomNote] = useState('');
  const [templateCopied, setTemplateCopied] = useState(false);

  const staffList: StaffMember[] = [
    {
      role: 'OWNER',
      name: 'Alford',
      discordHandle: 'alford_waltsen',
      userId: '1515920121594384408',
      description: 'Community Founder & Head Operations. Direct overseer of FRX EN governance, major contract rules, and community structure.',
      avatarColor: 'from-red-600 via-red-700 to-neutral-900',
    },
    {
      role: 'CURATOR',
      name: 'Ranveer',
      discordHandle: 'cecilekappel',
      userId: '1514127258758021140',
      description: 'Community Curator & Primary Staff Contact. In charge of contract coordination, support disputes, and member inquiries.',
      avatarColor: 'from-neutral-700 via-neutral-800 to-neutral-950',
    },
  ];

  const handleCopy = (text: string, label: string, key: string) => {
    soundFx.playSuccess();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    onCopyText(text, label);
    setTimeout(() => {
      setCopiedKey((prev) => (prev === key ? null : prev));
    }, 2000);
  };

  const generatedDmTemplate = activeModalMember
    ? `Hello ${activeModalMember.name},\nI am contacting you from the FRX EN official website regarding: [${dmSubject}].\nDetails: ${customNote || 'I would like to coordinate a Bizz War contract under FRX EN guidelines.'}\nMy Discord Handle: [Your Discord]`
    : '';

  const handleCopyTemplate = () => {
    soundFx.playSuccess();
    navigator.clipboard.writeText(generatedDmTemplate);
    setTemplateCopied(true);
    onCopyText(generatedDmTemplate, 'Discord DM Template');
    setTimeout(() => setTemplateCopied(false), 2000);
  };

  return (
    <section id="staff" className="py-20 sm:py-28 relative border-t border-neutral-900 bg-neutral-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-red-500 font-semibold mb-2 block">
            Leadership & Moderation
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase">
            FRX EN <span className="text-red-500">Staff Team</span>
          </h2>
          <div className="w-16 h-1 bg-red-600 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-sm sm:text-base text-neutral-400">
            Dedicated team members maintaining competitive integrity, contract order, and community discipline.
          </p>
        </div>

        {/* Staff Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {staffList.map((member) => {
            const isOwner = member.role === 'OWNER';
            const discordCopied = copiedKey === `${member.name}-discord`;
            const idCopied = copiedKey === `${member.name}-id`;

            return (
              <div
                key={member.name}
                className={`relative rounded-2xl bg-neutral-900/90 border transition-all duration-300 p-7 sm:p-8 flex flex-col justify-between ${
                  isOwner
                    ? 'border-red-500/40 shadow-[0_0_30px_rgba(239,68,68,0.15)] hover:border-red-500 hover:shadow-[0_0_40px_rgba(239,68,68,0.25)]'
                    : 'border-neutral-800 hover:border-neutral-600 hover:shadow-xl'
                }`}
              >
                {/* Top Badge & Verification */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold font-mono uppercase tracking-wider ${
                      isOwner
                        ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(239,68,68,0.4)]'
                        : 'bg-neutral-800 text-neutral-200 border border-neutral-700'
                    }`}
                  >
                    {isOwner ? <Crown className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
                    <span>{member.role}</span>
                  </div>

                  <span className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Verified Official Staff
                  </span>
                </div>

                {/* Profile Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.avatarColor} p-0.5 shadow-lg flex items-center justify-center`}
                  >
                    <div className="w-full h-full rounded-[14px] bg-neutral-950 flex items-center justify-center font-display font-black text-2xl text-white">
                      {member.name.charAt(0)}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                      {member.name}
                    </h3>
                    <p className="text-xs font-mono text-neutral-400 mt-0.5">
                      FRX EN Management
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                  {member.description}
                </p>

                {/* Credentials & Copy Affordances */}
                <div className="space-y-3 pt-5 border-t border-neutral-800">
                  {/* Discord Handle */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-950/80 border border-neutral-800/80">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <DiscordIcon className="w-4 h-4 text-[#5865F2] shrink-0" />
                      <div className="min-w-0">
                        <span className="block text-[10px] uppercase font-mono tracking-wider text-neutral-400">
                          Discord Username
                        </span>
                        <span className="block text-sm font-mono text-neutral-200 truncate">
                          {member.discordHandle}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(member.discordHandle, 'Discord username', `${member.name}-discord`)
                      }
                      className="ml-3 p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors shrink-0"
                      title={`Copy ${member.name}'s Discord username`}
                      aria-label={`Copy ${member.name}'s Discord username`}
                    >
                      {discordCopied ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* User ID */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-950/80 border border-neutral-800/80">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-4 text-center font-mono text-xs font-bold text-neutral-400">
                        #
                      </span>
                      <div className="min-w-0">
                        <span className="block text-[10px] uppercase font-mono tracking-wider text-neutral-400">
                          Discord User ID
                        </span>
                        <span className="block text-sm font-mono tabular-nums text-neutral-300 truncate">
                          {member.userId}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(member.userId, 'Discord User ID', `${member.name}-id`)
                      }
                      className="ml-3 p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors shrink-0"
                      title={`Copy ${member.name}'s User ID`}
                      aria-label={`Copy ${member.name}'s User ID`}
                    >
                      {idCopied ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Direct Contact Helper Button */}
                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      setActiveModalMember(member);
                    }}
                    className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold text-neutral-300 hover:text-white transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-red-400" />
                    <span>Generate Pre-filled DM to {member.name}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Impersonation Warning Banner */}
        <div className="mt-10 max-w-4xl mx-auto p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div className="text-xs text-neutral-400 leading-relaxed">
            <span className="font-semibold text-white">Anti-Impersonation Warning: </span>
            Always verify the exact Discord User ID before making agreements. Staff will never ask for private account passwords or unauthorized payments.
          </div>
        </div>

      </div>

      {/* Direct Message Template Modal */}
      {activeModalMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-2xl bg-neutral-950 border border-neutral-800 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-red-500" />
                <h4 className="font-display font-bold text-lg text-white">
                  Message Dispatcher: {activeModalMember.name}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalMember(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  Subject Category
                </label>
                <select
                  value={dmSubject}
                  onChange={(e) => setDmSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-red-500"
                >
                  <option value="Contract Registration">Contract Registration</option>
                  <option value="Dispute Mediation">Dispute Mediation (Rule Violation)</option>
                  <option value="Squad Roster Verification">Squad Roster Verification</option>
                  <option value="General Community Support">General Community Support</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  Quick Details
                </label>
                <textarea
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  rows={3}
                  placeholder="Enter details about your squad, contract code, or inquiry..."
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  Formatted Discord DM Output
                </label>
                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 font-mono text-xs text-neutral-300 whitespace-pre-wrap select-all">
                  {generatedDmTemplate}
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleCopyTemplate}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold uppercase tracking-wider text-white transition-colors"
                >
                  {templateCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{templateCopied ? 'Template Copied!' : 'Copy DM Template'}</span>
                </button>

                <a
                  href="https://discord.gg/TfHCtNkeDd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold text-neutral-300 hover:text-white transition-colors"
                >
                  <span>Open Discord</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
