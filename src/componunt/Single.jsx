import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL, ROLE } from "../util/config.js";
import { AuthC } from "../Context/Authcontext.jsx"; // ensure path is correct


const Single = () => {
  const { id } = useParams();

  const { user, role } = useContext(AuthC);
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch single blog
  const fetchBlog = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/blog/getsingleblog/${id}`);
      setBlog(res.data.data || res.data);
    } catch (err) {
      console.error("Error fetching blog:", err);
      toast.error("Failed to load blog.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  // Delete blog
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${BASE_URL}/blog/deleteblog/${blog._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Blog deleted successfully!");
        navigate("/");
      } else {
        toast.error(data.message || "Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Something went wrong while deleting the blog");
    }
  };

  return (
    <div className="container py-4">
      {/* <h2 className="mb-4 text-center fw-bold">Single Blog</h2> */}

      {loading ? (
        <h5 className="text-center">Loading...</h5>
      ) : blog && Object.keys(blog).length > 0 ? (
        <div className="text-center">
          <img
            src={blog.image || "https://via.placeholder.com/800x400?text=No+Image"}
            alt={blog.topic}
            className="img-fluid rounded shadow mb-4"
            style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
          />

          <h3 className="fw-bold mb-2">{blog.title}</h3>
          <h5 className="text-primary mb-3">{blog.topic}</h5>
          <p className="text-muted">
            Posted by {blog.user?.name || "Unknown Author"} on{" "}
            {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "N/A"}
          </p>
          <p className="lead">{blog.content}</p>

          <div className="mt-4 d-flex gap-2 justify-content-center">

  {/* Edit Button → Only Blog Owner */}
  {user?._id === (blog.user?._id || blog.user?.id) && (
    <button
      className="btn btn-primary px-4"
      onClick={() => navigate(`/editblog/${blog._id}`)}
    >
      ✏ Edit Blog
    </button>
  )}

  {/* Delete Button → Owner OR Admin */}
  {user && blog?.user && (
    (user._id === (blog.user._id || blog.user.id) || role === "admin") && (
      <button onClick={handleDelete} className="btn btn-danger px-4">
        🗑 Delete Blog
      </button>
    )
  )}
</div>
        </div>
      ) : (
        <h5 className="text-center">No Blog Found!</h5>
      )}
    </div>
  );
};

export default Single;
