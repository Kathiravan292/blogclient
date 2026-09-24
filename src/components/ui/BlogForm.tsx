import { type ChangeEvent, type FormEvent, useState } from 'react';

import type { CreateBlogPayload } from '@/types';

interface BlogFormProps {
  initialValues?: CreateBlogPayload;
  submitLabel: string;
  pendingLabel: string;
  onSubmit: (values: CreateBlogPayload) => Promise<void>;
}

const EMPTY_BLOG: CreateBlogPayload = { title: '', topic: '', content: '', image: '' };

/**
 * The create and edit pages post the same four fields, so they share one controlled
 * form rather than keeping two copies of the markup in sync.
 */
export function BlogForm({
  initialValues = EMPTY_BLOG,
  submitLabel,
  pendingLabel,
  onSubmit,
}: BlogFormProps) {
  const [values, setValues] = useState<CreateBlogPayload>(initialValues);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = event.target;

    setValues((previous) => ({ ...previous, [id]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await onSubmit(values);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-start">
      <label className="form-label" htmlFor="title">
        Title
      </label>
      <input
        type="text"
        id="title"
        className="form-control mb-3"
        placeholder="Enter your title"
        value={values.title}
        onChange={handleChange}
        required
      />

      <label className="form-label" htmlFor="topic">
        Topic
      </label>
      <input
        type="text"
        id="topic"
        className="form-control mb-3"
        placeholder="Enter your topic"
        value={values.topic}
        onChange={handleChange}
        required
      />

      <label className="form-label" htmlFor="content">
        Content
      </label>
      <textarea
        id="content"
        className="form-control mb-3"
        placeholder="Enter your content"
        rows={8}
        value={values.content}
        onChange={handleChange}
        required
      />

      <label className="form-label" htmlFor="image">
        Image URL
      </label>
      <input
        // `type="url"` makes the browser reject anything without a scheme, which the
        // server's `@IsUrl` rule would otherwise reject after a round trip.
        type="url"
        id="image"
        className="form-control mb-4"
        placeholder="https://example.com/cover.png"
        value={values.image}
        onChange={handleChange}
        required
      />

      <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
        {submitting ? pendingLabel : submitLabel}
      </button>
    </form>
  );
}
