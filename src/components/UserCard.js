'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaStar, FaRegStar, FaBookmark, FaRegBookmark, FaEye, FaArrowTrendUp } from 'react-icons/fa6';
import { useBookmarks } from '@/context/BookmarksContext';

export default function UserCard({ user }) {
  const [rating, setRating] = useState(0);
  const { toggle, bookmarks } = useBookmarks();

  useEffect(() => setRating(Math.floor(Math.random() * 5) + 1), []);
  const saved = bookmarks.some((u) => u.id === user.id);

  // Performance color based on rating
  const getPerformanceColor = (rating) => {
    if (rating >= 4) return 'text-emerald-500';
    if (rating >= 3) return 'text-amber-500';
    return 'text-red-500';
  };

  const getPerformanceBg = (rating) => {
    if (rating >= 4) return 'bg-emerald-50 dark:bg-emerald-900/20';
    if (rating >= 3) return 'bg-amber-50 dark:bg-amber-900/20';
    return 'bg-red-50 dark:bg-red-900/20';
  };

  return (
    <div className="group relative overflow-hidden bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl border border-gray-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-600">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative p-6">
        {/* Header with avatar and basic info */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <img
              src={user.image}
              alt={user.firstName}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-100 dark:ring-blue-900/50 group-hover:ring-blue-300 dark:group-hover:ring-blue-700 transition-all duration-300"
            />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-slate-800 animate-pulse" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 truncate">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
              {user.email}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                {user.age} yrs
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                {user.company.department}
              </span>
            </div>
          </div>
        </div>

        {/* Performance Rating */}
        <div className={`rounded-xl p-3 mb-4 ${getPerformanceBg(rating)} border border-gray-100 dark:border-slate-600`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Performance
            </span>
            <FaArrowTrendUp className={`w-4 h-4 ${getPerformanceColor(rating)}`} />
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="transition-transform duration-200 hover:scale-110">
                {i < rating ? (
                  <FaStar className={`w-4 h-4 ${getPerformanceColor(rating)}`} />
                ) : (
                  <FaRegStar className="w-4 h-4 text-gray-300 dark:text-gray-600" />
                )}
              </div>
            ))}
            <span className={`ml-2 text-sm font-bold ${getPerformanceColor(rating)}`}>
              {rating}.0
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link
            href={`/employee/${user.id}`}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:-translate-y-0.5"
          >
            <FaEye className="w-4 h-4" />
            View Profile
          </Link>
          
          <button
            onClick={() => toggle(user)}
            className={`
              inline-flex items-center justify-center gap-2 px-4 py-2.5 font-medium rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg
              ${saved
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-emerald-500/25 hover:shadow-emerald-500/40'
                : 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 dark:from-slate-700 dark:to-slate-600 dark:hover:from-slate-600 dark:hover:to-slate-500 dark:text-gray-200 shadow-gray-500/25 dark:shadow-slate-500/25'
              }
            `}
          >
            {saved ? (
              <>
                <FaBookmark className="w-4 h-4" />
                Saved
              </>
            ) : (
              <>
                <FaRegBookmark className="w-4 h-4" />
                Save
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}