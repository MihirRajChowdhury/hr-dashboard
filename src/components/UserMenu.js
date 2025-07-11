// src/components/UserMenu.jsx
'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function UserMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  // Hide completely if not authenticated
  if (!session) return null;

  const { name, email } = session.user ?? {};

  return (
    <div className="relative">
      {/* Avatar / trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition"
      >
        {/* Simple initial avatar */}
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white text-sm font-semibold">
          {name?.[0] || email?.[0]}
        </div>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
          {name || email}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 z-50"
          onMouseLeave={() => setOpen(false)}
        >
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-b-lg"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
