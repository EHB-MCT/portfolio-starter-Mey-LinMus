import React from "react";
import axios from "axios";

const DeleteUser = ({ userId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/user/${userId}`);
      onDelete(userId);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <button onClick={handleDelete}>
      Delete User
    </button>
  );
};

export default DeleteUser;
