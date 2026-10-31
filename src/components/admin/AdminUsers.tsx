import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Search,
  Plus,
  Shield,
  CheckCircle,
  XCircle,
  X,
  UserPlus,
} from 'lucide-react';
import { UserRole } from '../../types';

export const AdminUsers: React.FC = () => {
  const {
    users,
    addUser,
    updateUserRole,
    toggleUserStatus,
    currentUser,
  } = useApp();

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  // New user form state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('trainee');
  const [newDept, setNewDept] = useState('Computer Engineering');

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    addUser({
      name: newName.trim(),
      email: newEmail.trim().toLowerCase(),
      role: newRole,
      department: newDept.trim(),
      status: 'active',
    });

    setIsAddUserOpen(false);
    setNewName('');
    setNewEmail('');
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            User Management & Role Authorization
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Administer institutional accounts, assign RBAC permissions, and manage user statuses.
          </p>
        </div>

        <button
          onClick={() => setIsAddUserOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium cursor-pointer"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Add User</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by user name or email..."
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-md text-xs bg-white focus:outline-hidden"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as 'all' | UserRole)}
          className="border border-slate-200 rounded-md px-3 py-2 text-xs bg-white text-slate-700 w-full sm:w-auto focus:outline-hidden"
        >
          <option value="all">All Roles</option>
          <option value="admin">Administrators</option>
          <option value="trainer">Faculty Trainers</option>
          <option value="trainee">Student Trainees</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="border border-slate-200 rounded-lg overflow-x-auto bg-white shadow-xs">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
            <tr>
              <th className="p-3">User Details</th>
              <th className="p-3">Department</th>
              <th className="p-3">Assigned Role</th>
              <th className="p-3">Account Status</th>
              <th className="p-3">Registered</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/50">
                <td className="p-3">
                  <span className="font-semibold text-slate-900 block">
                    {user.name}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {user.email}
                  </span>
                </td>
                <td className="p-3 text-slate-600 max-w-[160px] truncate">
                  {user.department || 'General'}
                </td>
                <td className="p-3">
                  <select
                    value={user.role}
                    disabled={user.id === currentUser?.id}
                    onChange={(e) =>
                      updateUserRole(user.id, e.target.value as UserRole)
                    }
                    className="border border-slate-200 rounded px-2 py-1 text-xs bg-white font-medium text-slate-800 focus:outline-hidden disabled:opacity-50"
                  >
                    <option value="trainee">Trainee</option>
                    <option value="trainer">Trainer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-3">
                  <button
                    disabled={user.id === currentUser?.id}
                    onClick={() => toggleUserStatus(user.id)}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium cursor-pointer disabled:opacity-50 ${
                      user.status === 'active'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {user.status === 'active' ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : (
                      <XCircle className="w-3 h-3" />
                    )}
                    <span className="capitalize">{user.status}</span>
                  </button>
                </td>
                <td className="p-3 font-mono text-[11px] text-slate-400">
                  {user.createdAt.split('T')[0]}
                </td>
                <td className="p-3 text-right">
                  {user.id !== currentUser?.id && (
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      className="text-xs text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
                    >
                      {user.status === 'active' ? 'Suspend' : 'Activate'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-semibold text-slate-900 text-sm">
                Add New Institutional User
              </h3>
              <button
                onClick={() => setIsAddUserOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-medium text-slate-700 block">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Harish Mehta"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md"
                />
              </div>

              <div className="space-y-1">
                <label className="font-medium text-slate-700 block">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="harish.m@capacityconnect.edu"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-medium text-slate-700 block">Role Assignment</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as UserRole)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md bg-white text-slate-700"
                  >
                    <option value="trainee">Student Trainee</option>
                    <option value="trainer">Faculty Trainer</option>
                    <option value="admin">Institutional Admin</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-slate-700 block">Department</label>
                  <input
                    type="text"
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(false)}
                  className="px-3 py-1.5 border border-slate-300 text-slate-700 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-slate-900 text-white rounded font-medium"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
