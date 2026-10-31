import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowRight,
  BookOpen,
  Target,
  BarChart3,
  CheckCircle,
  FileText,
  Clock,
  Layers,
  Shield,
  Download,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { courses, setActivePage, setSelectedCourseId, setIsPblModalOpen } = useApp();

  const previewCourses = courses.slice(0, 3);

  return (
    <div className="space-y-24">
      {/* 1. Minimal Hero Section */}
      <section className="pt-12 sm:pt-20 pb-8 text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
          <span>PBL-I Academic Capstone Project · Computer Engineering</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6 text-balance">
          Build Skills. Grow Capabilities.
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 font-normal leading-relaxed text-balance">
          CAPACITY CONNECT is an institutional digital learning and capacity-building portal. 
          Structured modular curriculum, server-side assessment validation, and competency mapping designed for university engineering cohorts.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              setActivePage('courses');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-sm font-medium transition-colors shadow-xs cursor-pointer"
          >
            <span>Browse Courses</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsPblModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-md text-sm font-medium transition-colors shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4 text-teal-600" />
            <span>PBL-I Deliverables & XAMPP</span>
          </button>
        </div>

        {/* Hero Visual Asset */}
        <div className="mt-12 rounded-lg border border-slate-200 overflow-hidden shadow-xs bg-white">
          <img
            src="/src/assets/images/hero_capacity_portal_1791712564807.jpg"
            alt="Modern Minimalist Capacity Building Learning Workspace"
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-[460px] object-cover"
          />
        </div>
      </section>

      {/* 2. Three Key Features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            A Unified Capacity Building Framework
          </h2>
          <p className="text-xs text-slate-500 mt-2">
            Engineered around three core pedagogical pillars to bridge academic theory and technical proficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="border border-slate-200 rounded-lg p-6 bg-white space-y-3">
            <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center text-slate-800">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              Structured Learning
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Carefully organized modules with sequential lessons, markdown reading notes, and downloadable PDF technical guides curated by department faculty.
            </p>
            <div className="text-[11px] text-slate-400 pt-2 flex items-center gap-2">
              <span>Modular Syllabi</span>
              <span aria-hidden="true">·</span>
              <span>Reading Durations</span>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="border border-slate-200 rounded-lg p-6 bg-white space-y-3">
            <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center text-slate-800">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              Skill Development
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Objective competency mapping measures student proficiency across full-stack engineering, SQL design, Linux systems, and cybersecurity benchmarks.
            </p>
            <div className="text-[11px] text-slate-400 pt-2 flex items-center gap-2">
              <span>Competency Radar</span>
              <span aria-hidden="true">·</span>
              <span>Smart Recommendations</span>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="border border-slate-200 rounded-lg p-6 bg-white space-y-3">
            <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center text-slate-800">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              Progress Tracking
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Real-time server-side tracking of lesson completions, interactive timed quizzes, passing threshold validation, and verifiable certificate issuance.
            </p>
            <div className="text-[11px] text-slate-400 pt-2 flex items-center gap-2">
              <span>Automated Scoring</span>
              <span aria-hidden="true">·</span>
              <span>Unique Verification IDs</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Preview of Available Courses */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Available Courses Preview
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Curated by faculty trainers for the current academic session.
            </p>
          </div>
          <button
            onClick={() => {
              setActivePage('courses');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-medium text-slate-900 hover:text-teal-700 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previewCourses.map((course) => (
            <div
              key={course.id}
              className="border border-slate-200 rounded-lg bg-white overflow-hidden flex flex-col transition-all hover:border-slate-300 shadow-xs"
            >
              {/* Thumbnail */}
              <div className="aspect-16/9 bg-slate-100 overflow-hidden relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  {/* Clean unboxed metadata (anti-pill discipline) */}
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5 flex-wrap">
                    <span>{course.categoryName}</span>
                    <span aria-hidden="true">·</span>
                    <span>{course.level}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{course.durationHours} hrs</span>
                  </div>

                  <h3 className="font-semibold text-slate-900 text-sm leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {course.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    By {course.trainerName}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedCourseId(course.id);
                      setActivePage('course-detail');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-3 py-1.5 text-xs font-medium rounded bg-slate-100 hover:bg-slate-200 text-slate-900 transition-colors cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. College Project Demonstration Callout */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="p-8 border border-slate-200 rounded-lg bg-slate-50/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="font-semibold text-slate-900 text-lg">
              Ready for Local Deployment with XAMPP
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every table, constraint, prepared statement, and session verification is prepared for immediate evaluation. Download the full project ZIP or import the provided MySQL schema directly.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsPblModalOpen(true)}
              className="px-4 py-2 bg-slate-900 text-white rounded text-xs font-medium hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Open Deliverables
            </button>
            <button
              onClick={() => {
                setActivePage('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded text-xs font-medium hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Read Project Spec
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
