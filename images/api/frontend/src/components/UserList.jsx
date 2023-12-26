import React, { useState, useEffect } from "react";
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

  const handleAddUser = async (newUser) => {
    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const data = await response.json();
        setUsers((prevUsers) => [...prevUsers, data.user]);
      } else {
        console.error("Error adding user:", response.statusText);

        const errorData = await response.json();
        console.error("Server responded with:", errorData);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
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
      <AddUser onAddUser={handleAddUser} />

      {users.map((user) => (
        <div key={user.id} className="user-item">
          <h3>{user.name}</h3>
          <p>Birthday: {formatDate(user.birthday)}</p>
          <p>Age: {user.age}</p>
          <ul className="comments">
            {user.comments && user.comments.length > 0 ? (
              user.comments.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))
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
