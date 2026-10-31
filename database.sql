-- ==============================================================================
-- CAPACITY CONNECT — A Digital Capacity Building & Learning Management Portal
-- PBL-I College Project Database Schema & Demo Seed Data
-- Database Engine: MySQL 8.0+ / MariaDB 10.4+ (InnoDB Engine)
-- Character Set: utf8mb4 / Collation: utf8mb4_unicode_ci
-- ==============================================================================

SET FOREIGN_KEY_CHECKS = 0;
DROP DATABASE IF EXISTS `capacity_connect`;
CREATE DATABASE `capacity_connect` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `capacity_connect`;

-- ------------------------------------------------------------------------------
-- 1. TABLE: users
-- ------------------------------------------------------------------------------
CREATE TABLE `users` (
  `id` VARCHAR(64) NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('trainee', 'trainer', 'admin') NOT NULL DEFAULT 'trainee',
  `department` VARCHAR(150) DEFAULT NULL,
  `bio` TEXT DEFAULT NULL,
  `avatar_url` VARCHAR(255) DEFAULT NULL,
  `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_users_email` (`email`),
  KEY `idx_users_role` (`role`),
  KEY `idx_users_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 2. TABLE: categories
-- ------------------------------------------------------------------------------
CREATE TABLE `categories` (
  `id` VARCHAR(64) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(120) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_categories_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 3. TABLE: courses
-- ------------------------------------------------------------------------------
CREATE TABLE `courses` (
  `id` VARCHAR(64) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `summary` TEXT NOT NULL,
  `description` LONGTEXT NOT NULL,
  `category_id` VARCHAR(64) NOT NULL,
  `trainer_id` VARCHAR(64) NOT NULL,
  `level` ENUM('Beginner', 'Intermediate', 'Advanced') NOT NULL DEFAULT 'Intermediate',
  `duration_hours` INT UNSIGNED NOT NULL DEFAULT 10,
  `thumbnail` VARCHAR(255) DEFAULT NULL,
  `is_published` TINYINT(1) NOT NULL DEFAULT 1,
  `featured` TINYINT(1) NOT NULL DEFAULT 0,
  `enrolled_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_courses_slug` (`slug`),
  KEY `idx_courses_category` (`category_id`),
  KEY `idx_courses_trainer` (`trainer_id`),
  KEY `idx_courses_published` (`is_published`),
  CONSTRAINT `fk_courses_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_courses_trainer` FOREIGN KEY (`trainer_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 4. TABLE: course_skills (Competency Mapping)
-- ------------------------------------------------------------------------------
CREATE TABLE `course_skills` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `course_id` VARCHAR(64) NOT NULL,
  `skill_name` VARCHAR(100) NOT NULL,
  KEY `idx_cs_course` (`course_id`),
  CONSTRAINT `fk_cs_course` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 5. TABLE: modules
-- ------------------------------------------------------------------------------
CREATE TABLE `modules` (
  `id` VARCHAR(64) NOT NULL,
  `course_id` VARCHAR(64) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `sort_order` INT NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_modules_course` (`course_id`),
  CONSTRAINT `fk_modules_course` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 6. TABLE: lessons
-- ------------------------------------------------------------------------------
CREATE TABLE `lessons` (
  `id` VARCHAR(64) NOT NULL,
  `module_id` VARCHAR(64) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `duration_minutes` INT UNSIGNED NOT NULL DEFAULT 20,
  `content` LONGTEXT NOT NULL,
  `sort_order` INT NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_lessons_module` (`module_id`),
  CONSTRAINT `fk_lessons_module` FOREIGN KEY (`module_id`) REFERENCES `modules` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 7. TABLE: resources (PDFs & Study Handouts)
-- ------------------------------------------------------------------------------
CREATE TABLE `resources` (
  `id` VARCHAR(64) NOT NULL,
  `lesson_id` VARCHAR(64) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `file_type` VARCHAR(50) NOT NULL DEFAULT 'pdf',
  `file_size` VARCHAR(50) DEFAULT '1.2 MB',
  `file_path` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_resources_lesson` (`lesson_id`),
  CONSTRAINT `fk_resources_lesson` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 8. TABLE: enrollments
-- ------------------------------------------------------------------------------
CREATE TABLE `enrollments` (
  `id` VARCHAR(64) NOT NULL,
  `user_id` VARCHAR(64) NOT NULL,
  `course_id` VARCHAR(64) NOT NULL,
  `progress_percent` INT UNSIGNED NOT NULL DEFAULT 0,
  `is_completed` TINYINT(1) NOT NULL DEFAULT 0,
  `completed_at` DATETIME DEFAULT NULL,
  `enrolled_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_enrollment_user_course` (`user_id`, `course_id`),
  KEY `idx_enrollment_course` (`course_id`),
  CONSTRAINT `fk_enr_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_enr_course` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 9. TABLE: lesson_progress
-- ------------------------------------------------------------------------------
CREATE TABLE `lesson_progress` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `enrollment_id` VARCHAR(64) NOT NULL,
  `lesson_id` VARCHAR(64) NOT NULL,
  `completed_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `idx_progress_unique` (`enrollment_id`, `lesson_id`),
  CONSTRAINT `fk_lp_enrollment` FOREIGN KEY (`enrollment_id`) REFERENCES `enrollments` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_lp_lesson` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 10. TABLE: quizzes
-- ------------------------------------------------------------------------------
CREATE TABLE `quizzes` (
  `id` VARCHAR(64) NOT NULL,
  `course_id` VARCHAR(64) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `passing_score_percent` INT UNSIGNED NOT NULL DEFAULT 70,
  `time_limit_minutes` INT UNSIGNED NOT NULL DEFAULT 15,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_quizzes_course` (`course_id`),
  CONSTRAINT `fk_quizzes_course` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 11. TABLE: quiz_questions
-- ------------------------------------------------------------------------------
CREATE TABLE `quiz_questions` (
  `id` VARCHAR(64) NOT NULL,
  `quiz_id` VARCHAR(64) NOT NULL,
  `question` TEXT NOT NULL,
  `options_json` JSON NOT NULL,
  `correct_answer_index` INT UNSIGNED NOT NULL,
  `explanation` TEXT DEFAULT NULL,
  `sort_order` INT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `idx_questions_quiz` (`quiz_id`),
  CONSTRAINT `fk_qq_quiz` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 12. TABLE: quiz_attempts
-- ------------------------------------------------------------------------------
CREATE TABLE `quiz_attempts` (
  `id` VARCHAR(64) NOT NULL,
  `quiz_id` VARCHAR(64) NOT NULL,
  `course_id` VARCHAR(64) NOT NULL,
  `user_id` VARCHAR(64) NOT NULL,
  `score_percent` INT UNSIGNED NOT NULL,
  `passed` TINYINT(1) NOT NULL,
  `selected_answers_json` JSON NOT NULL,
  `attempted_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_qa_quiz` (`quiz_id`),
  KEY `idx_qa_user` (`user_id`),
  CONSTRAINT `fk_qa_quiz` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_qa_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 13. TABLE: certificates
-- ------------------------------------------------------------------------------
CREATE TABLE `certificates` (
  `id` VARCHAR(64) NOT NULL,
  `certificate_number` VARCHAR(64) NOT NULL,
  `user_id` VARCHAR(64) NOT NULL,
  `course_id` VARCHAR(64) NOT NULL,
  `issue_date` DATE NOT NULL,
  `grade` ENUM('Distinction', 'Merit', 'Pass') NOT NULL DEFAULT 'Pass',
  `score_percent` INT UNSIGNED NOT NULL DEFAULT 80,
  `trainer_name` VARCHAR(150) NOT NULL,
  `verified` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_cert_number` (`certificate_number`),
  KEY `idx_cert_user` (`user_id`),
  CONSTRAINT `fk_cert_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_cert_course` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 14. TABLE: competencies
-- ------------------------------------------------------------------------------
CREATE TABLE `competencies` (
  `id` VARCHAR(64) NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `benchmark_percent` INT UNSIGNED NOT NULL DEFAULT 80,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 15. TABLE: announcements
-- ------------------------------------------------------------------------------
CREATE TABLE `announcements` (
  `id` VARCHAR(64) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  `target_role` ENUM('all', 'trainee', 'trainer') NOT NULL DEFAULT 'all',
  `author_name` VARCHAR(150) NOT NULL,
  `priority` ENUM('normal', 'important') NOT NULL DEFAULT 'normal',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_ann_role` (`target_role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 16. TABLE: feedbacks
-- ------------------------------------------------------------------------------
CREATE TABLE `feedbacks` (
  `id` VARCHAR(64) NOT NULL,
  `user_id` VARCHAR(64) NOT NULL,
  `course_id` VARCHAR(64) DEFAULT NULL,
  `rating` INT UNSIGNED NOT NULL DEFAULT 5,
  `category` VARCHAR(100) NOT NULL DEFAULT 'General',
  `message` TEXT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_fb_user` (`user_id`),
  CONSTRAINT `fk_fb_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 17. TABLE: contact_messages
-- ------------------------------------------------------------------------------
CREATE TABLE `contact_messages` (
  `id` VARCHAR(64) NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `subject` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL DEFAULT 'PBL Inquiries',
  `message` TEXT NOT NULL,
  `status` ENUM('unread', 'read', 'replied') NOT NULL DEFAULT 'unread',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_msg_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;

-- ==============================================================================
-- DEMO SEED DATA (Password for all demo users is 'password123' or their role key)
-- Argon2id / BCRYPT hash for 'password123': $2y$10$wT5iHq9m...
-- ==============================================================================

INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `role`, `department`, `bio`, `status`) VALUES
('user-admin-1', 'Nitin Purabiya', 'admin@capacityconnect.edu', '$2y$10$e0MYzXyjpJS7Pd0RVvHwHeVy4QxK2vXk1wFw5M0l2W7V3uP8gK2aK', 'admin', 'Computer Engineering & Institutional Admin', 'Lead Coordinator for PBL-I Digital Capacity Building Initiative. Institutional Administrator.', 'active'),
('user-trainer-1', 'Prof. Priya Sharma', 'priya.sharma@capacityconnect.edu', '$2y$10$e0MYzXyjpJS7Pd0RVvHwHeVy4QxK2vXk1wFw5M0l2W7V3uP8gK2aK', 'trainer', 'Information Technology & Cloud Systems', 'Assistant Professor & Industry Corporate Trainer. Specializes in Full-Stack Web Architecture.', 'active'),
('user-trainer-2', 'Dr. Vikramaditya Dave', 'vikram.dave@capacityconnect.edu', '$2y$10$e0MYzXyjpJS7Pd0RVvHwHeVy4QxK2vXk1wFw5M0l2W7V3uP8gK2aK', 'trainer', 'Data Science & Systems Engineering', 'Domain Expert in Database Normalization and Schema Engineering.', 'active'),
('user-trainee-1', 'Rahul Verma', 'rahul.verma@capacityconnect.edu', '$2y$10$e0MYzXyjpJS7Pd0RVvHwHeVy4QxK2vXk1wFw5M0l2W7V3uP8gK2aK', 'trainee', 'Undergraduate Engineering (Year 3)', 'PBL-I Student Trainee focusing on enterprise full-stack development.', 'active'),
('user-trainee-2', 'Ananya Iyer', 'ananya.iyer@capacityconnect.edu', '$2y$10$e0MYzXyjpJS7Pd0RVvHwHeVy4QxK2vXk1wFw5M0l2W7V3uP8gK2aK', 'trainee', 'Information Technology (Year 2)', 'Enthusiast in cloud infrastructure, containerization, and modern UI engineering.', 'active');

INSERT INTO `categories` (`id`, `name`, `slug`, `description`) VALUES
('cat-web', 'Full-Stack Web Engineering', 'web-engineering', 'Modern architectures, PHP 8+ MVC patterns, REST APIs, and responsive frontends.'),
('cat-data', 'Relational Database Systems', 'database-systems', 'MySQL design, indexing strategies, PDO transactions, and schema normalization.'),
('cat-cloud', 'Cloud & DevOps Infrastructure', 'cloud-devops', 'Server orchestration, Linux environments, security hardening, and deployment pipelines.'),
('cat-security', 'Cybersecurity & Secure Coding', 'cybersecurity', 'Authentication mechanics, CSRF mitigation, SQL injection prevention, and RBAC.');

INSERT INTO `courses` (`id`, `title`, `slug`, `summary`, `description`, `category_id`, `trainer_id`, `level`, `duration_hours`, `thumbnail`, `is_published`, `featured`, `enrolled_count`) VALUES
('course-101', 'Enterprise Web Application Architecture with PHP & MySQL', 'enterprise-web-architecture', 'Master structured backend development, session security, PDO database interaction, and clean layered design.', 'Designed as the cornerstone curriculum for the PBL-I Capacity Building Initiative, this course equips participants with end-to-end competencies in building reliable web applications.', 'cat-web', 'user-trainer-1', 'Intermediate', 18, '/src/assets/images/course_web_architecture_1791712576623.jpg', 1, 1, 42),
('course-102', 'Relational Database Engineering & Schema Optimization', 'relational-database-engineering', 'Deep dive into 3NF normalization, B-tree indexes, execution plans, and foreign key cascades.', 'Learn how to construct resilient schemas for capacity building management portals.', 'cat-data', 'user-trainer-2', 'Intermediate', 15, '/src/assets/images/course_database_systems_1791712589564.jpg', 1, 1, 38),
('course-103', 'Cloud Infrastructure & Linux Systems Administration', 'cloud-infrastructure-linux', 'Deploy, configure, and maintain production Linux environments, Nginx reverse proxies, and process monitors.', 'Practical training on system administration essentials, environment variables, SSL certificate termination, and file permission sandboxing.', 'cat-cloud', 'user-trainer-1', 'Advanced', 20, '/src/assets/images/course_cloud_devops_1791712601465.jpg', 1, 1, 29);

INSERT INTO `course_skills` (`course_id`, `skill_name`) VALUES
('course-101', 'PHP 8+ OOP'),
('course-101', 'MySQL PDO'),
('course-101', 'Session Security'),
('course-101', 'CSRF Protection'),
('course-102', 'Normalization (1NF-3NF)'),
('course-102', 'MySQL Indexing'),
('course-102', 'EXPLAIN Query Plans'),
('course-103', 'Linux Bash Administration'),
('course-103', 'File Permissions');

INSERT INTO `modules` (`id`, `course_id`, `title`, `description`, `sort_order`) VALUES
('mod-101-1', 'course-101', 'Module 1: Architecture Fundamentals & HTTP Protocol', 'Client-server request lifecycles, headers, and stateless protocol mechanics.', 1),
('mod-101-2', 'course-101', 'Module 2: Secure Database Connectivity with PDO', 'PHP Data Objects, prepared statements, and transactional safety.', 2),
('mod-102-1', 'course-102', 'Module 1: Relational Modeling & Normalization Rules', 'First, Second, and Third Normal Forms applied to educational systems.', 1);

INSERT INTO `lessons` (`id`, `module_id`, `title`, `duration_minutes`, `content`, `sort_order`) VALUES
('les-101-1-1', 'mod-101-1', '1.1 The Client-Server Model & HTTP Lifecycle', 25, '### 1.1 The Client-Server Model & HTTP Lifecycle\n\nUnderstanding HTTP request/response envelopes, verbs, status codes, and session cookie governance.', 1),
('les-101-1-2', 'mod-101-1', '1.2 Server-Side Routing & Request Processing', 30, '### 1.2 Server-Side Routing & Request Processing\n\nFront controller routing patterns in PHP and Apache htaccess configuration.', 2),
('les-101-2-1', 'mod-101-2', '2.1 Connecting to MySQL with Prepared Statements', 35, '### 2.1 Connecting to MySQL with Prepared Statements\n\nEliminating SQL Injection through parameterized PDO queries.', 1),
('les-102-1-1', 'mod-102-1', '1.1 Designing Schemas from Business Requirements', 30, '### 1.1 Designing Schemas from Business Requirements\n\nEntity relationship identification and foreign key integrity.', 1);

INSERT INTO `resources` (`id`, `lesson_id`, `title`, `file_type`, `file_size`, `file_path`) VALUES
('res-101-1-1', 'les-101-1-1', 'HTTP_Request_Lifecycle_Reference_Guide.pdf', 'pdf', '1.4 MB', 'uploads/resources/http_guide.pdf'),
('res-101-2-1', 'les-101-2-1', 'PDO_Best_Practices_Manual.pdf', 'pdf', '1.1 MB', 'uploads/resources/pdo_manual.pdf');

INSERT INTO `enrollments` (`id`, `user_id`, `course_id`, `progress_percent`, `is_completed`, `completed_at`, `enrolled_at`) VALUES
('enr-101', 'user-trainee-1', 'course-101', 75, 0, NULL, '2026-09-12 10:00:00'),
('enr-102', 'user-trainee-1', 'course-102', 100, 1, '2026-09-20 17:00:00', '2026-09-14 11:30:00');

INSERT INTO `quizzes` (`id`, `course_id`, `title`, `description`, `passing_score_percent`, `time_limit_minutes`) VALUES
('quiz-101', 'course-101', 'Comprehensive Assessment: Web Architecture & Database Integration', 'Evaluates comprehension of HTTP statelessness, session governance, and PDO prepared statements.', 70, 15),
('quiz-102', 'course-102', 'Mid-Term Assessment: Relational Normalization & Indexing', 'Tests normalization principles from 1NF to 3NF, composite indexes, and foreign key cascades.', 70, 15);

INSERT INTO `quiz_questions` (`id`, `quiz_id`, `question`, `options_json`, `correct_answer_index`, `explanation`, `sort_order`) VALUES
('q-101-1', 'quiz-101', 'Which PDO attribute configuration ensures SQL statements are prepared natively on the database server?', '["PDO::ATTR_ERRMODE => PDO::ERRMODE_SILENT", "PDO::ATTR_EMULATE_PREPARES => false", "PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_NUM", "PDO::ATTR_PERSISTENT => true"]', 1, 'Setting emulate prepares to false ensures true native server-side query compilation.', 1),
('q-101-2', 'quiz-101', 'What is the primary technical reason why HTTP is described as a stateless protocol?', '["It cannot transmit media files", "Each request-response transaction is treated independently without intrinsic persistence", "It only runs on port 80", "It resets database tables"]', 1, 'Statelessness means past transactions are not intrinsically remembered across requests.', 2),
('q-101-3', 'quiz-101', 'In an ACID database transaction, which property guarantees all statements succeed or all rollback?', '["Atomicity", "Consistency", "Isolation", "Durability"]', 0, 'Atomicity is the all-or-nothing guarantee.', 3);

INSERT INTO `certificates` (`id`, `certificate_number`, `user_id`, `course_id`, `issue_date`, `grade`, `score_percent`, `trainer_name`, `verified`) VALUES
('cert-101', 'CC-2026-8941', 'user-trainee-1', 'course-102', '2026-09-20', 'Distinction', 100, 'Dr. Vikramaditya Dave', 1);

INSERT INTO `competencies` (`id`, `name`, `category`, `description`, `benchmark_percent`) VALUES
('comp-1', 'Backend Web Architecture (PHP/REST)', 'Full-Stack Web Engineering', 'Object-oriented server scripting, MVC separation, and routing.', 85),
('comp-2', 'Relational Schema Design & SQL', 'Relational Database Systems', 'Data normalization, B-Tree indexing, execution plan optimization.', 80),
('comp-3', 'Application Security & RBAC', 'Cybersecurity & Secure Coding', 'CSRF tokens, parameterized SQL statements, session lifecycle management.', 85),
('comp-4', 'Cloud & Linux Systems Administration', 'Cloud & DevOps Infrastructure', 'Linux shell command line, file permissions, web server routing.', 75);

INSERT INTO `announcements` (`id`, `title`, `content`, `target_role`, `author_name`, `priority`) VALUES
('ann-1', 'PBL-I Project Phase 1 Evaluation & Milestone Submission', 'All student trainees are requested to complete modules 1 & 2 of the Enterprise Web Application Architecture course prior to the upcoming review.', 'all', 'Nitin Purabiya (Admin)', 'important'),
('ann-2', 'Trainer Workshop: Best Practices in Assessment Authoring', 'Faculty trainers are invited to attend the interactive quiz authoring clinic this Thursday at 3:00 PM.', 'trainer', 'Academic Council', 'normal');

INSERT INTO `feedbacks` (`id`, `user_id`, `course_id`, `rating`, `category`, `message`) VALUES
('fb-1', 'user-trainee-1', 'course-102', 5, 'Course Content', 'The normalization breakdown and B-Tree indexing lessons were crystal clear.');

INSERT INTO `contact_messages` (`id`, `name`, `email`, `subject`, `category`, `message`, `status`) VALUES
('msg-1', 'Siddharth Patel', 'siddharth.patel@techcorp.in', 'Corporate Internship Partnership for PBL-I Cohort', 'Partnership & Training', 'We are interested in evaluating the capacity profiles of top-performing trainees in the Full-Stack Web and Database engineering tracks.', 'read');
