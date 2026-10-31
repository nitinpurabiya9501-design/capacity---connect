import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Layers, Search, CheckCircle, Clock } from 'lucide-react';

export const AdminEnrollments: React.FC = () => {
  const { enrollments, users, courses } = useApp();
  const [search, setSearch] = useState('');

  const filtered = enrollments.filter((e) => {
    const user = users.find((u) => u.id === e.userId);
    const course = courses.find((c) => c.id === e.courseId);
    const text = `${user?.name || ''} ${user?.email || ''} ${course?.title || ''}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Enrollment & Student Progress Ledger
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          System-wide audit trail of all course enrollments, milestone completion percentages, and completion dates.
        </p>
      </div>

      <div className="max-w-md">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by student name, email, or course..."
          className="w-full px-3 py-2 border border-slate-200 rounded-md text-xs bg-white focus:outline-hidden"
        />
      </div>

      <div className="border border-slate-200 rounded-lg overflow-x-auto bg-white shadow-xs">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
            <tr>
              <th className="p-3">Trainee</th>
              <th className="p-3">Course Title</th>
              <th className="p-3">Completion Progress</th>
              <th className="p-3">Status</th>
              <th className="p-3">Enrolled Date</th>
              <th className="p-3">Completed Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {filtered.map((enr) => {
              const user = users.find((u) => u.id === enr.userId);
              const course = courses.find((c) => c.id === enr.courseId);

              return (
                <tr key={enr.id} className="hover:bg-slate-50/50">
                  <td className="p-3">
                    <span className="font-semibold text-slate-900 block">
                      {user?.name || 'Trainee'}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {user?.email}
                    </span>
                  </td>
                  <td className="p-3 text-slate-700 max-w-[240px] truncate">
                    {course?.title}
                  </td>
                  <td className="p-3 w-48">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span>{enr.completedLessonIds.length} lessons</span>
                        <strong className="text-slate-900 tabular-nums">{enr.progressPercent}%</strong>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-slate-900 h-full rounded-full"
                          style={{ width: `${enr.progressPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    {enr.isCompleted ? (
                      <span className="text-emerald-700 font-medium">Completed</span>
                    ) : (
                      <span className="text-slate-500">In Progress</span>
                    )}
                  </td>
                  <td className="p-3 font-mono text-[11px] text-slate-400">
                    {enr.enrolledAt.split('T')[0]}
                  </td>
                  <td className="p-3 font-mono text-[11px] text-slate-400">
                    {enr.completedAt ? enr.completedAt.split('T')[0] : '—'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
