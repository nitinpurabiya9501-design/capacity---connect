import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  BookOpen,
  Layers,
  Award,
  Bell,
  Mail,
  FileSpreadsheet,
  ShieldCheck,
  Database,
  ArrowRight,
  Plus,
} from 'lucide-react';

export const AdminOverview: React.FC = () => {
  const {
    users,
    courses,
    enrollments,
    certificates,
    contactMessages,
    announcements,
    setDashboardTab,
    setIsPblModalOpen,
  } = useApp();

  const traineesCount = users.filter((u) => u.role === 'trainee').length;
  const trainersCount = users.filter((u) => u.role === 'trainer').length;
  const unreadMessagesCount = contactMessages.filter(
    (m) => m.status === 'unread'
  ).length;

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="p-6 border border-slate-200 rounded-lg bg-white space-y-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold text-teal-700 uppercase tracking-wider block">
            Institutional Administration · PBL-I
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            System Administration Console
          </h1>
          <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
            Central governance of user roles, course catalog approvals, academic announcements, and exportable compliance reports.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setDashboardTab('reports')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded text-xs font-medium cursor-pointer shadow-xs"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-teal-600" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setDashboardTab('users')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 border border-slate-200 rounded-lg bg-white space-y-1">
          <div className="text-[11px] text-slate-500 font-medium">Registered Users</div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            {users.length}
          </div>
          <div className="text-[11px] text-slate-400">
            {traineesCount} Trainees · {trainersCount} Trainers
          </div>
        </div>

        <div className="p-4 border border-slate-200 rounded-lg bg-white space-y-1">
          <div className="text-[11px] text-slate-500 font-medium">Active Courses</div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            {courses.length}
          </div>
          <div className="text-[11px] text-slate-400">Curricula in catalog</div>
        </div>

        <div className="p-4 border border-slate-200 rounded-lg bg-white space-y-1">
          <div className="text-[11px] text-slate-500 font-medium">Total Enrollments</div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            {enrollments.length}
          </div>
          <div className="text-[11px] text-teal-700 font-medium">
            {enrollments.filter((e) => e.isCompleted).length} Completed
          </div>
        </div>

        <div className="p-4 border border-slate-200 rounded-lg bg-white space-y-1">
          <div className="text-[11px] text-slate-500 font-medium">Certificates Issued</div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            {certificates.length}
          </div>
          <div className="text-[11px] text-slate-400">100% Verified hash</div>
        </div>
      </div>

      {/* Operations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Management Links */}
        <div className="border border-slate-200 rounded-lg p-5 bg-white space-y-3">
          <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">
            Quick Actions
          </h3>
          <div className="space-y-1.5 text-xs">
            <button
              onClick={() => setDashboardTab('users')}
              className="w-full p-2 rounded hover:bg-slate-50 text-left flex items-center justify-between text-slate-700 cursor-pointer"
            >
              <span>User & Role Permissions</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
            <button
              onClick={() => setDashboardTab('courses-admin')}
              className="w-full p-2 rounded hover:bg-slate-50 text-left flex items-center justify-between text-slate-700 cursor-pointer"
            >
              <span>Manage Course Categories</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
            <button
              onClick={() => setDashboardTab('announcements')}
              className="w-full p-2 rounded hover:bg-slate-50 text-left flex items-center justify-between text-slate-700 cursor-pointer"
            >
              <span>Broadcast Announcement</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
            <button
              onClick={() => setDashboardTab('certificates-admin')}
              className="w-full p-2 rounded hover:bg-slate-50 text-left flex items-center justify-between text-slate-700 cursor-pointer"
            >
              <span>Certificate Master Ledger</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Inbound Contact Messages */}
        <div className="border border-slate-200 rounded-lg p-5 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-teal-600" />
              <span>Inbound Inquiries</span>
            </h3>
            {unreadMessagesCount > 0 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 font-mono font-semibold">
                {unreadMessagesCount} unread
              </span>
            )}
          </div>

          <div className="space-y-2 text-xs">
            {contactMessages.slice(0, 3).map((msg) => (
              <div
                key={msg.id}
                onClick={() => setDashboardTab('contact-messages')}
                className="p-2.5 rounded bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer space-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-900 truncate">
                    {msg.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {msg.createdAt.split('T')[0]}
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] truncate">
                  {msg.subject}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Database & Architecture Summary */}
        <div className="border border-slate-200 rounded-lg p-5 bg-white space-y-3">
          <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-teal-600" />
            <span>Database Integrity (MySQL 8.0)</span>
          </h3>
          <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <span>Database Engine:</span>
              <strong className="text-slate-900 font-mono">InnoDB</strong>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <span>Relational Tables:</span>
              <strong className="text-slate-900 font-mono">17 Tables</strong>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <span>Charset:</span>
              <strong className="text-slate-900 font-mono">utf8mb4_unicode_ci</strong>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <span>Security Layer:</span>
              <strong className="text-emerald-700 font-mono">PDO Prepared</strong>
            </div>
          </div>

          <button
            onClick={() => setIsPblModalOpen(true)}
            className="w-full py-1.5 mt-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-xs font-medium cursor-pointer"
          >
            View SQL Deliverable & XAMPP
          </button>
        </div>
      </div>
    </div>
  );
};
