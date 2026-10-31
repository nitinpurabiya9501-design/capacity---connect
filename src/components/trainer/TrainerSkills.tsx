import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GraduationCap, Plus, X, Check, Shield } from 'lucide-react';

export const TrainerSkills: React.FC = () => {
  const { currentUser, notify } = useApp();

  const [skills, setSkills] = useState<string[]>([
    'PHP 8+ Object-Oriented Programming',
    'Relational Schema Design & 3NF Normalization',
    'MySQL PDO & Transaction Management',
    'RESTful API Architecture',
    'Web Security (CSRF, XSS, RBAC)',
    'Linux Systems Administration',
  ]);

  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim() || skills.includes(newSkill.trim())) return;

    setSkills([...skills, newSkill.trim()]);
    setNewSkill('');
    notify('Skill added to trainer profile.');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
    notify('Skill removed.');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Professional Skills & Domain Expertise
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Your active technical expertise tags are mapped against college competency frameworks and course catalog categories.
        </p>
      </div>

      <div className="border border-slate-200 rounded-lg p-6 bg-white space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-teal-600" />
            <span>Assigned Domain Qualifications ({skills.length})</span>
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-800 rounded-md text-xs font-medium"
            >
              <span>{skill}</span>
              <button
                onClick={() => handleRemoveSkill(skill)}
                className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                aria-label="Remove skill"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Add Skill form */}
        <form onSubmit={handleAddSkill} className="flex items-center gap-2 pt-4 border-t border-slate-100">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add new domain qualification (e.g. Docker Container Orchestration)"
            className="flex-1 px-3 py-2 border border-slate-200 rounded-md text-xs focus:outline-hidden"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Skill Tag</span>
          </button>
        </form>
      </div>

      <div className="p-4 border border-slate-200 rounded-lg bg-slate-50 text-xs text-slate-600 leading-relaxed">
        <strong>PBL-I Faculty Note:</strong> When student trainees take competency gap assessments, the platform algorithm matches recommended curricula to faculty trainers possessing verified tags in those exact skill sets.
      </div>
    </div>
  );
};
