import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart3, Plus, Target, Check } from 'lucide-react';
import { CompetencySkill } from '../../types';

export const AdminCompetencies: React.FC = () => {
  const { competencies, notify } = useApp();

  const [skillsList, setSkillsList] = useState<CompetencySkill[]>(competencies);

  const handleUpdateBenchmark = (id: string, newTarget: number) => {
    setSkillsList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, benchmarkPercent: newTarget } : s))
    );
    notify('Competency benchmark threshold updated.');
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Institutional Competency Framework
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Define institutional target benchmarks for student engineering tracks and configure recommendation weights.
        </p>
      </div>

      <div className="space-y-4">
        {skillsList.map((comp) => (
          <div
            key={comp.id}
            className="border border-slate-200 rounded-lg p-5 bg-white space-y-3 shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-[10px] text-teal-700 font-mono font-semibold uppercase tracking-wider block">
                  {comp.category}
                </span>
                <h3 className="font-semibold text-slate-900 text-sm">
                  {comp.name}
                </h3>
                <p className="text-xs text-slate-600 max-w-xl">
                  {comp.description}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right text-xs">
                  <span className="text-slate-400 block text-[11px]">Benchmark Target</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={comp.benchmarkPercent}
                      onChange={(e) =>
                        handleUpdateBenchmark(comp.id, Number(e.target.value))
                      }
                      className="w-16 px-2 py-1 border border-slate-200 rounded font-mono text-xs text-right font-semibold"
                    />
                    <span className="text-slate-500">%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Benchmark visualization */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-teal-700 h-full rounded-full"
                style={{ width: `${comp.benchmarkPercent}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
