'use client';
import { UsersProvider }      from '@/context/UsersContext';
import { BookmarksProvider }  from '@/context/BookmarksContext';
import Navbar                 from '@/components/Navbar';

/**
 * Wraps all client‑side providers so that the server layout
 * can stay a server component.
 *
 * @param {Array}  initial  – hydrated users fetched on the server
 */
export default function ProvidersClient({ initial = [], children }) {
  return (
    <UsersProvider initialUsers={initial}>
      <BookmarksProvider>
        <Navbar />
        {children}
      </BookmarksProvider>
    </UsersProvider>
  );
}
