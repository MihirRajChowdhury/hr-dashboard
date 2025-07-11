import './globals.css';   // must stay here

import { BookmarksProvider } from '@/context/BookmarksContext';
import Navbar from '@/components/Navbar';

export const metadata = { title: 'HR Dashboard' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <BookmarksProvider>
          <Navbar />
          {children}
        </BookmarksProvider>
      </body>
    </html>
  );
}
