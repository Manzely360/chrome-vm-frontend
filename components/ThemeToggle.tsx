'use client';

import { SunIcon, MoonIcon } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useApp();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        <MoonIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      ) : (
        <SunIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      )}
    </button>
  );
}
