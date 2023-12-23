import React, { useState } from "react";
import { motion } from "framer-motion";
import "../styles/user.css";

const AddUser = ({ onAddUser }) => {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [age, setAge] = useState("");

  const handleAddUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          birthday,
          age: parseInt(age),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        onAddUser(data.user);

        setName("");
        setBirthday("");
        setAge("");
      } else {
        console.error("Error adding user:", response.statusText);

        const errorData = await response.json();
        console.error("Server responded with:", errorData);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="addUser-container">
      <h2>Add User</h2>
      <form>
        <label>
          <b> Name:</b>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
        </label>
        <br />
        <label>
          <b>Birthday:</b>
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            placeholder="Age"
          />
        </label>
        <br />
        <label>
          <b>Age:</b>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <br />
        <motion.button
          type="button"
          onClick={handleAddUser}
          variants={buttonVariants}
          whileHover="hover"
        >
          Add User
        </motion.button>
      </form>
    </div>
  );
};

export default AddUser;
