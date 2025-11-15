import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../util/config";

const Editblog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    topic: "",
    content: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`${BASE_URL}/blog/getsingleblog/${id}`);
      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Blog not found");
        return;
      }

      const blog = result.data;

      setForm({
        title: blog.title,
        topic: blog.topic,
        content: blog.content,
        image: blog.image,
      });
    } catch (err) {
      console.error("Error fetching blog:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${BASE_URL}/blog/editblog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Blog updated successfully!");
        navigate(`/getsingleblog/${id}`);
      } else {
        alert(data.message || "Update failed!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return <h3 className="text-center mt-5">Loading blog...</h3>;
  }

  return (
    <div className="container">
      {/* <h2>Edit Blog</h2> */}
      <div className="row">
        <div className="col-lg-4"></div>

        <div className="col-lg-4">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your title"
              className="form-control mb-2"
              id="title"
              value={form.title}
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder="Enter your topic"
              className="form-control mb-2"
              id="topic"
              value={form.topic}
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder="Enter your content"
              className="form-control mb-2"
              id="content"
              value={form.content}
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder="Enter your image URL"
              className="form-control mb-2"
              id="image"
              value={form.image}
              onChange={handleChange}
            />

            <button type="submit" className="btn btn-primary w-100">
              Update Blog
            </button>
          </form>
        </div>

        <div className="col-lg-4"></div>
      </div>
    </div>
  );
};

export default Editblog;
