import React from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart3, Users, CheckCircle, Clock } from 'lucide-react';

export const TrainerProgressTracker: React.FC = () => {
  const { currentUser, courses, enrollments, users } = useApp();

  const trainerCourses = courses.filter((c) => c.trainerId === currentUser?.id);
  const trainerCourseIds = trainerCourses.map((c) => c.id);

  const relevantEnrollments = enrollments.filter((e) =>
    trainerCourseIds.includes(e.courseId)
  );

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Trainee Progress & Milestone Tracker
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Live monitoring of student lesson completions and curriculum progress bars.
        </p>
      </div>

      <div className="border border-slate-200 rounded-lg overflow-x-auto bg-white">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
            <tr>
              <th className="p-3">Trainee</th>
              <th className="p-3">Course</th>
              <th className="p-3">Progress</th>
              <th className="p-3">Status</th>
              <th className="p-3">Enrolled On</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {relevantEnrollments.map((enr) => {
              const student = users.find((u) => u.id === enr.userId);
              const course = courses.find((c) => c.id === enr.courseId);

              return (
                <tr key={enr.id} className="hover:bg-slate-50/50">
                  <td className="p-3">
                    <span className="font-semibold text-slate-900 block">
                      {student?.name || 'Trainee'}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {student?.email}
                    </span>
                  </td>
                  <td className="p-3 text-slate-700 max-w-[220px] truncate">
                    {course?.title}
                  </td>
                  <td className="p-3 w-48">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between font-mono text-[11px]">
                        <span>{enr.completedLessonIds.length} lessons</span>
                        <strong className="text-slate-900 tabular-nums">{enr.progressPercent}%</strong>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-slate-900 h-full rounded-full"
                          style={{ width: `${enr.progressPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    {enr.isCompleted ? (
                      <span className="text-emerald-700 font-medium">Completed</span>
                    ) : (
                      <span className="text-slate-500">In Progress</span>
                    )}
                  </td>
                  <td className="p-3 font-mono text-[11px] text-slate-400">
                    {enr.enrolledAt.split('T')[0]}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
