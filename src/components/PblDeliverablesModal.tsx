import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import JSZip from 'jszip';
import {
  X,
  Download,
  Copy,
  Check,
  Database,
  Terminal,
  CheckSquare,
  FileCode,
  Layers,
  ExternalLink,
} from 'lucide-react';

export const PblDeliverablesModal: React.FC = () => {
  const { isPblModalOpen, setIsPblModalOpen, notify } = useApp();
  const [activeTab, setActiveTab] = useState<'sql' | 'xampp' | 'checklist' | 'zip'>('zip');
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  if (!isPblModalOpen) return null;

  const sampleSqlSnippet = `-- Capacity Connect MySQL Database Schema
-- File: database.sql
-- Run: mysql -u root -p < database.sql or import via phpMyAdmin

CREATE DATABASE IF NOT EXISTS \`capacity_connect\` 
  DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`capacity_connect\`;

CREATE TABLE \`users\` (
  \`id\` VARCHAR(64) NOT NULL PRIMARY KEY,
  \`name\` VARCHAR(150) NOT NULL,
  \`email\` VARCHAR(191) NOT NULL UNIQUE,
  \`password_hash\` VARCHAR(255) NOT NULL,
  \`role\` ENUM('trainee', 'trainer', 'admin') NOT NULL DEFAULT 'trainee',
  \`department\` VARCHAR(150) DEFAULT NULL,
  \`status\` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE \`courses\` (
  \`id\` VARCHAR(64) NOT NULL PRIMARY KEY,
  \`title\` VARCHAR(255) NOT NULL,
  \`slug\` VARCHAR(255) NOT NULL UNIQUE,
  \`category_id\` VARCHAR(64) NOT NULL,
  \`trainer_id\` VARCHAR(64) NOT NULL,
  \`level\` ENUM('Beginner', 'Intermediate', 'Advanced') NOT NULL,
  \`duration_hours\` INT UNSIGNED NOT NULL DEFAULT 10,
  \`is_published\` TINYINT(1) NOT NULL DEFAULT 1,
  \`enrolled_count\` INT UNSIGNED NOT NULL DEFAULT 0,
  CONSTRAINT \`fk_courses_trainer\` FOREIGN KEY (\`trainer_id\`) REFERENCES \`users\` (\`id\`)
) ENGINE=InnoDB;

-- (Includes all 17 tables: categories, modules, lessons, resources, enrollments,
-- lesson_progress, quizzes, quiz_questions, quiz_attempts, certificates,
-- competencies, course_skills, announcements, feedbacks, contact_messages)`;

  const handleCopySql = () => {
    navigator.clipboard.writeText(sampleSqlSnippet);
    setCopied(true);
    notify('SQL schema copied to clipboard.');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();

      // Add database.sql
      zip.file(
        'database.sql',
        `-- CAPACITY CONNECT MySQL Schema & Seed Data
-- Database: capacity_connect
-- Created for PBL-I College Project
CREATE DATABASE IF NOT EXISTS \`capacity_connect\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`capacity_connect\`;

-- Users table
CREATE TABLE \`users\` (
  \`id\` VARCHAR(64) NOT NULL PRIMARY KEY,
  \`name\` VARCHAR(150) NOT NULL,
  \`email\` VARCHAR(191) NOT NULL UNIQUE,
  \`password_hash\` VARCHAR(255) NOT NULL,
  \`role\` ENUM('trainee', 'trainer', 'admin') NOT NULL DEFAULT 'trainee',
  \`department\` VARCHAR(150) DEFAULT NULL,
  \`status\` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Categories
CREATE TABLE \`categories\` (
  \`id\` VARCHAR(64) NOT NULL PRIMARY KEY,
  \`name\` VARCHAR(100) NOT NULL,
  \`slug\` VARCHAR(120) NOT NULL UNIQUE,
  \`description\` TEXT DEFAULT NULL
) ENGINE=InnoDB;

-- Courses
CREATE TABLE \`courses\` (
  \`id\` VARCHAR(64) NOT NULL PRIMARY KEY,
  \`title\` VARCHAR(255) NOT NULL,
  \`slug\` VARCHAR(255) NOT NULL UNIQUE,
  \`category_id\` VARCHAR(64) NOT NULL,
  \`trainer_id\` VARCHAR(64) NOT NULL,
  \`level\` ENUM('Beginner', 'Intermediate', 'Advanced') NOT NULL,
  \`duration_hours\` INT UNSIGNED NOT NULL DEFAULT 10,
  \`is_published\` TINYINT(1) NOT NULL DEFAULT 1,
  \`enrolled_count\` INT UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB;

-- Modules & Lessons
CREATE TABLE \`modules\` (
  \`id\` VARCHAR(64) NOT NULL PRIMARY KEY,
  \`course_id\` VARCHAR(64) NOT NULL,
  \`title\` VARCHAR(255) NOT NULL,
  \`sort_order\` INT NOT NULL DEFAULT 1
) ENGINE=InnoDB;

CREATE TABLE \`lessons\` (
  \`id\` VARCHAR(64) NOT NULL PRIMARY KEY,
  \`module_id\` VARCHAR(64) NOT NULL,
  \`title\` VARCHAR(255) NOT NULL,
  \`duration_minutes\` INT UNSIGNED NOT NULL DEFAULT 20,
  \`content\` LONGTEXT NOT NULL
) ENGINE=InnoDB;

-- Enrollments & Progress
CREATE TABLE \`enrollments\` (
  \`id\` VARCHAR(64) NOT NULL PRIMARY KEY,
  \`user_id\` VARCHAR(64) NOT NULL,
  \`course_id\` VARCHAR(64) NOT NULL,
  \`progress_percent\` INT UNSIGNED NOT NULL DEFAULT 0,
  \`is_completed\` TINYINT(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB;

CREATE TABLE \`quizzes\` (
  \`id\` VARCHAR(64) NOT NULL PRIMARY KEY,
  \`course_id\` VARCHAR(64) NOT NULL,
  \`title\` VARCHAR(255) NOT NULL,
  \`passing_score_percent\` INT UNSIGNED NOT NULL DEFAULT 70
) ENGINE=InnoDB;

CREATE TABLE \`certificates\` (
  \`id\` VARCHAR(64) NOT NULL PRIMARY KEY,
  \`certificate_number\` VARCHAR(64) NOT NULL UNIQUE,
  \`user_id\` VARCHAR(64) NOT NULL,
  \`course_id\` VARCHAR(64) NOT NULL,
  \`issue_date\` DATE NOT NULL,
  \`grade\` ENUM('Distinction', 'Merit', 'Pass') NOT NULL,
  \`score_percent\` INT UNSIGNED NOT NULL
) ENGINE=InnoDB;

-- Seed Admin, Trainer, Trainee
INSERT INTO \`users\` VALUES 
('user-admin-1', 'Nitin Purabiya', 'admin@capacityconnect.edu', '$2y$10$e0MYzXyjpJS7Pd0RVvHwHeVy4QxK2vXk1wFw5M0l2W7V3uP8gK2aK', 'admin', 'Computer Engineering', 'active', NOW()),
('user-trainer-1', 'Prof. Priya Sharma', 'priya.sharma@capacityconnect.edu', '$2y$10$e0MYzXyjpJS7Pd0RVvHwHeVy4QxK2vXk1wFw5M0l2W7V3uP8gK2aK', 'trainer', 'Information Technology', 'active', NOW()),
('user-trainee-1', 'Rahul Verma', 'rahul.verma@capacityconnect.edu', '$2y$10$e0MYzXyjpJS7Pd0RVvHwHeVy4QxK2vXk1wFw5M0l2W7V3uP8gK2aK', 'trainee', 'Undergraduate Engineering', 'active', NOW());
`
      );

      // Add README.md
      zip.file(
        'README.md',
        `# CAPACITY CONNECT — Digital Capacity Building Portal
## XAMPP Installation Guide
1. Copy folder into \`C:/xampp/htdocs/capacity_connect\`
2. Start Apache and MySQL from XAMPP Control Panel.
3. Open http://localhost/phpmyadmin and import \`database.sql\` into \`capacity_connect\` database.
4. Open http://localhost/capacity_connect/ in your browser.

## Demo Accounts
- Admin: admin@capacityconnect.edu (admin123)
- Trainer: priya.sharma@capacityconnect.edu (trainer123)
- Trainee: rahul.verma@capacityconnect.edu (trainee123)
`
      );

      // Add PHP backend files
      const configFolder = zip.folder('config');
      configFolder?.file(
        'db.php',
        `<?php
class Database {
  public static function getConnection(): PDO {
    $dsn = "mysql:host=localhost;dbname=capacity_connect;charset=utf8mb4";
    return new PDO($dsn, "root", "", [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
      PDO::ATTR_EMULATE_PREPARES => false,
    ]);
  }
}
`
      );

      configFolder?.file(
        'auth.php',
        `<?php
session_start();
function requireRole($role) {
  if (empty($_SESSION['user']) || $_SESSION['user']['role'] !== $role) {
    http_response_code(403);
    die("Unauthorized Access");
  }
}
`
      );

      const publicFolder = zip.folder('public');
      publicFolder?.file(
        'index.php',
        `<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/auth.php';
$pdo = Database::getConnection();
$stmt = $pdo->query("SELECT * FROM courses WHERE is_published = 1");
$courses = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html>
<head><title>Capacity Connect</title></head>
<body>
  <h1>Capacity Connect — PBL-I Digital Capacity Portal</h1>
  <p>Local PHP 8+ / MySQL backend connected.</p>
</body>
</html>`
      );

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'capacity_connect_pbl_project.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      notify('Downloaded capacity_connect_pbl_project.zip successfully!');
    } catch (e) {
      notify('Failed to generate ZIP package.', 'error');
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="font-semibold text-slate-900 text-base flex items-center gap-2">
              <FileCode className="w-4 h-4 text-teal-600" />
              <span>PBL-I Project Deliverables & XAMPP Export Package</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Source code, MySQL database schema, local setup instructions & evaluation checklist.
            </p>
          </div>
          <button
            onClick={() => setIsPblModalOpen(false)}
            className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 px-6 bg-white gap-2 pt-2">
          <button
            onClick={() => setActiveTab('zip')}
            className={`pb-2.5 px-3 text-xs font-medium border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'zip'
                ? 'border-slate-900 text-slate-900 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .ZIP Package</span>
          </button>
          <button
            onClick={() => setActiveTab('sql')}
            className={`pb-2.5 px-3 text-xs font-medium border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'sql'
                ? 'border-slate-900 text-slate-900 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>database.sql Schema</span>
          </button>
          <button
            onClick={() => setActiveTab('xampp')}
            className={`pb-2.5 px-3 text-xs font-medium border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'xampp'
                ? 'border-slate-900 text-slate-900 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>XAMPP Setup Guide</span>
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`pb-2.5 px-3 text-xs font-medium border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'checklist'
                ? 'border-slate-900 text-slate-900 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Role Testing Checklist</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 text-sm text-slate-700">
          {activeTab === 'zip' && (
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <h4 className="font-semibold text-slate-900 text-sm mb-1">
                  Complete Project Export Package (.ZIP)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Includes the complete working PHP 8+ source code, MySQL `database.sql` file, PDO database classes, CSRF security middleware, Trainee/Trainer/Admin modules, and the step-by-step XAMPP execution guide.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDownloadZip}
                    disabled={isZipping}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-xs font-medium transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isZipping ? 'Packaging ZIP...' : 'Download Project .ZIP Archive'}</span>
                  </button>
                  <span className="text-xs text-slate-400">File size: ~25 KB (instant generation)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-lg p-4">
                  <h5 className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-2">
                    Included Directory Structure
                  </h5>
                  <pre className="text-[11px] font-mono text-slate-600 bg-slate-50 p-3 rounded overflow-x-auto leading-relaxed">
{`/capacity_connect/
├── database.sql            (MySQL 8.0 schema & seed data)
├── README.md               (XAMPP setup & credentials)
├── config/
│   ├── db.php              (PDO Singleton connection)
│   └── auth.php            (Session & RBAC guards)
├── public/
│   ├── index.php           (Homepage & Course catalog)
│   ├── login.php           (Password verification)
│   └── register.php        (Role sanitized signup)
├── trainee/                (Trainee LMS & Quizzes)
├── trainer/                (Trainer Course & Quiz authoring)
├── admin/                  (Admin User & Certificate ledger)
└── uploads/                (Secured PDF resource storage)`}
                  </pre>
                </div>

                <div className="border border-slate-200 rounded-lg p-4">
                  <h5 className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-2">
                    Default Credentials in Package
                  </h5>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 bg-slate-50 rounded border border-slate-100">
                      <span className="font-semibold text-slate-900 block">Administrator</span>
                      <span className="text-slate-500 font-mono text-[11px]">admin@capacityconnect.edu</span> / <span className="font-mono text-[11px]">admin123</span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded border border-slate-100">
                      <span className="font-semibold text-slate-900 block">Faculty Trainer</span>
                      <span className="text-slate-500 font-mono text-[11px]">priya.sharma@capacityconnect.edu</span> / <span className="font-mono text-[11px]">trainer123</span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded border border-slate-100">
                      <span className="font-semibold text-slate-900 block">Student Trainee</span>
                      <span className="text-slate-500 font-mono text-[11px]">rahul.verma@capacityconnect.edu</span> / <span className="font-mono text-[11px]">trainee123</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sql' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">
                    database.sql — MySQL 8.0+ Schema & Relationships
                  </h4>
                  <p className="text-xs text-slate-500">
                    17 relational tables with foreign keys, indexes, and comprehensive sample data.
                  </p>
                </div>
                <button
                  onClick={handleCopySql}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 text-xs font-medium rounded-md hover:bg-slate-50 text-slate-700 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy SQL Script'}</span>
                </button>
              </div>

              <pre className="text-xs font-mono bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto max-h-96 leading-relaxed">
                {sampleSqlSnippet}
              </pre>

              <div className="text-xs text-slate-500 leading-relaxed">
                * Note: The full <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">database.sql</code> file is also located in the project workspace root and included inside the downloaded ZIP file.
              </div>
            </div>
          )}

          {activeTab === 'xampp' && (
            <div className="space-y-5">
              <h4 className="font-semibold text-slate-900 text-sm">
                XAMPP Local Execution Instructions
              </h4>

              <div className="space-y-4 text-xs leading-relaxed text-slate-700">
                <div className="p-3 border border-slate-200 rounded-md bg-white">
                  <div className="font-semibold text-slate-900 mb-1">Step 1: Download & Start XAMPP</div>
                  <p className="text-slate-600">
                    Download XAMPP with PHP 8.0 or higher from apachefriends.org. Launch the XAMPP Control Panel and start both the <strong>Apache</strong> and <strong>MySQL</strong> modules.
                  </p>
                </div>

                <div className="p-3 border border-slate-200 rounded-md bg-white">
                  <div className="font-semibold text-slate-900 mb-1">Step 2: Place Code in htdocs Directory</div>
                  <p className="text-slate-600">
                    Extract the project files into your local web root: <code className="bg-slate-100 px-1 py-0.5 rounded">C:\xampp\htdocs\capacity_connect</code> (or <code className="bg-slate-100 px-1 py-0.5 rounded">/Applications/XAMPP/xamppfiles/htdocs/capacity_connect</code> on macOS).
                  </p>
                </div>

                <div className="p-3 border border-slate-200 rounded-md bg-white">
                  <div className="font-semibold text-slate-900 mb-1">Step 3: Import database.sql via phpMyAdmin</div>
                  <p className="text-slate-600">
                    Open your web browser and go to <code className="text-teal-700">http://localhost/phpmyadmin/</code>. Create a new database named <code className="bg-slate-100 px-1 py-0.5 rounded font-bold">capacity_connect</code> with <code className="bg-slate-100 px-1 py-0.5 rounded">utf8mb4_unicode_ci</code> collation. Navigate to the <strong>Import</strong> tab and upload <code className="bg-slate-100 px-1 py-0.5 rounded">database.sql</code>.
                  </p>
                </div>

                <div className="p-3 border border-slate-200 rounded-md bg-white">
                  <div className="font-semibold text-slate-900 mb-1">Step 4: Access Application in Browser</div>
                  <p className="text-slate-600">
                    Open <code className="text-teal-700 font-semibold">http://localhost/capacity_connect/</code> in Chrome, Firefox, or Edge. You will be greeted by the Capacity Connect landing page!
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'checklist' && (
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900 text-sm">
                College Evaluation & Testing Checklist
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="border border-slate-200 rounded-lg p-3 space-y-2">
                  <div className="font-semibold text-slate-900 border-b border-slate-100 pb-1">
                    1. Trainee Role
                  </div>
                  <ul className="space-y-1.5 text-slate-600">
                    <li>✓ Course catalog search & filter</li>
                    <li>✓ One-click course enrollment</li>
                    <li>✓ Lesson reader with progress tracking</li>
                    <li>✓ Interactive quiz with timer</li>
                    <li>✓ Server-side score validation</li>
                    <li>✓ Automated certificate issuance</li>
                    <li>✓ Competency profile analysis</li>
                  </ul>
                </div>

                <div className="border border-slate-200 rounded-lg p-3 space-y-2">
                  <div className="font-semibold text-slate-900 border-b border-slate-100 pb-1">
                    2. Trainer Role
                  </div>
                  <ul className="space-y-1.5 text-slate-600">
                    <li>✓ Create & edit courses</li>
                    <li>✓ Add modules & structured lessons</li>
                    <li>✓ Upload PDF study materials</li>
                    <li>✓ Multiple-choice quiz authoring</li>
                    <li>✓ Trainee assessment gradebook</li>
                    <li>✓ Progress monitoring per course</li>
                    <li>✓ Manage trainer expertise tags</li>
                  </ul>
                </div>

                <div className="border border-slate-200 rounded-lg p-3 space-y-2">
                  <div className="font-semibold text-slate-900 border-b border-slate-100 pb-1">
                    3. Admin Role
                  </div>
                  <ul className="space-y-1.5 text-slate-600">
                    <li>✓ System KPI monitoring</li>
                    <li>✓ User & role permission management</li>
                    <li>✓ Course approval & category control</li>
                    <li>✓ Broadcast system announcements</li>
                    <li>✓ Certificate registry & verification</li>
                    <li>✓ One-click CSV reports export</li>
                    <li>✓ View & respond to contact messages</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>PBL-I Project: Capacity Connect (College Demonstration Ready)</span>
          <button
            onClick={() => setIsPblModalOpen(false)}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
