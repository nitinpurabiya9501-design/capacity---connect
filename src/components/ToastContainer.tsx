import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-3.5 bg-white border border-slate-200 rounded-lg shadow-md text-sm transition-all"
        >
          {toast.type === 'success' && (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          )}
          {toast.type === 'error' && (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          )}
          {toast.type === 'info' && (
            <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
          )}
          <div className="flex-1 text-slate-800 leading-snug">{toast.message}</div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-slate-600 shrink-0"
            aria-label="Close notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
