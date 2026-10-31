import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  CheckCircle,
  Circle,
  FileText,
  Clock,
  ArrowRight,
  ChevronLeft,
  Download,
  Award,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { Lesson } from '../../types';

export const TraineeMyCourses: React.FC = () => {
  const {
    currentUser,
    courses,
    enrollments,
    toggleLessonComplete,
    selectedCourseId,
    setSelectedCourseId,
    setDashboardTab,
    setSelectedQuizId,
    quizzes,
    notify,
  } = useApp();

  const userEnrollments = enrollments.filter(
    (e) => e.userId === currentUser?.id
  );

  // Active course in player mode
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  const activeCourse = courses.find((c) => c.id === selectedCourseId);
  const activeEnrollment = userEnrollments.find(
    (e) => e.courseId === selectedCourseId
  );

  // If in player mode
  if (activeCourse && activeEnrollment) {
    // Collect all lessons in sequence
    const allLessons: Lesson[] = [];
    activeCourse.modules.forEach((m) => {
      m.lessons.forEach((l) => allLessons.push(l));
    });

    const currentLesson =
      allLessons.find((l) => l.id === activeLessonId) || allLessons[0];
    const isCurrentLessonDone = activeEnrollment.completedLessonIds.includes(
      currentLesson?.id || ''
    );

    const courseQuiz = quizzes.find((q) => q.courseId === activeCourse.id);

    const handleDownloadResource = (resTitle: string) => {
      notify(`Simulated download: ${resTitle} (Stored in /uploads/resources/)`);
    };

    return (
      <div className="space-y-6 max-w-6xl">
        {/* Top Header Bar of Course Player */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <button
              onClick={() => setSelectedCourseId(null)}
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 transition-colors cursor-pointer mb-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Back to Enrolled Courses</span>
            </button>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              {activeCourse.title}
            </h1>
            <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
              <span>Instructor: {activeCourse.trainerName}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">
                {activeEnrollment.progressPercent}% Completed
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {courseQuiz && (
              <button
                onClick={() => {
                  setSelectedQuizId(courseQuiz.id);
                  setDashboardTab('quizzes');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-medium rounded-md transition-colors cursor-pointer shadow-xs"
              >
                <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
                <span>Take Assessment Quiz</span>
              </button>
            )}

            <button
              onClick={() => {
                if (currentLesson) {
                  toggleLessonComplete(activeCourse.id, currentLesson.id);
                }
              }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                isCurrentLessonDone
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{isCurrentLessonDone ? 'Completed (Click to Undo)' : 'Mark Lesson Complete'}</span>
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-teal-600 h-full transition-all duration-300"
            style={{ width: `${activeEnrollment.progressPercent}%` }}
          ></div>
        </div>

        {/* Player Layout: Left Lesson Index + Right Content View */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Left Syllabus Navigation (1 column) */}
          <div className="border border-slate-200 rounded-lg bg-white overflow-hidden text-xs space-y-3">
            <div className="p-3.5 border-b border-slate-200 bg-slate-50 font-semibold text-slate-900 flex items-center justify-between">
              <span>Syllabus Modules</span>
              <span className="font-mono text-slate-500 tabular-nums">
                {activeEnrollment.completedLessonIds.length}/{allLessons.length}
              </span>
            </div>

            <div className="p-2 space-y-4 max-h-[600px] overflow-y-auto">
              {activeCourse.modules.map((mod) => (
                <div key={mod.id} className="space-y-1">
                  <div className="text-[11px] font-semibold text-slate-500 px-2 uppercase tracking-wider">
                    {mod.title}
                  </div>
                  <div className="space-y-0.5">
                    {mod.lessons.map((les) => {
                      const isDone = activeEnrollment.completedLessonIds.includes(
                        les.id
                      );
                      const isCurrent =
                        (currentLesson && currentLesson.id === les.id) || false;
                      return (
                        <button
                          key={les.id}
                          onClick={() => setActiveLessonId(les.id)}
                          className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-left transition-colors cursor-pointer ${
                            isCurrent
                              ? 'bg-slate-900 text-white font-medium'
                              : 'text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {isDone ? (
                            <CheckCircle
                              className={`w-3.5 h-3.5 shrink-0 ${
                                isCurrent ? 'text-emerald-300' : 'text-emerald-600'
                              }`}
                            />
                          ) : (
                            <Circle
                              className={`w-3.5 h-3.5 shrink-0 ${
                                isCurrent ? 'text-slate-400' : 'text-slate-300'
                              }`}
                            />
                          )}
                          <span className="truncate leading-tight">{les.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Lesson Content Pane (3 columns) */}
          <div className="lg:col-span-3 border border-slate-200 rounded-lg p-6 bg-white space-y-6">
            {currentLesson ? (
              <>
                <div className="border-b border-slate-100 pb-4 space-y-2">
                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-mono tabular-nums">
                      Estimated reading time: {currentLesson.durationMinutes} minutes
                    </span>
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900">
                    {currentLesson.title}
                  </h2>
                </div>

                {/* Markdown-style reading text */}
                <div className="prose prose-slate text-xs sm:text-sm text-slate-800 leading-relaxed space-y-4 max-w-none">
                  {currentLesson.content.split('\n\n').map((paragraph, pIdx) => {
                    if (paragraph.startsWith('### ')) {
                      return (
                        <h3 key={pIdx} className="text-base font-bold text-slate-900 pt-2">
                          {paragraph.replace('### ', '')}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('#### ')) {
                      return (
                        <h4 key={pIdx} className="text-sm font-semibold text-slate-900 pt-1">
                          {paragraph.replace('#### ', '')}
                        </h4>
                      );
                    }
                    if (paragraph.startsWith('```')) {
                      const codeClean = paragraph.replace(/```[a-z]*/g, '').trim();
                      return (
                        <pre
                          key={pIdx}
                          className="bg-slate-900 text-slate-100 p-4 rounded-md font-mono text-xs overflow-x-auto leading-relaxed"
                        >
                          {codeClean}
                        </pre>
                      );
                    }
                    return (
                      <p key={pIdx} className="text-slate-700 leading-relaxed whitespace-pre-line">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>

                {/* Attached Lesson Resources */}
                {currentLesson.resources.length > 0 && (
                  <div className="pt-6 border-t border-slate-100 space-y-3">
                    <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                      Attached Technical Resources & Handouts
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentLesson.resources.map((res) => (
                        <div
                          key={res.id}
                          className="p-3 border border-slate-200 rounded-md flex items-center justify-between gap-3 bg-slate-50/50"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <FileText className="w-4 h-4 text-teal-600 shrink-0" />
                            <div className="truncate">
                              <span className="text-xs font-medium text-slate-800 block truncate">
                                {res.title}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                {res.size} · PDF Document
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDownloadResource(res.title)}
                            className="p-1.5 hover:bg-slate-200 rounded text-slate-600 transition-colors cursor-pointer shrink-0"
                            title="Download resource"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bottom completion callout */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    {isCurrentLessonDone ? (
                      <span className="text-emerald-700 font-medium flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Lesson marked as completed
                      </span>
                    ) : (
                      <span>Review the notes above and click complete to advance your progress.</span>
                    )}
                  </div>
                  <button
                    onClick={() => toggleLessonComplete(activeCourse.id, currentLesson.id)}
                    className="px-4 py-2 bg-slate-900 text-white rounded text-xs font-medium hover:bg-slate-800 cursor-pointer"
                  >
                    {isCurrentLessonDone ? 'Undo Complete' : 'Mark as Completed'}
                  </button>
                </div>
              </>
            ) : (
              <p className="text-xs text-slate-500">Select a lesson from the left syllabus.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Enrolled Courses List View
  return (
    <div className="space-y-6 max-w-5xl">
      <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            My Enrolled Courses
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Access your courses, launch interactive lesson modules, and monitor milestone completions.
          </p>
        </div>
        <button
          onClick={() => setDashboardTab('catalog')}
          className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium transition-colors cursor-pointer"
        >
          Browse More Courses
        </button>
      </div>

      {userEnrollments.length === 0 ? (
        <div className="p-12 border border-slate-200 rounded-lg text-center bg-white space-y-3">
          <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="font-semibold text-slate-900 text-sm">You haven't enrolled in any courses yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Browse the available PBL-I course catalog and enroll to begin your capacity building journey.
          </p>
          <button
            onClick={() => setDashboardTab('catalog')}
            className="px-4 py-2 bg-slate-900 text-white rounded text-xs font-medium cursor-pointer"
          >
            Explore Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userEnrollments.map((enr) => {
            const course = courses.find((c) => c.id === enr.courseId);
            if (!course) return null;

            const totalLessons = course.modules.reduce(
              (acc, m) => acc + m.lessons.length,
              0
            );

            return (
              <div
                key={enr.id}
                className="border border-slate-200 rounded-lg bg-white overflow-hidden flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="aspect-16/9 bg-slate-100 overflow-hidden relative">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                      <span>{course.categoryName}</span>
                      <span aria-hidden="true">·</span>
                      <span>{course.level}</span>
                    </div>

                    <h3 className="font-semibold text-slate-900 text-base leading-snug">
                      {course.title}
                    </h3>

                    {/* Progress bar */}
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600">Completion</span>
                        <span className="font-mono font-semibold text-slate-900 tabular-nums">
                          {enr.progressPercent}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-slate-900 h-full rounded-full transition-all duration-300"
                          style={{ width: `${enr.progressPercent}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-500 pt-1 flex items-center justify-between">
                      <span>
                        {enr.completedLessonIds.length} of {totalLessons} lessons done
                      </span>
                      <span>Faculty: {course.trainerName.split(' ')[0]}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Enrolled {enr.enrolledAt.split('T')[0]}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedCourseId(course.id);
                    }}
                    className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium transition-colors cursor-pointer"
                  >
                    <span>Launch Player</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
