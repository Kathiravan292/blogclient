import React, { useState } from 'react';
import { BASE_URL } from '../util/config';
import { useNavigate } from 'react-router-dom';

const Creatblog = () => { 
  const navigate = useNavigate();  
  const [useblog, setuseblog] = useState({ 
    title: '',
    topic: '',
    content: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);

  const handlechange = (e) => {
    const { id, value } = e.target;
    setuseblog((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('You must be logged in to create a blog.');
      return;
    }

    // Optional: quick image URL sanity check (skip if empty)
    if (useblog.image && !/^https?:\/\/.+/i.test(useblog.image)) {
      alert('Please enter a valid image URL (starting with http/https).');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/blog/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        },
        // Let server set createdAt (via Mongoose timestamps)
        body: JSON.stringify(useblog)
      });

      const isJSON = response.headers
        .get('content-type')
        ?.includes('application/json');
      const data = isJSON ? await response.json() : null;

      if (!response.ok) {
        const msg = data?.message || `Failed (${response.status})`;
        alert(msg);
        return;
      }

      alert(data?.message || 'Blog created successfully!');
      setuseblog({ title: '', topic: '', content: '', image: '' });
      navigate('/'); // or navigate to the new blog detail page if you return its id
    } catch (err) {
      console.error('Create blog error:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      {/* <h2 className="text-center mb-4">Create Blog</h2> */}
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your title"
              className="form-control mb-2"
              id="title"
              value={useblog.title}
              onChange={handlechange}
              required
            />

            <input
              type="text"
              placeholder="Enter your topic"
              className="form-control mb-2"
              id="topic"
              value={useblog.topic}
              onChange={handlechange}
              required
            />

            <textarea
              id="content"
              placeholder="Enter your content"
              className="form-control mb-2"
              value={useblog.content}
              onChange={handlechange}
              rows={6}
              required
            />

            <input
              type="text"
              placeholder="Enter your image URL (optional)"
              className="form-control mb-3"
              id="image"
              value={useblog.image}
              onChange={handlechange}
            />

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? 'Creating…' : 'Create Blog'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Creatblog;
