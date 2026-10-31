import React from 'react';
import { useApp } from '../context/AppContext';
import { Database, RotateCcw, ShieldCheck, Terminal, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    setActivePage,
    quickLoginAs,
    currentUser,
    resetAllData,
    setIsPblModalOpen,
  } = useApp();

  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-20 text-slate-600 text-xs">
      {/* Evaluator Quick Role Switcher Bar */}
      <div className="border-b border-slate-200/80 bg-white/60 py-3 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-700 font-medium">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>PBL-I Evaluator Role Switcher:</span>
            <span className="text-slate-400 text-[11px]">
              (Current:{' '}
              <strong className="text-slate-900 uppercase">
                {currentUser ? currentUser.role : 'Guest'}
              </strong>
              )
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => quickLoginAs('admin')}
              className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium transition-colors cursor-pointer"
            >
              Admin Dashboard
            </button>
            <button
              onClick={() => quickLoginAs('trainer')}
              className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium transition-colors cursor-pointer"
            >
              Trainer Dashboard
            </button>
            <button
              onClick={() => quickLoginAs('trainee')}
              className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium transition-colors cursor-pointer"
            >
              Trainee Dashboard
            </button>
            <span className="text-slate-300" aria-hidden="true">|</span>
            <button
              onClick={resetAllData}
              title="Reset state to initial sample records"
              className="flex items-center gap-1 px-2 py-1 rounded text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Demo Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Information */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                CC
              </div>
              <span className="font-semibold text-slate-900 text-sm tracking-tight">
                CAPACITY CONNECT
              </span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed max-w-md">
              A Digital Capacity Building and Learning Management Portal developed for the PBL-I
              college capstone curriculum. Built using PHP 8+, MySQL, HTML5, and modular full-stack architecture for university skills tracking.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[11px] text-slate-400">
              <span>MySQL 8.0 Engine</span>
              <span aria-hidden="true">·</span>
              <span>PDO Prepared Statements</span>
              <span aria-hidden="true">·</span>
              <span>Strict RBAC</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-slate-900 text-xs tracking-wider uppercase mb-3">
              Portal Directory
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setActivePage('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-slate-900 transition-colors"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-slate-900 transition-colors"
                >
                  About PBL-I Project
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('courses');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-slate-900 transition-colors"
                >
                  Curriculum & Courses
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-slate-900 transition-colors"
                >
                  Contact Coordinators
                </button>
              </li>
            </ul>
          </div>

          {/* Deliverables & XAMPP */}
          <div>
            <h4 className="font-semibold text-slate-900 text-xs tracking-wider uppercase mb-3">
              Deliverables & Setup
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setIsPblModalOpen(true)}
                  className="hover:text-teal-700 transition-colors flex items-center gap-1.5"
                >
                  <Database className="w-3.5 h-3.5 text-teal-600" />
                  <span>database.sql File</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsPblModalOpen(true)}
                  className="hover:text-teal-700 transition-colors flex items-center gap-1.5"
                >
                  <Terminal className="w-3.5 h-3.5 text-teal-600" />
                  <span>XAMPP Setup Guide</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsPblModalOpen(true)}
                  className="hover:text-teal-700 transition-colors flex items-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5 text-teal-600" />
                  <span>Download .ZIP Package</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © 2026 Capacity Connect — Digital Capacity Building Portal. Project-Based Learning I (PBL-I).
          </div>
          <div>
            Lead Student Coordinator: Nitin Purabiya · Institutional Deployment
          </div>
        </div>
      </div>
    </footer>
  );
};
