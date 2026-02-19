"use client";
import React, { useEffect, useState, } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaUserPlus } from "react-icons/fa";
const UserCrud = () => {
  const emptyUser = { name: "", email: "", address: "" };

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(emptyUser);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  /* ================= FETCH USERS ================= */




  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users`
      );
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch users");
    }

  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, []);
    
  
  
  
  /* ================= INPUT HANDLER ================= */
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  /* ================= ADD / UPDATE ================= */
  const submitForm = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_URL}/update/user/${editId}`,
          user
        );
        toast.success("User Updated");
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user`,
          user
        );
        toast.success("User Added");
      }

      setUser(emptyUser);
      setEditId(null);
      setShowForm(false);
      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error("Operation failed");
    }
  };

  /* ================= EDIT ================= */
  const editUser = (u) => {
    setUser({
      name: u.name,
      email: u.email,
      address: u.address,
    });
    setEditId(u._id);
    setShowForm(true);
  };

  /* ================= DELETE ================= */
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/delete/user/${id}`
      );
      toast.success("User Deleted");
      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="container">
      {/* ================= TABLE VIEW ================= */}
      {!showForm && (
        <div className="userTable">

          

        <button
  className="btn btn-primary mb-3"
  onClick={() => {
    toast.success("Toast Working ✅");
    setShowForm(true);
  }}
>
  Add User <FaUserPlus className="me-2" />
</button>

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Name lko up</th>
                <th>Email</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No Data Found
                  </td>
                </tr>
              ) : (
                users.map((u, i) => (
                  <tr key={u._id}>
                    <td>{i + 1}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.address}</td>
                    <td>
                      <button
                        className="btn btn-info me-2"
                        onClick={() => editUser(u)}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteUser(u._id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= ADD / UPDATE FORM ================= */}
      {showForm && (
        <div className="addUser">
          <h3>{editId ? "Update User" : "Add User"}</h3>
          <button
  type="button"
  className="btn btn-secondary mb-3"
  onClick={() => {
    setShowForm(false);
    setEditId(null);
    setUser(emptyUser);
  }}
>
  <i className="fa-solid fa-backward"></i> Back
</button>

          <form className="addUserForm" onSubmit={submitForm}>
            <div className="inputGroup">
              <label>Name</label>
              <input
                name="name"
                value={user.name}
                onChange={inputHandler}
                required
              />
            </div>

            <div className="inputGroup">
              <label>Email</label>
              <input
                name="email"
                value={user.email}
                onChange={inputHandler}
                required
              />
            </div>

            <div className="inputGroup">
              <label>Address</label>
              <input
                name="address"
                value={user.address}
                onChange={inputHandler}
              />
            </div>

            <button className="btn btn-primary">
              {editId ? "Update" : "Submit"}
            </button>

            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserCrud;
