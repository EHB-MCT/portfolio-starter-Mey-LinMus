import React, { useState, useEffect } from "react";
import DeleteUser from "./DeleteUser";
import AddUser from "./AddUser";
import "../styles/user.css";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/users-comments");
        const data = await response.json();
        setUsers(data);
        console.log(data);
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
          <p>Birthday: {user.birthday}</p>
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
