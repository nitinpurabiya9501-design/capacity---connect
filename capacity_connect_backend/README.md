# CAPACITY CONNECT — Digital Capacity Building & Learning Management Portal
**PBL-I College Project — Full-Stack Web Application**

## 1. Project Overview
CAPACITY CONNECT is an institutional learning and capacity development portal built to monitor student competencies, provide structured modular coursework, conduct authenticated online assessments, and auto-issue verified completion certificates.

The portal provides tailored, server-side role-based dashboards for **Trainees**, **Trainers**, and **Administrators**.

---

## 2. Technology Stack
- **Frontend**: HTML5, Modern CSS / Tailwind CSS & Bootstrap 5, Vanilla JavaScript (ES6+), React client preview.
- **Backend**: PHP 8.0+ (Strict typing, PDO Object-Oriented Database Layer, Session security).
- **Database**: MySQL 8.0 / MariaDB 10.4 (InnoDB Engine, UTF-8 mb4, Foreign Key Constraints, B-Tree Indexes).
- **Security**: Prepared Statements against SQL Injection, CSRF token validation, Argon2/BCrypt password hashing, RBAC role guard, XSS escaping via `htmlspecialchars()`.

---

## 3. XAMPP Local Installation & Setup Instructions

Follow these five simple steps to run CAPACITY CONNECT locally on Windows, macOS, or Linux:

### Step 1: Start XAMPP Control Panel
1. Download and install XAMPP with PHP 8.0+ from [apachefriends.org](https://www.apachefriends.org/).
2. Open **XAMPP Control Panel**.
3. Click **Start** for **Apache** and **MySQL**. Both services should show green status.

### Step 2: Clone or Copy Files to htdocs
1. Navigate to your XAMPP web root directory:
   - **Windows**: `C:\xampp\htdocs\`
   - **macOS**: `/Applications/XAMPP/xamppfiles/htdocs/`
   - **Linux**: `/opt/lampp/htdocs/`
2. Create a folder named `capacity_connect`.
3. Copy all project files into this directory: `C:\xampp\htdocs\capacity_connect\`.

### Step 3: Import the MySQL Database
1. Open your web browser and go to `http://localhost/phpmyadmin/`.
2. Click **Databases** tab in the top navigation.
3. Enter database name: `capacity_connect` and choose collation `utf8mb4_unicode_ci`, then click **Create**.
4. Select the newly created `capacity_connect` database in the left sidebar.
5. Click the **Import** tab at the top.
6. Click **Choose File** and select `database.sql` from the project root.
7. Click **Import** at the bottom of the page. You will see green checkmarks for all 17 tables and seed data.

### Step 4: Verify Database Configuration
Open `config/db.php` and verify your credentials (default XAMPP settings):
```php
private const DB_HOST = 'localhost';
private const DB_NAME = 'capacity_connect';
private const DB_USER = 'root';
private const DB_PASS = ''; // Default XAMPP has empty password
```

### Step 5: Launch the Application
Open your browser and navigate to:
```
http://localhost/capacity_connect/
```

---

## 4. Demo Login Credentials

For college demonstration and evaluator review, three pre-seeded accounts with distinct permissions are available:

| Role | Email | Password | Primary Capabilities |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@capacityconnect.edu` | `admin123` | User & role management, course approval, system announcements, CSV exports, certificates registry, contact inquiries |
| **Trainer** | `priya.sharma@capacityconnect.edu` | `trainer123` | Course creation, syllabus authoring, quiz builder, gradebook inspection, progress tracking, expertise tags |
| **Trainee** | `rahul.verma@capacityconnect.edu` | `trainee123` | Course enrollment, interactive lesson viewer, quiz taking with instant grading, certificate verification, feedback submission |

---

## 5. Testing Checklist

### Trainee Role:
- [x] Register new account (ensuring Role dropdown only offers Trainee or Trainer, never Admin).
- [x] Sign in using `rahul.verma@capacityconnect.edu`.
- [x] Browse Courses catalog and filter by category or difficulty level.
- [x] Open Course Details and inspect curriculum modules, reading materials, and instructor bio.
- [x] Launch Course Player, mark lesson completed, and verify real-time progress bar increase.
- [x] Attempt the multiple-choice quiz; submit answers and inspect score breakdown.
- [x] View generated Certificate upon achieving $\ge 70\%$ passing score with verifiable ID.
- [x] Review Competency Profile radar/bar chart and skill-based course recommendations.
- [x] Submit portal/course feedback.

### Trainer Role:
- [x] Sign in using `priya.sharma@capacityconnect.edu`.
- [x] Inspect trainer dashboard overview showing courses taught and total enrolled trainees.
- [x] Create a new course with custom title, category, hours, and competency tags.
- [x] Add modules and structured lessons with reading content.
- [x] Build an interactive multiple choice quiz with questions and correct answer key.
- [x] Inspect Trainee Assessment Results gradebook and enrolled trainee progress table.

### Admin Role:
- [x] Sign in using `admin@capacityconnect.edu`.
- [x] Inspect institutional platform KPIs (Users, Courses, Enrollments, Certificates).
- [x] Manage Users: search users, toggle active/inactive status, or promote a trainer to admin.
- [x] Manage Categories and Courses: approve, feature, or delete course entries.
- [x] Broadcast system-wide or role-targeted announcements.
- [x] Review Contact inquiries sent from public contact page and mark as replied.
- [x] Export platform data to CSV (Users, Courses, Enrollments, Quizzes, Certificates).
