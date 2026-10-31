import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Star, Send, CheckCircle2 } from 'lucide-react';

export const TraineeFeedback: React.FC = () => {
  const { currentUser, courses, enrollments, submitFeedback, feedbacks } = useApp();

  const userCourses = courses.filter((c) =>
    enrollments.some((e) => e.userId === currentUser?.id && e.courseId === c.id)
  );

  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    userCourses[0]?.id || ''
  );
  const [rating, setRating] = useState<number>(5);
  const [category, setCategory] = useState<
    'Course Content' | 'Platform Usability' | 'Trainer Assessment' | 'General'
  >('Course Content');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const course = courses.find((c) => c.id === selectedCourseId);

    submitFeedback({
      courseId: selectedCourseId || undefined,
      courseTitle: course ? course.title : undefined,
      rating,
      category,
      message: message.trim(),
    });

    setSubmitted(true);
    setMessage('');
  };

  const userPastFeedback = feedbacks.filter((f) => f.userId === currentUser?.id);

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Course & Portal Feedback
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Share your evaluation on syllabi clarity, technical materials, and instructor responsiveness to support continuous capacity building.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Feedback Form */}
        <div className="border border-slate-200 rounded-lg p-6 bg-white space-y-4">
          <h2 className="text-sm font-semibold text-slate-900">
            Submit New Evaluation
          </h2>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-lg text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="font-semibold text-emerald-900 text-sm">
                Feedback Recorded
              </h3>
              <p className="text-xs text-emerald-700">
                Thank you! Your feedback has been stored persistently in the portal database.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-3 py-1.5 bg-emerald-800 text-white rounded text-xs font-medium cursor-pointer"
              >
                Submit Additional Feedback
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-medium text-slate-700 block">
                  Select Course (Optional)
                </label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md bg-white text-slate-800 focus:outline-hidden"
                >
                  <option value="">General Platform Feedback</option>
                  {userCourses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-medium text-slate-700 block">
                  Feedback Category
                </label>
                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      e.target.value as
                        | 'Course Content'
                        | 'Platform Usability'
                        | 'Trainer Assessment'
                        | 'General'
                    )
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-md bg-white text-slate-800 focus:outline-hidden"
                >
                  <option value="Course Content">Course Content</option>
                  <option value="Platform Usability">Platform Usability</option>
                  <option value="Trainer Assessment">Trainer Assessment</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-medium text-slate-700 block">
                  Rating (1 to 5 Stars)
                </label>
                <div className="flex items-center gap-2 pt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 text-amber-500 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= rating ? 'fill-amber-400 text-amber-500' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="font-mono text-slate-600 ml-2 font-medium">
                    {rating} / 5
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-medium text-slate-700 block">
                  Comments & Suggestions *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share constructive insights on clarity, assessments, or materials..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-xs focus:outline-hidden focus:border-slate-400"
                ></textarea>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Evaluation</span>
              </button>
            </form>
          )}
        </div>

        {/* Previous Submissions Ledger */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-slate-900">
            Your Previous Submissions
          </h2>

          {userPastFeedback.length === 0 ? (
            <div className="p-8 border border-slate-200 rounded-lg text-center bg-white text-xs text-slate-500">
              No previous feedback entries recorded.
            </div>
          ) : (
            <div className="space-y-3">
              {userPastFeedback.map((fb) => (
                <div
                  key={fb.id}
                  className="p-4 border border-slate-200 rounded-lg bg-white text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">
                      {fb.courseTitle || fb.category}
                    </span>
                    <span className="font-mono text-amber-600 font-semibold tabular-nums">
                      ★ {fb.rating}/5
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {fb.message}
                  </p>
                  <div className="text-[10px] text-slate-400">
                    Logged: {fb.createdAt.split('T')[0]}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
