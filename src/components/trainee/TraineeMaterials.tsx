import React from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Download, BookOpen, Layers } from 'lucide-react';

export const TraineeMaterials: React.FC = () => {
  const { currentUser, courses, enrollments, notify } = useApp();

  const userEnrolledCourses = courses.filter((c) =>
    enrollments.some((e) => e.userId === currentUser?.id && e.courseId === c.id)
  );

  // Collect all resources from enrolled courses
  interface MaterialItem {
    id: string;
    title: string;
    courseTitle: string;
    lessonTitle: string;
    size?: string;
    type: string;
  }

  const materials: MaterialItem[] = [];

  userEnrolledCourses.forEach((c) => {
    c.modules.forEach((m) => {
      m.lessons.forEach((l) => {
        l.resources.forEach((r) => {
          materials.push({
            id: r.id,
            title: r.title,
            courseTitle: c.title,
            lessonTitle: l.title,
            size: r.size || '1.1 MB',
            type: r.type,
          });
        });
      });
    });
  });

  const handleDownload = (title: string) => {
    notify(`Simulated secure download for "${title}". Verified resource path.`);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Learning Materials & Study Handouts
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Consolidated technical resources, cheatsheets, and PDF guides uploaded by faculty instructors.
        </p>
      </div>

      {materials.length === 0 ? (
        <div className="p-12 border border-slate-200 rounded-lg text-center bg-white space-y-3">
          <FileText className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="font-semibold text-slate-900 text-sm">No study materials in your library</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Enroll in courses to unlock instructor handouts, architectural guides, and PDO security references.
          </p>
        </div>
      ) : (
        <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-900">
              Technical Resources ({materials.length} Documents)
            </span>
            <span className="text-slate-400 font-mono">Secure PDF Vault</span>
          </div>

          <div className="divide-y divide-slate-100">
            {materials.map((mat) => (
              <div
                key={mat.id}
                className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-start gap-3 truncate">
                  <div className="w-8 h-8 rounded bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5 truncate">
                    <span className="font-semibold text-slate-900 text-xs block truncate">
                      {mat.title}
                    </span>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2">
                      <span className="truncate">{mat.courseTitle}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{mat.size}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(mat.title)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded text-xs font-medium transition-colors cursor-pointer shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
