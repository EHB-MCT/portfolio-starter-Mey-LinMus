import React from "react";
import "../styles/user.css";

const DeleteUser = ({ userId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/user/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
      
        },
      });

      if (response.ok) {
        onDelete(userId);
      } else {
        console.error("Error deleting user:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <button onClick={handleDelete} className="deleteButton">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        className="bi bi-trash-fill"
        viewBox="0 0 16 16"
      >
        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
      </svg>
    </button>
  );
};

export default DeleteUser;
