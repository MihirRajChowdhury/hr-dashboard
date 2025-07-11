'use client';
import { UsersProvider }      from '@/context/UsersContext';
import { BookmarksProvider }  from '@/context/BookmarksContext';
import Navbar                 from '@/components/Navbar';
import { SessionProvider }   from 'next-auth/react'; 

/**
 * Wraps all client‑side providers so that the server layout
 * can stay a server component.
 *
 * @param {Array}  initial  – hydrated users fetched on the server
 * @param {Object} session  – session data from server
 */
export default function ProvidersClient({ initial = [], children, session }) {
  return (
    <SessionProvider session={session}>
      <UsersProvider initialUsers={initial}>
        {/* BookmarksProvider must be inside UsersProvider */}
        {/* This order allows users to be fetched before bookmarks */}
        <BookmarksProvider>
          <Navbar />
          {children}
        </BookmarksProvider>
      </UsersProvider>
    </SessionProvider>
  );
}