// src/app/analytics/page.js
'use client';
import { useEffect, useState } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

export default function AnalyticsPage() {
  /* ---- state ---- */
  const [departmentData, setDepartmentData] = useState({});
  const [bookmarkData, setBookmarkData] = useState({});
  const [trendData, setTrendData] = useState({});
  const [stats, setStats] = useState({
    totalEmployees: 0,
    avgRating: 0,
    totalBookmarks: 0,
    topDepartment: '',
  });
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  /* ---- data fetch (unchanged) ---- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://dummyjson.com/users?limit=30');
        const data = await res.json();

        const seeded = (s) => ((Math.sin(s) * 10000) % 1) * 5 + 1;
        const users = data.users.map((u) => ({
          ...u,
          rating: Math.floor(seeded(u.id)),
          department: u.company?.department || 'General',
        }));

        const deptMap = {};
        users.forEach((u) => {
          if (!deptMap[u.department]) deptMap[u.department] = [];
          deptMap[u.department].push(u.rating);
        });

        const deptLabels = Object.keys(deptMap);
        const avgRatings = deptLabels.map((d) => {
          const arr = deptMap[d];
          return (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2);
        });

        const gradients = [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 101, 101, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(20, 184, 166, 0.8)',
          'rgba(251, 146, 60, 0.8)',
        ];

        setDepartmentData({
          labels: deptLabels,
          datasets: [
            {
              label: 'Average Performance Rating',
              data: avgRatings,
              backgroundColor: gradients.slice(0, deptLabels.length),
              borderColor: gradients.slice(0, deptLabels.length).map((c) => c.replace('0.8', '1')),
              borderWidth: 2,
              borderRadius: 8,
              borderSkipped: false,
            },
          ],
        });

        const weekly = [3, 7, 5, 9];
        setBookmarkData({
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [
            {
              label: 'Bookmarked Employees',
              data: weekly,
              backgroundColor: [
                'rgba(251, 191, 36, 0.8)',
                'rgba(34, 197, 94, 0.8)',
                'rgba(239, 68, 68, 0.8)',
                'rgba(59, 130, 246, 0.8)',
              ],
              borderColor: [
                'rgb(251, 191, 36)',
                'rgb(34, 197, 94)',
                'rgb(239, 68, 68)',
                'rgb(59, 130, 246)',
              ],
              borderWidth: 2,
              hoverOffset: 4,
            },
          ],
        });

        const monthly = [3, 7, 5, 9, 12, 8, 15, 18];
        setTrendData({
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
          datasets: [
            {
              label: 'Bookmark Trends',
              data: monthly,
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              fill: true,
              tension: 0.4,
              pointBackgroundColor: 'rgb(59, 130, 246)',
              pointBorderColor: 'white',
              pointBorderWidth: 2,
              pointRadius: 6,
            },
          ],
        });

        const totalRating = users.reduce((s, u) => s + u.rating, 0);
        const avgRating = (totalRating / users.length).toFixed(1);
        const topDept = deptLabels.reduce((a, b) =>
          parseFloat(avgRatings[deptLabels.indexOf(a)]) >
          parseFloat(avgRatings[deptLabels.indexOf(b)])
            ? a
            : b
        );

        setStats({
          totalEmployees: users.length,
          avgRating,
          totalBookmarks: monthly.reduce((a, b) => a + b, 0),
          topDepartment: topDept,
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mounted]);

  /* ---- chart options (unchanged) ---- */
  const darkTicks = {
    color: () => (document.documentElement.classList.contains('dark') ? '#cbd5e1' : 'rgba(0,0,0,0.6)'),
    font: { size: 11 },
  };
  const gridCol = () =>
    document.documentElement.classList.contains('dark') ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top', labels: { usePointStyle: true, padding: 20, font: { size: 12, weight: 'bold' } } } },
    scales: { y: { beginAtZero: true, grid: { color: gridCol, drawBorder: false }, ticks: darkTicks }, x: { grid: { display: false }, ticks: darkTicks } },
  };
  const doughnutOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20, font: { size: 12, weight: 'bold' } } } }, cutout: '60%' };
  const lineOptions = { ...chartOptions };

  if (!mounted || loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
        <div className="text-center">
          <div className="animate-spin h-16 w-16 border-b-2 border-blue-600 rounded-full mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300 text-lg">Loading analytics…</p>
        </div>
      </main>
    );
  }

  /* ---- UI with motion ---- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="p-2 bg-blue-600 rounded-lg">📊</span>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Comprehensive insights into employee performance
          </p>
        </header>

        {/* stats cards */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            { label: 'Total Employees', value: stats.totalEmployees, emoji: '👥', bg: 'bg-blue-100', col: 'text-blue-600' },
            { label: 'Average Rating', value: stats.avgRating, emoji: '📈', bg: 'bg-green-100', col: 'text-green-600' },
            { label: 'Total Bookmarks', value: stats.totalBookmarks, emoji: '🔖', bg: 'bg-yellow-100', col: 'text-yellow-600' },
            { label: 'Top Department', value: stats.topDepartment, emoji: '🏆', bg: 'bg-purple-100', col: 'text-purple-600', small: true },
          ].map((card) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-all"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{card.label}</p>
                  <p className={`font-bold text-gray-900 dark:text-gray-100 ${card.small ? 'text-lg truncate' : 'text-3xl'}`}>{card.value}</p>
                </div>
                <div className={`p-3 ${card.bg} rounded-full`}>
                  <span className={`${card.col} text-xl`}>{card.emoji}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* charts grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        >
          {/* bar */}
          <section className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-slate-700">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              📊 Department Performance
            </h2>
            <div className="h-80">
              {departmentData.labels ? <Bar data={departmentData} options={chartOptions} /> : null}
            </div>
          </section>

          {/* doughnut */}
          <section className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-slate-700">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              🔖 Bookmark Distribution
            </h2>
            <div className="h-80">
              {bookmarkData.labels ? <Doughnut data={bookmarkData} options={doughnutOptions} /> : null}
            </div>
          </section>
        </motion.div>

        {/* line */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-slate-700"
        >
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            📈 Bookmark Trends Over Time
          </h2>
          <div className="h-80">
            {trendData.labels ? <Line data={trendData} options={lineOptions} /> : null}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
