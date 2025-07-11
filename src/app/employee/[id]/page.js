'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/users/${id}`);
        const data = await res.json();
        
        // Enhance user data with mock performance data
        const enhancedUser = {
          ...data,
          bio: generateMockBio(data.firstName, data.lastName),
          performanceRating: Math.floor(Math.random() * 5) + 1,
          performanceHistory: generatePerformanceHistory(),
          projects: generateMockProjects(),
          feedback: generateMockFeedback()
        };
        
        setUser(enhancedUser);
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };

    if (id) fetchUser();
  }, [id]);

  const generateMockBio = (firstName, lastName) => {
    const bios = [
      `${firstName} is a dedicated professional with over 5 years of experience in the industry. Known for exceptional problem-solving skills and team collaboration.`,
      `${firstName} brings innovative thinking and strong leadership qualities to every project. Passionate about continuous learning and professional development.`,
      `${firstName} is a results-driven individual with expertise in project management and strategic planning. Committed to delivering high-quality work consistently.`,
      `${firstName} excels in cross-functional collaboration and has a proven track record of exceeding performance targets. Values work-life balance and team success.`
    ];
    return bios[Math.floor(Math.random() * bios.length)];
  };

  const generatePerformanceHistory = () => {
    const quarters = ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'];
    return quarters.map(quarter => ({
      period: quarter,
      rating: Math.floor(Math.random() * 5) + 1,
      achievement: [
        'Exceeded sales targets by 15%',
        'Led successful product launch',
        'Improved team efficiency by 25%',
        'Completed certification program',
        'Mentored 3 junior employees',
        'Reduced project costs by 10%'
      ][Math.floor(Math.random() * 6)]
    }));
  };

  const generateMockProjects = () => {
    const projects = [
      { name: 'Digital Transformation Initiative', status: 'In Progress', completion: 75 },
      { name: 'Customer Experience Enhancement', status: 'Completed', completion: 100 },
      { name: 'Process Optimization Project', status: 'In Progress', completion: 45 },
      { name: 'Team Training Program', status: 'Planning', completion: 15 },
      { name: 'Quality Assurance Upgrade', status: 'Completed', completion: 100 }
    ];
    return projects.slice(0, Math.floor(Math.random() * 3) + 2);
  };

  const generateMockFeedback = () => {
    const feedback = [
      { type: 'Manager', content: 'Excellent leadership skills and consistently delivers high-quality work.', rating: 5 },
      { type: 'Peer', content: 'Great team player and always willing to help colleagues.', rating: 4 },
      { type: 'Direct Report', content: 'Supportive manager who provides clear guidance and feedback.', rating: 5 },
      { type: 'Client', content: 'Professional and responsive to our needs. Pleasure to work with.', rating: 4 }
    ];
    return feedback.slice(0, Math.floor(Math.random() * 2) + 2);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const getPerformanceBadge = (rating) => {
    const badges = {
      5: { color: 'bg-green-100 text-green-800', text: 'Outstanding' },
      4: { color: 'bg-blue-100 text-blue-800', text: 'Exceeds Expectations' },
      3: { color: 'bg-yellow-100 text-yellow-800', text: 'Meets Expectations' },
      2: { color: 'bg-orange-100 text-orange-800', text: 'Needs Improvement' },
      1: { color: 'bg-red-100 text-red-800', text: 'Below Expectations' }
    };
    return badges[rating] || badges[3];
  };

  const getStatusColor = (status) => {
    const colors = {
      'Completed': 'bg-green-100 text-green-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Planning': 'bg-yellow-100 text-yellow-800',
      'On Hold': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || colors['Planning'];
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400 font-medium">Loading employee details...</p>
        </div>
      </div>
    );
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    company,
    address,
    bio,
    performanceRating,
    performanceHistory,
    projects,
    feedback
  } = user;

  const performanceBadge = getPerformanceBadge(performanceRating);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <main className="max-w-6xl mx-auto p-6">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors duration-200 mb-6 group"
        >
          <svg className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </Link>

        {/* Employee Header */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
                <span className="text-white font-bold text-2xl">
                  {firstName?.[0]}{lastName?.[0]}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                  {firstName} {lastName}
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg mb-2">
                  {company?.department || 'No Department'}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {renderStars(performanceRating)}
                    <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">
                      ({performanceRating}/5)
                    </span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${performanceBadge.color}`}>
                    {performanceBadge.text}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            {bio}
          </p>
        </div>

        {/* Contact & Address Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Contact Information</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
                  <p className="text-slate-700 dark:text-slate-300 font-medium">{email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Phone</p>
                  <p className="text-slate-700 dark:text-slate-300 font-medium">{phone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Address</h2>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-purple-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                  {address?.address}<br />
                  {address?.city}, {address?.state}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
          <div className="border-b border-slate-200 dark:border-slate-700">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'projects', label: 'Projects' },
                { id: 'feedback', label: 'Feedback' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Performance History</h3>
                  <div className="grid gap-4">
                    {performanceHistory.map((period, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                        <div>
                          <p className="font-medium text-slate-800 dark:text-slate-100">{period.period}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{period.achievement}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {renderStars(period.rating)}
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getPerformanceBadge(period.rating).color}`}>
                            {period.rating}/5
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Current Projects</h3>
                <div className="grid gap-4">
                  {projects.map((project, index) => (
                    <div key={index} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-slate-800 dark:text-slate-100">{project.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.completion}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{project.completion}% Complete</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'feedback' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Recent Feedback</h3>
                <div className="grid gap-4">
                  {feedback.map((item, index) => (
                    <div key={index} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{item.type}</span>
                        <div className="flex items-center">
                          {renderStars(item.rating)}
                        </div>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300">{item.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Promote Employee
            </button>
            <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Assign to Project
            </button>
            <button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Schedule Review
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeDetails;