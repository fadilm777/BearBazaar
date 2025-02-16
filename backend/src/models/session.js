const jwt = require('jsonwebtoken');

// WARNING SUPER INSECURE !!!
// Fine for now, this won't run in prod
const JWT_SECRET = 'my-secret-key';

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
    return jwt.sign({ userId: user.id },
                    JWT_SECRET,
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
    const decoded = jwt.verify(token, JWT_SECRET);
    return new Session({ id: decoded.userId }, token);
  }
}

module.exports = Session;
