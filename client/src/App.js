import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    age: "",
  });
  const [editId, setEditId] = useState(null);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/users");
    setUsers(res.data);
  };
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async () => {
    if (!user.name || !user.email || !user.age) {
      alert("Please fill all fields");
      return;
    }
    if (editId) {
      await axios.put(
        `http://localhost:5000/users/${editId}`,
        user
      );
      setEditId(null);
    } else {
      await axios.post(
        "http://localhost:5000/users",
        user
      );
    }
    setUser({
      name: "",
      email: "",
      age: "",
    });
    fetchUsers();
  };
  const handleEdit = (u) => {
    setUser(u);
    setEditId(u.id);
  };
  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete?"
      )
    ) {
      await axios.delete(
        `http://localhost:5000/users/${id}`
      );
      fetchUsers();
    }
  };
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <span className="logo">
            🚀 User Management Dashboard
          </span>

          <div className="admin-panel">
            <span className="admin-badge">
              Admin Panel
            </span>
          </div>
        </div>
      </nav>

      <div className="main-container">
        <h2 className="title">
          User Management System
        </h2>

        <div className="user-card">
          <h5>Total Users</h5>
          <h2>{users.length}</h2>
        </div>

        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search User..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }/>

        <p className="search-text">
          Search Value: {search}
        </p>

        <input
          className="input-box"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChange}/>

        <input
          className="input-box"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}/>

        <input
          className="input-box"
          name="age"
          placeholder="Age"
          value={user.age}
          onChange={handleChange} />

        <button
          className="add-btn"
          onClick={handleSubmit}
        >
          {editId
            ? "Update User"
            : "Add User"}
        </button>

        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users
              .filter((u) =>
                u.name
                  .toLowerCase()
                  .includes(
                    search.toLowerCase()
                  )
              )
              .map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.age}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() =>
                        handleEdit(u)
                      }>
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(u.id)
                      }>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <footer className="footer">
          <p>© 2026 User Management System</p>
        </footer>
      </div></>
  );
}
export default App;