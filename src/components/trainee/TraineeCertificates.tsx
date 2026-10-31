import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Award,
  CheckCircle2,
  Printer,
  X,
  ExternalLink,
  ShieldCheck,
  FileCheck,
} from 'lucide-react';
import { Certificate } from '../../types';

export const TraineeCertificates: React.FC = () => {
  const {
    currentUser,
    certificates,
    viewingCertificate,
    setViewingCertificate,
  } = useApp();

  const userCertificates = certificates.filter(
    (c) => c.userId === currentUser?.id
  );

  const [activeCert, setActiveCert] = useState<Certificate | null>(
    viewingCertificate || (userCertificates.length > 0 ? userCertificates[0] : null)
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            My Verified Certificates
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Cryptographically issued credentials verifying completion of modular curricula and passing of assessments.
          </p>
        </div>
        <span className="text-xs font-mono text-slate-500 tabular-nums">
          {userCertificates.length} credentials earned
        </span>
      </div>

      {userCertificates.length === 0 ? (
        <div className="p-12 border border-slate-200 rounded-lg text-center bg-white space-y-3">
          <Award className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="font-semibold text-slate-900 text-sm">No certificates earned yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Complete 100% of the lessons in a course and score ≥70% on its assessment quiz to generate an official verified certificate.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userCertificates.map((cert) => (
            <div
              key={cert.id}
              className="border border-slate-200 rounded-lg p-5 bg-white space-y-4 shadow-xs"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-[11px] font-mono text-slate-400">
                    ID: {cert.certificateNumber}
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm leading-snug">
                    {cert.courseTitle}
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
              </div>

              <div className="text-xs text-slate-600 space-y-1 pt-1 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span>Recipient:</span>
                  <strong className="text-slate-900 font-medium">{cert.userName}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Grade / Score:</span>
                  <span className="font-mono text-emerald-800 font-semibold tabular-nums">
                    {cert.grade} ({cert.scorePercent}%)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Issue Date:</span>
                  <span className="font-mono text-slate-500">{cert.issueDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Status:</span>
                  <span className="text-teal-700 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verifiable
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveCert(cert)}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium transition-colors cursor-pointer text-center"
                >
                  View & Print Official Certificate
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* High-Resolution Certificate Modal / Inspection View */}
      {activeCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-lg border border-slate-300 shadow-2xl max-w-3xl w-full my-8 overflow-hidden">
            {/* Modal Controls Bar */}
            <div className="px-6 py-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between no-print">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <FileCheck className="w-4 h-4 text-teal-700" />
                <span>Certificate Verification #{activeCert.certificateNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  onClick={() => setActiveCert(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Certificate Canvas */}
            <div className="p-8 sm:p-12 bg-white text-center space-y-8 border-8 border-double border-slate-200 m-4 rounded">
              {/* Institution Seal */}
              <div className="space-y-1">
                <div className="w-12 h-12 rounded-full border-2 border-slate-900 mx-auto flex items-center justify-center font-bold text-base text-slate-900">
                  CC
                </div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 pt-2">
                  Capacity Connect · Project-Based Learning I
                </h3>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                  Academic Digital Capacity Building & Competency Assurance
                </p>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
                  Certificate of Competency Completion
                </h1>
                <p className="text-xs text-slate-500 italic">
                  This certifies that
                </p>
                <div className="text-xl sm:text-2xl font-bold text-slate-900 border-b border-slate-300 max-w-md mx-auto pb-1">
                  {activeCert.userName}
                </div>
              </div>

              {/* Course & Achievement */}
              <div className="space-y-2 max-w-lg mx-auto text-xs text-slate-700 leading-relaxed">
                <p>
                  has satisfactorily completed all modular coursework and demonstrated technical mastery in the curriculum:
                </p>
                <div className="font-semibold text-slate-900 text-sm py-1">
                  {activeCert.courseTitle}
                </div>
                <p className="text-[11px] text-slate-500 font-mono">
                  Final Examination Grade: <strong>{activeCert.grade}</strong> (Score: {activeCert.scorePercent}%)
                </p>
              </div>

              {/* Signatures & Verification ID */}
              <div className="pt-8 grid grid-cols-2 gap-8 text-xs text-slate-700 border-t border-slate-200 max-w-lg mx-auto">
                <div className="space-y-1 text-left">
                  <div className="font-serif italic font-semibold text-slate-900 text-sm">
                    {activeCert.trainerName}
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                    Lead Faculty Instructor
                  </div>
                </div>

                <div className="space-y-1 text-right">
                  <div className="font-mono text-xs text-slate-800">
                    Nitin Purabiya
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                    PBL-I Project Coordinator
                  </div>
                </div>
              </div>

              {/* Verification Metadata Footnote */}
              <div className="text-[10px] text-slate-400 flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="font-mono">Verification ID: {activeCert.certificateNumber}</span>
                <span>Issue Date: {activeCert.issueDate}</span>
                <span className="text-teal-700 font-medium">Digital Hash Verified</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
