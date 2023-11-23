/**
 * check name of new user on post
 * @param: user name
 * @returns: false if not match, true if it is the right type
 */

function checkUserName(name) {
  if (
    name == null ||
    name.length <= 1 ||
    typeof name !== "string" ||
    name.length > 20 ||
    !/^[A-Z][a-z]+$/.test(name)
  ) {
    return false;
  }
  return true;
}

module.exports = {
  checkUserName,
};
