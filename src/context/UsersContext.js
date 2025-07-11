// ─────────────────────────────────────────────────────────────
// src/context/UsersContext.js
'use client';
import { createContext, useContext, useState } from 'react';

const UsersCtx = createContext();
export const useUsers = () => useContext(UsersCtx);

/**
 * Wrap _after_ BookmarksProvider in layout.js
 */
export function UsersProvider({ children, initialUsers = [] }) {
  const [users, setUsers] = useState(initialUsers);

  const addUser = (user) => setUsers((prev) => [{ ...user, id: Date.now() }, ...prev]);

  return <UsersCtx.Provider value={{ users, addUser }}>{children}</UsersCtx.Provider>;
}
