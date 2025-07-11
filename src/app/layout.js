import './globals.css';   // must stay here

import { BookmarksProvider } from '@/context/BookmarksContext';
import Navbar from '@/components/Navbar';

export const metadata = { title: 'HR Dashboard' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <BookmarksProvider>
          <Navbar />
          {children}
        </BookmarksProvider>
      </body>
    </html>
  );
}
