import axios from "axios";
import React, { useState } from "react";
import Register from '../Components/register';
import moment from 'moment';
import "./Users.css";

const ViewUsers = ({ setShowUsers }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showUserList, setShowUserList] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [userForEdit, setUserForEdit] = useState(null);
  

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/api/users/`);
      setUsers(response.data);
      setShowUserList(true);
    } catch (error) {
      setError("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user._id === id);
    if (!userToEdit) return;
    setEditUser(true);
    setShowUserList(false);
    setUserForEdit(userToEdit);
  };


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/api/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      setError("Failed to delete user. Please try again.");
    }
  };

  const calculateAge = (dob) => {
    return moment().diff(moment(dob, 'YYYY-MM-DD'), 'years');
  };

  return (
    <div>
      {!editUser && !showUserList && (
        <div className="view">
          <button onClick={fetchUsers} disabled={loading}>
            {loading ? "Loading..." : "View Users"}
          </button>
        </div>
      )}

      {error && <p className="error">{error}</p>}

      {showUserList && users.length === 0 && <p>No users found.</p>}

      {showUserList && users.length > 0 && !editUser && (
        <div className="table-container">
          <table border="1" cellPadding="5" cellSpacing="0">
            <thead>
              <tr>
                <th>Username</th>
                <th>DOB</th>
                <th>Age</th>
                <th>About</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{moment(user.dob).format('YYYY-MM-DD')}</td>
                  <td>{calculateAge(user.dob)}</td>
                  <td>{user.about}</td>
                  <td>
                    <button onClick={() => handleEdit(user._id)}>Edit</button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(user._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editUser && (
        <Register 
          user={userForEdit} 
          setShowUsers={setShowUsers} 
          setEditUser={setEditUser} 
        />
      )}
    </div>
  );
};

export default ViewUsers;
