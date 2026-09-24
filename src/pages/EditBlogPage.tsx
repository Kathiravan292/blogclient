import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { blogApi, getErrorMessage } from '@/api';
import { BlogForm } from '@/components/ui/BlogForm';
import { StatusMessage } from '@/components/ui/StatusMessage';
import { useFetch } from '@/hooks/useFetch';
import type { CreateBlogPayload } from '@/types';

export function EditBlogPage() {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const fetchBlog = useCallback(() => blogApi.getById(id), [id]);
  const { data: blog, loading, error } = useFetch(fetchBlog, [id]);

  const handleSubmit = async (values: CreateBlogPayload) => {
    try {
      await blogApi.update(id, values);

      toast.success('Blog updated successfully!');
      navigate(`/getsingleblog/${id}`);
    } catch (submitError) {
      toast.error(getErrorMessage(submitError, 'Update failed!'));
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
          emptyText="Blog not found."
        />
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <h1 className="h3 fw-bold mb-4 text-center">Edit Blog</h1>
          <BlogForm
            // The form seeds its state from these values once the blog has loaded.
            initialValues={{
              title: blog.title,
              topic: blog.topic,
              content: blog.content,
              image: blog.image,
            }}
            submitLabel="Update Blog"
            pendingLabel="Updating…"
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
