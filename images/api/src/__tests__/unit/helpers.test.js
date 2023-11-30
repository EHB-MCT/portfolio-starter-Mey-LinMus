const {
  checkUserName,
  checkUserBirthday,
  checkUserAge,
} = require("../../helpers/endpointHelpers.js");

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

test("check birthday", () => {
  expect(checkUserBirthday("1990-01-01")).toBe(true);
  expect(checkUserBirthday("2000-12-31")).toBe(true);

  expect(checkUserBirthday("")).toBe(false);
  expect(checkUserBirthday("1990/01/01")).toBe(false);
  expect(checkUserBirthday("01-01-1990")).toBe(false);
  expect(checkUserBirthday("invalid")).toBe(false);
  expect(checkUserBirthday(null)).toBe(false);
});

test("check age", () => {
  expect(checkUserAge(20)).toBe(true);
  expect(checkUserAge(16)).toBe(false);
  expect(checkUserAge("25")).toBe(false);
  expect(checkUserAge(null)).toBe(false);
  expect(checkUserAge(undefined)).toBe(false);
});