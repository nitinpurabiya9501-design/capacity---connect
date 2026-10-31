import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Award,
  BarChart2,
  FileText,
  MessageSquare,
  User,
  Users,
  Layers,
  Bell,
  LogOut,
  FolderPlus,
  HelpCircle,
  Menu,
  X,
  FileSpreadsheet,
  Mail,
  Shield,
  CheckCircle,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number | string;
}

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    currentUser,
    dashboardTab,
    setDashboardTab,
    logout,
    setActivePage,
    quickLoginAs,
    contactMessages,
    announcements,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!currentUser) {
    return (
      <div className="p-12 text-center">
        <p className="text-sm text-slate-500">Session expired or unauthorized.</p>
        <button
          onClick={() => setActivePage('login')}
          className="mt-4 px-4 py-2 bg-slate-900 text-white rounded text-xs"
        >
          Return to Sign In
        </button>
      </div>
    );
  }

  // Define sidebar menu items per role
  let menuItems: SidebarItem[] = [];

  if (currentUser.role === 'trainee') {
    menuItems = [
      { id: 'overview', label: 'Overview', icon: LayoutDashboard },
      { id: 'my-courses', label: 'My Courses & Learning', icon: BookOpen },
      { id: 'catalog', label: 'Available Courses', icon: Layers },
      { id: 'materials', label: 'Learning Materials', icon: FileText },
      { id: 'quizzes', label: 'Quizzes & Assessments', icon: HelpCircle },
      { id: 'certificates', label: 'My Certificates', icon: Award },
      { id: 'competencies', label: 'Competency Profile', icon: BarChart2 },
      { id: 'feedback', label: 'Submit Feedback', icon: MessageSquare },
      { id: 'profile', label: 'Personal Profile', icon: User },
    ];
  } else if (currentUser.role === 'trainer') {
    menuItems = [
      { id: 'overview', label: 'Trainer Overview', icon: LayoutDashboard },
      { id: 'courses-manage', label: 'Manage Courses & Lessons', icon: BookOpen },
      { id: 'quiz-builder', label: 'Quiz & Assessment Builder', icon: HelpCircle },
      { id: 'assessment-results', label: 'Trainee Results', icon: Award },
      { id: 'trainee-progress', label: 'Progress Tracking', icon: BarChart2 },
      { id: 'skills', label: 'Skills & Expertise', icon: GraduationCap },
      { id: 'profile', label: 'Trainer Profile', icon: User },
    ];
  } else if (currentUser.role === 'admin') {
    const unreadCount = contactMessages.filter((m) => m.status === 'unread').length;
    menuItems = [
      { id: 'overview', label: 'System Overview', icon: LayoutDashboard },
      { id: 'users', label: 'Users & Permissions', icon: Users },
      { id: 'courses-admin', label: 'Courses & Categories', icon: BookOpen },
      { id: 'announcements', label: 'Announcements', icon: Bell },
      { id: 'enrollments', label: 'Monitor Enrollments', icon: Layers },
      { id: 'certificates-admin', label: 'Certificates Ledger', icon: Award },
      { id: 'competencies-admin', label: 'Competency Framework', icon: BarChart2 },
      {
        id: 'contact-messages',
        label: 'Contact Messages',
        icon: Mail,
        badge: unreadCount > 0 ? unreadCount : undefined,
      },
      { id: 'reports', label: 'Reports & Export CSV', icon: FileSpreadsheet },
    ];
  }

  const activeLabel =
    menuItems.find((i) => i.id === dashboardTab)?.label || 'Dashboard';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Top Navbar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
            CC
          </div>
          <div>
            <span className="font-semibold text-slate-900 text-sm block">
              CAPACITY CONNECT
            </span>
            <span className="text-[10px] text-teal-700 font-bold uppercase block">
              {currentUser.role} Portal
            </span>
          </div>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 text-slate-600 rounded hover:bg-slate-100"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          mobileMenuOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-white border-r border-slate-200 flex-col shrink-0 min-h-[calc(100vh-4rem)] md:min-h-screen sticky top-0`}
      >
        <div className="p-5 border-b border-slate-200 hidden md:flex items-center justify-between">
          <button
            onClick={() => setActivePage('home')}
            className="flex items-center gap-2 text-left group cursor-pointer focus:outline-hidden"
          >
            <div className="w-7 h-7 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              CC
            </div>
            <div>
              <span className="font-semibold text-slate-900 text-sm block tracking-tight">
                CAPACITY CONNECT
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
                PBL-I College LMS
              </span>
            </div>
          </button>
        </div>

        {/* Current user card in sidebar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
              {currentUser.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-semibold text-slate-900 block truncate">
                {currentUser.name}
              </span>
              <span className="text-[10px] font-medium text-teal-700 block uppercase tracking-wider">
                {currentUser.role}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = dashboardTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setDashboardTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer text-left ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      isActive ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-700 font-semibold'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom controls */}
        <div className="p-3 border-t border-slate-200 space-y-2 bg-slate-50/30">
          {/* Quick role test toggles */}
          <div className="px-2 pt-1">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Switch Test Role
            </div>
            <div className="flex items-center gap-1 text-[11px]">
              <button
                onClick={() => quickLoginAs('admin')}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  currentUser.role === 'admin'
                    ? 'bg-slate-200 text-slate-900 font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Admin
              </button>
              <button
                onClick={() => quickLoginAs('trainer')}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  currentUser.role === 'trainer'
                    ? 'bg-slate-200 text-slate-900 font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Trainer
              </button>
              <button
                onClick={() => quickLoginAs('trainee')}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  currentUser.role === 'trainee'
                    ? 'bg-slate-200 text-slate-900 font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Trainee
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              setActivePage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            <span>Public Website</span>
          </button>

          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-rose-600 hover:text-rose-700 rounded-md hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header / Breadcrumb Bar */}
        <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="capitalize">{currentUser.role} Portal</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-900">{activeLabel}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActivePage('courses');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs text-slate-600 hover:text-slate-900 transition-colors hidden sm:block"
            >
              Browse Catalog
            </button>
            <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>
            <div className="text-xs text-slate-600">
              <span className="text-slate-400 font-normal">Active: </span>
              <strong className="text-slate-900 font-medium">{currentUser.name}</strong>
            </div>
          </div>
        </header>

        {/* Child Content Viewport */}
        <main className="p-6 md:p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
