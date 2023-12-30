const express = require("express");

/**
 * Create an Express router with user-related routes.
 *
 * @param {Object} db - Knex.js database connection.
 * @returns {Router} Express router with user routes.
 */
module.exports = (db) => {
  const router = express.Router();

  /**
   * Get a list of users with their associated comments.
   *
   * @route GET /users-comments
   * @returns {Array} Array of users with comments.
   * @throws {Error} If an error occurs while fetching data.
   */
  router.get("/users-comments", async (req, res) => {
    try {
      const usersWithComments = await db("users")
        .leftJoin("comments", "users.id", "comments.user_id")
        .select("users.id", "users.name", "users.birthday", "users.age")
        .groupBy("users.id")
        .orderBy("users.id")
        .select(db.raw("ARRAY_AGG(comments.text) as comments"));

      res.json(usersWithComments);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "An error occurred while fetching users with comments.",
      });
    }
  });

  /**
   * Get comments for a specific user.
   *
   * @route GET /user/:id/comments
   * @param {number} id - User ID.
   * @returns {Array} Array of comments for the user.
   * @throws {Error} If an error occurs while fetching data or user is not found.
   */
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

  /**
   * Add a new comment for a user.
   *
   * @route POST /user/:id/comment
   * @param {number} id - User ID.
   * @param {Object} req.body - Request body containing the comment text.
   * @param {string} req.body.text - Comment text.
   * @returns {Object} Information about the inserted comment.
   * @throws {Error} If an error occurs, user is not found, or comment cannot be added.
   */
  router.post("/user/:id/comment", async (req, res) => {
    const userId = req.params.id;
    const { text } = req.body;

    try {
      const userExists = await db("users").where({ id: userId }).first();

      if (!userExists) {
        return res.status(404).json({ error: "User not found." });
      }

      const inserted = await db("comments")
        .insert({ text, user_id: userId })
        .returning("id");
      res.status(200).json({ text, user_id: userId, inserted });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while adding a comment." });
    }
  });

  /**
   * Update the text of a comment.
   *
   * @route PATCH /comment/:id
   * @param {number} id - Comment ID.
   * @param {Object} req.body - Request body containing the updated comment text.
   * @param {string} req.body.text - Updated comment text.
   * @returns {Object} Information about the updated comment.
   * @throws {Error} If an error occurs, comment is not found, or update fails.
   */
  router.patch("/comment/:id", async (req, res) => {
    const commentId = req.params.id;
    const { text } = req.body;

    try {
      const commentExists = await db("comments")
        .where({ id: commentId })
        .first();

      if (!commentExists) {
        return res.status(400).json({ error: "Comment not found." });
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

  /**
   * Delete a comment.
   *
   * @route DELETE /comment/:id
   * @param {number} id - Comment ID.
   * @returns {void}
   * @throws {Error} If an error occurs or comment is not found.
   */
  router.delete("/comment/:id", async (req, res) => {
    const commentId = req.params.id;

    try {
      const deletedCount = await db("comments").where({ id: commentId }).del();
      if (deletedCount === 0) {
        res.status(400).json({ error: "Comment not found." });
      } else {
        res.status(200).end();
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
