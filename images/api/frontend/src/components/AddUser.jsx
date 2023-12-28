import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/user.css";
import Cleave from "cleave.js/react";
import "cleave.js/dist/addons/cleave-phone.us";

const AddUser = ({ onAddUser }) => {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Calculate age based on the selected birthday
    if (birthday) {
      const today = new Date();
      const birthDate = new Date(birthday);
      const ageCalculation = today.getFullYear() - birthDate.getFullYear();
      setAge(ageCalculation.toString());
    }
  }, [birthday]);

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
        setMessage({ type: "success", text: "User added successfully." });
        window.location.reload();
      } else {
        console.error("Error adding user:", response.statusText);

        const errorData = await response.json();
        console.error("Server responded with:", errorData);

        setMessage({ type: "error", text: "Failed to add user." });
      }
    } catch (error) {
      console.error("Error adding user:", error);
      setMessage({ type: "error", text: "An unexpected error occurred." });
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
      {message && (
        <p
          style={{ color: message.type === "success" ? "green" : "red" }}
          className="message"
        >
          {message.text}
        </p>
      )}
      <form>
        <label>
          <b>Name:</b>
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
          <Cleave
            options={{
              date: true,
              delimiter: "-",
              datePattern: ["Y", "m", "d"],
            }}
            type="text"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            placeholder="yyyy-mm-dd"
          />
        </label>
        <br />
        <label>
          <b>Age:</b>
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            disabled // Disable direct editing of age
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
