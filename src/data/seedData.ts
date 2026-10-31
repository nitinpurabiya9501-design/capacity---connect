import {
  User,
  Category,
  Course,
  Quiz,
  Enrollment,
  Certificate,
  Announcement,
  Feedback,
  ContactMessage,
  CompetencySkill,
} from '../types';

export const SEED_USERS: User[] = [
  {
    id: 'user-admin-1',
    name: 'Nitin Purabiya',
    email: 'admin@capacityconnect.edu',
    role: 'admin',
    department: 'Computer Engineering & Institutional Admin',
    bio: 'Lead Coordinator for PBL-I Digital Capacity Building Initiative. Institutional Administrator.',
    status: 'active',
    createdAt: '2026-09-01T08:00:00Z',
  },
  {
    id: 'user-trainer-1',
    name: 'Prof. Priya Sharma',
    email: 'priya.sharma@capacityconnect.edu',
    role: 'trainer',
    department: 'Information Technology & Cloud Systems',
    bio: 'Assistant Professor & Industry Corporate Trainer. Specializes in Full-Stack Web Architecture, Relational Databases, and Microservices.',
    status: 'active',
    createdAt: '2026-09-02T09:30:00Z',
  },
  {
    id: 'user-trainer-2',
    name: 'Dr. Vikramaditya Dave',
    email: 'vikram.dave@capacityconnect.edu',
    role: 'trainer',
    department: 'Data Science & Systems Engineering',
    bio: 'Domain Expert in Database Normalization, Enterprise Data Warehousing, and Secure API Development.',
    status: 'active',
    createdAt: '2026-09-05T11:00:00Z',
  },
  {
    id: 'user-trainee-1',
    name: 'Rahul Verma',
    email: 'rahul.verma@capacityconnect.edu',
    role: 'trainee',
    department: 'Undergraduate Engineering (Year 3)',
    bio: 'PBL-I Student Trainee focusing on enterprise full-stack development, server-side logic, and database management.',
    status: 'active',
    createdAt: '2026-09-10T14:15:00Z',
  },
  {
    id: 'user-trainee-2',
    name: 'Ananya Iyer',
    email: 'ananya.iyer@capacityconnect.edu',
    role: 'trainee',
    department: 'Information Technology (Year 2)',
    bio: 'Enthusiast in cloud infrastructure, containerization, and modern UI engineering.',
    status: 'active',
    createdAt: '2026-09-12T16:20:00Z',
  },
  {
    id: 'user-trainee-3',
    name: 'Kavita Sundaram',
    email: 'kavita.s@capacityconnect.edu',
    role: 'trainee',
    department: 'Electronics & Computer Science',
    bio: 'Aiming to build competence in secure authentication and relational SQL query optimization.',
    status: 'active',
    createdAt: '2026-09-15T10:00:00Z',
  },
];

export const SEED_CATEGORIES: Category[] = [
  {
    id: 'cat-web',
    name: 'Full-Stack Web Engineering',
    slug: 'web-engineering',
    description: 'Modern architectures, PHP 8+ MVC patterns, REST APIs, and responsive frontends.',
    courseCount: 2,
  },
  {
    id: 'cat-data',
    name: 'Relational Database Systems',
    slug: 'database-systems',
    description: 'MySQL design, indexing strategies, PDO transactions, and schema normalization.',
    courseCount: 2,
  },
  {
    id: 'cat-cloud',
    name: 'Cloud & DevOps Infrastructure',
    slug: 'cloud-devops',
    description: 'Server orchestration, Linux environments, security hardening, and deployment pipelines.',
    courseCount: 1,
  },
  {
    id: 'cat-security',
    name: 'Cybersecurity & Secure Coding',
    slug: 'cybersecurity',
    description: 'Authentication mechanics, CSRF mitigation, SQL injection prevention, and RBAC.',
    courseCount: 1,
  },
];

