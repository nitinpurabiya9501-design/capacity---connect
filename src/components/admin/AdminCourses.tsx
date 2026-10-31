import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  Layers,
  Plus,
  Trash2,
  Check,
  Eye,
  EyeOff,
  Star,
  X,
} from 'lucide-react';

export const AdminCourses: React.FC = () => {
  const {
    courses,
    categories,
    deleteCourse,
    togglePublishCourse,
    addCategory,
    deleteCategory,
    updateCourse,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'courses' | 'categories'>('courses');
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [isAddCatOpen, setIsAddCatOpen] = useState(false);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    addCategory({
      name: newCatName.trim(),
      description: newCatDesc.trim(),
    });

    setIsAddCatOpen(false);
    setNewCatName('');
    setNewCatDesc('');
  };

  const handleToggleFeatured = (courseId: string, current: boolean) => {
    updateCourse(courseId, { featured: !current });
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Course Catalog & Category Administration
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Oversee academic curricula across all faculty trainers and maintain disciplinary taxonomy.
          </p>
        </div>

        {activeTab === 'categories' && (
          <button
            onClick={() => setIsAddCatOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Category</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-4 text-xs font-medium">
        <button
          onClick={() => setActiveTab('courses')}
          className={`pb-2.5 transition-colors cursor-pointer ${
            activeTab === 'courses'
              ? 'border-b-2 border-slate-900 text-slate-900 font-semibold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          All Courses ({courses.length})
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`pb-2.5 transition-colors cursor-pointer ${
            activeTab === 'categories'
              ? 'border-b-2 border-slate-900 text-slate-900 font-semibold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Categories & Disciplines ({categories.length})
        </button>
      </div>

      {activeTab === 'courses' ? (
        <div className="border border-slate-200 rounded-lg overflow-x-auto bg-white shadow-xs">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="p-3">Course Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Instructor</th>
                <th className="p-3">Enrolled</th>
                <th className="p-3">Status</th>
                <th className="p-3">Featured</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-slate-50/50">
                  <td className="p-3">
                    <span className="font-semibold text-slate-900 block">
                      {course.title}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {course.level} · {course.durationHours} Hours
                    </span>
                  </td>
                  <td className="p-3 text-slate-600">{course.categoryName}</td>
                  <td className="p-3 font-medium">{course.trainerName}</td>
                  <td className="p-3 font-mono tabular-nums">{course.enrolledCount}</td>
                  <td className="p-3">
                    <button
                      onClick={() => togglePublishCourse(course.id)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium cursor-pointer ${
                        course.isPublished
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {course.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{course.isPublished ? 'Published' : 'Draft'}</span>
                    </button>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleToggleFeatured(course.id, !!course.featured)}
                      className={`p-1 rounded cursor-pointer ${
                        course.featured
                          ? 'text-amber-500 hover:text-amber-600'
                          : 'text-slate-300 hover:text-slate-400'
                      }`}
                      title={course.featured ? 'Featured on home' : 'Set as featured'}
                    >
                      <Star className={`w-4 h-4 ${course.featured ? 'fill-amber-400' : ''}`} />
                    </button>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete course "${course.title}"?`)) {
                          deleteCourse(course.id);
                        }
                      }}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Categories List */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="border border-slate-200 rounded-lg p-5 bg-white space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900 text-sm">
                    {cat.name}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">
                    slug: {cat.slug}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-mono">
                  {courses.filter((c) => c.categoryId === cat.id).length} Courses assigned
                </span>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete category "${cat.name}"?`)) {
                      deleteCategory(cat.id);
                    }
                  }}
                  className="text-rose-600 hover:text-rose-700 text-xs font-medium cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Category Modal */}
      {isAddCatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-semibold text-slate-900 text-sm">
                Add New Academic Discipline / Category
              </h3>
              <button
                onClick={() => setIsAddCatOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCategory} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-medium text-slate-700 block">Category Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Artificial Intelligence & Data Pipelines"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md"
                />
              </div>

              <div className="space-y-1">
                <label className="font-medium text-slate-700 block">Discipline Scope</label>
                <textarea
                  rows={3}
                  placeholder="Brief summary of skills and coursework covered under this track..."
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddCatOpen(false)}
                  className="px-3 py-1.5 border border-slate-300 text-slate-700 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-slate-900 text-white rounded font-medium"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
