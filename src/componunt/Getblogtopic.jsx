import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../util/config";
import { AuthC } from "../Context/Authcontext";

const Getblogtopic = () => {
  const { topic } = useParams();
  const { user } = useContext(AuthC)
  const navigate = useNavigate();
 
  

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/blog/getblogbytopic/${encodeURIComponent(topic)}`
      );

      const result = await response.json();
      console.log(result);
      

      if (response.ok) {
        setBlogs(result.data || []);
      } else {
        setBlogs([]);  
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchBlogs();
  }, [topic]);

  if (loading) {
    return (
      <h3 className="text-center mt-5 text-secondary">
        Loading blogs...
      </h3>
    );
  }

  return (
    <div className="container mt-4">
      {/* <h2 className="mb-4 text-center">Blogs on "{topic}"</h2> */}

      {blogs.length === 0 ? (
        <p className="text-center text-muted">No blogs found for this topic.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog._id} className="card mb-4 shadow-sm p-3">
            <h4 className="fw-bold mb-2">{blog.title}</h4>

            <h6 className="text-muted mb-3">
              By: {blog.user?.name ?? "Unknown Author"}
            </h6>

            {blog.image ? (
              <img
                src={blog.image}
                alt={blog.title}
                className="img-fluid rounded mb-3"
              />
            ) : (
              <p className="text-muted">No image available</p>
            )}

            <p className="lead">{blog.content}</p>

            {user && (user._id === blog.user?._id || user._id === blog.user?.id) && (
              <button
                onClick={() => navigate(`/editblog/${blog._id}`)}
                className="btn btn-primary mt-3"
              >
                ✏ Edit Blog
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Getblogtopic;
