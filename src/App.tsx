import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { PblDeliverablesModal } from './components/PblDeliverablesModal';

// Public pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CoursesCatalogPage } from './pages/CoursesCatalogPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

// Dashboard layout and role views
import { DashboardLayout } from './components/DashboardLayout';

// Trainee views
import { TraineeOverview } from './components/trainee/TraineeOverview';
import { TraineeMyCourses } from './components/trainee/TraineeMyCourses';
import { TraineeQuizzes } from './components/trainee/TraineeQuizzes';
import { TraineeCertificates } from './components/trainee/TraineeCertificates';
import { TraineeCompetencies } from './components/trainee/TraineeCompetencies';
import { TraineeMaterials } from './components/trainee/TraineeMaterials';
import { TraineeFeedback } from './components/trainee/TraineeFeedback';
import { TraineeProfile } from './components/trainee/TraineeProfile';

// Trainer views
import { TrainerOverview } from './components/trainer/TrainerOverview';
import { TrainerCourses } from './components/trainer/TrainerCourses';
import { TrainerQuizBuilder } from './components/trainer/TrainerQuizBuilder';
import { TrainerAssessmentResults } from './components/trainer/TrainerAssessmentResults';
import { TrainerProgressTracker } from './components/trainer/TrainerProgressTracker';
import { TrainerSkills } from './components/trainer/TrainerSkills';

// Admin views
import { AdminOverview } from './components/admin/AdminOverview';
import { AdminUsers } from './components/admin/AdminUsers';
import { AdminCourses } from './components/admin/AdminCourses';
import { AdminAnnouncements } from './components/admin/AdminAnnouncements';
import { AdminEnrollments } from './components/admin/AdminEnrollments';
import { AdminCertificates } from './components/admin/AdminCertificates';
import { AdminCompetencies } from './components/admin/AdminCompetencies';
import { AdminContactMessages } from './components/admin/AdminContactMessages';
import { AdminReports } from './components/admin/AdminReports';

const AppContent: React.FC = () => {
  const { activePage, currentUser, dashboardTab } = useApp();

  const renderDashboardContent = () => {
    if (!currentUser) return null;

    if (currentUser.role === 'trainee') {
      switch (dashboardTab) {
        case 'overview':
          return <TraineeOverview />;
        case 'my-courses':
          return <TraineeMyCourses />;
        case 'catalog':
          return <CoursesCatalogPage />;
        case 'quizzes':
          return <TraineeQuizzes />;
        case 'certificates':
          return <TraineeCertificates />;
        case 'competencies':
          return <TraineeCompetencies />;
        case 'materials':
          return <TraineeMaterials />;
        case 'feedback':
          return <TraineeFeedback />;
        case 'profile':
          return <TraineeProfile />;
        default:
          return <TraineeOverview />;
      }
    }

    if (currentUser.role === 'trainer') {
      switch (dashboardTab) {
        case 'overview':
          return <TrainerOverview />;
        case 'courses-manage':
          return <TrainerCourses />;
        case 'quiz-builder':
          return <TrainerQuizBuilder />;
        case 'assessment-results':
          return <TrainerAssessmentResults />;
        case 'trainee-progress':
          return <TrainerProgressTracker />;
        case 'skills':
          return <TrainerSkills />;
        case 'profile':
          return <TraineeProfile />;
        default:
          return <TrainerOverview />;
      }
    }

    if (currentUser.role === 'admin') {
      switch (dashboardTab) {
        case 'overview':
          return <AdminOverview />;
        case 'users':
          return <AdminUsers />;
        case 'courses-admin':
          return <AdminCourses />;
        case 'announcements':
          return <AdminAnnouncements />;
        case 'enrollments':
          return <AdminEnrollments />;
        case 'certificates-admin':
          return <AdminCertificates />;
        case 'competencies-admin':
          return <AdminCompetencies />;
        case 'contact-messages':
          return <AdminContactMessages />;
        case 'reports':
          return <AdminReports />;
        default:
          return <AdminOverview />;
      }
    }

    return null;
  };

  if (activePage === 'dashboard' && currentUser) {
    return (
      <DashboardLayout>
        {renderDashboardContent()}
        <ToastContainer />
        <PblDeliverablesModal />
      </DashboardLayout>
    );
  }

  // Public pages rendering
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        {activePage === 'home' && <HomePage />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'courses' && <CoursesCatalogPage />}
        {activePage === 'course-detail' && <CourseDetailPage />}
        {activePage === 'contact' && <ContactPage />}
        {activePage === 'login' && <LoginPage />}
        {activePage === 'register' && <RegisterPage />}
      </main>
      <Footer />
      <ToastContainer />
      <PblDeliverablesModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
