import React from 'react';
import { useApp } from '../context/AppContext';
import { Layers, User as UserIcon, LogOut, FileCode2 } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    activePage,
    setActivePage,
    setDashboardTab,
    logout,
    setIsPblModalOpen,
  } = useApp();

  const handleNav = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-2 text-left whitespace-nowrap shrink-0 group focus:outline-hidden"
        >
          <div className="w-8 h-8 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold text-sm tracking-tight transition-transform group-hover:scale-95">
            CC
          </div>
          <div className="leading-tight">
            <span className="font-semibold text-slate-900 tracking-tight text-base block">
              CAPACITY CONNECT
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wide block uppercase">
              PBL-I Digital Portal
            </span>
          </div>
        </button>

        {/* Zone 2: Concise Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => handleNav('home')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
              activePage === 'home' ? 'text-slate-900 font-semibold' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNav('about')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
              activePage === 'about' ? 'text-slate-900 font-semibold' : ''
            }`}
          >
            About Project
          </button>
          <button
            onClick={() => handleNav('courses')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
              activePage === 'courses' ? 'text-slate-900 font-semibold' : ''
            }`}
          >
            Courses Catalog
          </button>
          <button
            onClick={() => handleNav('contact')}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
              activePage === 'contact' ? 'text-slate-900 font-semibold' : ''
            }`}
          >
            Contact
          </button>
          <button
            onClick={() => setIsPblModalOpen(true)}
            className="flex items-center gap-1.5 text-teal-700 hover:text-teal-800 transition-colors whitespace-nowrap shrink-0 font-medium"
          >
            <FileCode2 className="w-3.5 h-3.5" />
            <span>XAMPP & SQL Deliverables</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action / User State */}
        <div className="flex items-center gap-3 shrink-0">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setActivePage('dashboard');
                  setDashboardTab('overview');
                }}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap"
              >
                <UserIcon className="w-3.5 h-3.5 text-slate-500" />
                <span className="truncate max-w-[110px]">{currentUser.name.split(' ')[0]}</span>
                <span className="text-[10px] text-teal-700 font-semibold tracking-wider uppercase ml-1">
                  [{currentUser.role}]
                </span>
              </button>

              <button
                onClick={() => {
                  setActivePage('dashboard');
                  setDashboardTab('overview');
                }}
                className="px-3 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors whitespace-nowrap"
              >
                Dashboard
              </button>

              <button
                onClick={logout}
                title="Sign out"
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors"
                aria-label="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNav('login')}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 rounded-md transition-colors whitespace-nowrap"
              >
                Sign In
              </button>
              <button
                onClick={() => handleNav('register')}
                className="px-3.5 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors whitespace-nowrap"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile nav subbar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-100 px-4 py-2 text-xs font-medium text-slate-600">
        <button
          onClick={() => handleNav('home')}
          className={activePage === 'home' ? 'text-slate-900 font-semibold' : ''}
        >
          Home
        </button>
        <button
          onClick={() => handleNav('about')}
          className={activePage === 'about' ? 'text-slate-900 font-semibold' : ''}
        >
          About
        </button>
        <button
          onClick={() => handleNav('courses')}
          className={activePage === 'courses' ? 'text-slate-900 font-semibold' : ''}
        >
          Courses
        </button>
        <button
          onClick={() => handleNav('contact')}
          className={activePage === 'contact' ? 'text-slate-900 font-semibold' : ''}
        >
          Contact
        </button>
        <button
          onClick={() => setIsPblModalOpen(true)}
          className="text-teal-700 font-semibold"
        >
          SQL / PHP
        </button>
      </div>
    </header>
  );
};