export const SEED_COURSES: Course[] = [
  {
    id: 'course-101',
    title: 'Enterprise Web Application Architecture with PHP & MySQL',
    slug: 'enterprise-web-architecture',
    summary: 'Master structured backend development, session security, PDO database interaction, and clean layered design.',
    description: 'Designed as the cornerstone curriculum for the PBL-I Capacity Building Initiative, this course equips participants with end-to-end competencies in building reliable web applications. You will learn procedural and object-oriented PHP 8+, robust session governance, relational database modeling in MySQL, and secure CRUD transactions without framework bloat.',
    categoryId: 'cat-web',
    categoryName: 'Full-Stack Web Engineering',
    trainerId: 'user-trainer-1',
    trainerName: 'Prof. Priya Sharma',
    level: 'Intermediate',
    durationHours: 18,
    thumbnail: '/src/assets/images/course_web_architecture_1791712576623.jpg',
    isPublished: true,
    featured: true,
    competencies: ['PHP 8+ OOP', 'MySQL PDO', 'Session Security', 'CSRF Protection', 'REST Endpoints'],
    createdAt: '2026-09-08T10:00:00Z',
    enrolledCount: 42,
    modules: [
      {
        id: 'mod-101-1',
        courseId: 'course-101',
        title: 'Module 1: Architecture Fundamentals & HTTP Protocol',
        description: 'Client-server request lifecycles, headers, and stateless protocol mechanics.',
        order: 1,
        lessons: [
          {
            id: 'les-101-1-1',
            moduleId: 'mod-101-1',
            title: '1.1 The Client-Server Model & HTTP Lifecycle',
            durationMinutes: 25,
            content: `### 1.1 The Client-Server Model & HTTP Lifecycle

In modern web development, understanding the foundational interaction between the client user-agent and the remote web server is essential for building scalable applications.

#### Key Concepts
1. **The Request-Response Lifecycle**:
   - The browser initiates an HTTP connection via TCP/IP or TLS handshake.
   - An HTTP Request envelope containing the HTTP Verb (GET, POST, PUT, DELETE), resource URI, headers, and optional body payload is transmitted.
   - The web server parses headers, routes the execution to the PHP application runtime, interacts with MySQL via PDO, and constructs the HTTP Response with appropriate status codes (200 OK, 302 Found, 403 Forbidden, 500 Internal Error).

2. **Stateless Nature of HTTP**:
   - Every request is independent. To maintain continuity, servers rely on cryptographic session cookies (PHPSESSID) exchanged on every consecutive trip.

\`\`\`php
// Example: Safe session cookie parameters in PHP 8+
session_start([
    'cookie_lifetime' => 86400,
    'cookie_secure'   => true,
    'cookie_httponly' => true,
    'cookie_samesite' => 'Strict',
]);
\`\`\`

3. **Core Responsibility Separation**:
   - **Presentation Layer**: HTML5 markup, responsive CSS, client-side event handlers.
   - **Application Logic**: Input sanitization, business validation rules, routing.
   - **Data Layer**: Relational storage, referential integrity, and atomic transactions.`,
            resources: [
              {
                id: 'res-101-1-1',
                title: 'HTTP_Request_Lifecycle_Reference_Guide.pdf',
                type: 'pdf',
                size: '1.4 MB',
                url: '#download-guide-1',
              },
              {
                id: 'res-101-1-2',
                title: 'Session_Security_Cheatsheet.pdf',
                type: 'pdf',
                size: '850 KB',
                url: '#download-guide-2',
              },
            ],
            order: 1,
          },
          {
            id: 'les-101-1-2',
            moduleId: 'mod-101-1',
            title: '1.2 Server-Side Routing & Request Processing',
            durationMinutes: 30,
            content: `### 1.2 Server-Side Routing & Request Processing

Routing directs incoming Uniform Resource Identifiers (URIs) to the designated controller logic.

#### Design Pattern: Front Controller
In a standard PHP architecture, all requests are funnelled through a single entry point (e.g., \`index.php\`) via URL rewrites:

\`\`\`apache
# .htaccess example for Apache / XAMPP
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.php [QSA,L]
\`\`\`

#### Best Practices:
- Always enforce whitelist routing; never dynamically include files based on raw \`$_GET['page']\` without strict validation to prevent Local File Inclusion (LFI) vulnerabilities.
- Ensure proper Content-Type headers are returned (e.g. \`application/json\` for API endpoints or \`text/html; charset=utf-8\` for views).`,
            resources: [
              {
                id: 'res-101-1-3',
                title: 'Front_Controller_Pattern_Architecture.pdf',
                type: 'pdf',
                size: '920 KB',
                url: '#download-guide-3',
              },
            ],
            order: 2,
          },
        ],
      },
      {
        id: 'mod-101-2',
        courseId: 'course-101',
        title: 'Module 2: Secure Database Connectivity with PDO',
        description: 'PHP Data Objects, prepared statements, and transactional safety.',
        order: 2,
        lessons: [
          {
            id: 'les-101-2-1',
            moduleId: 'mod-101-2',
            title: '2.1 Connecting to MySQL with Prepared Statements',
            durationMinutes: 35,
            content: `### 2.1 Connecting to MySQL with Prepared Statements

Connecting to MySQL using PDO (PHP Data Objects) is the industry standard for secure relational data access in modern PHP applications.

#### Why PDO Over mysqli?
- Consistent object-oriented API across multiple database drivers.
- Native parameterized queries that eliminate SQL Injection vulnerabilities.
- Robust exception handling via \`PDOException\`.

#### Database Connection Singleton
\`\`\`php
class Database {
    private static ?PDO $instance = null;

    public static function getConnection(): PDO {
        if (self::$instance === null) {
            $dsn = "mysql:host=localhost;dbname=capacity_connect;charset=utf8mb4";
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];
            self::$instance = new PDO($dsn, "root", "", $options);
        }
        return self::$instance;
    }
}
\`\`\`

#### Safe Query Execution
\`\`\`php
$stmt = $pdo->prepare("SELECT id, name, role FROM users WHERE email = :email AND status = 'active'");
$stmt->execute(['email' => $userEmail]);
$user = $stmt->fetch();
\`\`\``,
            resources: [
              {
                id: 'res-101-2-1',
                title: 'PDO_Best_Practices_Manual.pdf',
                type: 'pdf',
                size: '1.1 MB',
                url: '#download-guide-4',
              },
            ],
            order: 1,
          },
          {
            id: 'les-101-2-2',
            moduleId: 'mod-101-2',
            title: '2.2 ACID Transactions & Concurrent Operations',
            durationMinutes: 40,
            content: `### 2.2 ACID Transactions & Concurrent Operations

When executing multi-table operations (such as recording a course enrollment, creating initial module records, and logging an audit event), operations must either completely succeed or completely rollback.

#### The ACID Guarantee:
- **Atomicity**: All statements execute or none do.
- **Consistency**: Database transitions from one valid state to another.
- **Isolation**: Concurrent transactions cannot observe partial intermediate states.
- **Durability**: Committed data remains stored permanently even after a system crash.

\`\`\`php
try {
    $pdo->beginTransaction();
    
    $enrollStmt = $pdo->prepare("INSERT INTO enrollments (user_id, course_id, enrolled_at) VALUES (:uid, :cid, NOW())");
    $enrollStmt->execute(['uid' => $userId, 'cid' => $courseId]);

    $updateCourseStmt = $pdo->prepare("UPDATE courses SET enrolled_count = enrolled_count + 1 WHERE id = :cid");
    $updateCourseStmt->execute(['cid' => $courseId]);

    $pdo->commit();
} catch (Exception $e) {
    $pdo->rollBack();
    error_log("Enrollment transaction failed: " . $e->getMessage());
    throw $e;
}
\`\`\``,
            resources: [
              {
                id: 'res-101-2-2',
                title: 'ACID_Transactions_Reference.pdf',
                type: 'pdf',
                size: '780 KB',
                url: '#download-guide-5',
              },
            ],
            order: 2,
          },
        ],
      },
    ],
  },
  {
    id: 'course-102',
    title: 'Relational Database Engineering & Schema Optimization',
    slug: 'relational-database-engineering',
    summary: 'Deep dive into 3NF normalization, B-tree indexes, execution plans, and foreign key cascades.',
    description: 'Learn how to construct resilient schemas for capacity building management portals. Focus on data normalization up to Boyce-Codd Normal Form, foreign key constraint governance, index profiling with EXPLAIN, and high-performance querying.',
    categoryId: 'cat-data',
    categoryName: 'Relational Database Systems',
    trainerId: 'user-trainer-2',
    trainerName: 'Dr. Vikramaditya Dave',
    level: 'Intermediate',
    durationHours: 15,
    thumbnail: '/src/assets/images/course_database_systems_1791712589564.jpg',
    isPublished: true,
    featured: true,
    competencies: ['Normalization (1NF-3NF)', 'MySQL Indexing', 'EXPLAIN Query Plans', 'Foreign Key Constraints'],
    createdAt: '2026-09-09T14:00:00Z',
    enrolledCount: 38,
    modules: [
      {
        id: 'mod-102-1',
        courseId: 'course-102',
        title: 'Module 1: Relational Modeling & Normalization Rules',
        description: 'First, Second, and Third Normal Forms applied to educational management systems.',
        order: 1,
        lessons: [
          {
            id: 'les-102-1-1',
            moduleId: 'mod-102-1',
            title: '1.1 Designing Schemas from Business Requirements',
            durationMinutes: 30,
            content: `### 1.1 Designing Schemas from Business Requirements

In this lesson, we study the architectural transition from real-world capacity development requirements into relational entities.

#### Entities & Cardinalities in Capacity Connect:
- **User 1 : N Enrollments**: A user enrolls in multiple courses; an enrollment record binds a single user to a single course.
- **Course 1 : N Modules 1 : N Lessons**: Hierarchical course content tree.
- **Lesson 1 : N LessonProgress**: Records completion timestamp and state per trainee.
- **Course 1 : 1 Quiz 1 : N Questions**: Assessment relationship.
- **User 1 : N Certificates**: Certificates issued upon successful passing of threshold.

#### Primary and Foreign Key Integrity:
Always enforce relational constraints at the database engine level (InnoDB in MySQL) rather than relying exclusively on application code validation.`,
            resources: [
              {
                id: 'res-102-1-1',
                title: 'Schema_Normalization_3NF_Guide.pdf',
                type: 'pdf',
                size: '1.2 MB',
                url: '#download-guide-6',
              },
            ],
            order: 1,
          },
          {
            id: 'les-102-1-2',
            moduleId: 'mod-102-1',
            title: '1.2 Normalization Deep Dive: Eliminating Update Anomalies',
            durationMinutes: 35,
            content: `### 1.2 Normalization Deep Dive: Eliminating Update Anomalies

Learn how transitive dependencies cause data redundancy and inconsistencies.

#### 1NF (First Normal Form):
- Each column must contain atomic (indivisible) values.
- No repeating groups or comma-separated lists in relational columns.

#### 2NF (Second Normal Form):
- Must be in 1NF.
- Every non-key attribute must be fully functionally dependent on the entire primary key (no partial key dependencies).

#### 3NF (Third Normal Form):
- Must be in 2NF.
- No transitive functional dependencies: non-key attributes cannot depend on other non-key attributes.`,
            resources: [
              {
                id: 'res-102-1-2',
                title: 'ER_Diagram_Specification.pdf',
                type: 'pdf',
                size: '950 KB',
                url: '#download-guide-7',
              },
            ],
            order: 2,
          },
        ],
      },
      {
        id: 'mod-102-2',
        courseId: 'course-102',
        title: 'Module 2: Indexing Strategies & Query Optimization',
        description: 'B-Tree index construction, composite index order, and avoiding full table scans.',
        order: 2,
        lessons: [
          {
            id: 'les-102-2-1',
            moduleId: 'mod-102-2',
            title: '2.1 Anatomy of a MySQL B-Tree Index',
            durationMinutes: 40,
            content: `### 2.1 Anatomy of a MySQL B-Tree Index

MySQL InnoDB uses clustered B+Trees for primary keys and secondary B-Tree indices for non-primary keys.

#### Index Optimization Rules:
1. Index foreign key columns (\`course_id\`, \`user_id\`) to accelerate JOIN operations.
2. Index columns frequently utilized in \`WHERE\`, \`ORDER BY\`, and \`GROUP BY\` clauses.
3. Leftmost prefix rule: In a composite index \`(category_id, is_published, created_at)\`, queries filtering by \`category_id\` leverage the index, while queries filtering solely by \`created_at\` cannot.`,
            resources: [
              {
                id: 'res-102-2-1',
                title: 'MySQL_Index_Optimization_Handbook.pdf',
                type: 'pdf',
                size: '1.6 MB',
                url: '#download-guide-8',
              },
            ],
            order: 1,
          },
        ],
      },
    ],
  },
  {
    id: 'course-103',
    title: 'Cloud Infrastructure & Linux Systems Administration',
    slug: 'cloud-infrastructure-linux',
    summary: 'Deploy, configure, and maintain production Linux environments, Nginx reverse proxies, and process monitors.',
    description: 'Practical training on system administration essentials, environment variables, SSL certificate termination, file permission sandboxing, and automated backups for enterprise educational servers.',
    categoryId: 'cat-cloud',
    categoryName: 'Cloud & DevOps Infrastructure',
    trainerId: 'user-trainer-1',
    trainerName: 'Prof. Priya Sharma',
    level: 'Advanced',
    durationHours: 20,
    thumbnail: '/src/assets/images/course_cloud_devops_1791712601465.jpg',
    isPublished: true,
    featured: true,
    competencies: ['Linux Bash Administration', 'Nginx Configuration', 'File Permissions', 'Process Management'],
    createdAt: '2026-09-11T12:00:00Z',
    enrolledCount: 29,
    modules: [
      {
        id: 'mod-103-1',
        courseId: 'course-103',
        title: 'Module 1: Linux Permissions & Process Control',
        description: 'chmod, chown, systemd services, and file isolation.',
        order: 1,
        lessons: [
          {
            id: 'les-103-1-1',
            moduleId: 'mod-103-1',
            title: '1.1 Linux File Permissions for Web Uploads',
            durationMinutes: 30,
            content: `### 1.1 Linux File Permissions for Web Uploads

Securing server uploads is critical when allowing trainees or trainers to upload course materials and PDF documents.

#### Permission Fundamentals:
- \`r\` (Read) = 4
- \`w\` (Write) = 2
- \`x\` (Execute) = 1

#### Secure Upload Directory Rules:
- Upload directories (e.g. \`/uploads/materials/\`) should be set to \`755\` or \`750\`.
- Never grant \`777\` write permissions.
- Disable script execution in the uploads directory via server configuration to prevent remote PHP code execution from uploaded user files.`,
            resources: [
              {
                id: 'res-103-1-1',
                title: 'Linux_Web_Security_Hardening.pdf',
                type: 'pdf',
                size: '1.3 MB',
                url: '#download-guide-9',
              },
            ],
            order: 1,
          },
        ],
      },
    ],
  },
];

