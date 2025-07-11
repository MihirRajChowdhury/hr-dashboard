"use client"
import useFetchUsers from '@/hooks/useFetchUsers';
import UserCard from '@/components/UserCard';
import SearchFilterBar from '@/components/SearchFilterBar';
import { useState, useEffect, useCallback } from 'react';

export default function Home() {
  const { users, loading } = useFetchUsers();
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Initialize filteredUsers when users data is loaded
  useEffect(() => {
    if (users.length > 0) {
      setFilteredUsers(users);
    }
  }, [users]);

  // Memoize the filter handler to prevent unnecessary re-renders
  const handleFilter = useCallback((filtered) => {
    console.log('Filtering applied:', filtered.length, 'users');
    setFilteredUsers(filtered);
  }, []);

  // Debug logging
  useEffect(() => {
    console.log('Users loaded:', users.length);
    console.log('Filtered users:', filteredUsers.length);
    if (users.length > 0) {
      console.log('Sample user:', users[0]);
    }
  }, [users, filteredUsers]);

  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Employee Directory</h1>
        <p className="text-gray-600">
          {loading ? 'Loading employees...' : `${filteredUsers.length} of ${users.length} employees`}
        </p>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {!loading && users.length > 0 && (
        <>
          <SearchFilterBar
            users={users}
            onFilter={handleFilter}
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>

          {filteredUsers.length === 0 && users.length > 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No employees found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </>
      )}

      {!loading && users.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">👥</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No employees available</h3>
          <p className="text-gray-500">Please check your data source</p>
        </div>
      )}
    </main>
  );
}