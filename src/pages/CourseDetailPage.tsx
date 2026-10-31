import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Award,
  CheckCircle2,
  FileText,
  User,
  ChevronDown,
  ChevronUp,
  Download,
} from 'lucide-react';

export const CourseDetailPage: React.FC = () => {
  const {
    courses,
    selectedCourseId,
    setActivePage,
    setSelectedCourseId,
    enrollCourse,
    isEnrolled,
    setDashboardTab,
    quizzes,
  } = useApp();

  const course = courses.find((c) => c.id === selectedCourseId) || courses[0];
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(
    course?.modules[0]?.id || null
  );

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <p className="text-sm text-slate-500">Course not found.</p>
        <button
          onClick={() => setActivePage('courses')}
          className="mt-4 px-4 py-2 bg-slate-900 text-white rounded text-xs"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const enrolled = isEnrolled(course.id);
  const courseQuiz = quizzes.find((q) => q.courseId === course.id);

  const totalLessons = course.modules.reduce(
    (acc, m) => acc + m.lessons.length,
    0
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Back button */}
      <div>
        <button
          onClick={() => {
            setActivePage('courses');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 font-medium transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Courses Catalog</span>
        </button>
      </div>

      {/* Hero Banner Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-4">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span>{course.categoryName}</span>
            <span aria-hidden="true">·</span>
            <span>{course.level} Level</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{course.durationHours} Hours Duration</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-snug">
            {course.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {course.description}
          </p>

          {/* Competency mapping */}
          <div className="pt-2">
            <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Targeted Competency Acquisitions
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {course.competencies.map((comp, idx) => (
                <div
                  key={idx}
                  className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded font-medium"
                >
                  {comp}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enrollment card / Sticky sidebar */}
        <div className="border border-slate-200 rounded-lg p-6 bg-white space-y-5 shadow-xs">
          <div className="aspect-16/9 rounded bg-slate-100 overflow-hidden">
            <img
              src={course.thumbnail}
              alt={course.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <span>Syllabus Modules:</span>
              <strong className="text-slate-900 tabular-nums">{course.modules.length} Modules</strong>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <span>Total Lessons:</span>
              <strong className="text-slate-900 tabular-nums">{totalLessons} Lessons</strong>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <span>Enrolled Cohort:</span>
              <strong className="text-slate-900 tabular-nums">{course.enrolledCount} Trainees</strong>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-100">
              <span>Certification:</span>
              <strong className="text-teal-700">Verified Certificate Available</strong>
            </div>
          </div>

          <div>
            {enrolled ? (
              <button
                onClick={() => {
                  setSelectedCourseId(course.id);
                  setActivePage('dashboard');
                  setDashboardTab('my-courses');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-xs font-medium transition-colors cursor-pointer text-center"
              >
                Continue in Learning Player
              </button>
            ) : (
              <button
                onClick={() => enrollCourse(course.id)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-xs font-medium transition-colors cursor-pointer text-center"
              >
                Enroll in Course (Free Academic Access)
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Curriculum Syllabus Breakdown */}
      <section className="space-y-4 pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Curriculum & Course Syllabus
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Sequential modules designed for structured self-paced mastery.
            </p>
          </div>
          <span className="text-xs text-slate-500 font-mono tabular-nums">
            {totalLessons} lessons total
          </span>
        </div>

        <div className="border border-slate-200 rounded-lg divide-y divide-slate-200 bg-white overflow-hidden">
          {course.modules.map((module, mIdx) => {
            const isExpanded = expandedModuleId === module.id;
            return (
              <div key={module.id} className="text-xs">
                {/* Module Header Accordion */}
                <button
                  onClick={() =>
                    setExpandedModuleId(isExpanded ? null : module.id)
                  }
                  className="w-full p-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-100/50 transition-colors text-left cursor-pointer"
                >
                  <div className="space-y-0.5">
                    <span className="font-semibold text-slate-900 text-sm block">
                      {module.title}
                    </span>
                    {module.description && (
                      <p className="text-slate-500 text-xs">
                        {module.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 shrink-0">
                    <span className="font-mono tabular-nums">
                      {module.lessons.length} lesson{module.lessons.length === 1 ? '' : 's'}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Lesson List */}
                {isExpanded && (
                  <div className="divide-y divide-slate-100 bg-white">
                    {module.lessons.map((lesson, lIdx) => (
                      <div
                        key={lesson.id}
                        className="p-3.5 pl-6 flex items-start justify-between gap-4 hover:bg-slate-50/40"
                      >
                        <div className="flex items-start gap-3">
                          <BookOpen className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                          <div className="space-y-1">
                            <span className="font-medium text-slate-800 block">
                              {lesson.title}
                            </span>
                            {lesson.resources.length > 0 && (
                              <div className="flex items-center gap-2 text-[11px] text-teal-700">
                                <FileText className="w-3 h-3" />
                                <span>{lesson.resources[0].title}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0 text-slate-500 font-mono text-[11px] tabular-nums">
                          <Clock className="w-3 h-3" />
                          <span>{lesson.durationMinutes} mins</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Assessment and Certificate eligibility */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-200">
        <div className="border border-slate-200 rounded-lg p-5 space-y-2 bg-white">
          <div className="flex items-center gap-2 font-semibold text-slate-900 text-sm">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            <span>Assessment & Quiz Evaluation</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {courseQuiz
              ? `Includes "${courseQuiz.title}" comprising ${courseQuiz.questions.length} questions. Passing threshold is ${courseQuiz.passingScorePercent}%. Multiple attempts permitted.`
              : 'End-of-course evaluation quiz authored by faculty coordinator.'}
          </p>
        </div>

        <div className="border border-slate-200 rounded-lg p-5 space-y-2 bg-white">
          <div className="flex items-center gap-2 font-semibold text-slate-900 text-sm">
            <Award className="w-4 h-4 text-teal-600" />
            <span>Verifiable Academic Certificate</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Upon completing 100% of module lessons and passing the quiz assessment, a cryptographically numbered completion certificate is automatically issued.
          </p>
        </div>
      </section>

      {/* Instructor Information */}
      <section className="p-6 border border-slate-200 rounded-lg bg-slate-50 space-y-3">
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Faculty Instructor
        </div>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm shrink-0">
            {course.trainerName.charAt(0)}
          </div>
          <div className="space-y-1 text-xs">
            <h4 className="font-semibold text-slate-900 text-sm">
              {course.trainerName}
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Domain expert in {course.categoryName}. Faculty instructor assigned to PBL-I Digital Capacity Building tracks.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
