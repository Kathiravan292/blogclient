import { useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { blogApi } from '@/api';
import { StatusMessage } from '@/components/ui/StatusMessage';
import { useAuth } from '@/hooks/useAuth';
import { useFetch } from '@/hooks/useFetch';
import type { Blog } from '@/types';

export function BlogsByTopicPage() {
  const { topic = '' } = useParams<{ topic: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchBlogs = useCallback(() => blogApi.getByTopic(topic), [topic]);
  const { data: blogs, loading, error } = useFetch(fetchBlogs, [topic]);

  return (
    <div className="container py-4">
      <h1 className="h3 fw-bold mb-4">Blogs on “{topic}”</h1>

      <StatusMessage
        loading={loading}
        // The API answers 404 for a topic with no posts, so that reads as "empty"
        // rather than as a failure the visitor needs to act on.
        error={null}
        empty={!loading && (Boolean(error) || (blogs?.length ?? 0) === 0)}
        loadingText="Loading blogs…"
        emptyText="No blogs found for this topic."
      />

      {blogs?.map((blog) => (
        <BlogCard
          key={blog._id}
          blog={blog}
          canEdit={Boolean(user && user._id === blog.user.id)}
          onEdit={() => navigate(`/editblog/${blog._id}`)}
        />
      ))}
    </div>
  );
}

interface BlogCardProps {
  blog: Blog;
  canEdit: boolean;
  onEdit: () => void;
}

function BlogCard({ blog, canEdit, onEdit }: BlogCardProps) {
  return (
    <article className="card mb-4 shadow-sm p-3">
      <h2 className="h4 fw-bold mb-2">
        <Link to={`/getsingleblog/${blog._id}`} className="text-decoration-none text-dark">
          {blog.title}
        </Link>
      </h2>

      <p className="text-muted mb-3">By {blog.user.name || 'Unknown author'}</p>

      {blog.image ? (
        <img src={blog.image} alt={blog.title} className="img-fluid rounded mb-3" />
      ) : (
        <p className="text-muted">No image available</p>
      )}

      <p className="lead mb-0" style={{ whiteSpace: 'pre-wrap' }}>
        {blog.content}
      </p>

      {canEdit && (
        <button type="button" onClick={onEdit} className="btn btn-primary mt-3 align-self-start">
          ✏ Edit Blog
        </button>
      )}
    </article>
  );
}
