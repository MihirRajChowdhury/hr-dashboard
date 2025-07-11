'use client';

import { useState, useEffect, useMemo, useRef } from 'react';

const SearchFilterBar = ({ users, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepts, setSelectedDepts] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [showDeptDropdown, setShowDeptDropdown] = useState(false);
  const [showRatingDropdown, setShowRatingDropdown] = useState(false);

  const deptDropdownRef = useRef(null);
  const ratingDropdownRef = useRef(null);

  /* unique departments from user data */
  const departments = useMemo(() => {
    const unique = [...new Set(users.map(u => u.company?.department).filter(Boolean))];
    return unique.sort();
  }, [users]);

  /* deterministic “rating” based on id (same as before) */
  const generateRating = (id = 0) =>
    Math.floor(((id * 9301 + 49297) % 233280) / 233280 * 5) + 1;

  const ratings = [1, 2, 3, 4, 5];

  /* close dropdowns when clicking outside */
  useEffect(() => {
    const handleClick = (e) => {
      if (deptDropdownRef.current && !deptDropdownRef.current.contains(e.target))
        setShowDeptDropdown(false);
      if (ratingDropdownRef.current && !ratingDropdownRef.current.contains(e.target))
        setShowRatingDropdown(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  /* filter logic */
  useEffect(() => {
    const filtered = users.filter(user => {
      const name = `${user.firstName} ${user.lastName}`.toLowerCase();
      const email = user.email.toLowerCase();
      const dept  = user.company?.department?.toLowerCase() || '';
      const rating = generateRating(user.id);

      const matchesSearch =
        !searchTerm ||
        name.includes(searchTerm.toLowerCase()) ||
        email.includes(searchTerm.toLowerCase()) ||
        dept.includes(searchTerm.toLowerCase());

      const matchesDept =
        selectedDepts.length === 0 || selectedDepts.includes(user.company?.department);

      const matchesRating =
        selectedRatings.length === 0 || selectedRatings.includes(rating);

      return matchesSearch && matchesDept && matchesRating;
    });

    onFilter(filtered);
  }, [searchTerm, selectedDepts, selectedRatings, users, onFilter]);

  /* toggle helpers */
  const toggleDept   = (d) => setSelectedDepts(p => p.includes(d) ? p.filter(x => x !== d) : [...p, d]);
  const toggleRating = (r) => setSelectedRatings(p => p.includes(r) ? p.filter(x => x !== r) : [...p, r]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDepts([]);
    setSelectedRatings([]);
    setShowDeptDropdown(false);
    setShowRatingDropdown(false);
  };

  const hasActiveFilters =
    searchTerm || selectedDepts.length || selectedRatings.length;

  /* ────────────────────────────────────────────────────────── */
  return (
    <div className="mb-6 bg-white dark:bg-slate-800 shadow-lg rounded-lg border border-gray-200 dark:border-slate-700">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-600 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-800">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Search & Filter Users
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          Find users by name, email, department, or rating
        </p>
      </div>

      {/* Search */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-600">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search by name, email, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Department filter */}
          <div className="relative" ref={deptDropdownRef}>
            <button
              onClick={() => setShowDeptDropdown(!showDeptDropdown)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                selectedDepts.length
                  ? 'bg-blue-100 border-blue-300 text-blue-700 dark:bg-blue-900 dark:border-blue-600 dark:text-blue-200'
                  : 'bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
              }`}
            >
              {/* icon */}
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16"/>
              </svg>
              Department
              {selectedDepts.length > 0 && (
                <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {selectedDepts.length}
                </span>
              )}
              <svg className={`h-4 w-4 transform transition-transform ${showDeptDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            {showDeptDropdown && (
              <div className="absolute top-full left-0 mt-1 w-64 max-h-60 overflow-y-auto bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg shadow-lg z-10">
                <div className="p-2">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wide mb-2 px-2">
                    Select Departments ({departments.length})
                  </p>
                  {departments.length === 0 && (
                    <p className="px-2 py-2 text-sm text-gray-500 dark:text-gray-400">
                      No departments available
                    </p>
                  )}
                  {departments.map((dept) => (
                    <label key={dept} className="flex items-center gap-2 px-2 py-2 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700">
                      <input
                        type="checkbox"
                        checked={selectedDepts.includes(dept)}
                        onChange={() => toggleDept(dept)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-200">{dept}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Rating filter */}
          <div className="relative" ref={ratingDropdownRef}>
            <button
              onClick={() => setShowRatingDropdown(!showRatingDropdown)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                selectedRatings.length
                  ? 'bg-green-100 border-green-300 text-green-700 dark:bg-green-900 dark:border-green-600 dark:text-green-200'
                  : 'bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
              }`}
            >
              {/* icon */}
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927l1.519 4.674a1 1 0 00.95.69h4.915l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888 1.518-4.674a1 1 0 00-.363-1.118L4.567 8.291h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
              </svg>
              Rating
              {selectedRatings.length > 0 && (
                <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {selectedRatings.length}
                </span>
              )}
              <svg className={`h-4 w-4 transform transition-transform ${showRatingDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            {showRatingDropdown && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg shadow-lg z-10">
                <div className="p-2">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wide mb-2 px-2">
                    Select Ratings
                  </p>
                  {ratings.map((rate) => (
                    <label key={rate} className="flex items-center gap-2 px-2 py-2 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700">
                      <input
                        type="checkbox"
                        checked={selectedRatings.includes(rate)}
                        onChange={() => toggleRating(rate)}
                        className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                      />
                      <span className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-200">
                        {rate}
                        <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* clear filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              </svg>
              Clear Filters
            </button>
          )}
        </div>

        {/* active filters chips */}
        {hasActiveFilters && (
          <div className="mt-4 p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Active Filters:
            </p>
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                  Search: “{searchTerm}”
                  <button onClick={() => setSearchTerm('')} className="hover:text-blue-600 dark:hover:text-blue-400">
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </span>
              )}
              {selectedDepts.map((dept) => (
                <span key={dept} className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded-full">
                  {dept}
                  <button onClick={() => toggleDept(dept)} className="hover:text-purple-600 dark:hover:text-purple-400">
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </span>
              ))}
              {selectedRatings.map((rating) => (
                <span key={rating} className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full">
                  {rating}★
                  <button onClick={() => toggleRating(rating)} className="hover:text-green-600 dark:hover:text-green-400">
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilterBar;
