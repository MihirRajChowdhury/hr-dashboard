'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useDarkMode from '@/hooks/useDarkMode';

export default function Navbar() {
  const pathname = usePathname();
    const [theme, toggleTheme] = useDarkMode();

  return (
    <nav className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link 
            href="/" 
            className="text-2xl font-bold text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            HR Dashboard
          </Link>
           <button
        onClick={toggleTheme}
        className="border px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            <Link 
              href="/" 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                pathname === '/' 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/bookmarks" 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                pathname === '/bookmarks' 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Bookmarks
            </Link>
            <Link 
              href="/analytics" 
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                pathname === '/analytics' 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Analytics
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}