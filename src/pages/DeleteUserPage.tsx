import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getErrorMessage, userApi } from '@/api';

/**
 * Confirmation screen for `/deleteuser/:id`. The route is kept from the previous
 * version, but the delete now runs on an explicit click: the old page fired the
 * request on mount, so simply opening the URL destroyed the account.
 */
export function DeleteUserPage() {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);

    try {
      const { message } = await userApi.remove(id);

      toast.success(message || 'User deleted successfully');
      navigate('/users', { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to delete user'));
      setDeleting(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 560 }}>
      <div className="card shadow-sm p-4">
        <h1 className="h4 fw-bold mb-3">Delete this user?</h1>
        <p className="text-muted">
          User <code>{id}</code> will be permanently removed. This cannot be undone.
        </p>

        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => void handleDelete()}
            disabled={deleting}
          >
            {deleting ? 'Deleting…' : 'Delete user'}
          </button>
          <Link to="/users" className="btn btn-outline-secondary">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
