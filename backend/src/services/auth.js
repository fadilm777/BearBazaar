const bcrypt = require("bcrypt");
const db = require('../db');
const ApiError = require("../utils/ApiError");
const Session = require("../models/session");

/**
 * Get the user details from a user id.
 *
 * Used so the frontend can display the user's details.
 */
async function getMe(userId) {
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return {
    id: user.id,
    email: user.email,
    username: user.username,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

/**
 * Try to login as a user.
 *
 * Will raise an ApiError if the email or password is incorrect.
 *
 * @param {string} email
 * @param {string} password
 * @returns {Session} session
 */
async function login(email, password) {
  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    throw new ApiError(401, "User not found, please sign up");
  }

  const same = await bcrypt.compare(password, user.passwordHash);
  if (!same) {
    throw new ApiError(401, "Invalid password");
  }

  token = Session.generateToken(user);
  return new Session(user, token);
}

/**
 * Try to register a new user. Will raise an ApiError if the email or username
 * already exists.
 *
 * @param {string} email
 * @param {string} username
 * @param {string} password
 * @returns {Session} session
 */
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
      passwordHash: hashedPassword,
    },
  });

  token = Session.generateToken(user);
  return new Session(user, token);
}

module.exports = {
  getMe,
  login,
  register,
};
