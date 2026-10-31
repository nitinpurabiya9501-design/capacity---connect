import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Plus,
  BookOpen,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  FileText,
  Upload,
  Check,
  X,
} from 'lucide-react';
import { Course, Module } from '../../types';

export const TrainerCourses: React.FC = () => {
  const {
    currentUser,
    courses,
    categories,
    addCourse,
    updateCourse,
    deleteCourse,
    togglePublishCourse,
    addModule,
    addLesson,
    notify,
  } = useApp();

  const trainerCourses = courses.filter((c) => c.trainerId === currentUser?.id);

  // Modals & form state
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCatId, setNewCatId] = useState(categories[0]?.id || 'cat-web');
  const [newLevel, setNewLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [newDuration, setNewDuration] = useState(15);
  const [newSummary, setNewSummary] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCompetencies, setNewCompetencies] = useState('PHP 8+, MySQL, PDO');

  // Syllabus expansion & module creation
  const [managingCourseId, setManagingCourseId] = useState<string | null>(null);
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [selectedModuleIdForLesson, setSelectedModuleIdForLesson] = useState<string | null>(null);

  // Lesson creation
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDuration, setLessonDuration] = useState(25);
  const [lessonContent, setLessonContent] = useState('');
  const [resourceTitle, setResourceTitle] = useState('');

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addCourse({
      title: newTitle.trim(),
      categoryId: newCatId,
      level: newLevel,
      durationHours: Number(newDuration),
      summary: newSummary.trim(),
      description: newDescription.trim(),
      competencies: newCompetencies.split(',').map((s) => s.trim()).filter(Boolean),
      isPublished: true,
    });

    setIsAddCourseOpen(false);
    setNewTitle('');
    setNewSummary('');
    setNewDescription('');
  };

  const handleAddModule = (courseId: string) => {
    if (!newModuleTitle.trim()) return;
    addModule(courseId, newModuleTitle.trim());
    setNewModuleTitle('');
  };

  const handleAddLesson = (courseId: string, moduleId: string) => {
    if (!lessonTitle.trim()) return;

    const resources = resourceTitle.trim()
      ? [
          {
            id: 'res-' + Date.now(),
            title: resourceTitle.trim(),
            type: 'pdf' as const,
            size: '1.2 MB',
            url: 'uploads/resources/notes.pdf',
          },
        ]
      : [];

    addLesson(courseId, moduleId, {
      title: lessonTitle.trim(),
      durationMinutes: Number(lessonDuration),
      content: lessonContent.trim() || 'Core module lecture notes and reference implementation.',
      resources,
    });

    setSelectedModuleIdForLesson(null);
    setLessonTitle('');
    setLessonContent('');
    setResourceTitle('');
  };

  const activeManagingCourse = courses.find((c) => c.id === managingCourseId);

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Course Management & Curriculum Authoring
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Create new capacity courses, define syllabus modules, write lesson content, and securely attach PDF technical handouts.
          </p>
        </div>

        <button
          onClick={() => setIsAddCourseOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Course</span>
        </button>
      </div>

      {/* Courses List */}
      <div className="space-y-4">
        {trainerCourses.map((course) => (
          <div
            key={course.id}
            className="border border-slate-200 rounded-lg p-5 bg-white space-y-4 shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="text-[11px] text-slate-500 flex items-center gap-2">
                  <span>{course.categoryName}</span>
                  <span aria-hidden="true">·</span>
                  <span>{course.level}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{course.durationHours} Hours</span>
                </div>
                <h3 className="font-semibold text-slate-900 text-base">
                  {course.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-1 max-w-2xl">
                  {course.summary}
                </p>
              </div>

              {/* Status and Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => togglePublishCourse(course.id)}
                  className={`px-2.5 py-1 text-xs font-medium rounded flex items-center gap-1 cursor-pointer ${
                    course.isPublished
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {course.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  <span>{course.isPublished ? 'Published' : 'Draft'}</span>
                </button>

                <button
                  onClick={() =>
                    setManagingCourseId(
                      managingCourseId === course.id ? null : course.id
                    )
                  }
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium rounded cursor-pointer"
                >
                  {managingCourseId === course.id ? 'Close Syllabus' : 'Manage Syllabus'}
                </button>

                <button
                  onClick={() => {
                    if (window.confirm(`Delete course "${course.title}"?`)) {
                      deleteCourse(course.id);
                    }
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 cursor-pointer"
                  title="Delete course"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Syllabus Editor drawer if selected */}
            {managingCourseId === course.id && (
              <div className="pt-4 border-t border-slate-100 space-y-4 bg-slate-50/50 p-4 rounded-md">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    Syllabus Modules ({course.modules.length})
                  </h4>
                </div>

                {/* Modules list */}
                <div className="space-y-3">
                  {course.modules.map((mod) => (
                    <div
                      key={mod.id}
                      className="border border-slate-200 rounded bg-white p-3 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between font-semibold text-slate-900">
                        <span>{mod.title}</span>
                        <button
                          onClick={() =>
                            setSelectedModuleIdForLesson(
                              selectedModuleIdForLesson === mod.id ? null : mod.id
                            )
                          }
                          className="text-[11px] text-teal-700 hover:text-teal-800 font-medium flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Lesson</span>
                        </button>
                      </div>

                      {/* Lessons in module */}
                      <div className="divide-y divide-slate-100 pl-3">
                        {mod.lessons.map((les) => (
                          <div
                            key={les.id}
                            className="py-1.5 flex items-center justify-between text-slate-700"
                          >
                            <span>{les.title}</span>
                            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                              <span>{les.durationMinutes}m</span>
                              {les.resources.length > 0 && (
                                <span className="text-teal-700">PDF attached</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Add Lesson Form inline */}
                      {selectedModuleIdForLesson === mod.id && (
                        <div className="mt-2 pt-2 border-t border-slate-100 space-y-2 bg-slate-50 p-2.5 rounded">
                          <span className="font-semibold text-slate-900 text-[11px] block">
                            Add New Lesson to {mod.title}
                          </span>
                          <input
                            type="text"
                            placeholder="Lesson Title (e.g. 1.3 Database Connection Pooling)"
                            value={lessonTitle}
                            onChange={(e) => setLessonTitle(e.target.value)}
                            className="w-full px-2.5 py-1.5 border border-slate-200 rounded text-xs bg-white"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="number"
                              placeholder="Minutes (e.g. 25)"
                              value={lessonDuration}
                              onChange={(e) => setLessonDuration(Number(e.target.value))}
                              className="px-2.5 py-1.5 border border-slate-200 rounded text-xs bg-white"
                            />
                            <input
                              type="text"
                              placeholder="PDF Handout Title (optional)"
                              value={resourceTitle}
                              onChange={(e) => setResourceTitle(e.target.value)}
                              className="px-2.5 py-1.5 border border-slate-200 rounded text-xs bg-white"
                            />
                          </div>
                          <textarea
                            rows={3}
                            placeholder="Study notes / markdown content..."
                            value={lessonContent}
                            onChange={(e) => setLessonContent(e.target.value)}
                            className="w-full px-2.5 py-1.5 border border-slate-200 rounded text-xs bg-white"
                          ></textarea>

                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedModuleIdForLesson(null)}
                              className="px-2.5 py-1 text-slate-500 text-xs"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleAddLesson(course.id, mod.id)}
                              className="px-3 py-1 bg-slate-900 text-white rounded text-xs font-medium"
                            >
                              Save Lesson
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add Module inline input */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="New Module Title (e.g. Module 3: Microservice Deployment)"
                    value={newModuleTitle}
                    onChange={(e) => setNewModuleTitle(e.target.value)}
                    className="flex-1 px-3 py-1.5 border border-slate-200 rounded text-xs bg-white"
                  />
                  <button
                    onClick={() => handleAddModule(course.id)}
                    className="px-3.5 py-1.5 bg-slate-900 text-white text-xs font-medium rounded cursor-pointer"
                  >
                    Add Module
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Create New Course Modal */}
      {isAddCourseOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-semibold text-slate-900 text-base">
                Author New Course Curriculum
              </h3>
              <button
                onClick={() => setIsAddCourseOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-medium text-slate-700 block">Course Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Systems & Docker Containerization"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-medium text-slate-700 block">Category</label>
                  <select
                    value={newCatId}
                    onChange={(e) => setNewCatId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md bg-white text-slate-700"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-slate-700 block">Difficulty Level</label>
                  <select
                    value={newLevel}
                    onChange={(e) =>
                      setNewLevel(
                        e.target.value as 'Beginner' | 'Intermediate' | 'Advanced'
                      )
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-md bg-white text-slate-700"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-medium text-slate-700 block">Duration (Hours)</label>
                  <input
                    type="number"
                    value={newDuration}
                    onChange={(e) => setNewDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-slate-700 block">Competency Tags</label>
                  <input
                    type="text"
                    value={newCompetencies}
                    onChange={(e) => setNewCompetencies(e.target.value)}
                    placeholder="Comma separated"
                    className="w-full px-3 py-2 border border-slate-200 rounded-md"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-medium text-slate-700 block">Summary Pitch</label>
                <input
                  type="text"
                  placeholder="Short one-line synopsis"
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md"
                />
              </div>

              <div className="space-y-1">
                <label className="font-medium text-slate-700 block">Full Description</label>
                <textarea
                  rows={3}
                  placeholder="Detailed pedagogical overview and learning objectives..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddCourseOpen(false)}
                  className="px-3 py-1.5 border border-slate-300 text-slate-700 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-slate-900 text-white rounded font-medium"
                >
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