export const SEED_QUIZZES: Quiz[] = [
  {
    id: 'quiz-101',
    courseId: 'course-101',
    courseTitle: 'Enterprise Web Application Architecture with PHP & MySQL',
    title: 'Comprehensive Assessment: Web Architecture & Database Integration',
    description: 'Evaluates your comprehension of HTTP statelessness, session governance, PDO prepared statements, and transactional safety.',
    passingScorePercent: 70,
    timeLimitMinutes: 15,
    questions: [
      {
        id: 'q-101-1',
        question: 'Which PDO attribute configuration ensures that SQL statements are securely prepared natively on the database server rather than emulated?',
        options: [
          'PDO::ATTR_ERRMODE => PDO::ERRMODE_SILENT',
          'PDO::ATTR_EMULATE_PREPARES => false',
          'PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_NUM',
          'PDO::ATTR_PERSISTENT => true',
        ],
        correctAnswerIndex: 1,
        explanation: 'Setting PDO::ATTR_EMULATE_PREPARES to false disables client-side emulation and ensures the database engine itself compiles and parameterizes queries natively.',
      },
      {
        id: 'q-101-2',
        question: 'What is the primary technical reason why HTTP is described as a "stateless" protocol?',
        options: [
          'It cannot transmit media files or binary buffers.',
          'Each request-response transaction is treated independently without intrinsic persistence of past states.',
          'It only runs over encrypted HTTPS ports.',
          'It requires database restarts between user actions.',
        ],
        correctAnswerIndex: 1,
        explanation: 'Statelessness implies that by default the protocol retains no awareness of previous interactions, requiring cookies and server-side sessions to bridge continuity.',
      },
      {
        id: 'q-101-3',
        question: 'In an ACID database transaction, which property guarantees that if any single statement fails, the entire transaction rolls back?',
        options: [
          'Atomicity',
          'Consistency',
          'Isolation',
          'Durability',
        ],
        correctAnswerIndex: 0,
        explanation: 'Atomicity ensures the "all-or-nothing" execution guarantee.',
      },
      {
        id: 'q-101-4',
        question: 'Which HTTP response header directive prevents client-side JavaScript from accessing session identifier cookies (mitigating XSS theft)?',
        options: [
          'SameSite=Lax',
          'Secure',
          'HttpOnly',
          'Max-Age=3600',
        ],
        correctAnswerIndex: 2,
        explanation: 'HttpOnly prevents document.cookie access in browser scripts, protecting session tokens from cross-site scripting exploitation.',
      },
      {
        id: 'q-101-5',
        question: 'What is the primary defense against Cross-Site Request Forgery (CSRF) in state-changing form submissions?',
        options: [
          'Storing passwords in plain text in local storage',
          'Validating a cryptographically unique session-tied CSRF token in the request payload',
          'Using HTTP GET instead of HTTP POST for deletes',
          'Disabling all cookies on the server',
        ],
        correctAnswerIndex: 1,
        explanation: 'CSRF tokens are unpredictable server-generated secrets tied to the user session, validated on every mutating POST/PUT/DELETE request.',
      },
    ],
  },
  {
    id: 'quiz-102',
    courseId: 'course-102',
    courseTitle: 'Relational Database Engineering & Schema Optimization',
    title: 'Mid-Term Assessment: Relational Normalization & Indexing',
    description: 'Tests normalization principles from 1NF to 3NF, composite indexes, and foreign key cascades.',
    passingScorePercent: 70,
    timeLimitMinutes: 15,
    questions: [
      {
        id: 'q-102-1',
        question: 'A table satisfies Third Normal Form (3NF) if and only if it is in 2NF and:',
        options: [
          'It contains no repeating column groups.',
          'All columns are indexed.',
          'No non-prime attribute is transitively dependent on the primary key.',
          'It has no foreign key relationships.',
        ],
        correctAnswerIndex: 2,
        explanation: '3NF removes transitive dependencies where a non-key column depends on another non-key column.',
      },
      {
        id: 'q-102-2',
        question: 'Given a composite index on (category_id, is_published, created_at), which of the following queries will effectively utilize the index?',
        options: [
          'WHERE created_at = "2026-09-01"',
          'WHERE is_published = 1 AND created_at = "2026-09-01"',
          'WHERE category_id = "cat-web" AND is_published = 1',
          'ORDER BY created_at DESC with no WHERE clause',
        ],
        correctAnswerIndex: 2,
        explanation: 'MySQL B-tree indices adhere to the leftmost prefix rule, meaning query predicates must include the first column in the composite definition.',
      },
      {
        id: 'q-102-3',
        question: 'What does the ON DELETE CASCADE constraint specification accomplish on a foreign key relationship?',
        options: [
          'It prevents parent rows from ever being deleted.',
          'It automatically deletes child rows when the referencing parent row is deleted.',
          'It converts child row foreign keys to NULL values.',
          'It notifies the admin via email.',
        ],
        correctAnswerIndex: 1,
        explanation: 'ON DELETE CASCADE propagates deletion of the parent entity directly to all associated child records maintaining referential consistency.',
      },
      {
        id: 'q-102-4',
        question: 'Which MySQL statement is executed to analyze query execution strategy and identify whether index lookups or full table scans occur?',
        options: [
          'DESCRIBE DATABASE',
          'SHOW VARIABLES',
          'EXPLAIN SELECT ...',
          'CHECK INTEGRITY',
        ],
        correctAnswerIndex: 2,
        explanation: 'EXPLAIN provides detailed breakdown of table access type (ALL, index, ref, const), keys chosen, and rows examined.',
      },
    ],
  },
];

