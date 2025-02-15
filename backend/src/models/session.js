const jwt = require('jsonwebtoken');

/**
 * Represents a user session.
 */
class Session {
  constructor(user, token) {
    this.userId = user.id;
    this.token = token;
  }

  /**
   * Generates a JWT token for the user.
   *
   * @param {object} user
   * @returns {string} token
   */
  static generateToken(user) {
    jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '12h' });
  }

  /**
   * Validates a JWT token and returns a Session object.
   *
   * Will throw an error if the token is invalid.
   *
   * @param {string} token
   * @returns {Session} session
   */
  static validateToken(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return new Session(decoded.userId, token);
  }
}

module.exports = Session;
