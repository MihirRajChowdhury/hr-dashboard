// src/app/employee/[id]/page.js
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function EmployeeDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  /* ─────────────────────────────  data fetch  ───────────────────────────── */
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`https://dummyjson.com/users/${id}`);
        const data = await res.json();

        const enhanced = {
          ...data,
          bio: mockBio(data.firstName, data.lastName),
          performanceRating: rand(1, 5),
          performanceHistory: mockHistory(),
          projects: mockProjects(),
          feedback: mockFeedback(),
        };
        setUser(enhanced);
      } catch (e) {
        console.error(e);
      }
    }
    if (id) fetchUser();
  }, [id]);

  /* ─────────────────────────────  helpers  ───────────────────────────── */
  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const mockBio = (f, l) => {
    const bios = [
      `${f} is a dedicated professional with over 5 years of experience…`,
      `${f} brings innovative thinking and strong leadership…`,
      `${f} is a results‑driven individual with expertise in project management…`,
      `${f} excels in cross‑functional collaboration and has a proven track record…`,
    ];
    return bios[rand(0, bios.length - 1)];
  };

  const mockHistory = () =>
    ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'].map((q) => ({
      period: q,
      rating: rand(1, 5),
      achievement: [
        'Exceeded sales targets by 15%',
        'Led successful product launch',
        'Improved team efficiency by 25%',
        'Completed certification program',
        'Mentored 3 junior employees',
        'Reduced project costs by 10%',
      ][rand(0, 5)],
    }));

  const mockProjects = () => [
    { name: 'Digital Transformation Initiative', status: 'In Progress', completion: 75 },
    { name: 'Customer Experience Enhancement', status: 'Completed', completion: 100 },
    { name: 'Process Optimization Project', status: 'In Progress', completion: 45 },
    { name: 'Team Training Program', status: 'Planning', completion: 15 },
    { name: 'Quality Assurance Upgrade', status: 'Completed', completion: 100 },
  ].slice(0, rand(2, 4));

  const mockFeedback = () => [
    { type: 'Manager',       content: 'Excellent leadership skills…', rating: 5 },
    { type: 'Peer',          content: 'Great team player…',            rating: 4 },
    { type: 'Direct Report', content: 'Supportive manager…',           rating: 5 },
    { type: 'Client',        content: 'Professional and responsive…',  rating: 4 },
  ].slice(0, rand(2, 3));

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <svg key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));

  const perfBadge = (r) =>
    ({
      5: { c: 'bg-green-100 text-green-800', t: 'Outstanding' },
      4: { c: 'bg-blue-100 text-blue-800',  t: 'Exceeds Expectations' },
      3: { c: 'bg-yellow-100 text-yellow-800', t: 'Meets Expectations' },
      2: { c: 'bg-orange-100 text-orange-800', t: 'Needs Improvement' },
      1: { c: 'bg-red-100 text-red-800', t: 'Below Expectations' },
    }[r]);

  const statusColor = (s) =>
    ({
      Completed: 'bg-green-100 text-green-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      Planning: 'bg-yellow-100 text-yellow-800',
    }[s] || 'bg-gray-100 text-gray-800');

  /* ─────────────────────────────  loading  ───────────────────────────── */
  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-b-2 border-blue-600 rounded-full mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading employee details…</p>
        </div>
      </main>
    );
  }

  /* ─────────────────────────────  de‑structure  ───────────────────────────── */
  const { firstName, lastName, email, phone, company, address, bio, performanceRating, performanceHistory, projects, feedback } = user;

  /* ─────────────────────────────  UI  ───────────────────────────── */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <main className="max-w-6xl mx-auto p-6">
        {/* Back */}
        <Link href="/" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition mb-6 group">
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 mb-6">
          <div className="flex gap-6 mb-6">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
              <span className="text-white font-bold text-2xl">{firstName[0]}{lastName[0]}</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-1">{firstName} {lastName}</h1>
              <p className="text-slate-600 dark:text-slate-400 mb-2">{company?.department || 'No Department'}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">{renderStars(performanceRating)}<span className="ml-2 text-sm text-slate-600 dark:text-slate-400">({performanceRating}/5)</span></div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${perfBadge(performanceRating).c}`}>{perfBadge(performanceRating).t}</span>
              </div>
            </div>
          </div>
          <p className="text-slate-700 dark:text-slate-300">{bio}</p>
        </div>

        {/* Contact / Address */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Contact Information</h2>
            <div className="space-y-3">
              <InfoRow icon="mail" label="Email" value={email} />
              <InfoRow icon="phone" label="Phone" value={phone} />
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Address</h2>
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-purple-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{address?.address}<br />{address?.city}, {address?.state}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border mb-6">
          <TabNav active={activeTab} onChange={setActiveTab} />
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="p-6 space-y-6">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Performance History</h3>
                <div className="grid gap-4">
                  {performanceHistory.map((p, i) => (
                    <div key={i} className="flex justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-800 dark:text-slate-100">{p.period}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{p.achievement}</p>
                      </div>
                      <div className="flex items-center gap-2">{renderStars(p.rating)}<span className={`px-2 py-1 rounded text-xs font-medium ${perfBadge(p.rating).c}`}>{p.rating}/5</span></div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'projects' && (
              <motion.div key="projects" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="p-6 space-y-6">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Current Projects</h3>
                <div className="grid gap-4">
                  {projects.map((proj, i) => (
                    <div key={i} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <div className="flex justify-between mb-3">
                        <h4 className="font-medium text-slate-800 dark:text-slate-100">{proj.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(proj.status)}`}>{proj.status}</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${proj.completion}%` }}></div>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{proj.completion}% Complete</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'feedback' && (
              <motion.div key="feedback" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="p-6 space-y-6">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Recent Feedback</h3>
                <div className="grid gap-4">
                  {feedback.map((fb, i) => (
                    <div key={i} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <div className="flex justify-between mb-2 text-sm text-slate-600 dark:text-slate-400"><span>{fb.type}</span><div className="flex">{renderStars(fb.rating)}</div></div>
                      <p className="text-slate-700 dark:text-slate-300">{fb.content}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

/* ─────────────────────────────  small composables  ───────────────────────────── */
const InfoRow = ({ icon, label, value }) => {
  const icons = {
    mail:  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
    phone: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
  };
  return (
    <div className="flex gap-3">
      <svg className={`w-5 h-5 ${label === 'Email' ? 'text-blue-500' : 'text-green-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {icons[icon]}
      </svg>
      <div><p className="text-sm text-slate-500 dark:text-slate-400">{label}</p><p className="text-slate-700 dark:text-slate-300 font-medium">{value}</p></div>
    </div>
  );
};

const TabNav = ({ active, onChange }) => (
  <div className="border-b border-slate-200 dark:border-slate-700">
    <nav className="flex space-x-8 px-6">
      {['overview', 'projects', 'feedback'].map((id) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
            active === id
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300'
          }`}
        >
          {id.charAt(0).toUpperCase() + id.slice(1)}
        </button>
      ))}
    </nav>
  </div>
);
