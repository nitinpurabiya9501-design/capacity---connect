import React from 'react';
import { useApp } from '../../context/AppContext';
import { Target, BarChart3, Sparkles, BookOpen, ArrowRight } from 'lucide-react';

export const TraineeCompetencies: React.FC = () => {
  const { competencies, courses, setSelectedCourseId, setActivePage, enrollCourse } = useApp();

  // Find course recommendations based on competencies with lowest scores
  const lowestCompetency = [...competencies].sort(
    (a, b) => a.currentLevelPercent - b.currentLevelPercent
  )[0];

  const recommendedCourses = courses.filter((c) =>
    c.categoryName.toLowerCase().includes(lowestCompetency?.category.toLowerCase() || '')
  );

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Competency Profile & Skill Analytics
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Objective capability benchmarks across full-stack engineering, database systems, cybersecurity, and cloud infrastructure.
        </p>
      </div>

      {/* Competency Benchmark Matrix */}
      <div className="border border-slate-200 rounded-lg p-6 bg-white space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-teal-600" />
            <span>Assessed Competencies vs Institutional Benchmarks</span>
          </h2>
          <div className="text-[11px] text-slate-400 flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-slate-900"></span> Your Level
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-sm bg-slate-300"></span> Benchmark Target
            </span>
          </div>
        </div>

        <div className="space-y-5">
          {competencies.map((comp) => {
            const delta = comp.currentLevelPercent - comp.benchmarkPercent;
            const meetsTarget = delta >= 0;

            return (
              <div key={comp.id} className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-900 block">
                      {comp.name}
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      {comp.description}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-slate-900 tabular-nums">
                      {comp.currentLevelPercent}%
                    </span>
                    <span className="text-slate-400 font-mono text-[11px] block">
                      Target: {comp.benchmarkPercent}% ({meetsTarget ? `+${delta}%` : `${delta}%`})
                    </span>
                  </div>
                </div>

                {/* Progress bar with benchmark mark */}
                <div className="relative w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      meetsTarget ? 'bg-teal-700' : 'bg-slate-800'
                    }`}
                    style={{ width: `${comp.currentLevelPercent}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Smart Recommendations based on Skill Gaps */}
      <div className="border border-slate-200 rounded-lg p-6 bg-slate-50 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-teal-600" />
          <h3 className="font-semibold text-slate-900 text-sm">
            AI-Informed Capability Recommendation
          </h3>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Based on your competency evaluation, your lowest relative score is in{' '}
          <strong className="text-slate-900">{lowestCompetency?.name}</strong> ({lowestCompetency?.currentLevelPercent}%). 
          We recommend taking the following courses to close this capability gap:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {recommendedCourses.map((c) => (
            <div
              key={c.id}
              className="p-4 border border-slate-200 rounded-lg bg-white flex flex-col justify-between space-y-3"
            >
              <div>
                <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">
                  Recommended Track
                </span>
                <h4 className="font-semibold text-slate-900 text-sm">
                  {c.title}
                </h4>
                <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                  {c.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="text-slate-500 font-mono">{c.durationHours} Hours</span>
                <button
                  onClick={() => enrollCourse(c.id)}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium cursor-pointer"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
