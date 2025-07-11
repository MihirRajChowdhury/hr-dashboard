'use client';
import { useState } from 'react';
import { useBookmarks } from '@/context/BookmarksContext';
import UserCard from '@/components/UserCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function BookmarksPage() {
  const { bookmarks, removeBookmark } = useBookmarks();
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [promotionData, setPromotionData] = useState({
    currentPosition: '',
    newPosition: '',
    department: '',
    effectiveDate: ''
  });
  const [assignmentData, setAssignmentData] = useState({
    projectName: '',
    role: '',
    startDate: '',
    duration: '',
    priority: 'medium'
  });

  const handleRemoveBookmark = (userId) => {
    removeBookmark(userId);
  };

  const handlePromote = (user) => {
    setSelectedUser(user);
    setPromotionData({
      currentPosition: user.position || '',
      newPosition: '',
      department: user.department || '',
      effectiveDate: ''
    });
    setShowPromoteModal(true);
  };

  const handleAssignToProject = (user) => {
    setSelectedUser(user);
    setAssignmentData({
      projectName: '',
      role: '',
      startDate: '',
      duration: '',
      priority: 'medium'
    });
    setShowAssignModal(true);
  };

  const handlePromoteSubmit = (e) => {
    e.preventDefault();
    alert(`${selectedUser.name} has been promoted from ${promotionData.currentPosition} to ${promotionData.newPosition}!`);
    setShowPromoteModal(false);
    setSelectedUser(null);
  };

  const handleAssignSubmit = (e) => {
    e.preventDefault();
    alert(`${selectedUser.name} has been assigned to ${assignmentData.projectName} as ${assignmentData.role}!`);
    setShowAssignModal(false);
    setSelectedUser(null);
  };

  const closeModal = () => {
    setShowPromoteModal(false);
    setShowAssignModal(false);
    setSelectedUser(null);
  };

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Bookmarked Employees</h1>

      {bookmarks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No bookmarks yet.</p>
          <p className="text-gray-400 text-sm mt-2">Start bookmarking employees to manage them here.</p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <p className="text-gray-600">
              {bookmarks.length} bookmarked employee{bookmarks.length !== 1 ? 's' : ''}
            </p>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
              {bookmarks.map((user) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <UserCard user={user} />

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handlePromote(user)}
                      className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium"
                    >
                      Add Promotion Details
                    </button>
                    <button
                      onClick={() => handleAssignToProject(user)}
                      className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                    >
                      Assign to Project
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </>
      )}

      {/* Promote Modal */}
      {showPromoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Promote Employee</h2>
            <form onSubmit={handlePromoteSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee Name
                </label>
                <input
                  type="text"
                  value={selectedUser?.firstName + " " + selectedUser?.lastName || ''}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Position
                </label>
                <input
                  type="text"
                  value={promotionData.currentPosition}
                  onChange={(e) => setPromotionData({ ...promotionData, currentPosition: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Current position"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Position *
                </label>
                <input
                  type="text"
                  value={promotionData.newPosition}
                  onChange={(e) => setPromotionData({ ...promotionData, newPosition: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="New position"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <input
                  type="text"
                  value={promotionData.department}
                  onChange={(e) => setPromotionData({ ...promotionData, department: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Department"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Effective Date *
                </label>
                <input
                  type="date"
                  value={promotionData.effectiveDate}
                  onChange={(e) => setPromotionData({ ...promotionData, effectiveDate: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Promote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign to Project Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Assign to Project</h2>
            <form onSubmit={handleAssignSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee Name
                </label>
                <input
                  type="text"
                  value={selectedUser?.firstName + " " + selectedUser?.lastName || ''}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  value={assignmentData.projectName}
                  onChange={(e) => setAssignmentData({ ...assignmentData, projectName: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Project name"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role *
                </label>
                <input
                  type="text"
                  value={assignmentData.role}
                  onChange={(e) => setAssignmentData({ ...assignmentData, role: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Role in project"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  value={assignmentData.startDate}
                  onChange={(e) => setAssignmentData({ ...assignmentData, startDate: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  value={assignmentData.duration}
                  onChange={(e) => setAssignmentData({ ...assignmentData, duration: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., 6 months, 1 year"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  value={assignmentData.priority}
                  onChange={(e) => setAssignmentData({ ...assignmentData, priority: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Assign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
