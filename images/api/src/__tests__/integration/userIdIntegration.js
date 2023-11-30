const request = require("supertest");
const app = require("../../app");

describe("User Integration Tests", () => {
  let server;

  beforeAll((done) => {
    // server = startServer(3000, done);
    done();
  });

  afterAll((done) => {
    // server.close(done);
    done();
  });

  let userId;

  it("should create a new user", async () => {
    const response = await request(app).post("/user").send({
      name: "John Doe",
      birthday: "1990-01-01",
      age: 30,
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User added successfully.");
    expect(response.body.user).toHaveProperty("id");
    userId = response.body.user.id;
  });

  it("should get a list of users", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(1);
  });

  it("should update the user", async () => {
    const response = await request(app).patch(`/user/${userId}`).send({
      name: "Updated Name",
    });

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(userId);
    expect(response.body.name).toBe("Updated Name");
  });

  it("should delete the user", async () => {
    const response = await request(app).delete(`/user/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      `User with ID ${userId} successfully deleted.`
    );
  });
});
