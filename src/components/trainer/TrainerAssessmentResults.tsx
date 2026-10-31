import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Award, CheckCircle, XCircle, Search, Filter } from 'lucide-react';

export const TrainerAssessmentResults: React.FC = () => {
  const { currentUser, courses, quizAttempts } = useApp();

  const trainerCourses = courses.filter((c) => c.trainerId === currentUser?.id);
  const trainerCourseIds = trainerCourses.map((c) => c.id);

  const attempts = quizAttempts.filter((a) =>
    trainerCourseIds.includes(a.courseId)
  );

  const [search, setSearch] = useState('');
  const [filterResult, setFilterResult] = useState<'all' | 'pass' | 'fail'>('all');

  const filtered = attempts.filter((att) => {
    const matchesSearch =
      att.userName.toLowerCase().includes(search.toLowerCase()) ||
      att.userEmail.toLowerCase().includes(search.toLowerCase());
    const matchesResult =
      filterResult === 'all' ||
      (filterResult === 'pass' && att.passed) ||
      (filterResult === 'fail' && !att.passed);
    return matchesSearch && matchesResult;
  });

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Trainee Assessment Gradebook
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Review examination scores, passing status, and submission timestamps across your courses.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student name or email..."
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-md text-xs bg-white focus:outline-hidden"
          />
        </div>

        <select
          value={filterResult}
          onChange={(e) => setFilterResult(e.target.value as 'all' | 'pass' | 'fail')}
          className="border border-slate-200 rounded-md px-3 py-2 text-xs bg-white text-slate-700 w-full sm:w-auto focus:outline-hidden"
        >
          <option value="all">All Results</option>
          <option value="pass">Passed Attempts Only</option>
          <option value="fail">Failed Attempts Only</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="p-12 border border-slate-200 rounded-lg text-center bg-white text-xs text-slate-500">
          No assessment attempts recorded matching your filter.
        </div>
      ) : (
        <div className="border border-slate-200 rounded-lg overflow-x-auto bg-white">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="p-3">Trainee Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Course Title</th>
                <th className="p-3">Score</th>
                <th className="p-3">Status</th>
                <th className="p-3">Submission Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filtered.map((att) => {
                const course = courses.find((c) => c.id === att.courseId);
                return (
                  <tr key={att.id} className="hover:bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-900">{att.userName}</td>
                    <td className="p-3 font-mono text-slate-500 text-[11px]">{att.userEmail}</td>
                    <td className="p-3 text-slate-700 max-w-[220px] truncate">{course?.title}</td>
                    <td className="p-3 font-mono font-bold tabular-nums">{att.scorePercent}%</td>
                    <td className="p-3">
                      {att.passed ? (
                        <span className="text-emerald-700 font-medium">Passed</span>
                      ) : (
                        <span className="text-rose-700 font-medium">Failed</span>
                      )}
                    </td>
                    <td className="p-3 font-mono text-[11px] text-slate-400">
                      {att.attemptedAt.split('T')[0]}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
