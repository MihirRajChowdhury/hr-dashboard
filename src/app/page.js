"use client"
import useFetchUsers from '@/hooks/useFetchUsers';
import UserCard from '@/components/UserCard';

export default function Home() {

  const { users, loading } = useFetchUsers();

  return (
    <main className="max-w-6xl mx-auto p-6">
      {loading && <p>Loading…</p>}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((u) => (
          <UserCard key={u.id} user={u} />
        ))}
      </div>
    </main>
  );
}
