import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { blogApi, getErrorMessage } from '@/api';
import { BlogForm } from '@/components/ui/BlogForm';
import type { CreateBlogPayload } from '@/types';

export function CreateBlogPage() {
  const navigate = useNavigate();

  const handleSubmit = async (values: CreateBlogPayload) => {
    try {
      const { message } = await blogApi.create(values);

      toast.success(message || 'Blog created successfully!');
      navigate('/');
    } catch (error) {
      toast.error(getErrorMessage(error, 'Could not create the blog.'));
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <h1 className="h3 fw-bold mb-4 text-center">Create Blog</h1>
          <BlogForm submitLabel="Create Blog" pendingLabel="Creating…" onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
