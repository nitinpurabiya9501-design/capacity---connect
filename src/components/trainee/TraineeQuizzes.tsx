import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  HelpCircle,
  Clock,
  CheckCircle2,
  XCircle,
  Award,
  ArrowRight,
  RotateCcw,
  AlertCircle,
  ChevronRight,
  Check,
} from 'lucide-react';
import { Quiz, QuizAttempt } from '../../types';

export const TraineeQuizzes: React.FC = () => {
  const {
    currentUser,
    quizzes,
    enrollments,
    selectedQuizId,
    setSelectedQuizId,
    submitQuizAttempt,
    quizAttempts,
    setDashboardTab,
    setViewingCertificate,
    certificates,
  } = useApp();

  const userEnrolledCourseIds = enrollments
    .filter((e) => e.userId === currentUser?.id)
    .map((e) => e.courseId);

  const availableQuizzes = quizzes.filter((q) =>
    userEnrolledCourseIds.includes(q.courseId)
  );

  const userAttempts = quizAttempts.filter(
    (a) => a.userId === currentUser?.id
  );

  // Active quiz state
  const activeQuiz = quizzes.find((q) => q.id === selectedQuizId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [latestAttempt, setLatestAttempt] = useState<QuizAttempt | null>(null);

  const startQuiz = (quiz: Quiz) => {
    setSelectedQuizId(quiz.id);
    setCurrentQuestionIndex(0);
    setSelectedAnswers(new Array(quiz.questions.length).fill(-1));
    setLatestAttempt(null);
  };

  const handleSelectOption = (optIndex: number) => {
    const updated = [...selectedAnswers];
    updated[currentQuestionIndex] = optIndex;
    setSelectedAnswers(updated);
  };

  const handleSubmit = () => {
    if (!activeQuiz) return;
    const unanswered = selectedAnswers.filter((a) => a === -1).length;
    if (unanswered > 0) {
      if (
        !window.confirm(
          `You have ${unanswered} unanswered question(s). Are you sure you want to submit?`
        )
      ) {
        return;
      }
    }

    const attempt = submitQuizAttempt(activeQuiz.id, selectedAnswers);
    setLatestAttempt(attempt);
  };

  // If viewing quiz assessment
  if (activeQuiz) {
    if (latestAttempt) {
      // Results summary screen
      const userCert = certificates.find(
        (c) => c.userId === currentUser?.id && c.courseId === activeQuiz.courseId
      );

      return (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="border border-slate-200 rounded-lg p-6 bg-white space-y-6">
            <div className="text-center space-y-2 border-b border-slate-100 pb-6">
              {latestAttempt.passed ? (
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                  <XCircle className="w-6 h-6" />
                </div>
              )}

              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                {latestAttempt.passed ? 'Assessment Passed!' : 'Assessment Not Passed'}
              </h2>
              <p className="text-xs text-slate-500">
                Course: {activeQuiz.courseTitle}
              </p>

              <div className="pt-2 flex items-center justify-center gap-6 text-sm">
                <div>
                  <span className="text-slate-400 block text-xs">Your Score</span>
                  <span className="font-mono font-bold text-slate-900 text-2xl tabular-nums">
                    {latestAttempt.scorePercent}%
                  </span>
                </div>
                <div className="w-px h-8 bg-slate-200"></div>
                <div>
                  <span className="text-slate-400 block text-xs">Required to Pass</span>
                  <span className="font-mono font-semibold text-slate-600 text-2xl tabular-nums">
                    {activeQuiz.passingScorePercent}%
                  </span>
                </div>
              </div>
            </div>

            {/* Certificate callout if passed */}
            {latestAttempt.passed && userCert && (
              <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-teal-700 shrink-0" />
                  <div className="text-xs">
                    <strong className="text-teal-900 block font-semibold">
                      Certificate Generated: {userCert.certificateNumber}
                    </strong>
                    <span className="text-teal-700">
                      Grade: {userCert.grade} ({userCert.scorePercent}%)
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setViewingCertificate(userCert);
                    setDashboardTab('certificates');
                  }}
                  className="px-3 py-1.5 bg-teal-800 hover:bg-teal-900 text-white rounded text-xs font-medium cursor-pointer shrink-0"
                >
                  View Certificate
                </button>
              </div>
            )}

            {/* Detailed Question Review */}
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">
                Question Breakdown & Explanations
              </h3>

              <div className="space-y-3">
                {activeQuiz.questions.map((q, idx) => {
                  const userChoice = latestAttempt.selectedAnswers[idx];
                  const isCorrect = userChoice === q.correctAnswerIndex;

                  return (
                    <div
                      key={q.id}
                      className="p-4 border border-slate-200 rounded-lg text-xs space-y-2 bg-slate-50/40"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-slate-900">
                          Q{idx + 1}. {q.question}
                        </span>
                        {isCorrect ? (
                          <span className="text-emerald-700 font-medium shrink-0 flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Correct
                          </span>
                        ) : (
                          <span className="text-rose-700 font-medium shrink-0">
                            Incorrect
                          </span>
                        )}
                      </div>

                      <div className="text-slate-600 space-y-1 pt-1">
                        <div>
                          Your answer:{' '}
                          <span className={isCorrect ? 'text-emerald-700 font-medium' : 'text-rose-700 font-medium'}>
                            {userChoice >= 0 ? q.options[userChoice] : 'Unanswered'}
                          </span>
                        </div>
                        {!isCorrect && (
                          <div className="text-slate-800">
                            Correct answer:{' '}
                            <span className="font-medium text-emerald-800">
                              {q.options[q.correctAnswerIndex]}
                            </span>
                          </div>
                        )}
                      </div>

                      {q.explanation && (
                        <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/60 leading-relaxed">
                          <strong>Explanation:</strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedQuizId(null)}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-50 rounded text-xs text-slate-700 font-medium cursor-pointer"
              >
                Back to Quizzes List
              </button>

              <button
                onClick={() => startQuiz(activeQuiz)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Assessment</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Active quiz questions step
    const currentQ = activeQuiz.questions[currentQuestionIndex];
    const totalQ = activeQuiz.questions.length;
    const currentSelected = selectedAnswers[currentQuestionIndex];

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="border border-slate-200 rounded-lg p-6 bg-white space-y-6 shadow-xs">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                {activeQuiz.courseTitle}
              </span>
              <h2 className="text-base font-bold text-slate-900">
                {activeQuiz.title}
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono tabular-nums bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
              <Clock className="w-3.5 h-3.5 text-teal-600" />
              <span>{activeQuiz.timeLimitMinutes || 15}:00</span>
            </div>
          </div>

          {/* Question Counter */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              Question <strong className="text-slate-900">{currentQuestionIndex + 1}</strong> of{' '}
              {totalQ}
            </span>
            <span className="font-mono tabular-nums">
              Passing criteria: {activeQuiz.passingScorePercent}%
            </span>
          </div>

          {/* Question text */}
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-sm font-semibold text-slate-900 leading-relaxed">
              {currentQ.question}
            </p>
          </div>

          {/* 4 Radio Options */}
          <div className="space-y-2">
            {currentQ.options.map((option, optIdx) => {
              const isSelected = currentSelected === optIdx;
              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full p-3 text-left rounded-md border text-xs transition-colors cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? 'border-slate-900 bg-slate-50 text-slate-900 font-medium'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 text-[10px] ${
                      isSelected
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-300'
                    }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                  </div>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
              className="px-3.5 py-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              {currentQuestionIndex < totalQ - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                  className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium cursor-pointer"
                >
                  Next Question
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-4 py-1.5 bg-teal-800 hover:bg-teal-900 text-white rounded text-xs font-medium cursor-pointer"
                >
                  Submit Assessment
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quizzes Catalog List
  return (
    <div className="space-y-8 max-w-5xl">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Quizzes & Competency Assessments
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Objective evaluation quizzes for your enrolled courses. Pass with ≥70% to receive certified credentials.
        </p>
      </div>

      {availableQuizzes.length === 0 ? (
        <div className="p-12 border border-slate-200 rounded-lg text-center bg-white space-y-3">
          <HelpCircle className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="font-semibold text-slate-900 text-sm">No quizzes available for current courses</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Enroll in full-stack web architecture or database engineering to take assessment quizzes.
          </p>
          <button
            onClick={() => setDashboardTab('catalog')}
            className="px-4 py-2 bg-slate-900 text-white rounded text-xs font-medium cursor-pointer"
          >
            Browse Available Tracks
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
            Available Assessments ({availableQuizzes.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableQuizzes.map((quiz) => {
              const attempts = userAttempts.filter((a) => a.quizId === quiz.id);
              const bestScore =
                attempts.length > 0
                  ? Math.max(...attempts.map((a) => a.scorePercent))
                  : null;
              const hasPassed = attempts.some((a) => a.passed);

              return (
                <div
                  key={quiz.id}
                  className="border border-slate-200 rounded-lg p-5 bg-white space-y-4 flex flex-col justify-between shadow-xs"
                >
                  <div className="space-y-2">
                    <div className="text-[11px] text-slate-500 flex items-center justify-between">
                      <span>{quiz.courseTitle}</span>
                      <span className="font-mono tabular-nums">
                        {quiz.questions.length} Questions
                      </span>
                    </div>

                    <h3 className="font-semibold text-slate-900 text-base leading-snug">
                      {quiz.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {quiz.description}
                    </p>

                    <div className="text-[11px] text-slate-500 pt-1 flex items-center gap-3">
                      <span>Passing threshold: {quiz.passingScorePercent}%</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{quiz.timeLimitMinutes || 15} mins</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      {bestScore !== null ? (
                        <span className="text-xs font-mono text-slate-700">
                          Best Score:{' '}
                          <strong
                            className={
                              hasPassed ? 'text-emerald-700' : 'text-slate-900'
                            }
                          >
                            {bestScore}%
                          </strong>{' '}
                          ({hasPassed ? 'PASSED' : 'RETRY'})
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400">
                          Not attempted yet
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => startQuiz(quiz)}
                      className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium transition-colors cursor-pointer"
                    >
                      {attempts.length > 0 ? 'Retake Quiz' : 'Start Quiz'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Historical Attempt Logs */}
      {userAttempts.length > 0 && (
        <div className="space-y-3 pt-6 border-t border-slate-200">
          <h2 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
            Assessment Attempt History
          </h2>

          <div className="border border-slate-200 rounded-lg overflow-x-auto bg-white">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <tr>
                  <th className="p-3">Assessment Title</th>
                  <th className="p-3">Score</th>
                  <th className="p-3">Result</th>
                  <th className="p-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {userAttempts.map((att) => {
                  const quiz = quizzes.find((q) => q.id === att.quizId);
                  return (
                    <tr key={att.id} className="hover:bg-slate-50/50">
                      <td className="p-3 font-medium">
                        {quiz?.title || 'Course Quiz'}
                      </td>
                      <td className="p-3 font-mono tabular-nums font-semibold">
                        {att.scorePercent}%
                      </td>
                      <td className="p-3">
                        {att.passed ? (
                          <span className="text-emerald-700 font-medium">
                            Passed
                          </span>
                        ) : (
                          <span className="text-rose-700 font-medium">
                            Failed
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-slate-500 font-mono text-[11px]">
                        {att.attemptedAt.replace('T', ' ').substring(0, 16)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
