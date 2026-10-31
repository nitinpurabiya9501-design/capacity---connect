import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileSpreadsheet,
  Download,
  Users,
  BookOpen,
  Layers,
  HelpCircle,
  Award,
} from 'lucide-react';

export const AdminReports: React.FC = () => {
  const { exportCsv, users, courses, enrollments, quizAttempts, certificates } = useApp();

  const reports = [
    {
      id: 'users' as const,
      title: 'Institutional Users & Roles Ledger',
      description: 'Comprehensive registry of student trainees, faculty trainers, and administrators with role statuses.',
      count: users.length,
      icon: Users,
    },
    {
      id: 'courses' as const,
      title: 'Course Catalog & Syllabus Metrics',
      description: 'Course identifiers, faculty instructors, duration hours, difficulty tiers, and enrollment tallies.',
      count: courses.length,
      icon: BookOpen,
    },
    {
      id: 'enrollments' as const,
      title: 'Student Enrollments & Progress Data',
      description: 'Detailed records of student course enrollments, milestone percentage completions, and completion states.',
      count: enrollments.length,
      icon: Layers,
    },
    {
      id: 'quizzes' as const,
      title: 'Assessment & Quiz Attempt Results',
      description: 'Audit logs of trainee quiz submissions, percentage scores, pass/fail thresholds, and timestamps.',
      count: quizAttempts.length,
      icon: HelpCircle,
    },
    {
      id: 'certificates' as const,
      title: 'Verifiable Certificate Registry',
      description: 'Master list of all issued certificates, verification identification numbers, honors grades, and issue dates.',
      count: certificates.length,
      icon: Award,
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Institutional Reports & CSV Export Engine
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Generate RFC 4180 compliant CSV exports for academic accreditation audits, faculty evaluations, and departmental records.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((rpt) => {
          const Icon = rpt.icon;
          return (
            <div
              key={rpt.id}
              className="border border-slate-200 rounded-lg p-5 bg-white space-y-4 flex flex-col justify-between shadow-xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded bg-slate-100 text-slate-800 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-xs text-slate-500 tabular-nums">
                    {rpt.count} Records Available
                  </span>
                </div>

                <h3 className="font-semibold text-slate-900 text-sm">
                  {rpt.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {rpt.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">
                  Format: .CSV (UTF-8)
                </span>
                <button
                  onClick={() => exportCsv(rpt.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
