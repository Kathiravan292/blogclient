import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { getErrorMessage, userApi } from '@/api';
import { StatusMessage } from '@/components/ui/StatusMessage';
import { useFetch } from '@/hooks/useFetch';
import { UserRole, type User } from '@/types';

export function UsersPage() {
  const fetchUsers = useCallback(() => userApi.getAll(), []);
  const { data: users, loading, error, refetch } = useFetch(fetchUsers, []);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Only non-privileged accounts are listed, matching the previous table.
  const listedUsers = users?.filter((user) => user.role === UserRole.USER) ?? [];

  const handleDelete = async (user: User) => {
    if (!window.confirm(`Delete ${user.userName}? This cannot be undone.`)) {
      return;
    }

    setDeletingId(user._id);

    try {
      const { message } = await userApi.remove(user._id);

      toast.success(message || 'User deleted successfully');
      // Reload from the server rather than patching local state, so the table cannot
      // drift from what the API actually holds.
      await refetch();
    } catch (deleteError) {
      toast.error(getErrorMessage(deleteError, 'Failed to delete user'));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="container py-4">
      <h1 className="h3 fw-bold mb-4">Users</h1>

      <StatusMessage
        loading={loading}
        error={error}
        empty={!loading && !error && listedUsers.length === 0}
        loadingText="Loading users…"
        emptyText="No users found."
      />

      {listedUsers.length > 0 && (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Phone number</th>
                <th scope="col" className="text-end">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {listedUsers.map((user) => (
                <tr key={user._id}>
                  <th scope="row" className="fw-normal text-muted">
                    {user._id}
                  </th>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td className="text-end">
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => void handleDelete(user)}
                      disabled={deletingId === user._id}
                    >
                      {deletingId === user._id ? 'Deleting…' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