export const SEED_ENROLLMENTS: Enrollment[] = [
  {
    id: 'enr-101',
    userId: 'user-trainee-1',
    courseId: 'course-101',
    enrolledAt: '2026-09-12T10:00:00Z',
    completedLessonIds: ['les-101-1-1', 'les-101-1-2', 'les-101-2-1'],
    progressPercent: 75,
    isCompleted: false,
  },
  {
    id: 'enr-102',
    userId: 'user-trainee-1',
    courseId: 'course-102',
    enrolledAt: '2026-09-14T11:30:00Z',
    completedLessonIds: ['les-102-1-1', 'les-102-1-2', 'les-102-2-1'],
    progressPercent: 100,
    isCompleted: true,
    completedAt: '2026-09-20T17:00:00Z',
  },
  {
    id: 'enr-103',
    userId: 'user-trainee-2',
    courseId: 'course-101',
    enrolledAt: '2026-09-15T09:00:00Z',
    completedLessonIds: ['les-101-1-1'],
    progressPercent: 25,
    isCompleted: false,
  },
];

export const SEED_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-101',
    certificateNumber: 'CC-2026-8941',
    userId: 'user-trainee-1',
    userName: 'Rahul Verma',
    courseId: 'course-102',
    courseTitle: 'Relational Database Engineering & Schema Optimization',
    issueDate: '2026-09-20',
    grade: 'Distinction',
    scorePercent: 100,
    trainerName: 'Dr. Vikramaditya Dave',
    verified: true,
  },
];

