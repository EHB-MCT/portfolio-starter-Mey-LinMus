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


function checkUserBirthday(birthday) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(birthday);
}

function checkUserAge(age) {
  return typeof age === 'number' && age >= 18 && age <= 100;
}

module.exports = {
  checkUserName,
  checkUserBirthday,
  checkUserAge,
};
