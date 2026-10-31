import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Award,
  Search,
  Plus,
  Trash2,
  CheckCircle,
  X,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { Certificate } from '../../types';

export const AdminCertificates: React.FC = () => {
  const {
    certificates,
    users,
    courses,
    issueCertificateManual,
    revokeCertificate,
    setViewingCertificate,
  } = useApp();

  const [search, setSearch] = useState('');
  const [isManualIssueOpen, setIsManualIssueOpen] = useState(false);

  // Manual issuance state
  const [targetUserId, setTargetUserId] = useState(
    users.find((u) => u.role === 'trainee')?.id || users[0]?.id || ''
  );
  const [targetCourseId, setTargetCourseId] = useState(courses[0]?.id || '');
  const [grade, setGrade] = useState<'Distinction' | 'Merit' | 'Pass'>('Distinction');
  const [score, setScore] = useState(95);

  const filtered = certificates.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.certificateNumber.toLowerCase().includes(q) ||
      c.userName.toLowerCase().includes(q) ||
      c.courseTitle.toLowerCase().includes(q)
    );
  });

  const handleManualIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUserId || !targetCourseId) return;

    issueCertificateManual(targetUserId, targetCourseId, grade, Number(score));
    setIsManualIssueOpen(false);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Certificate Registry & Verification Authority
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit master certificate registry, verify credentials by Certificate ID, or manually issue institutional honours.
          </p>
        </div>

        <button
          onClick={() => setIsManualIssueOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Manual Certificate Issue</span>
        </button>
      </div>

      <div className="max-w-md">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Lookup by Certificate ID (e.g. CC-2026-8941) or student name..."
          className="w-full px-3 py-2 border border-slate-200 rounded-md text-xs bg-white focus:outline-hidden"
        />
      </div>

      <div className="border border-slate-200 rounded-lg overflow-x-auto bg-white shadow-xs">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
            <tr>
              <th className="p-3">Certificate Number</th>
              <th className="p-3">Recipient Trainee</th>
              <th className="p-3">Course Title</th>
              <th className="p-3">Grade</th>
              <th className="p-3">Score</th>
              <th className="p-3">Issue Date</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {filtered.map((cert) => (
              <tr key={cert.id} className="hover:bg-slate-50/50">
                <td className="p-3 font-mono font-bold text-slate-900">
                  {cert.certificateNumber}
                </td>
                <td className="p-3 font-medium">{cert.userName}</td>
                <td className="p-3 text-slate-700 max-w-[220px] truncate">
                  {cert.courseTitle}
                </td>
                <td className="p-3">
                  <span className="font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                    {cert.grade}
                  </span>
                </td>
                <td className="p-3 font-mono tabular-nums">{cert.scorePercent}%</td>
                <td className="p-3 font-mono text-[11px] text-slate-400">
                  {cert.issueDate}
                </td>
                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() => {
                      if (window.confirm(`Revoke certificate ${cert.certificateNumber}?`)) {
                        revokeCertificate(cert.id);
                      }
                    }}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                    title="Revoke certificate"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Manual Issue Modal */}
      {isManualIssueOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-semibold text-slate-900 text-sm">
                Manually Grant Verifiable Certificate
              </h3>
              <button
                onClick={() => setIsManualIssueOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleManualIssue} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-medium text-slate-700 block">Recipient Trainee *</label>
                <select
                  value={targetUserId}
                  onChange={(e) => setTargetUserId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md bg-white text-slate-700"
                >
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-medium text-slate-700 block">Completed Course *</label>
                <select
                  value={targetCourseId}
                  onChange={(e) => setTargetCourseId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md bg-white text-slate-700"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-medium text-slate-700 block">Honours Grade</label>
                  <select
                    value={grade}
                    onChange={(e) =>
                      setGrade(e.target.value as 'Distinction' | 'Merit' | 'Pass')
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-md bg-white text-slate-700"
                  >
                    <option value="Distinction">Distinction (≥90%)</option>
                    <option value="Merit">Merit (75%-89%)</option>
                    <option value="Pass">Pass (70%-74%)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-slate-700 block">Score %</label>
                  <input
                    type="number"
                    value={score}
                    onChange={(e) => setScore(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsManualIssueOpen(false)}
                  className="px-3 py-1.5 border border-slate-300 text-slate-700 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-slate-900 text-white rounded font-medium"
                >
                  Generate Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
