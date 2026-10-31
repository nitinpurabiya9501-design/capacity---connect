import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Filter, BookOpen, Clock, ArrowRight, Check } from 'lucide-react';

export const CoursesCatalogPage: React.FC = () => {
  const {
    courses,
    categories,
    setActivePage,
    setSelectedCourseId,
    enrollCourse,
    isEnrolled,
    currentUser,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      if (!c.isPublished) return false;
      const matchesSearch =
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.trainerName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat =
        selectedCategory === 'all' || c.categoryId === selectedCategory;
      const matchesLevel =
        selectedLevel === 'all' || c.level === selectedLevel;

      return matchesSearch && matchesCat && matchesLevel;
    });
  }, [courses, searchQuery, selectedCategory, selectedLevel]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Courses Catalog
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
          Explore institutional capacity development courses mapped to college engineering competencies and industry standards.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by course title, instructor, or competency..."
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-md text-xs sm:text-sm focus:outline-hidden focus:border-slate-400 bg-white"
            />
          </div>

          {/* Level selector */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="border border-slate-200 rounded-md px-3 py-2 text-xs bg-white text-slate-700 focus:outline-hidden"
            >
              <option value="all">All Difficulty Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Category segmented filter tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 bg-slate-100'
            }`}
          >
            All Disciplines
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900 bg-slate-100'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Course Count */}
      <div className="text-xs text-slate-500 font-medium">
        Showing <span className="text-slate-900 tabular-nums">{filteredCourses.length}</span> course
        {filteredCourses.length === 1 ? '' : 's'}
      </div>

      {/* Course Cards Grid */}
      {filteredCourses.length === 0 ? (
        <div className="p-12 border border-slate-200 rounded-lg text-center bg-slate-50 space-y-3">
          <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="font-semibold text-slate-900 text-sm">No courses match your filter criteria</h3>
          <p className="text-xs text-slate-500">
            Try adjusting your search query or selecting "All Disciplines".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedLevel('all');
            }}
            className="px-3 py-1.5 bg-slate-900 text-white text-xs rounded font-medium cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const enrolled = isEnrolled(course.id);
            return (
              <div
                key={course.id}
                className="border border-slate-200 rounded-lg bg-white overflow-hidden flex flex-col justify-between transition-all hover:border-slate-300 shadow-xs"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="aspect-16/9 bg-slate-100 overflow-hidden relative">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-5 space-y-3">
                    {/* Clean unboxed metadata */}
                    <div className="text-[11px] text-slate-500 flex items-center gap-1.5 flex-wrap">
                      <span>{course.categoryName}</span>
                      <span aria-hidden="true">·</span>
                      <span>{course.level}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{course.durationHours} hrs</span>
                    </div>

                    <h3 className="font-semibold text-slate-900 text-base leading-snug">
                      {course.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {course.summary}
                    </p>

                    {/* Competency tags unboxed */}
                    <div className="pt-2">
                      <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        Core Competencies
                      </div>
                      <div className="text-xs text-slate-700 flex flex-wrap gap-x-2 gap-y-1">
                        {course.competencies.map((comp, idx) => (
                          <span key={idx}>
                            {comp}
                            {idx < course.competencies.length - 1 && (
                              <span className="text-slate-300 ml-2" aria-hidden="true">·</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-5 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Faculty: {course.trainerName.split(' ')[0]} {course.trainerName.split(' ')[1]}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedCourseId(course.id);
                        setActivePage('course-detail');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium transition-colors cursor-pointer"
                    >
                      Details
                    </button>

                    {enrolled ? (
                      <button
                        onClick={() => {
                          setSelectedCourseId(course.id);
                          setActivePage('dashboard');
                          // set tab to my-courses
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-md cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Enrolled</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => enrollCourse(course.id)}
                        className="px-3 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                      >
                        Enroll Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
