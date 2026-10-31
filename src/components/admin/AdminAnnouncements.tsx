import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, Plus, Trash2, X, Send } from 'lucide-react';

export const AdminAnnouncements: React.FC = () => {
  const { announcements, addAnnouncement, deleteAnnouncement } = useApp();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [targetRole, setTargetRole] = useState<'all' | 'trainee' | 'trainer'>('all');
  const [priority, setPriority] = useState<'normal' | 'important'>('normal');

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    addAnnouncement({
      title: title.trim(),
      content: content.trim(),
      targetRole,
      priority,
    });

    setIsAddOpen(false);
    setTitle('');
    setContent('');
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            System Announcements & Institutional Broadcasts
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Publish notices to student trainees, faculty trainers, or all platform participants.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Broadcast Notice</span>
        </button>
      </div>

      <div className="space-y-3">
        {announcements.map((ann) => (
          <div
            key={ann.id}
            className="border border-slate-200 rounded-lg p-5 bg-white space-y-3 shadow-xs"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="font-semibold text-teal-700 uppercase tracking-wide">
                    Target: {ann.targetRole.toUpperCase()}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Author: {ann.authorName}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-slate-400">{ann.createdAt.split('T')[0]}</span>
                </div>
                <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
                  <span>{ann.title}</span>
                  {ann.priority === 'important' && (
                    <span className="text-[10px] text-rose-700 bg-rose-50 px-2 py-0.5 rounded font-mono font-semibold">
                      HIGH PRIORITY
                    </span>
                  )}
                </h3>
              </div>

              <button
                onClick={() => {
                  if (window.confirm('Delete this announcement?')) {
                    deleteAnnouncement(ann.id);
                  }
                }}
                className="p-1 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                title="Delete announcement"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              {ann.content}
            </p>
          </div>
        ))}
      </div>

      {/* Broadcast Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-semibold text-slate-900 text-sm">
                Broadcast New Institutional Announcement
              </h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBroadcast} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-medium text-slate-700 block">Notice Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Schedule for PBL-I Interim Assessment"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-medium text-slate-700 block">Target Audience</label>
                  <select
                    value={targetRole}
                    onChange={(e) =>
                      setTargetRole(e.target.value as 'all' | 'trainee' | 'trainer')
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-md bg-white text-slate-700"
                  >
                    <option value="all">All Users (Trainees & Trainers)</option>
                    <option value="trainee">Student Trainees Only</option>
                    <option value="trainer">Faculty Trainers Only</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-slate-700 block">Priority Level</label>
                  <select
                    value={priority}
                    onChange={(e) =>
                      setPriority(e.target.value as 'normal' | 'important')
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-md bg-white text-slate-700"
                  >
                    <option value="normal">Normal</option>
                    <option value="important">Important / Urgent</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-medium text-slate-700 block">Notice Body *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Detailed instructions or bulletin notice..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-3 py-1.5 border border-slate-300 text-slate-700 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-slate-900 text-white rounded font-medium"
                >
                  Broadcast Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
