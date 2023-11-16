const express = require("express");
const { v4: uuidv4 } = require("uuid");


/**
 * Create an Express router with user-related routes.
 *
 * @param {Object} db - Knex.js database connection.
 * @returns {Router} Express router with user routes.
 */

module.exports = (db) => {
  const router = express.Router();


  /**
   * Get a list of users.
   *
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @returns {Promise<void>} A Promise that resolves to the user data or an error response.
   */

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


  /**
   * Add a new user.
   *
   * @param {Request} req - Express request object with user data in the request body.
   * @param {Response} res - Express response object.
   * @returns {Promise<void>} A Promise that resolves to the created user data or an error response.
   */

  router.post("/user", async (req, res) => {
    try {
      const { name, birthday, age } = req.body;
  
      const existingUser = await db("users").where({ name, birthday, age }).first();
  
      if (existingUser) {

        res.status(409).json({ error: "User already exists." });
      } else {
      
        const userId = uuidv4();
        const resp = await db("users")
          .insert({ uuid: userId, name, birthday, age })
          .returning();
  
        res.status(201).json({ message: "User added successfully.", user: resp[0] });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while adding a user." });
    }
  });
  


  /**
   * Delete a user by ID.
   *
   * @param {Request} req - Express request object with the user ID as a route parameter.
   * @param {Response} res - Express response object.
   * @returns {Promise<void>} A Promise that resolves to a success or error response.
   */

  router.delete("/user/:id", async (req, res) => {
    const userId = req.params.id;
    // const userId = uuidv4();
    try {
      const deletedCount = await db("users").where({ id: userId }).del();
      if (deletedCount === 0) {
        res.status(404).json({ error: "User not found." });
      } else {
        res
          .status(200)
          .json({ message: `User with ID ${userId} successfully deleted.` });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the user." });
    }
  });


  /**
   * Update a user by ID.
   *
   * @param {Request} req - Express request object with the user ID as a route parameter and user data in the request body.
   * @param {Response} res - Express response object.
   * @returns {Promise<void>} A Promise that resolves to the updated user data or an error response.
   */

  router.patch("/user/:id", async (req, res) => {
    const userId = req.params.id;
    const { name, birthday, age } = req.body;

    try {
      // Check if the user with the specified ID exists
      const userExists = await db("users").where({ id: userId }).first();

      if (!userExists) {
        return res.status(404).json({ error: "User not found." });
      }

      const updatedUser = {};
      if (name) updatedUser.name = name;
      if (birthday) updatedUser.birthday = birthday;
      if (age) updatedUser.age = age;

      await db("users").where({ id: userId }).update(updatedUser);

      res.status(200).json({ id: userId, ...updatedUser });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while updating the user." });
    }
  });

  //////////// Comments ////////////

  router.get("/users-comments", async (req, res) => {
    try {
      const usersWithComments = await db("users")
        .leftJoin("comments", "users.id", "comments.user_id")
        .select("users.*", "comments.text as comment_text");

      res.json(usersWithComments);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "An error occurred while fetching users with comments.",
      });
    }
  });

  router.get("/user/:id/comments", async (req, res) => {
    const userId = req.params.id;

    try {
      const comments = await db("comments")
        .where({ user_id: userId })
        .select("*");
      res.json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "An error occurred while fetching comments for the user.",
      });
    }
  });

  router.post("/user/:id/comment", async (req, res) => {
    const userId = req.params.id;
    const { text } = req.body;

    try {
      const userExists = await db("users").where({ id: userId }).first();

      if (!userExists) {
        return res.status(404).json({ error: "User not found." });
      }

      const commentId = uuidv4();
      await db("comments").insert({ id: commentId, text, user_id: userId });
      res.status(201).json({ id: commentId, text, user_id: userId });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while adding a comment." });
    }
  });

  router.patch("/comment/:id", async (req, res) => {
    const commentId = req.params.id;
    const { text } = req.body;

    try {
      const commentExists = await db("comments")
        .where({ id: commentId })
        .first();

      if (!commentExists) {
        return res.status(404).json({ error: "Comment not found." });
      }

      await db("comments").where({ id: commentId }).update({ text });

      res.status(200).json({ id: commentId, text });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while updating the comment." });
    }
  });

  router.delete("/comment/:id", async (req, res) => {
    const commentId = req.params.id;

    try {
      const deletedCount = await db("comments").where({ id: commentId }).del();
      if (deletedCount === 0) {
        res.status(404).json({ error: "Comment not found." });
      } else {
        res.status(204).end();
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the comment." });
    }
  });

  return router;
};
