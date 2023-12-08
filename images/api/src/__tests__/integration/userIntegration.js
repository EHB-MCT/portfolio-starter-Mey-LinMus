const request = require("supertest");
const express = require("express");
const app = require("../../app");
const knexfile = require("../../db/knexfile");
const db = require("knex")(knexfile.development);

const USER = {
  name: "Gertje",
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

  test("GET /users should return a list of all songs", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    console.log(response.body);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

test("POST /user should add a new user", async () => {
  const newUser = {
    name: "NewUser",
    birthday: "1990-01-01",
    age: 30,
  };

  const response = await request(app).post("/user").send(newUser);

  if (response.status === 200) {
    expect(response.body.message).toBe("User added successfully.");
    expect(response.body.user).toMatchObject(newUser);
  } else {
    expect(response.status).toBe(401);
  }
});

// test("DELETE /user/:id should delete a user by ID", async () => {
//   const userId = await db("users").select("id").where(USER).first();

//   const response = await request(app).delete(`/user/${userId.id}`);

//   expect(response.status).toBe(200);
//   console.log(response.body);

//   expect(response.body.message).toBe(
//     `User with ID ${userId.id} successfully deleted.`
//   );
// });
