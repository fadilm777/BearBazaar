const bcrypt = require("bcrypt");
const db = require('../db');
const ApiError = require("../utils/ApiError");

async function login(email, password) {
  const user = await db.user.findUnique({ where: { email } });

  const same = await bcrypt.compare(password, user.password);
  if (!same) {
    throw new ApiError(401, "Invalid password");
  }

  token = Session.generateToken(user);
  return new Session(user, token);
}

module.exports = {
  login,
};
