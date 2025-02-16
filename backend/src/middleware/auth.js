const Session = require("../models/session");

/**
 * Middleware that checks if the request has a valid session token.
 *
 * Will store a Session object in the request object (req.session) if the token
 * is valid.
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next function
 */
async function authMiddleware(req, res, next) {
  // Should have the form "Bearer <token>"
  const tokenParts = req.headers.authorization.split(" ")[1];
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    req.session = Session.validateToken(tokenParts[1]);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = authMiddleware;
