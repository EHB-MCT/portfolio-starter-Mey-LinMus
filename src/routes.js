const express = require("express");
const { v4: uuidv4 } = require("uuid");


module.exports = (db) => {
  const router = express.Router();

  router.get("/users", async (req, res) => {
    try {
      const users = await db("users").select("*");
      res.json(users);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching users." });
    }
  });

  router.post("/user", async (req, res) => {
    try {
      const { name, birthday, age } = req.body;
      const userId = uuidv4();
      await db("users").insert({ id: userId, name, birthday, age });
      res.status(201).json({ id: userId, name, birthday, age });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while adding a user." });
    }
  });


  router.delete("/user/:id", async (req, res) => {
    // const userId = req.params.id;
    const userId = uuidv4();
    try {
      const deletedCount = await db("users").where({ id: userId }).del();
      if (deletedCount === 0) {
        res.status(404).json({ error: "User not found." });
      } else {
        res.status(204).end();
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the user." });
    }
  });

  router.patch("/user/:id", async (req, res) => {
    const userId = req.params.id;
    const { name, birthday, age } = req.body;

    try {
      // Check if the user with the specified ID exists
      const userExists = await db("users").where({ id: userId }).first();

      if (!userExists) {
        return res.status(404).json({ error: "User not found." });
      }

      // Create an object with the fields to update
      const updatedUser = {};
      if (name) updatedUser.name = name;
      if (birthday) updatedUser.birthday = birthday;
      if (age) updatedUser.age = age;

      // Update user information
      await db("users").where({ id: userId }).update(updatedUser);

      res.status(200).json({ id: userId, ...updatedUser });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while updating the user." });
    }
  });

  return router;
};
