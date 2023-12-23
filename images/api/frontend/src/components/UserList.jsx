import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteUser from "./DeleteUser"; // Import the DeleteUser component
import "../styles/user.css";

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
    // Update the state to remove the deleted user
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== deletedUserId)
    );
  };

  return (
    <div>
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
          {/* Use the DeleteUser component */}
          <DeleteUser userId={user.id} onDelete={handleDeleteUser} />
        </div>
      ))}
    </div>
  );
};

export default UserList;
