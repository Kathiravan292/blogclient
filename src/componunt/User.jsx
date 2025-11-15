import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL,TOKEN } from "../util/config";
import { Link } from "react-router-dom";

const Users = () => {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    const {
      data: { users },
    } = await axios.get(`${BASE_URL}/user/getallusers`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${TOKEN}`,
      },
    });
    setUsersData(users);
  };

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
    <div>
      <h2>Users</h2>
      <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">userName</th>
                <th scope="col">email</th>
                <th scope="col">phoneNumber</th>
              </tr>
            </thead>
            <tbody>
      {usersData && usersData.length > 0 ? (
        usersData.map((user) => (
          
              user.role == "user" && 
              <tr key={user._id}>
                <th scope="row">{user._id}</th>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <Link to={`/deleteuser/${user._id}`}><td className="btn btn-danger">Delete</td></Link>
              </tr>
        ))
      ) : (
        <h2>No Users</h2>
      )}
      </tbody>
      </table>
    </div>
  );
};

export default Users;