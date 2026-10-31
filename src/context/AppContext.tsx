import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  Course,
  Category,
  Module,
  Lesson,
  Enrollment,
  Quiz,
  QuizAttempt,
  Certificate,
  CompetencySkill,
  Announcement,
  Feedback,
  ContactMessage,
} from '../types';
import {
  SEED_USERS,
  SEED_CATEGORIES,
  SEED_COURSES,
  SEED_QUIZZES,
  SEED_ENROLLMENTS,
  SEED_CERTIFICATES,
  SEED_COMPETENCIES,
  SEED_ANNOUNCEMENTS,
  SEED_FEEDBACK,
  SEED_CONTACT_MESSAGES,
} from '../data/seedData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  currentUser: User | null;
  users: User[];
  courses: Course[];
  categories: Category[];
  enrollments: Enrollment[];
  quizzes: Quiz[];
  quizAttempts: QuizAttempt[];
  certificates: Certificate[];
  competencies: CompetencySkill[];
  announcements: Announcement[];
  feedbacks: Feedback[];
  contactMessages: ContactMessage[];
  toasts: Toast[];

  // Navigation / Active View
  activePage: string;
  setActivePage: (page: string) => void;
  dashboardTab: string;
  setDashboardTab: (tab: string) => void;
  selectedCourseId: string | null;
  setSelectedCourseId: (id: string | null) => void;
  selectedQuizId: string | null;
  setSelectedQuizId: (id: string | null) => void;
  viewingCertificate: Certificate | null;
  setViewingCertificate: (cert: Certificate | null) => void;
  isPblModalOpen: boolean;
  setIsPblModalOpen: (open: boolean) => void;

  // Actions
  login: (email: string, password: string) => boolean;
  quickLoginAs: (role: UserRole) => void;
  logout: () => void;
  register: (name: string, email: string, password: string, role: 'trainee' | 'trainer', department?: string) => boolean;
  notify: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;

  // Trainee actions
  enrollCourse: (courseId: string) => void;
  isEnrolled: (courseId: string) => boolean;
  getEnrollment: (courseId: string) => Enrollment | undefined;
  toggleLessonComplete: (courseId: string, lessonId: string) => void;
  submitQuizAttempt: (quizId: string, selectedAnswers: number[]) => QuizAttempt;
  getTraineeQuizzes: () => Quiz[];
  getTraineeCertificates: () => Certificate[];

  // Trainer actions
  addCourse: (course: Partial<Course>) => void;
  updateCourse: (courseId: string, data: Partial<Course>) => void;
  deleteCourse: (courseId: string) => void;
  togglePublishCourse: (courseId: string) => void;
  addModule: (courseId: string, title: string, description?: string) => void;
  addLesson: (courseId: string, moduleId: string, lesson: Partial<Lesson>) => void;
  addQuiz: (quiz: Partial<Quiz>) => void;
  updateQuiz: (quizId: string, quiz: Partial<Quiz>) => void;

  // Admin actions
  addUser: (user: Partial<User>) => void;
  updateUserRole: (userId: string, newRole: UserRole) => void;
  toggleUserStatus: (userId: string) => void;
  addCategory: (category: Partial<Category>) => void;
  deleteCategory: (categoryId: string) => void;
  addAnnouncement: (announcement: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;
  issueCertificateManual: (userId: string, courseId: string, grade: 'Distinction' | 'Merit' | 'Pass', score: number) => Certificate;
  revokeCertificate: (certId: string) => void;
  updateContactStatus: (id: string, status: 'unread' | 'read' | 'replied') => void;

  // Shared
  submitFeedback: (feedback: Partial<Feedback>) => void;
  submitContactMessage: (msg: Partial<ContactMessage>) => void;
  exportCsv: (dataset: 'users' | 'courses' | 'enrollments' | 'quizzes' | 'certificates') => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'capacity_connect_v1_';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state with localStorage or seed data
  const loadStored = <T,>(key: string, fallback: T): T => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PREFIX + key);
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  };

  const [users, setUsers] = useState<User[]>(() => loadStored('users', SEED_USERS));
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = loadStored<User | null>('currentUser', null);
    if (savedUser) return savedUser;
    // Default to trainee for immediate exploration, or keep null if desired.
    return SEED_USERS.find((u) => u.role === 'trainee') || null;
  });

  const [courses, setCourses] = useState<Course[]>(() => loadStored('courses', SEED_COURSES));
  const [categories, setCategories] = useState<Category[]>(() => loadStored('categories', SEED_CATEGORIES));
  const [enrollments, setEnrollments] = useState<Enrollment[]>(() => loadStored('enrollments', SEED_ENROLLMENTS));
  const [quizzes, setQuizzes] = useState<Quiz[]>(() => loadStored('quizzes', SEED_QUIZZES));
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>(() => loadStored('quiz_attempts', []));
  const [certificates, setCertificates] = useState<Certificate[]>(() => loadStored('certificates', SEED_CERTIFICATES));
  const [competencies, setCompetencies] = useState<CompetencySkill[]>(() => loadStored('competencies', SEED_COMPETENCIES));
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => loadStored('announcements', SEED_ANNOUNCEMENTS));
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(() => loadStored('feedbacks', SEED_FEEDBACK));
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => loadStored('contact_messages', SEED_CONTACT_MESSAGES));

  // Navigation states
  const [activePage, setActivePage] = useState<string>('home'); // 'home', 'about', 'courses', 'course-detail', 'contact', 'login', 'register', 'dashboard'
  const [dashboardTab, setDashboardTab] = useState<string>('overview');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const [viewingCertificate, setViewingCertificate] = useState<Certificate | null>(null);
  const [isPblModalOpen, setIsPblModalOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'users', JSON.stringify(users));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'currentUser', JSON.stringify(currentUser));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'courses', JSON.stringify(courses));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'categories', JSON.stringify(categories));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'enrollments', JSON.stringify(enrollments));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'quizzes', JSON.stringify(quizzes));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'quiz_attempts', JSON.stringify(quizAttempts));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'certificates', JSON.stringify(certificates));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'competencies', JSON.stringify(competencies));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'announcements', JSON.stringify(announcements));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'feedbacks', JSON.stringify(feedbacks));
      localStorage.setItem(STORAGE_KEY_PREFIX + 'contact_messages', JSON.stringify(contactMessages));
    } catch {
      // ignore storage quota issues
    }
  }, [
    users,
    currentUser,
    courses,
    categories,
    enrollments,
    quizzes,
    quizAttempts,
    certificates,
    competencies,
    announcements,
    feedbacks,
    contactMessages,
  ]);

  const notify = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Auth
  const login = (email: string, _pass: string): boolean => {
    const found = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!found) {
      notify('Account with this email does not exist.', 'error');
      return false;
    }
    if (found.status === 'inactive') {
      notify('Your account has been deactivated by the administrator.', 'error');
      return false;
    }
    setCurrentUser(found);
    notify(`Signed in successfully as ${found.name} (${found.role.toUpperCase()})`);
    setActivePage('dashboard');
    setDashboardTab('overview');
    return true;
  };

  const quickLoginAs = (role: UserRole) => {
    const found = users.find((u) => u.role === role);
    if (found) {
      setCurrentUser(found);
      notify(`Switched to demo ${role.toUpperCase()} account: ${found.name}`);
      setActivePage('dashboard');
      setDashboardTab('overview');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    notify('You have signed out.');
    setActivePage('home');
  };

  const register = (
    name: string,
    email: string,
    _password: string,
    role: 'trainee' | 'trainer',
    department?: string
  ): boolean => {
    if (users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
      notify('An account with this email already exists.', 'error');
      return false;
    }
    // Hard security check: never allow admin self-assignment
    const sanitizedRole: UserRole = role === 'trainer' ? 'trainer' : 'trainee';

    const newUser: User = {
      id: 'user-' + Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role: sanitizedRole,
      department: department || 'Department of Engineering',
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    notify(`Welcome, ${newUser.name}! Your ${sanitizedRole} account was created.`);
    setActivePage('dashboard');
    setDashboardTab('overview');
    return true;
  };

  // Enrollments
  const enrollCourse = (courseId: string) => {
    if (!currentUser) {
      notify('Please sign in or register to enroll in courses.', 'info');
      setActivePage('login');
      return;
    }
    const already = enrollments.find(
      (e) => e.userId === currentUser.id && e.courseId === courseId
    );
    if (already) {
      notify('You are already enrolled in this course.', 'info');
      return;
    }

    const newEnrollment: Enrollment = {
      id: 'enr-' + Date.now(),
      userId: currentUser.id,
      courseId,
      enrolledAt: new Date().toISOString(),
      completedLessonIds: [],
      progressPercent: 0,
      isCompleted: false,
    };

    setEnrollments((prev) => [...prev, newEnrollment]);
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, enrolledCount: (c.enrolledCount || 0) + 1 } : c))
    );
    notify('Enrolled successfully! You can start learning now.');
  };

  const isEnrolled = (courseId: string): boolean => {
    if (!currentUser) return false;
    return enrollments.some((e) => e.userId === currentUser.id && e.courseId === courseId);
  };

  const getEnrollment = (courseId: string): Enrollment | undefined => {
    if (!currentUser) return undefined;
    return enrollments.find((e) => e.userId === currentUser.id && e.courseId === courseId);
  };

  const toggleLessonComplete = (courseId: string, lessonId: string) => {
    if (!currentUser) return;
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    // Collect all lesson ids in this course
    const allLessonIds: string[] = [];
    course.modules.forEach((m) => {
      m.lessons.forEach((l) => allLessonIds.push(l.id));
    });

    setEnrollments((prev) =>
      prev.map((e) => {
        if (e.userId === currentUser.id && e.courseId === courseId) {
          const isDone = e.completedLessonIds.includes(lessonId);
          const newCompleted = isDone
            ? e.completedLessonIds.filter((id) => id !== lessonId)
            : [...e.completedLessonIds, lessonId];

          const total = allLessonIds.length || 1;
          const progress = Math.round((newCompleted.length / total) * 100);
          const isFinished = progress === 100;

          return {
            ...e,
            completedLessonIds: newCompleted,
            progressPercent: progress,
            isCompleted: isFinished,
            completedAt: isFinished ? new Date().toISOString() : undefined,
          };
        }
        return e;
      })
    );

    notify('Lesson progress updated.');
  };

  // Quizzes & Attempts
  const submitQuizAttempt = (quizId: string, selectedAnswers: number[]): QuizAttempt => {
    const quiz = quizzes.find((q) => q.id === quizId);
    if (!quiz || !currentUser) {
      throw new Error('Invalid quiz or user session');
    }

    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    const scorePercent = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = scorePercent >= quiz.passingScorePercent;

    const attempt: QuizAttempt = {
      id: 'att-' + Date.now(),
      quizId,
      courseId: quiz.courseId,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      scorePercent,
      passed,
      selectedAnswers,
      attemptedAt: new Date().toISOString(),
    };

    setQuizAttempts((prev) => [...prev, attempt]);

    // Check certificate eligibility
    if (passed) {
      const existingCert = certificates.find(
        (c) => c.userId === currentUser.id && c.courseId === quiz.courseId
      );
      if (!existingCert) {
        const course = courses.find((c) => c.id === quiz.courseId);
        const grade: 'Distinction' | 'Merit' | 'Pass' =
          scorePercent >= 90 ? 'Distinction' : scorePercent >= 75 ? 'Merit' : 'Pass';

        const newCert: Certificate = {
          id: 'cert-' + Date.now(),
          certificateNumber: `CC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          userId: currentUser.id,
          userName: currentUser.name,
          courseId: quiz.courseId,
          courseTitle: quiz.courseTitle,
          issueDate: new Date().toISOString().split('T')[0],
          grade,
          scorePercent,
          trainerName: course?.trainerName || 'Department Faculty',
          verified: true,
        };
        setCertificates((prev) => [...prev, newCert]);
        notify(
          `Congratulations! You passed with ${scorePercent}%. Certificate ${newCert.certificateNumber} generated!`
        );
      } else {
        notify(`Quiz submitted. Score: ${scorePercent}% (${passed ? 'PASSED' : 'NOT PASSED'}).`);
      }
    } else {
      notify(`Quiz submitted. Score: ${scorePercent}%. You need ${quiz.passingScorePercent}% to pass.`, 'info');
    }

    return attempt;
  };

  const getTraineeQuizzes = (): Quiz[] => {
    if (!currentUser) return [];
    const enrolledCourseIds = enrollments
      .filter((e) => e.userId === currentUser.id)
      .map((e) => e.courseId);
    return quizzes.filter((q) => enrolledCourseIds.includes(q.courseId));
  };

  const getTraineeCertificates = (): Certificate[] => {
    if (!currentUser) return [];
    return certificates.filter((c) => c.userId === currentUser.id);
  };

  // Trainer course management
  const addCourse = (courseData: Partial<Course>) => {
    const newCourse: Course = {
      id: 'course-' + Date.now(),
      title: courseData.title || 'Untitled Course',
      slug: (courseData.title || 'untitled').toLowerCase().replace(/\s+/g, '-'),
      summary: courseData.summary || '',
      description: courseData.description || '',
      categoryId: courseData.categoryId || categories[0]?.id || 'cat-web',
      categoryName:
        categories.find((c) => c.id === courseData.categoryId)?.name || 'Full-Stack Web Engineering',
      trainerId: currentUser?.id || 'user-trainer-1',
      trainerName: currentUser?.name || 'Faculty Trainer',
      level: courseData.level || 'Intermediate',
      durationHours: Number(courseData.durationHours) || 12,
      thumbnail: courseData.thumbnail || '/src/assets/images/course_web_architecture_1791712576623.jpg',
      isPublished: courseData.isPublished !== undefined ? courseData.isPublished : true,
      featured: false,
      competencies: courseData.competencies || ['Web Architecture', 'Relational Design'],
      createdAt: new Date().toISOString(),
      modules: [],
      enrolledCount: 0,
    };

    setCourses((prev) => [newCourse, ...prev]);
    notify(`Course "${newCourse.title}" created successfully.`);
  };

  const updateCourse = (courseId: string, data: Partial<Course>) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const cat = categories.find((cat) => cat.id === data.categoryId);
          return {
            ...c,
            ...data,
            categoryName: cat ? cat.name : c.categoryName,
          };
        }
        return c;
      })
    );
    notify('Course updated successfully.');
  };

  const deleteCourse = (courseId: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
    notify('Course deleted.');
  };

  const togglePublishCourse = (courseId: string) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, isPublished: !c.isPublished } : c))
    );
    notify('Course status changed.');
  };

  const addModule = (courseId: string, title: string, description?: string) => {
    const newModule: Module = {
      id: 'mod-' + Date.now(),
      courseId,
      title,
      description,
      order: 1,
      lessons: [],
    };

    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          return {
            ...c,
            modules: [...c.modules, { ...newModule, order: c.modules.length + 1 }],
          };
        }
        return c;
      })
    );
    notify('Module added.');
  };

  const addLesson = (courseId: string, moduleId: string, lessonData: Partial<Lesson>) => {
    const newLesson: Lesson = {
      id: 'les-' + Date.now(),
      moduleId,
      title: lessonData.title || 'Untitled Lesson',
      durationMinutes: Number(lessonData.durationMinutes) || 20,
      content: lessonData.content || 'Lesson study content and lecture notes.',
      resources: lessonData.resources || [],
      order: 1,
    };

    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          return {
            ...c,
            modules: c.modules.map((m) => {
              if (m.id === moduleId) {
                return {
                  ...m,
                  lessons: [...m.lessons, { ...newLesson, order: m.lessons.length + 1 }],
                };
              }
              return m;
            }),
          };
        }
        return c;
      })
    );
    notify('Lesson added to syllabus.');
  };

  const addQuiz = (quizData: Partial<Quiz>) => {
    const course = courses.find((c) => c.id === quizData.courseId);
    const newQuiz: Quiz = {
      id: 'quiz-' + Date.now(),
      courseId: quizData.courseId || '',
      courseTitle: course?.title || 'Course Quiz',
      title: quizData.title || 'Course Assessment',
      description: quizData.description || 'Evaluate acquired competencies.',
      passingScorePercent: quizData.passingScorePercent || 70,
      timeLimitMinutes: quizData.timeLimitMinutes || 15,
      questions: quizData.questions || [],
    };

    setQuizzes((prev) => [...prev, newQuiz]);
    notify(`Quiz "${newQuiz.title}" created.`);
  };

  const updateQuiz = (quizId: string, quizData: Partial<Quiz>) => {
    setQuizzes((prev) => prev.map((q) => (q.id === quizId ? { ...q, ...quizData } : q)));
    notify('Quiz updated.');
  };

  // Admin actions
  const addUser = (userData: Partial<User>) => {
    const newUser: User = {
      id: 'user-' + Date.now(),
      name: userData.name || 'New User',
      email: userData.email || `user${Date.now()}@capacityconnect.edu`,
      role: userData.role || 'trainee',
      department: userData.department || 'Computer Engineering',
      status: userData.status || 'active',
      bio: userData.bio || '',
      createdAt: new Date().toISOString(),
    };
    setUsers((prev) => [...prev, newUser]);
    notify(`User "${newUser.name}" added.`);
  };

  const updateUserRole = (userId: string, newRole: UserRole) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
    notify('User role updated.');
  };

  const toggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
      )
    );
    notify('User status updated.');
  };

  const addCategory = (categoryData: Partial<Category>) => {
    const newCat: Category = {
      id: 'cat-' + Date.now(),
      name: categoryData.name || 'New Category',
      slug: (categoryData.name || 'new').toLowerCase().replace(/\s+/g, '-'),
      description: categoryData.description || '',
      courseCount: 0,
    };
    setCategories((prev) => [...prev, newCat]);
    notify('Category created.');
  };

  const deleteCategory = (categoryId: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== categoryId));
    notify('Category deleted.');
  };

  const addAnnouncement = (annData: Partial<Announcement>) => {
    const newAnn: Announcement = {
      id: 'ann-' + Date.now(),
      title: annData.title || 'Announcement',
      content: annData.content || '',
      targetRole: annData.targetRole || 'all',
      authorName: currentUser?.name || 'Administrator',
      createdAt: new Date().toISOString(),
      priority: annData.priority || 'normal',
    };
    setAnnouncements((prev) => [newAnn, ...prev]);
    notify('Announcement broadcasted.');
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    notify('Announcement removed.');
  };

  const issueCertificateManual = (
    userId: string,
    courseId: string,
    grade: 'Distinction' | 'Merit' | 'Pass',
    score: number
  ): Certificate => {
    const user = users.find((u) => u.id === userId);
    const course = courses.find((c) => c.id === courseId);
    const newCert: Certificate = {
      id: 'cert-' + Date.now(),
      certificateNumber: `CC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      userId,
      userName: user?.name || 'Recipient',
      courseId,
      courseTitle: course?.title || 'Certified Course',
      issueDate: new Date().toISOString().split('T')[0],
      grade,
      scorePercent: score,
      trainerName: course?.trainerName || 'Academic Dean',
      verified: true,
    };
    setCertificates((prev) => [newCert, ...prev]);
    notify(`Certificate ${newCert.certificateNumber} issued to ${newCert.userName}.`);
    return newCert;
  };

  const revokeCertificate = (certId: string) => {
    setCertificates((prev) => prev.filter((c) => c.id !== certId));
    notify('Certificate revoked.');
  };

  const updateContactStatus = (id: string, status: 'unread' | 'read' | 'replied') => {
    setContactMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
    notify('Inquiry status updated.');
  };

  const submitFeedback = (fbData: Partial<Feedback>) => {
    if (!currentUser) return;
    const newFb: Feedback = {
      id: 'fb-' + Date.now(),
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      courseId: fbData.courseId,
      courseTitle: fbData.courseTitle,
      rating: fbData.rating || 5,
      category: fbData.category || 'General',
      message: fbData.message || '',
      createdAt: new Date().toISOString(),
    };
    setFeedbacks((prev) => [newFb, ...prev]);
    notify('Thank you! Your feedback has been recorded.');
  };

  const submitContactMessage = (msgData: Partial<ContactMessage>) => {
    const newMsg: ContactMessage = {
      id: 'msg-' + Date.now(),
      name: msgData.name || 'Anonymous',
      email: msgData.email || '',
      subject: msgData.subject || 'PBL Inquiry',
      category: msgData.category || 'PBL Inquiries',
      message: msgData.message || '',
      status: 'unread',
      createdAt: new Date().toISOString(),
    };
    setContactMessages((prev) => [newMsg, ...prev]);
    notify('Your message has been sent. The project coordinators will review it shortly.');
  };

  // CSV Export utility
  const exportCsv = (dataset: 'users' | 'courses' | 'enrollments' | 'quizzes' | 'certificates') => {
    let headers: string[] = [];
    let rows: (string | number)[][] = [];
    let filename = `capacity_connect_${dataset}_${new Date().toISOString().split('T')[0]}.csv`;

    if (dataset === 'users') {
      headers = ['User ID', 'Name', 'Email', 'Role', 'Department', 'Status', 'Registered At'];
      rows = users.map((u) => [u.id, u.name, u.email, u.role, u.department || '', u.status, u.createdAt]);
    } else if (dataset === 'courses') {
      headers = ['Course ID', 'Title', 'Category', 'Trainer', 'Level', 'Duration (Hours)', 'Enrolled Count', 'Published'];
      rows = courses.map((c) => [c.id, `"${c.title}"`, c.categoryName, c.trainerName, c.level, c.durationHours, c.enrolledCount, c.isPublished ? 'Yes' : 'No']);
    } else if (dataset === 'enrollments') {
      headers = ['Enrollment ID', 'User ID', 'Course ID', 'Progress (%)', 'Completed', 'Enrolled At'];
      rows = enrollments.map((e) => [e.id, e.userId, e.courseId, e.progressPercent, e.isCompleted ? 'Yes' : 'No', e.enrolledAt]);
    } else if (dataset === 'quizzes') {
      headers = ['Attempt ID', 'Quiz ID', 'User Name', 'User Email', 'Score (%)', 'Passed', 'Date'];
      rows = quizAttempts.map((a) => [a.id, a.quizId, a.userName, a.userEmail, a.scorePercent, a.passed ? 'PASS' : 'FAIL', a.attemptedAt]);
    } else if (dataset === 'certificates') {
      headers = ['Certificate Number', 'Recipient Name', 'Course Title', 'Grade', 'Score (%)', 'Issue Date', 'Verified'];
      rows = certificates.map((c) => [c.certificateNumber, c.userName, `"${c.courseTitle}"`, c.grade, c.scorePercent, c.issueDate, c.verified ? 'Yes' : 'No']);
    }

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    notify(`Exported ${dataset.toUpperCase()} as CSV.`);
  };

  const resetAllData = () => {
    localStorage.clear();
    setUsers(SEED_USERS);
    setCurrentUser(SEED_USERS.find((u) => u.role === 'trainee') || null);
    setCourses(SEED_COURSES);
    setCategories(SEED_CATEGORIES);
    setEnrollments(SEED_ENROLLMENTS);
    setQuizzes(SEED_QUIZZES);
    setQuizAttempts([]);
    setCertificates(SEED_CERTIFICATES);
    setCompetencies(SEED_COMPETENCIES);
    setAnnouncements(SEED_ANNOUNCEMENTS);
    setFeedbacks(SEED_FEEDBACK);
    setContactMessages(SEED_CONTACT_MESSAGES);
    notify('Demo database reset to default PBL-I project state.');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        courses,
        categories,
        enrollments,
        quizzes,
        quizAttempts,
        certificates,
        competencies,
        announcements,
        feedbacks,
        contactMessages,
        toasts,
        activePage,
        setActivePage,
        dashboardTab,
        setDashboardTab,
        selectedCourseId,
        setSelectedCourseId,
        selectedQuizId,
        setSelectedQuizId,
        viewingCertificate,
        setViewingCertificate,
        isPblModalOpen,
        setIsPblModalOpen,
        login,
        quickLoginAs,
        logout,
        register,
        notify,
        removeToast,
        enrollCourse,
        isEnrolled,
        getEnrollment,
        toggleLessonComplete,
        submitQuizAttempt,
        getTraineeQuizzes,
        getTraineeCertificates,
        addCourse,
        updateCourse,
        deleteCourse,
        togglePublishCourse,
        addModule,
        addLesson,
        addQuiz,
        updateQuiz,
        addUser,
        updateUserRole,
        toggleUserStatus,
        addCategory,
        deleteCategory,
        addAnnouncement,
        deleteAnnouncement,
        issueCertificateManual,
        revokeCertificate,
        updateContactStatus,
        submitFeedback,
        submitContactMessage,
        exportCsv,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
