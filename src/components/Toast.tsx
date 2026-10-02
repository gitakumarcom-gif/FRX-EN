import { Check, Info } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export default function Toast({ toasts }: ToastProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700/80 text-white shadow-2xl shadow-black/80 transition-all transform animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <div className="w-6 h-6 rounded-full bg-red-600/20 border border-red-500/50 flex items-center justify-center shrink-0">
            {toast.type === 'info' ? (
              <Info className="w-3.5 h-3.5 text-red-400" />
            ) : (
              <Check className="w-3.5 h-3.5 text-red-400" />
            )}
          </div>
          <p className="text-xs font-mono text-neutral-200 pr-2">
            {toast.message}
          </p>
        </div>
      ))}
    </div>
  );
}
