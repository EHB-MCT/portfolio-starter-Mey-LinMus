const request = require("supertest");
const app = require("../../app");
const knexfile = require("../../db/knexfile");
const db = require("knex")(knexfile.development);

const COMMENT = {
  comment_text: "Test Comment",
  user_id: 229,
};

describe("Comment Integration Tests", () => {
  beforeAll(async () => {
    try {
      await db("users").insert({
        name: "Gertje",
        birthday: "2003-06-27",
        age: 50,
      });


      const [insertedComment] = await db("comments")
        .insert(COMMENT)
        .returning("*");
      COMMENT.id = insertedComment.id; 
    } catch (error) {
      console.error("Error during beforeAll comment:", error);
    }
  });

  afterAll(async () => {
    try {
      await db("comments").del();
      await db("users").del();
      await db.destroy();
    } catch (error) {
      console.error("Error during afterAll comment:", error);
    }
  });

  test("DELETE /comment/:id should delete a comment", async () => {
    try {
      const response = await request(app).delete(`/comment/${COMMENT.id}`);

      expect(response.status).toBe(200);

      const getResponse = await request(app).get(`/user/${COMMENT.user_id}/comments`);
      const deletedComment = getResponse.body.find(comment => comment.id === COMMENT.id);

      expect(deletedComment).toBeUndefined();
    } catch (error) {
      console.error("Error during test:", error);
    }
  });
});
