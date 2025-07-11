'use client';
import { useEffect, useState } from 'react';

export default function useDarkMode() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const root = window.document.documentElement;
    const storedTheme = localStorage.getItem('theme');
    const initialTheme = storedTheme || 'light';

    root.classList.remove('light', 'dark');
    root.classList.add(initialTheme);
    setTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    window.document.documentElement.classList.remove(theme);
    window.document.documentElement.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return [theme, toggleTheme];
}
