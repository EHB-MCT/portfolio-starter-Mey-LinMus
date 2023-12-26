import React, { useState } from "react";
import { motion } from "framer-motion";
import "../styles/comment.css";

const AddComment = ({ onAddComment, userId }) => {
  const [text, setText] = useState("");
  const handleAddComment = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/user/${userId}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Comment added successfully:", data);
        onAddComment(data);
        setText("");
      } else {
        console.error("Error adding comment:", response.statusText);

        const errorData = await response.json();
        console.error("Server responded with:", errorData);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="addComment-container">
      <form>
        <label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Comment"
          />
        </label>
        <motion.button
          type="button"
          onClick={handleAddComment}
          variants={buttonVariants}
          whileHover="hover"
        >
          Add Comment
        </motion.button>
      </form>
    </div>
  );
};

export default AddComment;
