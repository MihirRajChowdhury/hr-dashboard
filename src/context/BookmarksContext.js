'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const Ctx = createContext();
export const useBookmarks = () => useContext(Ctx);

export function BookmarksProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);

  /* hydrate from localStorage once */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setBookmarks(saved);
  }, []);

  /* persist */
  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggle = (user) =>
    setBookmarks((prev) =>
      prev.find((u) => u.id === user.id)
        ? prev.filter((u) => u.id !== user.id)
        : [...prev, user]
    );

  return (
    <Ctx.Provider value={{ bookmarks, toggle }}>
      {children}
    </Ctx.Provider>
  );
}
