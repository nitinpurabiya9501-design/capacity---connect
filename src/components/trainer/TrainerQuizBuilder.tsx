import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Plus,
  HelpCircle,
  CheckCircle,
  Trash2,
  Edit2,
  Clock,
  Save,
  X,
} from 'lucide-react';
import { Quiz, QuizQuestion } from '../../types';

export const TrainerQuizBuilder: React.FC = () => {
  const { currentUser, courses, quizzes, addQuiz, updateQuiz, notify } = useApp();

  const trainerCourses = courses.filter((c) => c.trainerId === currentUser?.id);
  const trainerCourseIds = trainerCourses.map((c) => c.id);

  const trainerQuizzes = quizzes.filter((q) =>
    trainerCourseIds.includes(q.courseId)
  );

  const [isCreatingQuiz, setIsCreatingQuiz] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(
    trainerCourses[0]?.id || ''
  );
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [passingScore, setPassingScore] = useState(70);
  const [timeLimit, setTimeLimit] = useState(15);

  // New question form state
  const [activeQuizIdForQuestions, setActiveQuizIdForQuestions] = useState<
    string | null
  >(null);
  const [questionText, setQuestionText] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctOptIndex, setCorrectOptIndex] = useState(0);
  const [explanation, setExplanation] = useState('');

  const handleCreateQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizTitle.trim() || !selectedCourseId) return;

    addQuiz({
      courseId: selectedCourseId,
      title: quizTitle.trim(),
      description: quizDescription.trim(),
      passingScorePercent: Number(passingScore),
      timeLimitMinutes: Number(timeLimit),
      questions: [],
    });

    setIsCreatingQuiz(false);
    setQuizTitle('');
    setQuizDescription('');
  };

  const handleAddQuestionToQuiz = (quizId: string) => {
    if (!questionText.trim() || !optionA.trim() || !optionB.trim()) {
      notify('Please provide question text and at least options A & B.', 'error');
      return;
    }

    const quiz = quizzes.find((q) => q.id === quizId);
    if (!quiz) return;

    const newQuestion: QuizQuestion = {
      id: 'q-' + Date.now(),
      question: questionText.trim(),
      options: [
        optionA.trim(),
        optionB.trim(),
        optionC.trim() || 'None of the above',
        optionD.trim() || 'All of the above',
      ],
      correctAnswerIndex: correctOptIndex,
      explanation: explanation.trim() || 'Evaluated per module syllabus specification.',
    };

    updateQuiz(quizId, {
      questions: [...quiz.questions, newQuestion],
    });

    setQuestionText('');
    setOptionA('');
    setOptionB('');
    setOptionC('');
    setOptionD('');
    setCorrectOptIndex(0);
    setExplanation('');
    notify('Question added to assessment.');
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Quiz & Assessment Authoring Engine
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Construct timed multiple-choice assessments, configure 4-option questions, define correct answer keys, and set passing thresholds.
          </p>
        </div>

        <button
          onClick={() => setIsCreatingQuiz(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Assessment Quiz</span>
        </button>
      </div>

      {/* Quizzes list */}
      <div className="space-y-4">
        {trainerQuizzes.length === 0 ? (
          <div className="p-12 border border-slate-200 rounded-lg text-center bg-white space-y-3">
            <HelpCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="font-semibold text-slate-900 text-sm">
              No assessment quizzes configured yet
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Click "New Assessment Quiz" above to author multiple-choice assessments for your courses.
            </p>
          </div>
        ) : (
          trainerQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="border border-slate-200 rounded-lg p-5 bg-white space-y-4 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">
                    {quiz.courseTitle}
                  </span>
                  <h3 className="font-semibold text-slate-900 text-base">
                    {quiz.title}
                  </h3>
                  <div className="text-xs text-slate-500 flex items-center gap-3">
                    <span className="font-mono tabular-nums">
                      {quiz.questions.length} Questions
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Pass Threshold: {quiz.passingScorePercent}%</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{quiz.timeLimitMinutes || 15} mins</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setActiveQuizIdForQuestions(
                        activeQuizIdForQuestions === quiz.id ? null : quiz.id
                      )
                    }
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium rounded cursor-pointer"
                  >
                    {activeQuizIdForQuestions === quiz.id
                      ? 'Close Question Editor'
                      : 'Manage Questions'}
                  </button>
                </div>
              </div>

              {/* Question Editor Drawer */}
              {activeQuizIdForQuestions === quiz.id && (
                <div className="pt-4 border-t border-slate-100 space-y-4 bg-slate-50/50 p-4 rounded-md text-xs">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-slate-900 uppercase tracking-wider text-[11px]">
                      Configured Questions ({quiz.questions.length})
                    </h4>
                  </div>

                  {/* Existing questions */}
                  <div className="space-y-3">
                    {quiz.questions.map((q, qIdx) => (
                      <div
                        key={q.id}
                        className="p-3.5 bg-white border border-slate-200 rounded-md space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-semibold text-slate-900">
                            Q{qIdx + 1}. {q.question}
                          </span>
                          <span className="text-[10px] text-teal-700 font-mono font-semibold">
                            Correct: Option {String.fromCharCode(65 + q.correctAnswerIndex)}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-600 pl-2">
                          {q.options.map((opt, oIdx) => (
                            <div
                              key={oIdx}
                              className={
                                oIdx === q.correctAnswerIndex
                                  ? 'text-emerald-700 font-semibold'
                                  : 'text-slate-600'
                              }
                            >
                              {String.fromCharCode(65 + oIdx)}) {opt}
                            </div>
                          ))}
                        </div>

                        {q.explanation && (
                          <div className="text-[10px] text-slate-400 italic pt-1 border-t border-slate-100">
                            Explanation: {q.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add New Question Form */}
                  <div className="border border-slate-200 rounded-md bg-white p-4 space-y-3">
                    <h5 className="font-semibold text-slate-900 text-xs">
                      Author Question #{quiz.questions.length + 1}
                    </h5>

                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-slate-700 block">
                        Question Prompt *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Which normal form eliminates transitive dependencies?"
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        className="w-full px-3 py-1.5 border border-slate-200 rounded text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-medium text-slate-700 block mb-0.5">
                          Option A *
                        </label>
                        <input
                          type="text"
                          value={optionA}
                          onChange={(e) => setOptionA(e.target.value)}
                          placeholder="First option"
                          className="w-full px-3 py-1.5 border border-slate-200 rounded text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-medium text-slate-700 block mb-0.5">
                          Option B *
                        </label>
                        <input
                          type="text"
                          value={optionB}
                          onChange={(e) => setOptionB(e.target.value)}
                          placeholder="Second option"
                          className="w-full px-3 py-1.5 border border-slate-200 rounded text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-medium text-slate-700 block mb-0.5">
                          Option C
                        </label>
                        <input
                          type="text"
                          value={optionC}
                          onChange={(e) => setOptionC(e.target.value)}
                          placeholder="Third option"
                          className="w-full px-3 py-1.5 border border-slate-200 rounded text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-medium text-slate-700 block mb-0.5">
                          Option D
                        </label>
                        <input
                          type="text"
                          value={optionD}
                          onChange={(e) => setOptionD(e.target.value)}
                          placeholder="Fourth option"
                          className="w-full px-3 py-1.5 border border-slate-200 rounded text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-medium text-slate-700 block mb-0.5">
                          Correct Option Key *
                        </label>
                        <select
                          value={correctOptIndex}
                          onChange={(e) => setCorrectOptIndex(Number(e.target.value))}
                          className="w-full px-3 py-1.5 border border-slate-200 rounded text-xs bg-white text-slate-700"
                        >
                          <option value={0}>Option A is Correct</option>
                          <option value={1}>Option B is Correct</option>
                          <option value={2}>Option C is Correct</option>
                          <option value={3}>Option D is Correct</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-medium text-slate-700 block mb-0.5">
                          Pedagogical Explanation
                        </label>
                        <input
                          type="text"
                          value={explanation}
                          onChange={(e) => setExplanation(e.target.value)}
                          placeholder="Reason why this option is correct"
                          className="w-full px-3 py-1.5 border border-slate-200 rounded text-xs"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => handleAddQuestionToQuiz(quiz.id)}
                        className="px-4 py-1.5 bg-slate-900 text-white rounded text-xs font-medium cursor-pointer"
                      >
                        Add Question to Quiz
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* New Quiz Modal */}
      {isCreatingQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-semibold text-slate-900 text-sm">
                Create Assessment Quiz
              </h3>
              <button
                onClick={() => setIsCreatingQuiz(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateQuiz} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-medium text-slate-700 block">Link to Course *</label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md bg-white text-slate-700"
                >
                  {trainerCourses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-medium text-slate-700 block">Assessment Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. End-of-Course Comprehensive Assessment"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-medium text-slate-700 block">Passing Threshold (%)</label>
                  <input
                    type="number"
                    value={passingScore}
                    onChange={(e) => setPassingScore(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-medium text-slate-700 block">Time Limit (Mins)</label>
                  <input
                    type="number"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-medium text-slate-700 block">Description / Scope</label>
                <textarea
                  rows={3}
                  placeholder="Topics and competencies assessed in this exam..."
                  value={quizDescription}
                  onChange={(e) => setQuizDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingQuiz(false)}
                  className="px-3 py-1.5 border border-slate-300 text-slate-700 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-slate-900 text-white rounded font-medium"
                >
                  Create Quiz
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
