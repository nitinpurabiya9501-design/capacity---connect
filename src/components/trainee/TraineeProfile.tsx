import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Mail, Building, Shield, Check, Save } from 'lucide-react';

export const TraineeProfile: React.FC = () => {
  const { currentUser, notify } = useApp();

  const [name, setName] = useState(currentUser?.name || '');
  const [department, setDepartment] = useState(currentUser?.department || '');
  const [bio, setBio] = useState(currentUser?.bio || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      currentUser.name = name;
      currentUser.department = department;
      currentUser.bio = bio;
      notify('Profile information updated.');
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Personal Profile & Academic Details
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage your student identity, departmental affiliation, and bio.
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="border border-slate-200 rounded-lg p-6 bg-white space-y-4 text-xs"
      >
        <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
          <div className="w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-lg">
            {currentUser?.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-base">
              {currentUser?.name}
            </h3>
            <span className="text-[11px] text-teal-700 font-medium uppercase tracking-wider block">
              {currentUser?.role} Member · {currentUser?.status}
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-medium text-slate-700 block">Full Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:border-slate-400"
          />
        </div>

        <div className="space-y-1">
          <label className="font-medium text-slate-700 block">Institutional Email (Read Only)</label>
          <input
            type="email"
            disabled
            value={currentUser?.email || ''}
            className="w-full px-3 py-2 border border-slate-200 rounded-md bg-slate-50 text-slate-500 cursor-not-allowed"
          />
        </div>

        <div className="space-y-1">
          <label className="font-medium text-slate-700 block">Department / Class Year</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:border-slate-400"
          />
        </div>

        <div className="space-y-1">
          <label className="font-medium text-slate-700 block">Personal Bio & Learning Goals</label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-hidden focus:border-slate-400"
          ></textarea>
        </div>

        <div className="pt-2 flex items-center justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
};
