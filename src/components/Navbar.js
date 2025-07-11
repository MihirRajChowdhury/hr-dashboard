'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useDarkMode from '@/hooks/useDarkMode';
import CreateUserForm from '@/components/CreateUserForm';
import UserMenu from '@/components/UserMenu';

export default function Navbar() {
  const pathname = usePathname();
  const [theme, toggleTheme] = useDarkMode();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Hide navbar on auth pages
  const authPages = ['/login', '/auth/signin', '/auth/signup', '/register'];
  const shouldHideNavbar = authPages.includes(pathname);

  // Don't render navbar on auth pages
  if (shouldHideNavbar) {
    return null;
  }

  return (
    <nav className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4">
        {/* Top Row: Logo + Right-side controls */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            HR Dashboard
          </Link>

          {/* Desktop Nav + Theme Toggle */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Navigation Links */}
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                pathname === '/'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Home
            </Link>
            <Link
              href="/bookmarks"
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                pathname === '/bookmarks'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Bookmarks
            </Link>
            <Link
              href="/analytics"
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                pathname === '/analytics'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Analytics
            </Link>
            <Link
              href="/feedback"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                pathname === '/feedback'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              Feedback
            </Link>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="border border-slate-300 dark:border-slate-600 px-3 py-1 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
            
            {/* Add Employee Button */}
            <button 
              onClick={() => setOpen(true)}
              className="border border-slate-300 dark:border-slate-600 px-3 py-1 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
            >
              ➕ Add Employee
            </button>
            
            <CreateUserForm open={open} onClose={() => setOpen(false)} />
            <UserMenu />
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="border border-slate-300 dark:border-slate-600 px-3 py-1 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button
              onClick={toggleMobileMenu}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md p-2"
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        <div className={`md:hidden mt-4 space-y-2 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          {['/', '/bookmarks', '/analytics', '/feedback'].map((path, i) => {
            const label = ['Home', 'Bookmarks', 'Analytics', 'Feedback'][i];
            const isActive = pathname === path;
            return (
              <Link
                key={path}
                href={path}
                className={`block w-full text-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-700'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {label}
              </Link>
            );
          })}
          
          {/* Mobile Add Employee Button */}
          <button 
            onClick={() => {
              setOpen(true);
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-center px-4 py-2 rounded-lg font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
          >
            ➕ Add Employee
          </button>
        </div>
      </div>
    </nav>
  );
}