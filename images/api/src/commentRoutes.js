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