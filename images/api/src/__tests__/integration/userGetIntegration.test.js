const request = require("supertest");
const express = require("express");
const app = require("../../app");
const knexfile = require("../../db/knexfile");
const db = require("knex")(knexfile.development);

const USER = {
  name: "Gert",
  birthday: "2003-06-27",
  age: 50,
};

describe(" User Integration Tests", () => {
  beforeAll(async () => {
    await db("users").insert(USER);
  });

  afterAll(async () => {
    await db("users").insert(USER);
    await db.destroy();
  });

  test("GET /users should return a list of all users", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    // console.log(response.body);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
