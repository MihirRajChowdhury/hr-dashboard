'use client';
import { useState } from 'react';
import { useUsers } from '@/context/UsersContext';
import Modal from './Modal';

export default function CreateUserForm({ open, onClose }) {
  const { addUser } = useUsers();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', department: '', rating: 3 });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = 'Required';
    if (!form.lastName.trim()) errs.lastName = 'Required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email';
    if (!form.department.trim()) errs.department = 'Required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) return setErrors(v);
    addUser(form);
    onClose();
  };

  const handle = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Create New Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['firstName', 'lastName', 'email', 'department'].map((field) => (
          <div key={field}>
            <input
              type={field === 'email' ? 'email' : 'text'}
              placeholder={field.replace(/([A-Z])/, ' $1')}
              value={form[field]}
              onChange={handle(field)}
              className={`w-full px-3 py-2 rounded border ${
    '{'
  }errors[field] ? 'border-red-500' : 'border-gray-300 dark:border-slate-600'{'}'} bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-100`}
            />
            {errors[field] && <p className="text-sm text-red-500 mt-1">{errors[field]}</p>}
          </div>
        ))}
        <div>
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Rating</label>
          <select
            value={form.rating}
            onChange={handle('rating')}
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-100"
          >
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-200">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
            Add
          </button>
        </div>
      </form>
    </Modal>
  );
}