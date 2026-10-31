import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserPlus, ShieldAlert } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { register, setActivePage } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'trainee' | 'trainer'>('trainee');
  const [department, setDepartment] = useState('Computer Engineering (Year 3)');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) return;

    register(name, email, password, role, department);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      <div className="text-center space-y-2">
        <div className="w-10 h-10 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold text-base mx-auto">
          CC
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Create an Account
        </h1>
        <p className="text-xs text-slate-500">
          Join the PBL-I Capacity Building Initiative
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="border border-slate-200 rounded-lg p-6 bg-white space-y-4 shadow-xs"
      >
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700 block">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Sanya Mirza"
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-xs focus:outline-hidden focus:border-slate-400"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700 block">
            Institutional Email *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="sanya.m@capacityconnect.edu"
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-xs focus:outline-hidden focus:border-slate-400"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700 block">
            Academic Role *
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as 'trainee' | 'trainer')}
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-xs bg-white text-slate-700 focus:outline-hidden"
          >
            <option value="trainee">Student Trainee (Enroll & Learn)</option>
            <option value="trainer">Faculty Trainer (Author & Evaluate)</option>
          </select>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 pt-1">
            <ShieldAlert className="w-3 h-3 text-slate-400 shrink-0" />
            <span>Admin privileges require internal system authorization and cannot be self-selected.</span>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700 block">
            Department / Division
          </label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="e.g. Information Technology"
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-xs focus:outline-hidden focus:border-slate-400"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700 block">
            Password *
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimum 6 characters"
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-xs focus:outline-hidden focus:border-slate-400"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Register Account</span>
        </button>

        <div className="pt-2 text-center text-xs text-slate-500">
          Already registered?{' '}
          <button
            type="button"
            onClick={() => setActivePage('login')}
            className="text-slate-900 font-semibold hover:underline cursor-pointer"
          >
            Sign In Here
          </button>
        </div>
      </form>
    </div>
  );
};
