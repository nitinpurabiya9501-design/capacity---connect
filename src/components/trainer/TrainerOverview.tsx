import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  Users,
  HelpCircle,
  Award,
  Plus,
  ArrowRight,
  TrendingUp,
  FileCheck,
} from 'lucide-react';

export const TrainerOverview: React.FC = () => {
  const {
    currentUser,
    courses,
    enrollments,
    quizzes,
    quizAttempts,
    setDashboardTab,
  } = useApp();

  const trainerCourses = courses.filter((c) => c.trainerId === currentUser?.id);
  const trainerCourseIds = trainerCourses.map((c) => c.id);

  const trainerEnrollments = enrollments.filter((e) =>
    trainerCourseIds.includes(e.courseId)
  );

  const trainerQuizzes = quizzes.filter((q) =>
    trainerCourseIds.includes(q.courseId)
  );

  const trainerAttempts = quizAttempts.filter((a) =>
    trainerCourseIds.includes(a.courseId)
  );

  const passRate =
    trainerAttempts.length > 0
      ? Math.round(
          (trainerAttempts.filter((a) => a.passed).length /
            trainerAttempts.length) *
            100
        )
      : 85;

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Welcome header */}
      <div className="p-6 border border-slate-200 rounded-lg bg-white space-y-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold text-teal-700 uppercase tracking-wider block">
            Faculty Trainer Console · PBL-I
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Instructor Portal: {currentUser?.name}
          </h1>
          <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
            Manage your courses, author syllabus modules, configure objective assessment quizzes, and monitor trainee competencies.
          </p>
        </div>

        <button
          onClick={() => setDashboardTab('courses-manage')}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Author New Course</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 border border-slate-200 rounded-lg bg-white space-y-1">
          <div className="text-[11px] text-slate-500 font-medium">Courses Authored</div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            {trainerCourses.length}
          </div>
          <div className="text-[11px] text-slate-400">Published curricula</div>
        </div>

        <div className="p-4 border border-slate-200 rounded-lg bg-white space-y-1">
          <div className="text-[11px] text-slate-500 font-medium">Total Trainees Enrolled</div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            {trainerEnrollments.length}
          </div>
          <div className="text-[11px] text-slate-400">Active students</div>
        </div>

        <div className="p-4 border border-slate-200 rounded-lg bg-white space-y-1">
          <div className="text-[11px] text-slate-500 font-medium">Quizzes Configured</div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
            {trainerQuizzes.length}
          </div>
          <div className="text-[11px] text-slate-400">Evaluations live</div>
        </div>

        <div className="p-4 border border-slate-200 rounded-lg bg-white space-y-1">
          <div className="text-[11px] text-slate-500 font-medium">Assessment Pass Rate</div>
          <div className="text-2xl font-bold text-teal-700 font-mono tabular-nums">
            {passRate}%
          </div>
          <div className="text-[11px] text-slate-400">Across student submissions</div>
        </div>
      </div>

      {/* Authored Courses Quick List */}
      <div className="border border-slate-200 rounded-lg p-6 bg-white space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
            Your Active Courses
          </h2>
          <button
            onClick={() => setDashboardTab('courses-manage')}
            className="text-xs text-slate-700 hover:text-slate-900 font-medium flex items-center gap-1 cursor-pointer"
          >
            <span>Manage All Syllabi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3 divide-y divide-slate-100">
          {trainerCourses.map((c) => (
            <div key={c.id} className="pt-3 first:pt-0 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="font-semibold text-slate-900 text-xs block">
                  {c.title}
                </span>
                <div className="text-[11px] text-slate-500 flex items-center gap-2">
                  <span>{c.categoryName}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{c.modules.length} Modules</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{c.enrolledCount} Enrolled</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                    c.isPublished
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {c.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Trainee Submissions */}
      <div className="border border-slate-200 rounded-lg p-6 bg-white space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-teal-600" />
            <span>Recent Trainee Assessment Attempts</span>
          </h2>
          <button
            onClick={() => setDashboardTab('assessment-results')}
            className="text-xs text-slate-600 hover:text-slate-900 font-medium"
          >
            View Full Gradebook →
          </button>
        </div>

        {trainerAttempts.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded">
            No student quiz submissions logged yet for your courses.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="border-b border-slate-200 text-slate-500 font-medium">
                <tr>
                  <th className="pb-2">Trainee</th>
                  <th className="pb-2">Course</th>
                  <th className="pb-2">Score</th>
                  <th className="pb-2">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {trainerAttempts.slice(0, 5).map((att) => (
                  <tr key={att.id}>
                    <td className="py-2.5 font-medium">{att.userName}</td>
                    <td className="py-2.5 text-slate-500 truncate max-w-[200px]">
                      {courses.find((c) => c.id === att.courseId)?.title}
                    </td>
                    <td className="py-2.5 font-mono tabular-nums">{att.scorePercent}%</td>
                    <td className="py-2.5">
                      <span
                        className={`text-[11px] font-medium ${
                          att.passed ? 'text-emerald-700' : 'text-rose-700'
                        }`}
                      >
                        {att.passed ? 'PASSED' : 'FAILED'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
