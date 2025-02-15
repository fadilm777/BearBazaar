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

async function register(email, username, password) {
  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const existingUsername = await db.user.findUnique({ where: { username } });
  if (existingUsername) {
    throw new ApiError(409, "Username already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
    },
  });

  token = Session.generateToken(user);
  return new Session(user, token);
}

module.exports = {
  login,
  register,
};
