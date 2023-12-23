import React, { useState } from "react";

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

        // Clear the input fields after successful user addition
        setName("");
        setBirthday("");
        setAge("");
      } else {
        console.error("Error adding user:", response.statusText);

        // Log the specific error message from the server response
        const errorData = await response.json();
        console.error("Server responded with:", errorData);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Birthday:
          <input
            type="text"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </label>
        <br />
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleAddUser}>
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
