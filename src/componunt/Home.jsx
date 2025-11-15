import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../util/config';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${BASE_URL}/blog/getallblog`);
      const data = await response.json();
      setBlogs(data.blogs || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  return (
    <div style={{ backgroundColor: "#fff" }}>
      {/* 🟢 Hero Section */}
      <section
        className="py-5 text-center"
        style={{
          backgroundColor: "#f8f9fa",
          borderBottom: "1px solid #eaeaea",
        }}
      >
        <section
  className="py-5 text-center"
  style={{
    backgroundImage: `url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    color: "#fff",
    position: "relative",
  }}
>
  
  {/* Overlay for better text readability */}
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1,
    }}
  ></div>

  {/* Content stays on top of overlay */}
  <div className="container position-relative" style={{ zIndex: 2 }}>
    <h1 className="fw-bold mb-3">Discover the Latest Blogs & Insights</h1>
    <p className="text-light mb-4">
      Stay updated with trending topics, tutorials, and guides from our expert authors.
    </p>
    <img
      src="https://cdn-icons-png.flaticon.com/512/3039/3039383.png"
      alt="Blog Banner"
      style={{ width: "120px", height: "auto" }}
    />
  </div>
</section>

      </section>

      {/* 🟢 Blog Cards */}
      <div className="container py-5">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog, index) => (
            <div
              key={blog._id}
              className="row align-items-center py-4 border-bottom"
            >
              {/* Image Section */}
              <div className="col-md-3 text-center">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="img-fluid rounded shadow-sm"
                  style={{ maxHeight: "180px", objectFit: "cover" }}
                />
              </div>

              {/* Content Section */}
              <div className="col-md-7 mt-3 mt-md-0">
                <h4 className="fw-bold mb-2 text-dark">{blog.title}</h4>
                <p className="text-muted" style={{ fontSize: "0.95rem" }}>
                  {blog.content
                    ? blog.content.substring(0, 180) + "..."
                    : "No content available."}
                </p>
                <p className="text-secondary mb-2">
                  <strong>Topic:</strong> {blog.topic || "General"}
                </p>
                 <p className="text-secondary" style={{ fontSize: "0.9rem" }}>
        🕒 Published on: {new Date(blog.createdAt).toLocaleString()}
      </p>
              </div>

              {/* Button Section */}
              <div className="col-md-2 text-md-end text-center">
                <Link
                  to={`/getsingleblog/${blog._id}`}
                  className="btn btn-outline-danger rounded-pill px-4 fw-semibold"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))
        ) : (
          <h5 className="text-center text-muted py-5">No Blogs Found!</h5>
        )}
      </div>
      
     

      {/* 🟢 Footer Section */}
      <footer
        className="text-center py-4 mt-5"
        style={{ backgroundColor: "#f8f9fa", borderTop: "1px solid #eaeaea" }}
      >
        <p className="text-muted mb-0">
          © {new Date().getFullYear()} My Blog Platform | Built with ❤️ using WEB DEVELOPMENT
        </p>
      </footer>
    </div>
  );
};

export default Blog;
