import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  Award,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Bell,
  Clock,
  Sparkles,
} from 'lucide-react';

export const TraineeOverview: React.FC = () => {
  const {
    currentUser,
    courses,
    enrollments,
    certificates,
    quizzes,
    quizAttempts,
    announcements,
    setDashboardTab,
    setSelectedCourseId,
  } = useApp();

  const userEnrollments = enrollments.filter(
    (e) => e.userId === currentUser?.id
  );
  const userCertificates = certificates.filter(
    (c) => c.userId === currentUser?.id
  );
  const userAttempts = quizAttempts.filter(
    (a) => a.userId === currentUser?.id
  );

  // Active course with highest progress or first enrolled
  const activeEnrollment = userEnrollments[0];
  const activeCourse = activeEnrollment
    ? courses.find((c) => c.id === activeEnrollment.courseId)
    : null;

  const relevantAnnouncements = announcements.filter(
    (a) => a.targetRole === 'all' || a.targetRole === 'trainee'
  );

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Welcome banner */}
      <div className="p-6 border border-slate-200 rounded-lg bg-white space-y-2">
        <span className="text-[11px] font-semibold text-teal-700 uppercase tracking-wider block">
          Trainee Learning Portal · PBL-I
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Welcome back, {currentUser?.name}
        </h1>
        <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
          Track your course completion, review technical reading materials, attempt timed assessments, and earn verifiable capacity certifications.
        </p>
      </div>

      {/* KPI Stat Cards (Single-elevation, tabular nums) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 border border-slate-200 rounded-lg bg-white space-y-1">
          <div className="text-[11px] text-slate-500 font-medium">Enrolled Courses</div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            {userEnrollments.length}
          </div>
          <div className="text-[11px] text-slate-400">Active enrollments</div>
        </div>

        <div className="p-4 border border-slate-200 rounded-lg bg-white space-y-1">
          <div className="text-[11px] text-slate-500 font-medium">Certificates Earned</div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            {userCertificates.length}
          </div>
          <div className="text-[11px] text-teal-700 font-medium">Verified credentials</div>
        </div>

        <div className="p-4 border border-slate-200 rounded-lg bg-white space-y-1">
          <div className="text-[11px] text-slate-500 font-medium">Quizzes Attempted</div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            {userAttempts.length}
          </div>
          <div className="text-[11px] text-slate-400">Assessment logs</div>
        </div>

        <div className="p-4 border border-slate-200 rounded-lg bg-white space-y-1">
          <div className="text-[11px] text-slate-500 font-medium">Average Progress</div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            {userEnrollments.length > 0
              ? Math.round(
                  userEnrollments.reduce((sum, e) => sum + e.progressPercent, 0) /
                    userEnrollments.length
                )
              : 0}
            %
          </div>
          <div className="text-[11px] text-slate-400">Across enrolled tracks</div>
        </div>
      </div>

      {/* Active Resume Learning Card */}
      {activeCourse && activeEnrollment && (
        <div className="border border-slate-200 rounded-lg p-6 bg-white space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Continue Learning
              </span>
              <h3 className="font-semibold text-slate-900 text-base">
                {activeCourse.title}
              </h3>
            </div>
            <button
              onClick={() => {
                setSelectedCourseId(activeCourse.id);
                setDashboardTab('my-courses');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded text-xs font-medium hover:bg-slate-800 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <span>Resume Player</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600">Course Progress</span>
              <span className="font-mono font-semibold text-slate-900 tabular-nums">
                {activeEnrollment.progressPercent}%
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-slate-900 h-full rounded-full transition-all duration-300"
                style={{ width: `${activeEnrollment.progressPercent}%` }}
              ></div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 flex items-center gap-3">
            <span>Instructor: {activeCourse.trainerName}</span>
            <span aria-hidden="true">·</span>
            <span>{activeEnrollment.completedLessonIds.length} lessons completed</span>
          </div>
        </div>
      )}

      {/* Announcements and Quick Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Announcements */}
        <div className="border border-slate-200 rounded-lg p-5 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
              <Bell className="w-3.5 h-3.5 text-teal-600" />
              <span>Institutional Announcements</span>
            </h3>
            <span className="text-[11px] text-slate-400 font-mono tabular-nums">
              {relevantAnnouncements.length} notices
            </span>
          </div>

          <div className="space-y-3 divide-y divide-slate-100">
            {relevantAnnouncements.map((ann) => (
              <div key={ann.id} className="pt-3 first:pt-0 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-medium text-slate-900 text-xs block">
                    {ann.title}
                  </span>
                  {ann.priority === 'important' && (
                    <span className="text-[10px] text-amber-700 font-medium shrink-0">
                      [Priority]
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {ann.content}
                </p>
                <div className="text-[10px] text-slate-400 pt-0.5">
                  By {ann.authorName}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Navigation actions */}
        <div className="border border-slate-200 rounded-lg p-5 bg-white space-y-3 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-3">
              Recommended Next Actions
            </h3>
            <div className="space-y-2 text-xs">
              <button
                onClick={() => setDashboardTab('quizzes')}
                className="w-full p-2.5 bg-slate-50 hover:bg-slate-100 rounded-md text-left transition-colors flex items-center justify-between cursor-pointer"
              >
                <div>
                  <span className="font-medium text-slate-900 block">Take Assessment Quiz</span>
                  <span className="text-[11px] text-slate-500">Test knowledge & earn certificate</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => setDashboardTab('competencies')}
                className="w-full p-2.5 bg-slate-50 hover:bg-slate-100 rounded-md text-left transition-colors flex items-center justify-between cursor-pointer"
              >
                <div>
                  <span className="font-medium text-slate-900 block">View Competency Profile</span>
                  <span className="text-[11px] text-slate-500">Analyze skill gaps and targets</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => setDashboardTab('catalog')}
                className="w-full p-2.5 bg-slate-50 hover:bg-slate-100 rounded-md text-left transition-colors flex items-center justify-between cursor-pointer"
              >
                <div>
                  <span className="font-medium text-slate-900 block">Explore Catalog</span>
                  <span className="text-[11px] text-slate-500">Enroll in additional tracks</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded text-[11px] text-slate-500 border border-slate-100">
            PBL-I Project Phase 1 Evaluation is active. Keep course progress above 70%.
          </div>
        </div>
      </div>
    </div>
  );
};
