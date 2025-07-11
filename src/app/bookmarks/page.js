'use client';
import { useBookmarks } from '@/context/BookmarksContext';
import UserCard from '@/components/UserCard';

export default function BookmarksPage() {
  const { bookmarks } = useBookmarks();

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Bookmarked Employees</h1>

      {bookmarks.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bookmarks.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </main>
  );
}
