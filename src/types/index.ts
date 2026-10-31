export type UserRole = 'trainee' | 'trainer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  department?: string;
  bio?: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  courseCount?: number;
}

export interface LessonResource {
  id: string;
  title: string;
  type: 'pdf' | 'doc' | 'link' | 'code';
  size?: string;
  url: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  durationMinutes: number;
  content: string; // Markdown or detailed text
  resources: LessonResource[];
  order: number;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  order: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  categoryId: string;
  categoryName: string;
  trainerId: string;
  trainerName: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationHours: number;
  thumbnail: string;
  isPublished: boolean;
  featured?: boolean;
  competencies: string[]; // e.g. ['Full-Stack', 'MySQL', 'API Design']
  createdAt: string;
  modules: Module[];
  enrolledCount: number;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  completedLessonIds: string[];
  progressPercent: number; // 0 - 100
  isCompleted: boolean;
  completedAt?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[]; // [Option A, Option B, Option C, Option D]
  correctAnswerIndex: number; // 0, 1, 2, or 3
  explanation?: string;
}

export interface Quiz {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  description: string;
  passingScorePercent: number;
  timeLimitMinutes?: number;
  questions: QuizQuestion[];
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  courseId: string;
  userId: string;
  userName: string;
  userEmail: string;
  scorePercent: number;
  passed: boolean;
  selectedAnswers: number[]; // Index chosen per question
  attemptedAt: string;
}

export interface Certificate {
  id: string;
  certificateNumber: string; // e.g. CC-2026-9042
  userId: string;
  userName: string;
  courseId: string;
  courseTitle: string;
  issueDate: string;
  grade: 'Distinction' | 'Merit' | 'Pass';
  scorePercent: number;
  trainerName: string;
  verified: boolean;
}

export interface CompetencySkill {
  id: string;
  name: string;
  category: string;
  description: string;
  currentLevelPercent: number; // 0 - 100
  benchmarkPercent: number; // target
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  targetRole: 'all' | 'trainee' | 'trainer';
  authorName: string;
  createdAt: string;
  priority: 'normal' | 'important';
}

export interface Feedback {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  courseId?: string;
  courseTitle?: string;
  rating: number; // 1-5
  category: 'Course Content' | 'Platform Usability' | 'Trainer Assessment' | 'General';
  message: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  category: 'PBL Inquiries' | 'Technical Support' | 'Partnership & Training' | 'Feedback';
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}
