const request = require("supertest");
const express = require("express");
const app = require("../../app");
const knexfile = require("../../db/knexfile");
const db = require("knex")(knexfile.development);

const COMMENT = {
  text: "Test Comment",
  user_id: 1,
};

describe("User Integration Tests", () => {
  beforeAll(async () => {
    try {

      await db("users").insert({
        name: "Gertje",
        birthday: "2003-06-27",
        age: 50,
      });

 
      await db("comments").insert(COMMENT);
    } catch (error) {
      console.error("Error during beforeAll:", error);
    }
  });

  afterAll(async () => {
    try {
   
      await db("users").del();
      await db("comments").del();
      await db.destroy();
    } catch (error) {
      console.error("Error during afterAll:", error);
    }
  });

  test("GET /users-comments should return a list of users with comments", async () => {
    try {
      const response = await request(app).get("/users-comments");
      console.log("Response body:", response.body); 
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    } catch (error) {
      console.error("Error during test:", error);
    }
  });
});
