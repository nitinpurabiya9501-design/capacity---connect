import React from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, Check, MessageSquare, Clock } from 'lucide-react';

export const AdminContactMessages: React.FC = () => {
  const { contactMessages, updateContactStatus } = useApp();

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Inbound Contact & Inquiry Messages
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Messages received from students, corporate training partners, and prospective trainees via the public contact form.
        </p>
      </div>

      {contactMessages.length === 0 ? (
        <div className="p-12 border border-slate-200 rounded-lg text-center bg-white text-xs text-slate-500">
          No inquiries currently in queue.
        </div>
      ) : (
        <div className="space-y-4">
          {contactMessages.map((msg) => (
            <div
              key={msg.id}
              className={`border rounded-lg p-5 bg-white space-y-3 shadow-xs transition-colors ${
                msg.status === 'unread'
                  ? 'border-teal-200 bg-teal-50/20'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="font-semibold text-slate-900">
                      {msg.name}
                    </span>
                    <span className="text-slate-400 font-mono">({msg.email})</span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="text-teal-700 font-medium">{msg.category}</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm">
                    {msg.subject}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-mono font-semibold uppercase ${
                      msg.status === 'unread'
                        ? 'bg-rose-100 text-rose-700'
                        : msg.status === 'replied'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {msg.status}
                  </span>

                  <select
                    value={msg.status}
                    onChange={(e) =>
                      updateContactStatus(
                        msg.id,
                        e.target.value as 'unread' | 'read' | 'replied'
                      )
                    }
                    className="border border-slate-200 rounded px-2 py-1 text-xs bg-white text-slate-700 focus:outline-hidden"
                  >
                    <option value="unread">Mark Unread</option>
                    <option value="read">Mark Read</option>
                    <option value="replied">Mark Replied</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-slate-50/80 rounded border border-slate-100 text-xs text-slate-700 leading-relaxed">
                {msg.message}
              </div>

              <div className="text-[10px] text-slate-400 font-mono">
                Logged at: {msg.createdAt.replace('T', ' ').substring(0, 16)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
