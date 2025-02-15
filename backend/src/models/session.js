const jwt = require('jsonwebtoken');

class Session {
  constructor(user, token) {
    this.userId = user.id;
    this.token = token;
  }

  static generateToken(user) {
    jwt.sign(
      { userId: user.id },
      process.env.SECRET,
      { expiresIn: '12h' });
  }
}

module.exports = Session;
