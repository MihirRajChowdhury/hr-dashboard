
'use client';
import { useEffect } from 'react';

export default function Modal({ open, onClose, children }) {
  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}



// ─────────────────────────────────────────────────────────────
// Integration hints (no code execution here):
/*
  1. Wrap <UsersProvider> around your <BookmarksProvider> in layout.js:

    <UsersProvider>
      <BookmarksProvider>
        <Navbar />
        {children}
      </BookmarksProvider>
    </UsersProvider>

  2. In Navbar.jsx add state to manage modal open:

    import { useState } from 'react';
    import CreateUserForm from '@/components/CreateUserForm';

    const [open, setOpen] = useState(false);

    <button onClick={() => setOpen(true)} ...>➕ Add Employee</button>
    <CreateUserForm open={open} onClose={() => setOpen(false)} />

  3. In Home page replace useFetchUsers with useUsers:

    const { users } = useUsers();

  4. Pass initial fetched users to UsersProvider in layout:

    const { users, loading } = useFetchUsers();
    if (loading) return null; // skeleton
    return (
      <UsersProvider initialUsers={users}>
        ...
      </UsersProvider>
    );
*/
