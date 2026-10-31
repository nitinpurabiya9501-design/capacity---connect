import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Server,
  Database,
  Lock,
  Code2,
  FileCheck2,
  GraduationCap,
  Users2,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setActivePage, setIsPblModalOpen } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* Title */}
      <div className="space-y-4 border-b border-slate-200 pb-8">
        <div className="text-xs font-semibold text-teal-700 tracking-wider uppercase">
          Project-Based Learning I (PBL-I) Capstone
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          About CAPACITY CONNECT
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
          A dedicated institutional capacity-building portal and learning management system engineered to track, evaluate, and certify student software engineering competencies.
        </p>
      </div>

      {/* Project Background & Motivation */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Project Background & Motivation
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Traditional learning management systems often focus purely on content delivery while leaving students’ actual competency acquisition untracked. In response, this PBL-I project was conceptualized to create a lightweight, minimal, and fully auditable portal.
        </p>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          The portal bridges classroom instruction with industry-readiness by pairing modular syllabi with objective competency benchmarks, interactive multi-choice assessments, and tamper-evident certificate issuance.
        </p>
      </section>

      {/* The 3 Pillars */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Core Pillars of Capacity Building
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 border border-slate-200 rounded-lg bg-white space-y-2">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              01. Technical Literacy
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Foundational grounding in HTTP client-server mechanics, session lifecycle management, and relational database normalization up to 3NF.
            </p>
          </div>

          <div className="p-5 border border-slate-200 rounded-lg bg-white space-y-2">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              02. Applied Engineering
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hands-on mastery of object-oriented PHP 8+, parameterized PDO queries, secure upload handling, and transaction safety.
            </p>
          </div>

          <div className="p-5 border border-slate-200 rounded-lg bg-white space-y-2">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              03. Evaluation & Verification
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Server-side timed assessments with randomized multiple-choice questions, grade calculations, and unique verifiable certificate numbering.
            </p>
          </div>
        </div>
      </section>

      {/* Architectural Overview */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Three-Tier System Architecture
        </h2>

        <div className="border border-slate-200 rounded-lg divide-y divide-slate-200 bg-white overflow-hidden text-xs">
          <div className="p-4 flex items-start gap-4">
            <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center shrink-0 text-slate-800">
              <Code2 className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <span className="font-semibold text-slate-900 block text-sm">
                Presentation Layer (Frontend)
              </span>
              <p className="text-slate-600 leading-relaxed">
                Clean, minimal, responsive user interface following Linear and Notion design principles. Zero-pill typographic discipline, single-elevation cards, high contrast, and accessible keyboard navigation.
              </p>
            </div>
          </div>

          <div className="p-4 flex items-start gap-4">
            <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center shrink-0 text-slate-800">
              <Server className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <span className="font-semibold text-slate-900 block text-sm">
                Application Logic & Security (PHP 8+)
              </span>
              <p className="text-slate-600 leading-relaxed">
                Strictly typed PHP 8+ controllers, session governance with HttpOnly and SameSite cookie attributes, CSRF token validation on all mutating POST requests, and role-based access control (RBAC).
              </p>
            </div>
          </div>

          <div className="p-4 flex items-start gap-4">
            <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center shrink-0 text-slate-800">
              <Database className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <span className="font-semibold text-slate-900 block text-sm">
                Persistence Layer (MySQL / InnoDB)
              </span>
              <p className="text-slate-600 leading-relaxed">
                17 relational entities with strict foreign key constraints, composite B-Tree indexes for fast JOINs and filtering, full transaction support, and UTF-8 mb4 encoding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Access Controls */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Security Guarantees
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 border border-slate-200 rounded-lg space-y-1 bg-slate-50/50">
            <div className="font-semibold text-slate-900 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-teal-600" />
              <span>SQL Injection Immunity</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              100% of database interactions leverage PDO prepared statements with native parameter binding.
            </p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg space-y-1 bg-slate-50/50">
            <div className="font-semibold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>Privilege Escalation Prevention</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Registration endpoints strictly restrict self-assignment to Trainee or Trainer. Administrator accounts cannot be created via public signup.
            </p>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <div className="p-6 border border-slate-200 rounded-lg bg-slate-50 flex items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-slate-900 text-sm">
            View Complete Database Script & Documentation
          </h3>
          <p className="text-xs text-slate-500">
            Download the database.sql schema, setup manual, and sample project archive.
          </p>
        </div>
        <button
          onClick={() => setIsPblModalOpen(true)}
          className="px-4 py-2 bg-slate-900 text-white rounded text-xs font-medium hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
        >
          View Deliverables
        </button>
      </div>
    </div>
  );
};