export const SEED_COMPETENCIES: CompetencySkill[] = [
  {
    id: 'comp-1',
    name: 'Backend Web Architecture (PHP/REST)',
    category: 'Full-Stack Web Engineering',
    description: 'Object-oriented server scripting, MVC separation, and secure routing mechanics.',
    currentLevelPercent: 82,
    benchmarkPercent: 85,
  },
  {
    id: 'comp-2',
    name: 'Relational Schema Design & SQL',
    category: 'Relational Database Systems',
    description: 'Data normalization, B-Tree indexing, execution plan optimization, and ACID transactions.',
    currentLevelPercent: 94,
    benchmarkPercent: 80,
  },
  {
    id: 'comp-3',
    name: 'Application Security & RBAC',
    category: 'Cybersecurity & Secure Coding',
    description: 'CSRF tokens, parameterized SQL statements, session lifecycle management, and role authorization.',
    currentLevelPercent: 78,
    benchmarkPercent: 85,
  },
  {
    id: 'comp-4',
    name: 'Cloud & Linux Systems Administration',
    category: 'Cloud & DevOps Infrastructure',
    description: 'Linux shell command line, file system permissions, Apache/Nginx routing, and process monitoring.',
    currentLevelPercent: 45,
    benchmarkPercent: 75,
  },
];

