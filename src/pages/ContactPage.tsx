import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { submitContactMessage, currentUser } = useApp();

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [category, setCategory] = useState<
    'PBL Inquiries' | 'Technical Support' | 'Partnership & Training' | 'Feedback'
  >('PBL Inquiries');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      return;
    }

    submitContactMessage({
      name: name.trim(),
      email: email.trim(),
      category,
      subject: subject.trim(),
      message: message.trim(),
    });

    setSubmitted(true);
    setSubject('');
    setMessage('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Contact Project Coordinators
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
          Have questions regarding the PBL-I capacity building curriculum, course enrollments, or technical evaluation? Reach out to our academic lab coordinators.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Coordinates */}
        <div className="space-y-6 text-xs text-slate-600">
          <div className="p-5 border border-slate-200 rounded-lg bg-slate-50/50 space-y-4">
            <h3 className="font-semibold text-slate-900 text-sm">
              Academic Coordinates
            </h3>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
              <div>
                <strong className="text-slate-900 block">Department Lab</strong>
                <span>PBL-I Advanced Web & Cloud Systems Lab</span>
                <span className="block text-slate-400">Building 4, Level 3, Campus Tech Center</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
              <div>
                <strong className="text-slate-900 block">Coordinator Email</strong>
                <span className="font-mono text-[11px]">coordinator@capacityconnect.edu</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
              <div>
                <strong className="text-slate-900 block">Office Hours</strong>
                <span>Monday – Friday: 09:30 – 17:00</span>
              </div>
            </div>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg text-slate-500 bg-white leading-relaxed">
            All submitted messages are recorded in the central database and reviewed by the Admin in the Admin Dashboard.
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          {submitted ? (
            <div className="p-8 border border-slate-200 rounded-lg bg-white text-center space-y-4">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-semibold text-slate-900 text-base">
                Inquiry Successfully Recorded
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you. Your message has been saved into the database and flagged for review in the Admin Messages ledger.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 bg-slate-900 text-white rounded text-xs font-medium cursor-pointer"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="border border-slate-200 rounded-lg p-6 bg-white space-y-4"
            >
              <h3 className="font-semibold text-slate-900 text-sm mb-2">
                Submit an Academic or Technical Inquiry
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700 block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Verma"
                    className="w-full px-3 py-2 border border-slate-200 rounded-md text-xs focus:outline-hidden focus:border-slate-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700 block">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@capacityconnect.edu"
                    className="w-full px-3 py-2 border border-slate-200 rounded-md text-xs focus:outline-hidden focus:border-slate-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700 block">
                    Inquiry Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) =>
                      setCategory(
                        e.target.value as
                          | 'PBL Inquiries'
                          | 'Technical Support'
                          | 'Partnership & Training'
                          | 'Feedback'
                      )
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-md text-xs bg-white text-slate-700 focus:outline-hidden"
                  >
                    <option value="PBL Inquiries">PBL Inquiries</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Partnership & Training">Partnership & Training</option>
                    <option value="Feedback">Feedback</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700 block">
                    Subject Line *
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Question regarding Module 2 PDO query"
                    className="w-full px-3 py-2 border border-slate-200 rounded-md text-xs focus:outline-hidden focus:border-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700 block">
                  Detailed Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide detailed description of your question or issue..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-xs focus:outline-hidden focus:border-slate-400"
                ></textarea>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-xs font-medium transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
