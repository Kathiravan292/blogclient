import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { blogApi, getErrorMessage } from '@/api';
import { StatusMessage } from '@/components/ui/StatusMessage';
import { useAuth } from '@/hooks/useAuth';
import { useFetch } from '@/hooks/useFetch';
import { UserRole } from '@/types';

const PLACEHOLDER_IMAGE = 'https://placehold.co/800x400?text=No+Image';

export function SingleBlogPage() {
  const { id = '' } = useParams<{ id: string }>();
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  const fetchBlog = useCallback(() => blogApi.getById(id), [id]);
  const { data: blog, loading, error } = useFetch(fetchBlog, [id]);

  const isAuthor = Boolean(blog && user && user._id === blog.user.id);
  const canDelete = isAuthor || role === UserRole.ADMIN;

  const handleDelete = async () => {
    if (!blog || !window.confirm('Are you sure you want to delete this blog?')) {
      return;
    }

    setDeleting(true);

    try {
      await blogApi.remove(blog._id);

      toast.success('Blog deleted successfully!');
      navigate('/');
    } catch (deleteError) {
      toast.error(getErrorMessage(deleteError, 'Failed to delete blog'));
    } finally {
      setDeleting(false);
    }
  };

  if (loading || error || !blog) {
    return (
      <div className="container py-4">
        <StatusMessage
          loading={loading}
          error={error}
          empty={!loading && !error}
          loadingText="Loading blog…"
          emptyText="No blog found!"
        />
      </div>
    );
  }

  return (
    <article className="container py-4 text-center">
      <img
        src={blog.image || PLACEHOLDER_IMAGE}
        alt={blog.title}
        className="img-fluid rounded shadow mb-4"
        style={{ maxHeight: 400, objectFit: 'cover', width: '100%' }}
      />

      <h1 className="h3 fw-bold mb-2">{blog.title}</h1>
      <p className="h5 text-primary mb-3">{blog.topic}</p>
      <p className="text-muted">
        Posted by {blog.user.name || 'Unknown author'} on{' '}
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>

      <p className="lead text-start" style={{ whiteSpace: 'pre-wrap' }}>
        {blog.content}
      </p>

      <div className="mt-4 d-flex gap-2 justify-content-center">
        {isAuthor && (
          <button
            type="button"
            className="btn btn-primary px-4"
            onClick={() => navigate(`/editblog/${blog._id}`)}
          >
            ✏ Edit Blog
          </button>
        )}

        {canDelete && (
          <button
            type="button"
            onClick={handleDelete}
            className="btn btn-danger px-4"
            disabled={deleting}
          >
            {deleting ? 'Deleting…' : '🗑 Delete Blog'}
          </button>
        )}
      </div>
    </article>
  );
}