export const SEED_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'PBL-I Project Phase 1 Evaluation & Milestone Submission',
    content: 'All student trainees are requested to complete modules 1 & 2 of the Enterprise Web Application Architecture course prior to the upcoming department review.',
    targetRole: 'all',
    authorName: 'Nitin Purabiya (Admin)',
    createdAt: '2026-09-18T09:00:00Z',
    priority: 'important',
  },
  {
    id: 'ann-2',
    title: 'Trainer Workshop: Best Practices in Assessment Authoring',
    content: 'Faculty trainers are invited to attend the interactive quiz authoring and rubric calibration clinic this Thursday at 3:00 PM.',
    targetRole: 'trainer',
    authorName: 'Academic Council',
    createdAt: '2026-09-19T11:00:00Z',
    priority: 'normal',
  },
  {
    id: 'ann-3',
    title: 'New Study Materials: PDO Security Cheatsheet Available',
    content: 'Updated reference guides on prepared statements and SQL injection prevention have been attached to Course 101 learning materials.',
    targetRole: 'trainee',
    authorName: 'Prof. Priya Sharma',
    createdAt: '2026-09-21T14:30:00Z',
    priority: 'normal',
  },
];

export const SEED_FEEDBACK: Feedback[] = [
  {
    id: 'fb-1',
    userId: 'user-trainee-1',
    userName: 'Rahul Verma',
    userRole: 'trainee',
    courseId: 'course-102',
    courseTitle: 'Relational Database Engineering & Schema Optimization',
    rating: 5,
    category: 'Course Content',
    message: 'The normalization breakdown and B-Tree indexing lessons were crystal clear. The interactive quizzes really helped solidify the concepts.',
    createdAt: '2026-09-20T18:00:00Z',
  },
  {
    id: 'fb-2',
    userId: 'user-trainee-2',
    userName: 'Ananya Iyer',
    userRole: 'trainee',
    courseId: 'course-101',
    courseTitle: 'Enterprise Web Application Architecture with PHP & MySQL',
    rating: 4,
    category: 'Platform Usability',
    message: 'Very clean and responsive interface. The downloadable PDF resources are great for offline study.',
    createdAt: '2026-09-22T10:15:00Z',
  },
];

export const SEED_CONTACT_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Siddharth Patel',
    email: 'siddharth.patel@techcorp.in',
    subject: 'Corporate Internship Partnership for PBL-I Cohort',
    category: 'Partnership & Training',
    message: 'We are interested in evaluating the capacity profiles of top-performing trainees in the Full-Stack Web and Database engineering tracks for our upcoming winter internship cohort.',
    status: 'read',
    createdAt: '2026-09-18T14:00:00Z',
  },
  {
    id: 'msg-2',
    name: 'Meera Deshmukh',
    email: 'meera.d@collegestudent.edu',
    subject: 'Inquiry regarding prerequisite knowledge for Cloud track',
    category: 'PBL Inquiries',
    message: 'Hello, I am a second-year student wanting to know if basic Linux knowledge is needed before enrolling in the Advanced Linux Administration course.',
    status: 'unread',
    createdAt: '2026-09-22T08:30:00Z',
  },
];
