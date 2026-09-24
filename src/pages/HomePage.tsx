import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { blogApi } from '@/api';
import { Footer } from '@/components/layout/Footer';
import { StatusMessage } from '@/components/ui/StatusMessage';
import { useFetch } from '@/hooks/useFetch';
import type { Blog } from '@/types';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80';
const HERO_ICON = 'https://cdn-icons-png.flaticon.com/512/3039/3039383.png';
const EXCERPT_LENGTH = 180;

export function HomePage() {
  const fetchBlogs = useCallback(() => blogApi.getAll(), []);
  const { data: blogs, loading, error } = useFetch(fetchBlogs, []);

  return (
    <div style={{ backgroundColor: '#fff' }}>
      <Hero />

      <div className="container py-5">
        <StatusMessage
          loading={loading}
          error={error}
          empty={!loading && !error && (blogs?.length ?? 0) === 0}
          loadingText="Loading blogs…"
          emptyText="No blogs found yet."
        />

        {blogs?.map((blog) => <BlogRow key={blog._id} blog={blog} />)}
      </div>

      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section
      className="py-5 text-center position-relative"
      style={{
        backgroundImage: `url("${HERO_IMAGE}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#fff',
      }}
    >
      {/* Darkens the photo so the heading stays readable over any part of it. */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      />

      <div className="container position-relative">
        <h1 className="fw-bold mb-3">Discover the Latest Blogs &amp; Insights</h1>
        <p className="text-light mb-4">
          Stay updated with trending topics, tutorials, and guides from our expert authors.
        </p>
        <img src={HERO_ICON} alt="" style={{ width: 120, height: 'auto' }} />
      </div>
    </section>
  );
}

function BlogRow({ blog }: { blog: Blog }) {
  const excerpt =
    blog.content.length > EXCERPT_LENGTH
      ? `${blog.content.slice(0, EXCERPT_LENGTH)}…`
      : blog.content;

  return (
    <article className="row align-items-center py-4 border-bottom">
      <div className="col-md-3 text-center">
        <img
          src={blog.image}
          alt={blog.title}
          className="img-fluid rounded shadow-sm"
          style={{ maxHeight: 180, objectFit: 'cover' }}
        />
      </div>

      <div className="col-md-7 mt-3 mt-md-0 text-start">
        <h2 className="h4 fw-bold mb-2 text-dark">{blog.title}</h2>
        <p className="text-muted" style={{ fontSize: '0.95rem' }}>
          {excerpt || 'No content available.'}
        </p>
        <p className="text-secondary mb-2">
          <strong>Topic:</strong> {blog.topic || 'General'}
        </p>
        <p className="text-secondary mb-0" style={{ fontSize: '0.9rem' }}>
          🕒 Published on {new Date(blog.createdAt).toLocaleString()}
        </p>
      </div>

      <div className="col-md-2 text-md-end text-center mt-3 mt-md-0">
        <Link
          to={`/getsingleblog/${blog._id}`}
          className="btn btn-outline-danger rounded-pill px-4 fw-semibold"
        >
          Read More
        </Link>
      </div>
    </article>
  );
}
