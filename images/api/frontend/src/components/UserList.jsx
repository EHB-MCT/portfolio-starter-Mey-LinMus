import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteUser from "./DeleteUser";
import AddUser from "./AddUser";
import "../styles/user.css";
import AddComment from "./AddComment";

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

  const handleAddComment = ({ user_id, text, inserted }) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === user_id
          ? {
              ...user,
              comment_text: text,
            }
          : user
      )
    );
  };

  return (
    <div>
      <AddUser onUserAdded={handleAddUser} />

      {users.map((user) => (
        <div key={user.id} className="user-item">
          <h3>{user.name}</h3>
          <p>Birthday: {formatDate(user.birthday)}</p>
          <p>Age: {user.age}</p>
          <ul className="comments">
            {user.comment_text ? (
              <li>{user.comment_text}</li>
            ) : (
              <li>No comments yet.</li>
            )}
          </ul>
          <AddComment onAddComment={handleAddComment} userId={user.id} />
          <DeleteUser userId={user.id} onDelete={handleDeleteUser} />
        </div>
      ))}
    </div>
  );
};

export default UserList;
