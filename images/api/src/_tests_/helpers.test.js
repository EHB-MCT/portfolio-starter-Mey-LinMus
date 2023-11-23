const { checkUserName } = require("../helpers/endpointHelpers.js");

test("check name", () => {
  expect(checkUserName("")).toBe(false);
  expect(checkUserName(null)).toBe(false);
  expect(checkUserName("i")).toBe(false);
  expect(checkUserName("1")).toBe(false);

  expect(checkUserName("Jan")).toBe(true);
  expect(checkUserName("ann sophie")).toBe(false);
  expect(checkUserName("John Doe")).toBe(false);
  expect(checkUserName("Alice")).toBe(true);
});
