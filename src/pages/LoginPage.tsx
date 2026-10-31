import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, LogIn, UserCheck, KeyRound } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, quickLoginAs, setActivePage } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const success = login(email, password);
    if (!success) {
      setErrorMsg('Invalid email or account does not exist. Use a demo button below for instant login.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      <div className="text-center space-y-2">
        <div className="w-10 h-10 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold text-base mx-auto">
          CC
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Sign In to CAPACITY CONNECT
        </h1>
        <p className="text-xs text-slate-500">
          Digital Capacity Building & Learning Management Portal
        </p>
      </div>

      {/* Manual Login Card */}
      <form
        onSubmit={handleManualLogin}
        className="border border-slate-200 rounded-lg p-6 bg-white space-y-4 shadow-xs"
      >
        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-md">
            {errorMsg}
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700 block">
            Institutional Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. rahul.verma@capacityconnect.edu"
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-xs focus:outline-hidden focus:border-slate-400"
          />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-slate-700 block">
              Password
            </label>
          </div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-xs focus:outline-hidden focus:border-slate-400"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          <LogIn className="w-3.5 h-3.5" />
          <span>Sign In</span>
        </button>

        <div className="pt-2 text-center text-xs text-slate-500">
          Don't have an account yet?{' '}
          <button
            type="button"
            onClick={() => setActivePage('register')}
            className="text-slate-900 font-semibold hover:underline cursor-pointer"
          >
            Register Here
          </button>
        </div>
      </form>

      {/* One-Click Evaluator Demo Accounts */}
      <div className="border border-slate-200 rounded-lg p-5 bg-slate-50/60 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-900">
          <KeyRound className="w-3.5 h-3.5 text-teal-600" />
          <span>One-Click Evaluator Demo Sign-In</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          For project demonstration and evaluation, select any of the pre-seeded role accounts:
        </p>

        <div className="grid grid-cols-1 gap-2 pt-1 text-xs">
          <button
            type="button"
            onClick={() => quickLoginAs('admin')}
            className="w-full p-2.5 bg-white border border-slate-200 rounded-md hover:border-slate-300 transition-colors flex items-center justify-between cursor-pointer text-left"
          >
            <div>
              <span className="font-semibold text-slate-900 block">Administrator</span>
              <span className="text-[11px] text-slate-500">Nitin Purabiya · System Governance & Reports</span>
            </div>
            <span className="text-[10px] text-teal-700 font-semibold uppercase tracking-wider">
              Enter Admin →
            </span>
          </button>

          <button
            type="button"
            onClick={() => quickLoginAs('trainer')}
            className="w-full p-2.5 bg-white border border-slate-200 rounded-md hover:border-slate-300 transition-colors flex items-center justify-between cursor-pointer text-left"
          >
            <div>
              <span className="font-semibold text-slate-900 block">Faculty Trainer</span>
              <span className="text-[11px] text-slate-500">Prof. Priya Sharma · Course & Quiz Builder</span>
            </div>
            <span className="text-[10px] text-teal-700 font-semibold uppercase tracking-wider">
              Enter Trainer →
            </span>
          </button>

          <button
            type="button"
            onClick={() => quickLoginAs('trainee')}
            className="w-full p-2.5 bg-white border border-slate-200 rounded-md hover:border-slate-300 transition-colors flex items-center justify-between cursor-pointer text-left"
          >
            <div>
              <span className="font-semibold text-slate-900 block">Student Trainee</span>
              <span className="text-[11px] text-slate-500">Rahul Verma · Learning Modules & Tests</span>
            </div>
            <span className="text-[10px] text-teal-700 font-semibold uppercase tracking-wider">
              Enter Trainee →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
