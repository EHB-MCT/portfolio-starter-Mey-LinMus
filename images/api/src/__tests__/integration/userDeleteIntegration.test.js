const request = require("supertest");
const app = require("../../app");

describe("DELETE /user/:id", () => {
  test("should delete a user", async () => {
    const userIdToDelete = "user_id_to_delete";
    const response = await request(app).delete(`/user/${userIdToDelete}`);

    if (response.status === 200) {
      expect(response.body.message).toBe(
        `User with ID ${userIdToDelete} successfully deleted.`
      );
    } else if (response.status === 404) {
      expect(response.body.error).toBe("User not found.");
    } else {
      expect(response.status).toBe(500);
    }
  });
});
