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
    } catch (error) {
      console.error("Error during beforeAll user:", error);
    }
  });

  afterAll(async () => {
    try {
      await db("comments").del();
      await db("users").del();
      await db.destroy();
    } catch (error) {
      console.error("Error during afterAll user:", error);
    }
  });

  test("POST /user/:id/comment should add a comment to a user", async () => {
    try {
      const userId = 688;

      const response = await request(app)
        .post(`/user/${userId}/comment`)
        .send({ text: COMMENT.comment_text });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("text", COMMENT.comment_text);
      expect(response.body).toHaveProperty("user_id", userId);
      expect(response.body).toHaveProperty("inserted");
    } catch (error) {
      console.error("Error during test:", error);
    }
  });
});
