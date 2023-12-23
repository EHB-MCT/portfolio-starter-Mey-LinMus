import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteUser from "./DeleteUser";
import AddUser from "./AddUser";
import "../styles/user.css";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/users-comments"
        );
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = (deletedUserId) => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== deletedUserId)
    );
  };

  const handleAddUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <div>
      <AddUser onUserAdded={handleAddUser} />

      {users.map((user) => (
        <div key={user.id} className="user-item">
          <h3>{user.name}</h3>
          <p>Birthday: {formatDate(user.birthday)}</p>
          <p>Age: {user.age}</p>
          <ul>
            {user.comment_text ? (
              <li>{user.comment_text}</li>
            ) : (
              <li>No comments yet.</li>
            )}
          </ul>

          <DeleteUser userId={user.id} onDelete={handleDeleteUser} />
        </div>
      ))}
    </div>
  );
};

export default UserList;
